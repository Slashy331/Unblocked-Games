/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Gamepad2, 
  Search, 
  X, 
  Maximize2, 
  Menu, 
  ChevronRight,
  TrendingUp,
  Puzzle,
  Sword,
  Trophy,
  Car
} from "lucide-react";
import { GAMES } from "./data/games.js";

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const categories = ["All", "Action", "Puzzle", "Driving", "Sports", "Casual"];

  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedGame(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Action": return <Sword className="w-4 h-4" />;
      case "Puzzle": return <Puzzle className="w-4 h-4" />;
      case "Driving": return <Car className="w-4 h-4" />;
      case "Sports": return <Trophy className="w-4 h-4" />;
      case "Casual": return <Gamepad2 className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex text-gray-100">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="fixed inset-y-0 left-0 bg-gaming-card border-r border-gaming-border z-40 hidden md:flex flex-col overflow-hidden"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gaming-primary flex items-center justify-center neon-glow">
            <Gamepad2 className="text-white" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tight"
            >
              NEXUS
            </motion.span>
          )}
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeCategory === cat 
                  ? "bg-gaming-primary/20 text-gaming-primary border border-gaming-primary/30" 
                  : "hover:bg-gaming-border text-gray-400 hover:text-white"
              }`}
            >
              <span className="shrink-0">{getCategoryIcon(cat)}</span>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {cat}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-3 rounded-xl border border-gaming-border hover:bg-gaming-border transition-colors"
          >
            <ChevronRight className={`transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 overflow-y-auto ${
          isSidebarOpen ? "md:ml-[260px]" : "md:ml-[80px]"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-gaming-bg/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gaming-border">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gaming-card border border-gaming-border rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gaming-primary focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            <button className="md:hidden p-2 rounded-lg bg-gaming-card border border-gaming-border">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">Player One</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Lv. 42</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gaming-primary to-gaming-secondary border-2 border-gaming-border" />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="p-6 md:p-10 space-y-10">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold tracking-tight">
                {activeCategory === "All" ? "Hot New Games" : `${activeCategory} Games`}
              </h1>
              <div className="flex items-center gap-2 text-gaming-primary font-semibold text-sm cursor-pointer hover:underline">
                View all <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedGame(game)}
                    className="group relative cursor-pointer glass-card overflow-hidden transition-all hover:scale-[1.02] hover:neon-glow"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-gaming-primary/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                          {game.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-lg group-hover:text-gaming-primary transition-colors leading-tight">
                        {game.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                        {game.description}
                      </p>
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col p-4 md:p-10"
          >
            <div className="flex items-center justify-between mb-4 max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gaming-primary flex items-center justify-center">
                  <Gamepad2 />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedGame.title}</h2>
                  <p className="text-sm text-gray-400">{selectedGame.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.open(selectedGame.url, "_blank")}
                  className="p-3 rounded-xl bg-gaming-card border border-gaming-border hover:bg-gaming-border transition-colors"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-3 rounded-xl bg-gaming-accent text-white hover:bg-gaming-accent/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto w-full glass-card overflow-hidden relative shadow-2xl">
              <iframe 
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            
            <div className="mt-4 max-w-7xl mx-auto w-full flex justify-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest bg-gaming-card px-4 py-2 rounded-full border border-gaming-border">
                Press ESC to exit focus mode
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
