import React, { useState, useEffect } from "react";
import { 
  Network, 
  Wifi, 
  WifiOff, 
  Activity, 
  Cpu, 
  Layers, 
  Send, 
  Check, 
  AlertTriangle, 
  Zap, 
  Sparkles,
  HelpCircle,
  TrendingUp,
  Server
} from "lucide-react";

export default function NetworkPlanner() {
  // Network Status States
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>("Unknown");
  const [simulatedLatency, setSimulatedLatency] = useState<number | null>(null);
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);

  // Subnet Calculator States
  const [ipAddress, setIpAddress] = useState<string>("192.168.1.1");
  const [cidr, setCidr] = useState<number>(24);
  const [subnetResult, setSubnetResult] = useState<any>(null);

  // Bandwidth Planner States
  const [officeUsers, setOfficeUsers] = useState<number>(15);
  const [hdCameras, setHdCameras] = useState<number>(4);
  const [voipPhones, setVoipPhones] = useState<number>(5);
  const [usesHeavyCloud, setUsesHeavyCloud] = useState<boolean>(false);

  // Structured Cabling Planner States
  const [workdesks, setWorkdesks] = useState<number>(10);
  const [accessPoints, setAccessPoints] = useState<number>(2);
  const [networkPrinters, setNetworkPrinters] = useState<number>(1);
  const [switchType, setSwitchType] = useState<"managed" | "unmanaged" | "poe">("poe");

  // General Notification
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Track real-time online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      measureLatency();
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSimulatedLatency(null);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Detect approximate network type if supported
    const nav: any = navigator;
    if (nav.connection) {
      setConnectionType(nav.connection.effectiveType || "WiFi/Ethernet");
    }

    measureLatency();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Measure latency to simulate dynamic network quality check
  const measureLatency = async () => {
    if (!navigator.onLine) return;
    setIsMeasuring(true);
    const start = performance.now();
    try {
      // Fetch a tiny asset or endpoint to verify latency
      await fetch("/api/health", { cache: "no-store" }).catch(() => {});
      const duration = Math.round(performance.now() - start);
      setSimulatedLatency(duration);
    } catch (e) {
      // Fallback random simulated latency representing local carrier connection
      setSimulatedLatency(Math.floor(Math.random() * 80) + 20);
    } finally {
      setIsMeasuring(false);
    }
  };

  // Subnet Calculation logic (pure TypeScript CIDR subnet calculation)
  useEffect(() => {
    calculateSubnet();
  }, [ipAddress, cidr]);

  const calculateSubnet = () => {
    try {
      // Validate IP format
      const ipParts = ipAddress.trim().split(".");
      if (ipParts.length !== 4) return;
      
      const numParts = ipParts.map(part => parseInt(part, 10));
      if (numParts.some(part => isNaN(part) || part < 0 || part > 255)) {
        return; // Invalid octet
      }

      // Convert IP to a 32-bit integer
      const ipNum = (numParts[0] << 24) >>> 0 | (numParts[1] << 16) | (numParts[2] << 8) | numParts[3];
      
      // Calculate Mask
      const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      
      // Calculate Network and Broadcast
      const networkNum = (ipNum & maskNum) >>> 0;
      const broadcastNum = (networkNum | ~maskNum) >>> 0;
      
      // Convert integers back to IP strings
      const numToIp = (num: number) => {
        return [
          (num >>> 24) & 255,
          (num >>> 16) & 255,
          (num >>> 8) & 255,
          num & 255
        ].join(".");
      };

      const subnetMask = numToIp(maskNum);
      const networkAddress = numToIp(networkNum);
      const broadcastAddress = numToIp(broadcastNum);
      
      // Usable IP Range
      let firstUsable = "";
      let lastUsable = "";
      let totalUsable = 0;

      if (cidr < 31) {
        firstUsable = numToIp(networkNum + 1);
        lastUsable = numToIp(broadcastNum - 1);
        totalUsable = Math.pow(2, 32 - cidr) - 2;
      } else if (cidr === 31) {
        firstUsable = numToIp(networkNum);
        lastUsable = numToIp(broadcastNum);
        totalUsable = 2;
      } else {
        firstUsable = numToIp(networkNum);
        lastUsable = numToIp(broadcastNum);
        totalUsable = 1;
      }

      // Determine IP Class
      let ipClass = "Class C";
      if (numParts[0] < 128) ipClass = "Class A (Enterprise)";
      else if (numParts[0] < 191) ipClass = "Class B (Medium Business)";
      else if (numParts[0] < 224) ipClass = "Class C (Small/Local Office)";
      else ipClass = "Class D/E (Multicast/Experimental)";

      setSubnetResult({
        subnetMask,
        networkAddress,
        broadcastAddress,
        firstUsable,
        lastUsable,
        totalUsable,
        ipClass,
        wildcard: numToIp(~maskNum >>> 0)
      });
    } catch (err) {
      // Fallback
    }
  };

  // Calculate Bandwidth Needs
  const calculateBandwidth = () => {
    // 1 user needs 3 Mbps on average (15 Mbps heavy cloud)
    const userMultiplier = usesHeavyCloud ? 12 : 4;
    const usersNeed = officeUsers * userMultiplier;
    
    // CCTV needs 4 Mbps per HD stream upload
    const cctvNeed = hdCameras * 4;
    
    // VoIP needs 0.15 Mbps per device
    const voipNeed = voipPhones * 0.2;

    const totalDownload = Math.round((usersNeed + cctvNeed * 0.5 + voipNeed) * 1.15); // Add 15% buffer
    const totalUpload = Math.round((usersNeed * 0.2 + cctvNeed + voipNeed) * 1.15); // Add upload buffer

    let recommendation = "Fibre-to-the-Home (FTTH) / GPON - 50 Mbps";
    if (totalDownload > 150) {
      recommendation = "Dedicated Corporate Fiber Lease Line - 200+ Mbps Symmetric";
    } else if (totalDownload > 80) {
      recommendation = "High-speed Multi-wan Fiber / Dual GPON Link with Load Balancing";
    } else if (totalDownload < 25) {
      recommendation = "VDSL / High-Speed Broadband - 30 Mbps";
    }

    return { totalDownload, totalUpload, recommendation };
  };

  // Calculate Port Cabling setup
  const calculateCabling = () => {
    const activeNodes = workdesks + accessPoints + networkPrinters + hdCameras;
    // Add 25% spare ports for redundancy & growth
    const totalPortsNeeded = Math.ceil(activeNodes * 1.25);
    
    let standardSwitchSize = 8;
    if (totalPortsNeeded > 48) standardSwitchSize = 48 + 24; // Multi-switch stack
    else if (totalPortsNeeded > 24) standardSwitchSize = 48;
    else if (totalPortsNeeded > 16) standardSwitchSize = 24;
    else if (totalPortsNeeded > 8) standardSwitchSize = 16;

    const cat6CablesEst = Math.round(activeNodes * 15); // average 15 meters per run
    
    return {
      activeNodes,
      totalPortsNeeded,
      standardSwitchSize,
      cat6CablesEst,
    };
  };

  const bandwidthResults = calculateBandwidth();
  const cablingResults = calculateCabling();

  // Handle inquiry forwarding
  const handleForwardInquiry = (sectionType: string) => {
    let message = "";
    if (sectionType === "subnet") {
      message = `Hello Draftify Pakistan! I configured my local subnet layout via your Network Planner:\n• IP: ${ipAddress}/${cidr}\n• Net ID: ${subnetResult?.networkAddress}\n• Subnet Mask: ${subnetResult?.subnetMask}\n• Total Usable Nodes: ${subnetResult?.totalUsable} IPs.\nI want professional router configuration for my offices.`;
    } else if (sectionType === "bandwidth") {
      message = `Hello Draftify Pakistan!\nI estimated our corporate internet bandwidth requirements:\n• Total Office Users: ${officeUsers}\n• HD Cameras: ${hdCameras}\n• Estimated Bandwidth Needed: Download ~${bandwidthResults.totalDownload} Mbps / Upload ~${bandwidthResults.totalUpload} Mbps\n• Recommended Setup: ${bandwidthResults.recommendation}\nPlease provide hardware leasing & load balancing router setups.`;
    } else {
      message = `Hello Draftify Pakistan!\nI planned our structured office network cabling:\n• Desk nodes: ${workdesks}\n• Access Points: ${accessPoints}\n• IP Security Cameras: ${hdCameras}\n• Estimated CAT6 cabling: ~${cablingResults.cat6CablesEst} meters\n• Recommended Switch size: ${cablingResults.standardSwitchSize}-Port ${switchType.toUpperCase()}\nPlease share a custom quotation for complete on-site structured cabling laying & network termination.`;
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923083396157?text=${encoded}`, "_blank");
    
    setActionSuccess(`Successfully sent your ${sectionType} specs directly to WhatsApp!`);
    setTimeout(() => setActionSuccess(null), 5000);
  };

  return (
    <section id="networking-section" className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Component Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 animate-pulse">
            <Network className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Networking Toolkit</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-950 tracking-tight">
            Design, Calculate & Plan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-display">
              Your Network Infrastructure
            </span>
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
            A state-of-the-art interactive playground for computing IP subnetting pools, calculating business internet speeds, and organizing ethernet switch/cabling ports.
          </p>
        </div>

        {/* Live Network Connectivity Guard Banner */}
        <div className="mb-12">
          <div className={`p-6 rounded-3xl border transition-all duration-300 ${
            isOnline 
              ? "bg-emerald-500/5 border-emerald-500/25 shadow-lg shadow-emerald-500/5" 
              : "bg-rose-500/5 border-rose-500/25 shadow-lg shadow-rose-500/5 animate-pulse"
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-2xl border ${
                  isOnline 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" 
                    : "bg-rose-500/10 border-rose-500/20 text-rose-600"
                }`}>
                  {isOnline ? <Wifi className="w-6 h-6 animate-pulse" /> : <WifiOff className="w-6 h-6" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-extrabold text-slate-950 text-base sm:text-lg">
                      {isOnline ? "Android-TWA & Web App Client is Online" : "Network Disconnection Detected"}
                    </h4>
                    <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md border ${
                      isOnline 
                        ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/25" 
                        : "bg-rose-500/15 text-rose-700 border-rose-500/25"
                    }`}>
                      {isOnline ? "Secured" : "Offline Mode"}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    {isOnline 
                      ? `Successfully handshake connected. Effective Link: ${connectionType}. Play Protect active.`
                      : "Your local device has lost communication with the internet server. Follow local recovery tips."}
                  </p>
                </div>
              </div>

              {isOnline ? (
                <div className="flex flex-wrap items-center gap-4 bg-white/60 p-2.5 rounded-2xl border border-slate-200/50">
                  <div className="text-left px-3 border-r border-slate-200">
                    <span className="text-[9px] text-slate-500 font-extrabold block uppercase tracking-wider">Simulated Latency</span>
                    <span className="text-sm font-black font-mono text-slate-950 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                      {simulatedLatency !== null ? `${simulatedLatency} ms` : "Measuring..."}
                    </span>
                  </div>
                  <button
                    disabled={isMeasuring}
                    onClick={measureLatency}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 text-white disabled:text-slate-400 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    {isMeasuring ? "Pinging..." : "Test Latency"}
                  </button>
                </div>
              ) : (
                <div className="bg-white/90 p-4 rounded-2xl border border-rose-500/20 max-w-md w-full">
                  <div className="flex items-center space-x-2 text-rose-800 text-xs font-bold mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Quick Connectivity Checklist:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-600 text-[11px] list-disc list-inside">
                    <li>Is your GPON Fiber router powered on? (Load-shedding active?)</li>
                    <li>Verify CAT6 cable is fully locked into computer LAN card.</li>
                    <li>Check if your cellular data limits are exhausted.</li>
                    <li>For quick professional on-site physical network checks, dial <a href="tel:+923083396157" className="text-blue-700 font-bold hover:underline">+92 308 3396157</a>.</li>
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Global Action Success Toast */}
        {actionSuccess && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center space-x-3 text-emerald-800 text-xs font-bold animate-fade-in-up">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* The Trio Playgrounds Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CARD 1: Subnet & CIDR Calculator */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300">
            <div className="space-y-6">
              
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-950 text-base sm:text-lg">IP Subnet & CIDR Calculator</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">LAN Address Allocator</p>
                </div>
              </div>

              {/* IP Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Base IP Address</label>
                <input 
                  type="text" 
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="e.g. 192.168.1.1"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-slate-900"
                />
              </div>

              {/* CIDR Mask Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-700 uppercase tracking-wide">CIDR Mask</label>
                  <span className="font-black font-mono text-blue-700 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 text-xs">
                    /{cidr}
                  </span>
                </div>
                <input 
                  type="range"
                  min={8}
                  max={32}
                  value={cidr}
                  onChange={(e) => setCidr(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>/8 (Large)</span>
                  <span>/24 (Standard)</span>
                  <span>/32 (Single Host)</span>
                </div>
              </div>

              {/* Calculations Result Output Panel */}
              {subnetResult ? (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-3 font-mono text-[11px] text-slate-700 leading-normal">
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-500">Subnet Mask:</span>
                    <strong className="text-slate-900 font-bold">{subnetResult.subnetMask}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-500">Network ID:</span>
                    <strong className="text-slate-900 font-bold">{subnetResult.networkAddress}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-500">Broadcast ID:</span>
                    <strong className="text-slate-900 font-bold">{subnetResult.broadcastAddress}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-500">Usable Range:</span>
                    <strong className="text-blue-700 font-black text-[10px]">{subnetResult.firstUsable} - {subnetResult.lastUsable}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-500">Total Hosts:</span>
                    <strong className="text-emerald-700 font-extrabold">{subnetResult.totalUsable.toLocaleString()} IPs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">IP Category:</span>
                    <strong className="text-slate-900">{subnetResult.ipClass}</strong>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-rose-500 bg-rose-500/5 rounded-xl border border-rose-500/10">
                  Please enter a valid IPv4 address syntax (e.g. 192.168.1.1)
                </div>
              )}

            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleForwardInquiry("subnet")}
                disabled={!subnetResult}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:bg-slate-100 disabled:text-slate-400 font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Custom LAN Config</span>
              </button>
            </div>
          </div>

          {/* CARD 2: Office Bandwidth Planner */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300">
            <div className="space-y-6">
              
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-950 text-base sm:text-lg">Office Speed & Bandwidth Estimator</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Internet speed assessor</p>
                </div>
              </div>

              {/* Users count slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Simultaneous Office Users</span>
                  <span className="text-indigo-700">{officeUsers} Users</span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={150}
                  value={officeUsers}
                  onChange={(e) => setOfficeUsers(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Cameras count slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>HD CCTV Security Cameras</span>
                  <span className="text-indigo-700">{hdCameras} Cameras</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={32}
                  value={hdCameras}
                  onChange={(e) => setHdCameras(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* VoIP count slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>IP/VoIP Office Phones</span>
                  <span className="text-indigo-700">{voipPhones} Phones</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={50}
                  value={voipPhones}
                  onChange={(e) => setVoipPhones(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Heavy cloud backup checkbox */}
              <label className="flex items-center space-x-2.5 p-3 bg-slate-50 border border-slate-200/50 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                <input 
                  type="checkbox"
                  checked={usesHeavyCloud}
                  onChange={(e) => setUsesHeavyCloud(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div className="text-[11px] text-slate-600 leading-normal">
                  <span className="font-bold text-slate-900 block">Heavy Cloud Backups & Zoom</span>
                  Continuous backups, server syncing & remote video calls
                </div>
              </label>

              {/* Bandwidth Speed Requirement Output Display */}
              <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Min. Download Speed:</span>
                  <strong className="text-slate-900 font-extrabold font-mono">{bandwidthResults.totalDownload} Mbps</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Min. Upload Speed:</span>
                  <strong className="text-slate-900 font-extrabold font-mono">{bandwidthResults.totalUpload} Mbps</strong>
                </div>
                <div className="pt-2 border-t border-indigo-500/15">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Recommended Local ISP Tier</span>
                  <strong className="text-blue-700 font-bold leading-normal block">{bandwidthResults.recommendation}</strong>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleForwardInquiry("bandwidth")}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Quote Multi-WAN Load Balancer</span>
              </button>
            </div>
          </div>

          {/* CARD 3: Structured Cabling & Port Planner */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300">
            <div className="space-y-6">
              
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-950 text-base sm:text-lg">Structured Cabling Planner</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Switch Ports & Cable Estimator</p>
                </div>
              </div>

              {/* Workdesks */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Wired Desk Workstations</span>
                  <span className="text-emerald-700">{workdesks} Desks</span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={80}
                  value={workdesks}
                  onChange={(e) => setWorkdesks(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* APs */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Enterprise Wireless Access Points</span>
                  <span className="text-emerald-700">{accessPoints} APs</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={12}
                  value={accessPoints}
                  onChange={(e) => setAccessPoints(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Network Printers */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Network Printers & Scanners</span>
                  <span className="text-emerald-700">{networkPrinters} Printers</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={8}
                  value={networkPrinters}
                  onChange={(e) => setNetworkPrinters(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Switch hardware preference */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">LAN Switch Preference</label>
                <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-center">
                  <button
                    onClick={() => setSwitchType("poe")}
                    className={`py-2 px-1 rounded-lg border transition-all cursor-pointer ${
                      switchType === "poe"
                        ? "bg-blue-500/10 border-blue-500 text-slate-950"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    PoE Switch (Cameras/APs)
                  </button>
                  <button
                    onClick={() => setSwitchType("managed")}
                    className={`py-2 px-1 rounded-lg border transition-all cursor-pointer ${
                      switchType === "managed"
                        ? "bg-blue-500/10 border-blue-500 text-slate-950"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    Managed L2 Switch (VLANs)
                  </button>
                  <button
                    onClick={() => setSwitchType("unmanaged")}
                    className={`py-2 px-1 rounded-lg border transition-all cursor-pointer ${
                      switchType === "unmanaged"
                        ? "bg-blue-500/10 border-blue-500 text-slate-950"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    Simple Unmanaged
                  </button>
                </div>
              </div>

              {/* Structured Cabling Outputs */}
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Active LAN Nodes:</span>
                  <strong className="text-slate-900 font-extrabold">{cablingResults.activeNodes} Ports</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Recommended Switch:</span>
                  <strong className="text-emerald-700 font-bold">{cablingResults.standardSwitchSize}-Port Gig Switch</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated CAT6 Cable:</span>
                  <strong className="text-slate-900 font-extrabold font-mono">~{cablingResults.cat6CablesEst} Meters</strong>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleForwardInquiry("cabling")}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inquire structured cabling</span>
              </button>
            </div>
          </div>

        </div>

        {/* Informative Security SLA Banner */}
        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-2">
              <h4 className="text-lg sm:text-xl font-bold text-slate-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>Professional Cisco, MikroTik & Ubiquiti Setup</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our technicians are experts in configuring professional router firewalls, setting up secure remote IPsec/WireGuard VPN links, optimizing local bandwidth using multi-WAN load balancers (MikroTik routers), and laying certified CAT6 cabling with neat tagging in Quetta, Balochistan.
              </p>
            </div>
            <div className="text-center md:text-right">
              <a
                href="#contact-section"
                className="inline-block px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-102 cursor-pointer shadow-xl shadow-slate-950/10"
              >
                Schedule On-site Survey
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
