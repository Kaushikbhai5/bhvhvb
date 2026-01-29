
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { 
  motion as m, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useInView 
} from 'framer-motion';
import { 
  Menu, 
  X, 
  Play, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  Users, 
  Target, 
  Shield, 
  ExternalLink, 
  ImageIcon, 
  Mail, 
  Send, 
  Eye, 
  Download, 
  ArrowUp,
  Youtube
} from 'lucide-react';
import { 
  HERO_CONTENT, 
  ABOUT_TEXTS, 
  SKILLS, 
  EXPERIENCES, 
  FEATURED_WORK, 
  PROOF_OF_WORK, 
  CONTACT_LINKS 
} from './constants';
import { Typewriter } from './components/Typewriter';
import { Card } from './components/Card';
import { AIAssistant } from './components/AIAssistant';

// Memoized Background to prevent expensive re-paints
const Background = React.memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0F1115] fixed-gpu">
    <m.div 
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [0.1, 0.15, 0.1]
      }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-900 blur-[100px]" 
      style={{ willChange: 'transform, opacity' }}
    />
    <m.div 
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.05, 0.08, 0.05]
      }}
      transition={{ 
        duration: 15, 
        repeat: Infinity, 
        ease: "linear",
        delay: 3
      }}
      className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600 blur-[100px]" 
      style={{ willChange: 'transform, opacity' }}
    />
    <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}
    />
  </div>
));

const Heading = ({ children, align = "text-center" }: { children: React.ReactNode, align?: string }) => (
  <m.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`mb-12 md:mb-16 ${align}`}
  >
    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent inline-block">
      {children}
    </h2>
    <div className={`h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-4 ${align === "text-center" ? "mx-auto" : ""}`} />
  </m.div>
);

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [playingVideos, setPlayingVideos] = useState<Record<number, boolean>>({});
  const [activeProof, setActiveProof] = useState<any>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  const [startAboutTypewriter, setStartAboutTypewriter] = useState(false);
  const [startHeroTypewriter, setStartHeroTypewriter] = useState(false);
  
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 40, restDelta: 0.001 });

  useEffect(() => { 
    const timer = setTimeout(() => setStartHeroTypewriter(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { 
    if (isAboutInView) setStartAboutTypewriter(true); 
  }, [isAboutInView]);

  const toggleVideo = useCallback((index: number) => {
    setPlayingVideos(prev => ({ ...prev, [index]: true }));
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-300 selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden antialiased">
      <Background />
      <AIAssistant />

      <style>{`
        html { scroll-behavior: smooth; }
        .fixed-gpu { transform: translateZ(0); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #312E81; border-radius: 4px; }
      `}</style>
      
      {/* Optimized Progress Bar */}
      <m.div 
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
        style={{ scaleX, willChange: 'transform' }} 
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0F1115]/60 backdrop-blur-md border-b border-white/5 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-white tracking-tight flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:bg-indigo-500 transition-colors">S</span>
            Samad.
          </a>
          <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold">
            {["About", "Skills", "Experience", "Work", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-white transition-colors">{item}</a>
            ))}
            <button onClick={() => setIsContactOpen(true)} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all text-[11px] font-bold uppercase tracking-wider shadow-md hover:-translate-y-0.5 active:scale-95">Hire Me</button>
          </div>
          <button className="md:hidden text-slate-400 p-2" onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Toggle Menu">{isNavOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>

        <AnimatePresence>
          {isNavOpen && (
            <m.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }} 
              className="md:hidden bg-[#0F1115]/95 border-b border-white/10 p-6 flex flex-col gap-6"
            >
              {["About", "Skills", "Experience", "Work", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsNavOpen(false)} className="text-lg font-medium text-slate-300 hover:text-white">{item}</a>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative z-10 pt-32 pb-20 px-6 min-h-[95vh] flex flex-col justify-center items-center text-center">
        <m.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, ease: "easeOut" }} 
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-bold tracking-wider mb-8 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            {HERO_CONTENT.title}
          </div>
          
          <div className="mb-10 min-h-[140px] md:min-h-[220px]">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-2">
              <Typewriter text="Building Active" speed={40} shouldStart={startHeroTypewriter} />
            </h1>
            <div className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 tracking-tighter">
              <Typewriter text="Web3 Communities." startDelay={1000} speed={40} shouldStart={startHeroTypewriter} />
            </div>
          </div>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">{HERO_CONTENT.subtext}</p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <button onClick={() => setIsResumeOpen(true)} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold transition-all border border-white/10 backdrop-blur-sm text-sm">View Resume</button>
            <button onClick={() => setIsContactOpen(true)} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all shadow-xl hover:-translate-y-1 text-sm">Let's Connect</button>
          </div>
        </m.div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 relative z-10" ref={aboutRef}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <Heading align="text-left">About Me</Heading>
            <div className="space-y-6 text-lg leading-relaxed text-slate-400 font-light min-h-[200px]">
              {ABOUT_TEXTS.map((text, i) => (
                <Typewriter 
                  key={i} 
                  text={text} 
                  startDelay={i * 1200} 
                  shouldStart={startAboutTypewriter} 
                  speed={20}
                  className={i === 2 ? "text-slate-200 font-normal border-l-4 border-indigo-500 pl-6 block py-2" : "block"} 
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Experience", value: "4+ Years", icon: Award },
              { label: "Communities", value: "700k+", icon: Users },
              { label: "Projects", value: "13+", icon: Target },
              { label: "Focus", value: "Retention", icon: Shield },
            ].map((stat, i) => (
              <Card key={i} className="flex flex-col items-center text-center justify-center aspect-square" delay={i * 0.05}>
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-indigo-400 mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Heading>My Expertise</Heading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, i) => (
              <Card key={i} delay={i * 0.05}>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-white/5">
                  <skill.icon className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-6 tracking-tight">{skill.category}</h3>
                <ul className="space-y-3.5">
                  {skill.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-400 font-medium">
                      <CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Heading>Experience</Heading>
          <div className="space-y-6">
            {EXPERIENCES.map((job, i) => (
              <m.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-40px" }} 
                transition={{ delay: i * 0.05, duration: 0.4 }} 
                className="flex flex-col md:flex-row gap-6 md:gap-10 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="md:w-1/3">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors leading-none">{job.company}</h3>
                  <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">{job.role}</div>
                </div>
                <div className="md:w-2/3 md:border-l border-white/10 md:pl-10">
                  <ul className="list-disc pl-4 space-y-3 text-slate-400 font-light text-sm md:text-base leading-relaxed">
                    {job.points.map((point, j) => <li key={j}>{point}</li>)}
                  </ul>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Heading>Featured Work</Heading>
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {FEATURED_WORK.map((work, i) => (
              <m.div 
                key={i} 
                whileHover={{ y: -6 }} 
                className="h-full"
                style={{ willChange: 'transform' }}
              >
                {work.type === 'video' ? (
                  <div className="h-full rounded-3xl border border-white/10 bg-[#16181D] overflow-hidden flex flex-col shadow-2xl">
                    <div className="relative aspect-video bg-black">
                      {playingVideos[i] ? (
                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${work.videoId}?autoplay=1`} title={work.title} frameBorder="0" allowFullScreen className="absolute inset-0"></iframe>
                      ) : (
                        <button onClick={() => toggleVideo(i)} className="absolute inset-0 w-full h-full bg-cover bg-center group" style={{ backgroundImage: `url(https://img.youtube.com/vi/${work.videoId}/hqdefault.jpg)` }}>
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><Play className="fill-white text-white ml-1" size={28} /></div>
                        </button>
                      )}
                    </div>
                    <div className="p-8 md:p-12 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-4 text-red-500 text-[10px] font-black uppercase tracking-widest"><Youtube size={14} /> Video Portfolio</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight tracking-tight">{work.title}</h3>
                      <a href={work.url} target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-400 hover:text-white flex items-center gap-2 group mt-auto transition-colors">View on YouTube <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></a>
                    </div>
                  </div>
                ) : (
                  <a href={work.url} target="_blank" rel="noreferrer" className="group block h-full">
                    <div className="h-full rounded-3xl border border-white/10 bg-[#16181D] overflow-hidden flex flex-col hover:border-indigo-500/40 transition-all duration-500 shadow-2xl">
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <img src={work.image} alt={work.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#16181D] via-transparent to-transparent" />
                      </div>
                      <div className="p-8 md:p-12 flex-1 relative -mt-20">
                        <div className="bg-[#16181D]/90 backdrop-blur w-fit px-3 py-1 rounded-lg border border-white/10 text-indigo-400 text-[10px] font-black uppercase mb-4 tracking-widest">{work.label}</div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-indigo-300 transition-colors leading-tight tracking-tight">{work.title}</h3>
                        <div className="mt-auto flex items-center gap-2 text-sm text-slate-500 group-hover:text-white transition-colors font-bold">{work.action} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></div>
                      </div>
                    </div>
                  </a>
                )}
              </m.div>
            ))}
          </div>

          <Heading>Proof of Work</Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {PROOF_OF_WORK.map((proof, i) => (
              <Card key={i} delay={i * 0.05} onClick={proof.isGallery ? () => setActiveProof(proof) : undefined}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5"><proof.icon className="text-indigo-400" size={20} /></div>
                  <div className="font-bold text-white text-sm md:text-base mb-1 tracking-tight">{proof.title}</div>
                  <div className="text-[10px] md:text-xs text-slate-500 mb-5 font-medium">{proof.desc}</div>
                  {proof.isGallery ? (
                    <div className="text-[9px] uppercase tracking-widest text-indigo-400 font-black flex items-center gap-1 group-hover:text-indigo-300 transition-colors"><ImageIcon size={12} /> Gallery</div>
                  ) : proof.url ? (
                    <a href={proof.url} target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest text-indigo-400 font-black flex items-center gap-1 group-hover:text-indigo-300 transition-colors">External <ExternalLink size={10} /></a>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-indigo-900/10 to-[#16181D]/50 p-12 md:p-24 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter">Get in Touch</h2>
          <p className="text-lg md:text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">Ready to scale your community with a results-driven manager? Reach out through any of these channels.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {CONTACT_LINKS.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#0F1115] border border-white/5 text-slate-300 hover:text-white hover:border-white/20 hover:-translate-y-1 transition-all duration-300 shadow-lg group">
                <link.icon size={18} className={`${link.color}`} />
                <span className="font-black text-[10px] uppercase tracking-widest">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center text-slate-600 text-[11px] border-t border-white/5 bg-[#0F1115] relative z-10">
        <div className="flex flex-col items-center gap-6">
          <p className="font-medium tracking-wide italic">"Communities are built on trust, not just algorithms."</p>
          <p>© {new Date().getFullYear()} Samad — Web3 Community Expert</p>
          <button onClick={scrollToTop} className="flex items-center gap-2 text-indigo-500 hover:text-indigo-400 transition-colors font-black uppercase tracking-widest">To Top <ArrowUp size={12} /></button>
        </div>
      </footer>

      {/* Modals with optimized transitions */}
      <AnimatePresence>
        {activeProof && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProof(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <m.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.98, y: 10 }} 
              className="relative w-full max-w-5xl max-h-[85vh] bg-[#0F1115] border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-y-auto custom-scrollbar shadow-3xl"
            >
              <div className="flex justify-between items-start mb-10 sticky top-0 bg-[#0F1115]/80 backdrop-blur py-2 z-10">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{activeProof.title}</h3>
                  <p className="text-slate-400 font-medium">{activeProof.desc}</p>
                </div>
                <button onClick={() => setActiveProof(null)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"><X size={20} /></button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {activeProof.images?.map((img: string, idx: number) => (
                  <div key={idx} className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-black/40 aspect-auto">
                    <img src={img} alt="Screenshot" loading="lazy" className="w-full h-auto block" />
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isContactOpen || isResumeOpen) && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsContactOpen(false); setIsResumeOpen(false); }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <m.div 
              initial={{ opacity: 0, scale: 1.02, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 1.02, y: 10 }} 
              className="relative w-full max-w-[340px] bg-[#16181D] border border-white/10 rounded-[2.5rem] p-10 shadow-3xl"
            >
              <button onClick={() => { setIsContactOpen(false); setIsResumeOpen(false); }} className="absolute top-6 right-6 text-slate-500 hover:text-white p-1"><X size={18} /></button>
              
              {isContactOpen ? (
                <>
                  <h3 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">Hire Me</h3>
                  <p className="text-slate-500 text-center mb-10 text-xs font-semibold tracking-wide uppercase">Let's build something great</p>
                  <div className="space-y-4">
                    <a href="mailto:samadsaifi304@gmail.com" className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-indigo-600/10 hover:border-indigo-500/20 transition-all group">
                      <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400"><Mail size={20} /></div>
                      <div className="overflow-hidden"><div className="font-bold text-white text-sm">Direct Email</div><div className="text-[10px] text-slate-500 truncate font-mono">samadsaifi304@gmail.com</div></div>
                    </a>
                    <a href="https://t.me/samadsaifi55" target="_blank" className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-sky-600/10 hover:border-sky-500/20 transition-all group">
                      <div className="p-3 bg-sky-500/20 rounded-xl text-sky-400"><Send size={20} /></div>
                      <div><div className="font-bold text-white text-sm">Telegram</div><div className="text-[10px] text-slate-500 font-mono">@samadsaifi55</div></div>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">Resume</h3>
                  <p className="text-slate-500 text-center mb-10 text-xs font-semibold tracking-wide uppercase">Credentials & Experience</p>
                  <div className="space-y-4">
                    <a href="#" className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-indigo-600/10 hover:border-indigo-500/20 transition-all group">
                      <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400"><Eye size={20} /></div>
                      <div><div className="font-bold text-white text-sm">Preview Resume</div><div className="text-[10px] text-slate-500">View as PDF online</div></div>
                    </a>
                    <a href="#" className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-purple-600/10 hover:border-purple-500/20 transition-all group">
                      <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400"><Download size={20} /></div>
                      <div><div className="font-bold text-white text-sm">Download</div><div className="text-[10px] text-slate-500">Save local copy</div></div>
                    </a>
                  </div>
                </>
              )}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
