/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Search, 
  X, 
  Maximize2, 
  Menu, 
  ChevronRight,
  LineChart,
  Brain,
  Shapes,
  Calculator,
  Compass
} from "lucide-react";
import { GAMES } from "./data/games.js";

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Units");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const categories = ["All Units", "Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry"];

  const categoryMap = {
    "Algebra": "Action",
    "Calculus": "Driving",
    "Geometry": "Puzzle",
    "Statistics": "Sports",
    "Trigonometry": "Casual"
  };

  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const mappedCategory = categoryMap[activeCategory];
      const matchesCategory = activeCategory === "All Units" || game.category === mappedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedGame(null);
      // Panic Key: P
      if (e.key.toLowerCase() === "p") {
        window.location.href = "https://classroom.google.com";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const launchStealthMode = (game) => {
    const win = window.open();
    if (!win) {
      alert("Please allow popups for stealth mode to work!");
      return;
    }
    win.document.title = "Google Mathematics Framework";
    const iframe = win.document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.inset = "0";
    iframe.src = game.url;
    win.document.body.appendChild(iframe);
    win.document.body.style.margin = "0";
    win.document.body.style.padding = "0";
    win.document.body.style.overflow = "hidden";
  };

  const cloakTab = () => {
    document.title = "Google Classroom - Math";
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://www.google.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  const GAMES_METADATA = {
    "slope": { title: "Non-Linear Velocity Analysis", unit: "Calculus II" },
    "2048": { title: "Exponential Summation Matrix", unit: "Discrete Math" },
    "tanuki-sunset": { title: "Angular Momentum Simulation", unit: "Physics III" },
    "cookie-clicker": { title: "Incremental Resource Allocation", unit: "Economics" },
    "retro-bowl": { title: "Strategic Probability Engine", unit: "Statistics" },
    "subway-surfers": { title: "Procedural Obstacle Detection", unit: "Computer Science" },
    "basket-random": { title: "Stochastic Kinematics Lab", unit: "Physics I" }
  };

  const getDisplayTitle = (game) => GAMES_METADATA[game.id]?.title || game.title;
  const getDisplayUnit = (game) => GAMES_METADATA[game.id]?.unit || game.category;

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Algebra": return <Calculator className="w-4 h-4" />;
      case "Calculus": return <LineChart className="w-4 h-4" />;
      case "Geometry": return <Shapes className="w-4 h-4" />;
      case "Statistics": return <Brain className="w-4 h-4" />;
      case "Trigonometry": return <Compass className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex text-slate-800 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="fixed inset-y-0 left-0 bg-white border-r border-slate-200 z-40 hidden md:flex flex-col overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gaming-primary flex items-center justify-center text-white shadow-lg shadow-gaming-primary/20">
            <BookOpen size={20} />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg tracking-tight text-slate-800"
            >
              Academic<span className="text-gaming-primary">Portal</span>
            </motion.span>
          )}
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeCategory === cat 
                  ? "bg-gaming-primary text-white shadow-md shadow-gaming-primary/10" 
                  : "hover:bg-slate-50 text-slate-500 hover:text-slate-800"
              }`}
            >
              <span className="shrink-0">{getCategoryIcon(cat)}</span>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-semibold text-sm"
                >
                  {cat}
                </motion.span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center px-4 bg-slate-50 py-2 rounded-lg">
            Institutional Access v4.2
          </div>
        </div>

        <div className="p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className={`text-slate-400 transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 overflow-y-auto bg-[#fafbfc] ${
          isSidebarOpen ? "md:ml-[260px]" : "md:ml-[80px]"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-8 py-5 flex items-center justify-between border-b border-slate-200">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search resource database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gaming-primary/20 focus:border-gaming-primary transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center gap-4 ml-8">
            <button 
              onClick={cloakTab}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-bold text-slate-500 hover:border-slate-400 transition-all uppercase"
            >
              System Override
            </button>
            <button 
              onClick={() => window.location.href = "https://classroom.google.com"}
              className="px-4 py-2 rounded-xl bg-white border border-red-200 text-red-500/80 text-[10px] font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all uppercase"
            >
              Emergency Exit [P]
            </button>
            <div className="hidden sm:flex items-center gap-3 ml-2 border-l border-slate-200 pl-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <Menu size={20} />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto space-y-12">
          <section>
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {activeCategory === "All Units" ? "Interactive Module Repository" : `Curriculum: ${activeCategory}`}
              </h1>
              <p className="text-slate-500 mt-2 max-w-2xl text-lg font-light leading-relaxed">
                Explore our collection of verified mathematical simulations and computational frameworks designed for advanced research.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => setSelectedGame(game)}
                    className="group relative cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 opacity-40 group-hover:opacity-100">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    
                    <div className="p-6 space-y-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-gaming-primary tracking-widest uppercase">
                          {getDisplayUnit(game)}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                      </div>
                      <h3 className="font-bold text-slate-800 group-hover:text-gaming-primary transition-colors leading-snug">
                        {getDisplayTitle(game)}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
                        Technical verification required for full module access. Optimized for Research Tier 1.
                      </p>
                      
                      <div className="pt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-wider">
                        <span>Module ID: {game.id.toUpperCase()}</span>
                        <span className="group-hover:translate-x-1 transition-transform">Run Lab →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>

      {/* Game Viewer Overlay */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex flex-col p-4 md:p-8"
          >
            <div className="bg-white rounded-t-2xl p-5 border-b border-slate-200 flex items-center justify-between max-w-7xl mx-auto w-full shadow-2xl">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-gaming-primary flex items-center justify-center text-white shadow-lg shadow-gaming-primary/20">
                  <Calculator size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-none">{getDisplayTitle(selectedGame)}</h2>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Research Environment: {getDisplayUnit(selectedGame)}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => launchStealthMode(selectedGame)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-gaming-primary hover:text-white hover:border-gaming-primary transition-all font-bold text-xs shadow-sm hover:shadow-gaming-primary/20"
                >
                  <Maximize2 size={16} />
                  ENHANCED SIMULATION
                </button>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-100 transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto w-full bg-white border-x border-slate-200 shadow-2xl overflow-hidden relative group">
              <iframe 
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gaming-primary/50 via-transparent to-gaming-primary/50" />
            </div>
            
            <div className="bg-white rounded-b-2xl border-t border-slate-200 p-4 max-w-7xl mx-auto w-full flex justify-between items-center shadow-2xl">
              <div className="flex items-center gap-6">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Session Key: <span className="text-slate-600 font-mono">CALC-992-TX</span></p>
                <div className="h-4 w-[1px] bg-slate-200" />
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Network Status: <span className="text-green-600">STABLE</span></p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 italic">
                <span className="text-gaming-primary not-italic">COMMAND:</span> Press [P] to Panic / ESC to Terminate Session
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
