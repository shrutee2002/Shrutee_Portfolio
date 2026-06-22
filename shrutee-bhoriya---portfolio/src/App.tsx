import React, { useState } from 'react';
import {
  Database,
  Brain,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Award,
  GraduationCap,
  Sparkles,
  Terminal,
  ArrowRight,
  Search,
  HeartPulse,
  Activity,
  Code,
  LineChart,
  ExternalLink,
  ChevronRight,
  User,
  Layers,
  CheckCircle,
  Play,
  RotateCcw,
  Send,
  HelpCircle
} from 'lucide-react';
import ThreeDBackground from './components/ThreeDBackground';
import DashboardSimulation from './components/DashboardSimulation';
import { portfolioData, Project } from './data';

// --- CAREER CHATBOT SCRIPTED SYSTEM ---
interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const CHAT_QUICK_REPLIES = [
  { label: "Why hire Shrutee?", value: "why-hire" },
  { label: "Key tech stack?", value: "tech-stack" },
  { label: "AI Fresher Job Agent?", value: "job-agent" },
  { label: "Contact channels?", value: "contact" }
];

const CHAT_ANSWERS: Record<string, string> = {
  "why-hire": "Shrutee Bhoriya brings high-impact, analytical MCA credentials (Chandigarh University) focused on AI & ML. Her experience spans end-to-end data pipelines: modeling relational SQL databases, writing reusable Python extraction logic, building predictive models (Scikit-learn), and engineering automated n8n workflows with Gemini API. She represents the ideal hybrid professional bridging raw analytical reporting with autonomous AI workflow design.",
  "tech-stack": "Shrutee's core stack includes: \n\n• Programming: Python, SQL, JavaScript\n• Data Science: Pandas, NumPy, Scikit-learn, EDA, Feature Engineering\n• Business Intel: Tableau, Microsoft Excel, Chart.js\n• AI & Automation: n8n, Prompt Engineering, Gemini AI Agents, REST APIs\n• Tools: Git, GitHub, MySQL, Jira, VS Code",
  "job-agent": "The AI Fresher Job Agent is an advanced workspace automation tool she designed in 2026. It leverages n8n workflows integrated with the Gemini API to crawl recruitment feeds, clean matching posting layouts, filter candidates by entry eligibility, extract key metrics, and automatically catalog them in JSON representations to save candidates up to 80% manual scanning overhead.",
  "contact": "You can connect with Shrutee directly through several channels:\n\n• Email: bshruti.1973@gmail.com\n• Phone: +91 93548 93032\n• Ghaziabad, India\n• LinkedIn: linkedin.com/in/shrutee-bhoriya-1b3200241\n• GitHub: github.com/shrutee2002"
};

export default function App() {
  const [selectedProjectTab, setSelectedProjectTab] = useState<string>('job-agent');

  // Interactive AlgoViz Simulator state
  const [algoArray, setAlgoArray] = useState<number[]>([45, 12, 85, 32, 60, 22, 75, 50]);
  const [algoSteps, setAlgoSteps] = useState<string[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  // Interactive AI Job Agent Simulator state
  const [jobSearchQuery, setJobSearchQuery] = useState<string>('Data Analyst Python');
  const [scrapedJobs, setScrapedJobs] = useState<any[]>([]);
  const [isScraping, setIsScraping] = useState<boolean>(false);

  // Interactive Heart Prediction Simulator state
  const [patientAge, setPatientAge] = useState<number>(55);
  const [patientChol, setPatientChol] = useState<number>(240);
  const [patientBp, setPatientBp] = useState<number>(135);
  const [patientHeartRate, setPatientHeartRate] = useState<number>(142);
  const [patientGender, setPatientGender] = useState<'0' | '1'>('1'); // 0=Female, 1=Male
  const [predictedRisk, setPredictedRisk] = useState<number | null>(null);

  // Bot State
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello! I am Shrutee's Virtual Assistant. Ask me anything about her skills, projects, education or why she'd be a stellar addition to your technical squad!",
      timestamp: 'Just now'
    }
  ]);

  // --- ALGOVIZ RUNNER ---
  const triggerBubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setAlgoSteps(["Initial state array loaded."]);
    let arr = [...algoArray];
    const steps: string[] = [];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          steps.push(`Swapped elements at index ${j} and ${j + 1}: [${arr.join(', ')}]`);
          setAlgoArray([...arr]);
          setAlgoSteps([...steps]);
          await new Promise((r) => setTimeout(r, 400));
        }
      }
    }
    steps.push("Sorted sequence confirmed successfully!");
    setAlgoSteps([...steps]);
    setIsSorting(false);
  };

  const resetAlgoArray = () => {
    setAlgoArray([45, 12, 85, 32, 60, 22, 75, 50].sort(() => Math.random() - 0.5));
    setAlgoSteps(["New random array registered."]);
  };

  // --- AI JOB AGENT TRIGGER ---
  const triggerJobAgentScraping = () => {
    setIsScraping(true);
    setScrapedJobs([]);
    setTimeout(() => {
      const db = [
        { title: "Junior Data Analyst", company: "CyberMetrics Labs", loc: "Gurugram (Hybrid)", skills: "Python, SQL, Tableau", match: "94%" },
        { title: "AI Automation Intern", company: "AeroAgent systems", loc: "Remote India", skills: "n8n, Python, LLMs, REST APIs", match: "98%" },
        { title: "Business Analyst - Freshers", company: "Quantz Consulting", loc: "Delhi NCR", skills: "Excel, SQL, Dashboarding", match: "89%" },
        { title: "Junior Data Scientist", company: "HealCare Solutions", loc: "Ghaziabad", skills: "Python, Scikit-learn, Pandas", match: "95%" }
      ];
      // filter based on typed query keyword
      const keyword = jobSearchQuery.toLowerCase();
      const filtered = db.filter(j =>
        j.title.toLowerCase().includes(keyword) ||
        j.skills.toLowerCase().includes(keyword) ||
        j.company.toLowerCase().includes(keyword)
      );
      setScrapedJobs(filtered.length > 0 ? filtered : db.slice(0, 2));
      setIsScraping(false);
    }, 1200);
  };

  // --- HEART INCIDENCE PREDICTION ENGINE ---
  const calculateHeartDiseaseRisk = () => {
    // Structured logic based on clinical risk indicators
    let riskFactor = 15; // base percent

    // Age variable
    if (patientAge > 45) riskFactor += (patientAge - 45) * 0.8;
    // Cholesterol levels (healthy range ~ 120-200)
    if (patientChol > 200) riskFactor += (patientChol - 200) * 0.25;
    // Blood pressure (systolic)
    if (patientBp > 120) riskFactor += (patientBp - 120) * 0.35;
    // Max heart rate (typically protective when high during exercise, but abnormal baseline poses risks)
    if (patientHeartRate < 130) riskFactor += 12;
    // Sex gender coefficient
    if (patientGender === '1') riskFactor += 8;

    const normalizedRisk = Math.min(Math.round(riskFactor), 95);
    setPredictedRisk(normalizedRisk);
  };

  // --- CHAT DELEGATES ---
  const handleBotReply = (queryKey: string) => {
    const text = CHAT_ANSWERS[queryKey] || "I'm always ready to assist! Ask about her projects, background, or links.";
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString() + '_user', sender: 'user', text: `Learn about: ${queryKey.replace('-', ' ')}`, timestamp: 'Just now' },
      { id: Date.now().toString() + '_bot', sender: 'bot', text, timestamp: 'Just now' }
    ]);
  };

  const submitFreeformChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setMessages(prev => [...prev, { id: Date.now().toString() + '_user', sender: 'user', text: userText, timestamp: 'Just now' }]);
    setChatInput('');

    // Semantic matching logic
    setTimeout(() => {
      const norm = userText.toLowerCase();
      let reply = "I've logged your request! For custom interviews, please reach out to Shrutee directly at bshruti.1973@gmail.com, or drop a LinkedIn invite. I am programmed to showcase her structured portfolio projects, skills, history and certification details.";

      if (norm.includes('python') || norm.includes('sql') || norm.includes('skills')) {
        reply = CHAT_ANSWERS['tech-stack'];
      } else if (norm.includes('job') || norm.includes('agent') || norm.includes('workflow')) {
        reply = CHAT_ANSWERS['job-agent'];
      } else if (norm.includes('hire') || norm.includes('why') || norm.includes('mca')) {
        reply = CHAT_ANSWERS['why-hire'];
      } else if (norm.includes('contact') || norm.includes('phone') || norm.includes('email') || norm.includes('linkedin')) {
        reply = CHAT_ANSWERS['contact'];
      } else if (norm.includes('project') || norm.includes('dashboard') || norm.includes('ecommerce')) {
        reply = "Shrutee has 4 core master projects featured in her portfolio:\n\n1. **AI Job Automated Agent** (n8n & Gemini API link-ups)\n2. **E-Commerce Sales Dashboard** (Relational MySQL metrics & Python reporting)\n3. **Medical Heart Predictor** (classification algorithms optimizing healthcare metrics)\n4. **AlgoViz Visualizer** (responsive algorithms flow tracking)\n\nYou can interact directly with simulated sandboxes for ALL 4 of these projects on the right-hand panel of this screen!";
      }

      setMessages(prev => [...prev, { id: Date.now().toString() + '_bot', sender: 'bot', text: reply, timestamp: 'Just now' }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* 3D-effect spatial glowing ambient backgrounds */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] left-[45%] w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main glass boundary wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8 relative z-10">
        
        {/* ================= HEADER CARD ================= */}
        <header className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-2xl relative overflow-hidden group">
          
          <div className="flex flex-col gap-2 relative z-10 w-full lg:w-fit">
            <div className="flex items-center gap-3">
              <span className="text-[10px] bg-indigo-500/25 border border-indigo-400/40 text-indigo-300 font-bold font-mono px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                Data Analyst | AI & ML
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-400 uppercase leading-[1.05]">
              {portfolioData.name}
            </h1>

            <p className="text-sm md:text-base font-mono text-slate-400 tracking-wide mt-1 max-w-2xl">
              Ghaziabad, India &bull; MCA candidate specializing in Artificial Intelligence & Machine Learning
            </p>
          </div>

          {/* Quick HUD details pane */}
          <div className="backdrop-blur-md bg-slate-950/40 border border-white/5 group-hover:border-indigo-500/20 rounded-2xl p-4 flex flex-col gap-3 text-[12px] font-mono text-slate-300 w-full sm:w-fit lg:min-w-[280px] shadow-lg transition-all">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
              <a href={`mailto:${portfolioData.email}`} className="hover:text-white transition-colors">{portfolioData.email}</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{portfolioData.phone}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-white/5">
              <a
                href="https://linkedin.com/in/shrutee-bhoriya-1b3200241"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-900/50 hover:bg-indigo-900/50 px-2.5 py-1.5 rounded-lg text-xs hover:text-white transition-all text-slate-300"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-65" />
              </a>
              <a
                href="https://github.com/shrutee2002"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800/80 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg text-xs hover:text-white transition-all text-slate-300"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-65" />
              </a>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-48 h-48 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        </header>

        {/* ================= SECOND SECTION: SPLIT CONTAINER ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* LEFT 5 GRID PANELS: Career Summaries, Virtual Assistant & Profile Info */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            {/* 1. PROFESSIONAL SUMMARY GLASS CARD */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <User className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">Professional Summary</h2>
              </div>
              
              <p className="text-xs md:text-[13px]/relaxed text-slate-300 font-sans tracking-wide">
                {portfolioData.summary}
              </p>
            </div>

            {/* 2. CHATBOT PANE: INTERACTIVE RECRUITER AI BOT */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col h-[400px] justify-between relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 font-mono tracking-wider uppercase">Shrutee's AI Agent</h3>
                    <p className="text-[10px] text-slate-400 font-mono">Career Expert Autonomous Node</p>
                  </div>
                </div>
                <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
              </div>

              {/* Chat Feed */}
              <div id="career-bot-chat-feed" className="flex-1 overflow-y-auto my-3 flex flex-col gap-3 pr-1 text-xs font-mono max-h-[230px] scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`max-w-[85%] rounded-2xl p-3 text-[11px]/relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-200 self-end rounded-tr-none'
                        : 'bg-slate-950/60 border border-white/5 text-slate-300 self-start rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Selector */}
              <div className="flex flex-wrap gap-1.5 pb-2 pt-1 border-t border-white/5">
                {CHAT_QUICK_REPLIES.map((rep) => (
                  <button
                    key={rep.value}
                    onClick={() => handleBotReply(rep.value)}
                    className="text-[9px] px-2.5 py-1 bg-white/5 border border-white/10 hover:bg-indigo-500/10 hover:border-indigo-400/30 rounded-full font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    {rep.label}
                  </button>
                ))}
              </div>

              {/* Freeform Typing Area */}
              <form onSubmit={submitFreeformChat} className="flex gap-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask agent: 'Tell me about projects'..."
                  className="flex-1 bg-slate-950/70 border border-white/10 rounded-xl px-3 py-1.5 text-[11px] font-mono focus:outline-none focus:border-indigo-500 transition-all text-slate-200"
                />
                <button
                  type="submit"
                  className="bg-indigo-600/80 hover:bg-indigo-500 border border-indigo-400/20 p-2 rounded-xl text-white hover:shadow-lg hover:shadow-indigo-500/10 transition-all flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
            
          </div>

          {/* RIGHT 8 GRID PANELS: MAIN STAGE WITH 3D NETWORK AND TABBED PROJECT SANDBOXES */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            
            {/* 3D SKILLS SPACE NODE CANVAS */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-1.5 shadow-2xl relative overflow-hidden">
              <ThreeDBackground />
            </div>

            {/* TABBED INTERACTIVE PROJECT HUB */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-5 relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                    Simulated Project Sandboxes
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">Click any project sub-tab to run sandbox live inside portfolio!</p>
                </div>

                {/* Sub projects tabs selection */}
                <div className="flex flex-wrap gap-1 bg-slate-950/60 p-1 rounded-xl border border-white/5">
                  {[
                    { id: 'job-agent', icon: Cpu, label: "AI Job Agent" },
                    { id: 'ecommerce', icon: LineChart, label: "E-Commerce portal" },
                    { id: 'heart-disease', icon: HeartPulse, label: "Heart Predictor" },
                    { id: 'algoviz', icon: Code, label: "AlgoViz" }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedProjectTab(tab.id)}
                        className={`flex items-center gap-1.5 text-[10px] md:text-[11px] font-mono px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          selectedProjectTab === tab.id
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-3 h-3 resize-none shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PROJECT CONTENT VIEWPORT */}
              <div className="min-h-[300px] flex flex-col justify-between">
                
                {/* CASE 1: AI JOB AGENT SIMULATOR */}
                {selectedProjectTab === 'job-agent' && (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <div className="flex flex-col md:flex-row justify-between gap-3 text-xs">
                      <div className="max-w-lg">
                        <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 font-mono">
                          AI Fresher Job Agent &bull; <span className="text-indigo-400">2026 Project</span>
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                          A production workflow designed to automate scanning of major job sites. This simulator displays how her n8n core flow matches developer criteria & pulls analytics via LLMs.
                        </p>
                      </div>
                      <a
                        href="https://github.com/shrutee2002/AI-Fresher-Job-Agent"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono h-fit self-start shrink-0 flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                      >
                        <span>View Source Code</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-2">
                      <div className="md:col-span-5 bg-slate-950/80 rounded-2xl border border-white/5 p-4 flex flex-col gap-3 font-mono">
                        <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Trigger Scrape Workflow</span>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] text-slate-400">Search Keywords Query</label>
                          <input
                            type="text"
                            value={jobSearchQuery}
                            onChange={(e) => setJobSearchQuery(e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-indigo-500 font-mono transition-all"
                          />
                        </div>
                        <button
                          onClick={triggerJobAgentScraping}
                          disabled={isScraping}
                          className="w-full bg-indigo-600/80 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg py-2 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                        >
                          {isScraping ? (
                            <>
                              <Activity className="w-3 h-3 animate-spin" />
                              Connecting Gemini & API feeds...
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3" />
                              Execute n8n Flow Trigger
                            </>
                          )}
                        </button>
                      </div>

                      <div className="md:col-span-7 bg-slate-950/50 rounded-2xl border border-white/5 p-4 flex flex-col gap-2 font-mono h-[180px] overflow-y-auto scrollbar-thin">
                        <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Agent JSON Schema output</span>
                        {isScraping ? (
                          <div className="flex-1 flex flex-col items-center justify-center gap-1.5 text-slate-500 text-center text-xs py-6">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                            <span>Parsing post payload streams...</span>
                          </div>
                        ) : scrapedJobs.length > 0 ? (
                          <div className="flex flex-col gap-2">
                            {scrapedJobs.map((job, i) => (
                              <div key={i} className="bg-slate-900/60 p-2.5 rounded-lg border border-white/5 flex flex-col gap-1 text-[10px]">
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-100 font-bold">{job.title}</span>
                                  <span className="bg-emerald-950 text-emerald-300 font-bold px-1.5 rounded py-0.5 border border-emerald-900/40">{job.match} Skill Match</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                  <span>{job.company}</span>
                                  <span>&bull;</span>
                                  <span>{job.loc}</span>
                                </div>
                                <div className="text-[9px] text-indigo-300 font-bold mt-1">Tools extracted: {job.skills}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-center text-slate-600 text-xs py-8">
                            <span>Execute automation flow above to inspect database output</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* CASE 2: E-COMMERCE PORTAL SIMULATOR */}
                {selectedProjectTab === 'ecommerce' && (
                  <div className="animate-fadeIn w-full">
                    <div className="flex flex-col md:flex-row justify-between gap-3 text-xs mb-3">
                      <div>
                        <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 font-mono">
                          E-Commerce Analytical MySQL Portal &bull; <span className="text-sky-400">2026 Dashboard</span>
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                          An end-to-end analytical framework built on MySQL data layers with custom metric card layouts. Run live relational SQL directives below.
                        </p>
                      </div>
                      <a
                        href="https://github.com/shrutee2002/E-commerce-Analytics-Dashboard"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono h-fit self-start shrink-0 flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                      >
                        <span>View Source Code</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <DashboardSimulation />
                  </div>
                )}

                {/* CASE 3: HEART DISEASE RECT PREDICTOR */}
                {selectedProjectTab === 'heart-disease' && (
                  <div className="flex flex-col gap-4 animate-fadeIn font-mono">
                    <div className="flex flex-col md:flex-row justify-between gap-3 text-xs">
                      <div>
                        <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 font-mono">
                          Heart Disease Classification Predictor &bull; <span className="text-rose-400">ML Project</span>
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                          A cross-val performance diagnostics classification engine evaluating patient clinical data. Use input fields below to query clinical classification score.
                        </p>
                      </div>
                      <a
                        href="https://github.com/shrutee2002/Heart_Disease_Prediction_System"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono h-fit self-start shrink-0 flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                      >
                        <span>View Source Code</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-2 text-xs">
                      {/* Clinical Slider inputs */}
                      <div className="md:col-span-7 bg-slate-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-3 font-mono">
                        <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Patient Diagnostic Parameters</span>
                        
                        <div className="grid grid-cols-2 gap-3.5">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400">Systolic Blood Pressure ({patientBp} mmHg)</span>
                            <input
                              type="range" min="90" max="190" value={patientBp}
                              onChange={(e) => setPatientBp(Number(e.target.value))}
                              className="accent-indigo-500 cursor-pointer h-1.5 w-full rounded-lg bg-slate-900"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400">Serum Cholesteral ({patientChol} mg/dl)</span>
                            <input
                              type="range" min="150" max="380" value={patientChol}
                              onChange={(e) => setPatientChol(Number(e.target.value))}
                              className="accent-indigo-500 cursor-pointer h-1.5 w-full rounded-lg bg-slate-900"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400">Age ({patientAge} Years)</span>
                            <input
                              type="range" min="20" max="85" value={patientAge}
                              onChange={(e) => setPatientAge(Number(e.target.value))}
                              className="accent-indigo-500 cursor-pointer h-1.5 w-full rounded-lg bg-slate-900"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400">Max Heart Rate ({patientHeartRate} bpm)</span>
                            <input
                              type="range" min="90" max="202" value={patientHeartRate}
                              onChange={(e) => setPatientHeartRate(Number(e.target.value))}
                              className="accent-indigo-500 cursor-pointer h-1.5 w-full rounded-lg bg-slate-900"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400">Patient Biological Sex:</span>
                            <button
                              onClick={() => setPatientGender('1')}
                              className={`text-[10px] px-2 py-0.5 rounded ${patientGender === '1' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 bg-slate-900 border border-transparent'}`}
                            >
                              Male
                            </button>
                            <button
                              onClick={() => setPatientGender('0')}
                              className={`text-[10px] px-2 py-0.5 rounded ${patientGender === '0' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 bg-slate-900 border border-transparent'}`}
                            >
                              Female
                            </button>
                          </div>

                          <button
                            onClick={calculateHeartDiseaseRisk}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-fit px-4 py-1.5 rounded-lg border border-indigo-400/20 text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Activity className="w-3.5 h-3.5" />
                            <span>Evaluate Risk</span>
                          </button>
                        </div>
                      </div>

                      {/* Display diagnostics output gauges */}
                      <div className="md:col-span-5 bg-slate-950/50 p-4 rounded-xl border border-white/5 flex flex-col justify-between max-h-[220px]">
                        <span className="text-[9px] text-rose-400 font-bold uppercase tracking-wider">Classification Output Dashboard</span>
                        {predictedRisk !== null ? (
                          <div className="flex flex-col items-center justify-center py-2">
                            <div className="relative flex items-center justify-center">
                              {/* Radial progress circle */}
                              <svg className="w-20 h-20 transform -rotate-90">
                                <circle cx="40" cy="40" r="34" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="6" fill="transparent" />
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="34"
                                  stroke={predictedRisk > 45 ? '#f43f5e' : '#10b981'}
                                  strokeWidth="6"
                                  fill="transparent"
                                  strokeDasharray="213.6"
                                  strokeDashoffset={213.6 - (213.6 * predictedRisk) / 100}
                                  className="transition-all duration-700 ease-out"
                                />
                              </svg>
                              <span className={`absolute text-base font-bold ${predictedRisk > 45 ? 'text-rose-400' : 'text-emerald-400'}`}>{predictedRisk}%</span>
                            </div>
                            <span className="text-slate-300 text-[11px] mt-2 text-center font-bold font-mono">
                              Risk Level: {predictedRisk > 45 ? 'HIGH CLINICAL ATTENTION' : 'REGULAR RISK (STABLE)'}
                            </span>
                            <span className="text-[9px] text-slate-500 text-center mt-1 italic leading-tight">
                              Model cross-val F1 Score: 87.2%. Predictive assist only; consult a physician.
                            </span>
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col justify-center items-center h-full text-slate-600 text-center text-xs py-6">
                            <HeartPulse className="w-8 h-8 text-slate-700 mb-1" />
                            <span>Enter patient factors to evaluate predictive parameters</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* CASE 4: ALGOVIZ SORTER */}
                {selectedProjectTab === 'algoviz' && (
                  <div className="flex flex-col gap-4 animate-fadeIn font-mono">
                    <div className="flex flex-col md:flex-row justify-between gap-3 text-xs">
                      <div>
                        <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 font-mono">
                          AlgoViz – Sorting Algorithm Visualizer &bull; <span className="text-amber-400">Interactive</span>
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                          Step-by-step executions displaying array state during recursive loops. Drag or randomize variables on the card, then run the visualizer live!
                        </p>
                      </div>
                      <a
                        href="https://github.com/shrutee2002/AlgoViz-Algorithm_Visualizer"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono h-fit self-start shrink-0 flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                      >
                        <span>View Source Code</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-2">
                      {/* Active Visualizer column chart */}
                      <div className="md:col-span-7 bg-slate-950/80 p-4 rounded-xl border border-white/5 flex flex-col justify-between gap-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider text-left">Internal Data Vector</span>
                          <div className="flex gap-2">
                            <button
                              onClick={resetAlgoArray}
                              disabled={isSorting}
                              className="text-[9px] bg-slate-900 border border-white/10 hover:border-slate-700 px-2.5 py-1 rounded text-slate-300 flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Shuffle</span>
                            </button>
                            <button
                              onClick={triggerBubbleSort}
                              disabled={isSorting}
                              className="text-[9px] bg-indigo-600/90 border border-indigo-400/20 hover:bg-indigo-500 px-2.5 py-1 rounded font-bold text-white flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <Play className="w-3 h-3" />
                              <span>Bubble Sort</span>
                            </button>
                          </div>
                        </div>

                        {/* Chart bar vector viewport */}
                        <div className="flex items-end justify-between h-[110px] bg-slate-900/50 p-3 rounded-lg border border-white/5">
                          {algoArray.map((val, idx) => (
                            <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end relative group">
                              <span className="text-[8px] text-slate-400 mb-1">{val}</span>
                              <div
                                style={{ height: `${val}%` }}
                                className="w-5 bg-gradient-to-t from-indigo-950/40 via-indigo-500 to-sky-400 rounded-t-sm w-full max-w-[20px] transition-all duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sorting iterations console logs */}
                      <div className="md:col-span-5 bg-slate-950/50 p-4 rounded-xl border border-white/5 flex flex-col gap-2 h-[178px] overflow-y-auto scrollbar-thin">
                        <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider">Visualizer Iteration logs</span>
                        <div className="flex flex-col gap-1 text-[9px] font-mono text-slate-400">
                          {algoSteps.length > 0 ? (
                            algoSteps.slice(-5).map((step, idx) => (
                              <div key={idx} className="border-l border-indigo-500/40 pl-2 leading-relaxed text-slate-300 py-0.5">
                                &bull; {step}
                              </div>
                            ))
                          ) : (
                            <span className="text-slate-600 text-center py-8">Click Bubble Sort above to inspect array swaps</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
              
            </div>

          </div>

        </section>

        {/* ================= BOTTOM METRICS: EDUCATION & CERTIFICATIONS ================= */}
        <footer className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
          
          {/* LIG COL: Education timeline */}
          <div className="lg:col-span-5 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="text-indigo-400 w-5 h-5" />
              <h3 className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-widest">Academic Credentials</h3>
            </div>

            <div className="flex flex-col gap-4">
              {portfolioData.educations.map((edu, idx) => (
                <div key={idx} className="relative pl-5 border-l border-white/10 hover:border-indigo-500/40 transition-all flex flex-col gap-0.5">
                  <div className="absolute left-[-4px] top-[4px] w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                  <span className="text-xs text-slate-400 font-mono">{edu.period}</span>
                  <h4 className="text-sm font-bold text-slate-100">{edu.degree}</h4>
                  <span className="text-xs text-indigo-300 font-mono">{edu.institution}</span>
                  {edu.specialization && (
                    <span className="text-[11px] text-slate-400 mt-0.5">&bull; Spec: {edu.specialization}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COL: Certifications badges */}
          <div className="lg:col-span-7 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <Award className="text-emerald-400 w-5 h-5" />
              <h3 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-widest">Industry Certifications & Badges</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolioData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 hover:bg-slate-900 border border-white/5 hover:border-emerald-500/20 rounded-xl p-3 flex items-center gap-3 shadow transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-mono leading-tight">{cert}</span>
                </div>
              ))}
            </div>
          </div>

        </footer>

      </div>
    </div>
  );
}
