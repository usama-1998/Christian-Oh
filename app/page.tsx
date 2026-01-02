'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BarChart2, Building2, ChevronDown, Instagram, Linkedin, Play, TrendingUp, Youtube, Menu, X, Mail, Phone, ArrowUpRight, Send, Sun, Moon } from 'lucide-react';
import Image from 'next/image';


// --- Custom Hook for Scroll Animations ---
const useOnScreen = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref, options]);

    return [ref, isVisible] as const;
};

const Reveal = ({ children, delay = 0, width = '100%' }: { children: React.ReactNode, delay?: number, width?: string }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

    return (
        <div ref={ref} className={`relative transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

// --- Modal Component ---
const Modal = ({ isOpen, onClose, children, className = "" }: { isOpen: boolean, onClose: () => void, children: React.ReactNode, className?: string }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-neutral-900/40 dark:bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className={`relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300 ${className}`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-neutral-100 dark:bg-black/20 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-full transition-colors z-20"
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    );
};

// --- Components ---

const StatCard = ({ label, value, subtext, icon: Icon, delay }: { label: string, value: string, subtext: string, icon: any, delay: number }) => (
    <Reveal delay={delay}>
        <div className="bg-white/80 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-8 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-colors duration-500 group h-full shadow-sm dark:shadow-none">
            <div className="flex justify-between items-start mb-4">
                <Icon className="text-neutral-400 dark:text-neutral-500 group-hover:text-amber-500 transition-colors" size={24} />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Statistic</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-light text-neutral-900 dark:text-white mb-2">{value}</h3>
            <p className="text-lg font-medium text-amber-600 dark:text-amber-500 mb-1">{label}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{subtext}</p>
        </div>
    </Reveal>
);

const Navigation = ({ onOpenContact, isDark, toggleTheme }: { onOpenContact: () => void, isDark: boolean, toggleTheme: () => void }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tighter">
                    CHRISTIAN <span className="text-amber-500">OH</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#story" className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-white transition-colors">The Origin</a>
                    <a href="#methodology" className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-white transition-colors">Methodology</a>
                    <a href="#portfolio" className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-white transition-colors">Portfolio</a>

                    <button
                        onClick={toggleTheme}
                        className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-white transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={onOpenContact}
                        className="px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white transition-all duration-300 text-sm font-medium"
                    >
                        Book Consultation
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="text-neutral-900 dark:text-white"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className="text-neutral-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 p-6 flex flex-col space-y-4 md:hidden shadow-xl">
                        <a href="#story" onClick={() => setIsOpen(false)} className="text-neutral-600 dark:text-neutral-300">The Origin</a>
                        <a href="#methodology" onClick={() => setIsOpen(false)} className="text-neutral-600 dark:text-neutral-300">Methodology</a>
                        <a href="#portfolio" onClick={() => setIsOpen(false)} className="text-neutral-600 dark:text-neutral-300">Portfolio</a>
                        <button onClick={() => { setIsOpen(false); onOpenContact(); }} className="text-amber-500 font-bold text-left">Book Consultation</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

const Hero = ({ onOpenStory, onOpenVideo }: { onOpenStory: () => void, onOpenVideo: () => void }) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 pt-20 transition-colors duration-300">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-300 dark:from-neutral-800 to-transparent transform skew-x-12" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-amber-500/20 dark:from-amber-900/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-7">
                    <Reveal delay={100}>
                        <div className="inline-flex items-center border border-amber-500/30 rounded-full px-4 py-1.5 mb-8 bg-amber-500/5 backdrop-blur-sm">
                            <span className="text-amber-600 dark:text-amber-500 text-xs font-bold tracking-widest uppercase">Director of Investments, JNA</span>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        <h1 className="text-5xl md:text-7xl lg:text-[95px] font-medium text-neutral-900 dark:text-white leading-[0.9] tracking-tighter mb-8">
                            The <span className="text-neutral-500 dark:text-neutral-500 italic font-serif">Accidental</span> <br />
                            Investor.
                        </h1>
                    </Reveal>

                    <Reveal delay={300}>
                        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed mb-10 border-l-2 border-amber-500 pl-6">
                            From bankruptcy to owning 8 properties by age 27. I don&apos;t just sell real estate; I engineer wealth portfolios.
                        </p>
                    </Reveal>

                    <Reveal delay={400}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <button
                                onClick={onOpenStory}
                                className="group flex items-center justify-center px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium transition-all hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white"
                            >
                                Read My Story
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </button>
                            <button
                                onClick={onOpenVideo}
                                className="flex items-center space-x-3 text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-500 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                                    <Play size={20} className="ml-1" fill="currentColor" />
                                </div>
                                <span className="font-medium text-sm tracking-wide">Watch the Journey</span>
                            </button>
                        </div>
                    </Reveal>
                </div>

                {/* Hero Visual */}
                <div className="md:col-span-5 relative h-[600px] hidden md:block">
                    <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 overflow-hidden shadow-2xl dark:shadow-none transition-all duration-300">
                        <Image
                            src="/hero.png"
                            alt="Christian Oh Portrait"
                            className="object-cover opacity-90 dark:opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                            fill
                            priority
                        />
                        <div className="absolute bottom-10 left-10 bg-white/80 dark:bg-white/10 backdrop-blur-md p-6 border-l-4 border-amber-500 max-w-xs shadow-lg dark:shadow-none">
                            <p className="text-neutral-900 dark:text-white text-2xl font-serif italic">&quot;Skin in the game.&quot;</p>
                            <p className="text-neutral-700 dark:text-neutral-300 text-sm mt-2">I own what I advise. 6+2 Properties acquired in 1 year.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-neutral-400 dark:text-neutral-600 hidden md:block">
                <ChevronDown size={32} />
            </div>
        </section>
    );
};

const StorySection = () => {
    const milestones = [
        { year: "The Struggle", title: "Financial Trauma", desc: "My family suffered severe bankruptcy during my teenage years. I witnessed the pain of financial instability firsthand." },
        { year: "The Pivot", title: "Broken Bond", desc: "I walked away from a safe MOE Scholarship and teaching career to save my family, becoming an 'accidental investor' out of necessity." },
        { year: "The Action", title: "Risk & Reward", desc: "Dove into real estate when others hesitated. Used data, not emotion, to guide my first purchase." },
        { year: "Today", title: "8 Properties @ 27", desc: "PropNex Millionaire. Director of Investments. My mission is to place a property investor in every household." }
    ];

    return (
        <section id="story" className="py-24 bg-white dark:bg-neutral-900 relative transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-6xl font-medium text-neutral-900 dark:text-white mb-6">
                            From <span className="text-amber-500">Bankruptcy</span><br />
                            to <span className="text-neutral-500 dark:text-neutral-500 italic font-serif">Wealth</span> Creation.
                        </h2>
                        <div className="h-1 w-20 bg-amber-500"></div>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        {milestones.map((item, index) => (
                            <Reveal key={index} delay={index * 150}>
                                <div className="relative pl-8 pb-12 border-l border-neutral-200 dark:border-neutral-800 last:border-0 hover:border-amber-500 dark:hover:border-amber-500 transition-colors group">
                                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-neutral-300 dark:bg-neutral-800 rounded-full group-hover:bg-amber-500 transition-colors" />
                                    <span className="text-xs font-mono text-amber-600 dark:text-amber-500 mb-2 block tracking-widest uppercase">{item.year}</span>
                                    <h3 className="text-2xl text-neutral-900 dark:text-white font-serif italic mb-2">{item.title}</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <div className="relative h-full min-h-[500px] bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-hidden group shadow-xl dark:shadow-none">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1506318164473-2dfd3ede3623?q=80&w=3387&auto=format&fit=crop"
                                alt="Global Vision - Singapore Skyline"
                                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent dark:from-neutral-950 dark:via-neutral-950/80" />
                        </div>

                        <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                            <div className="absolute bottom-0 right-0 p-4 pointer-events-none">
                                <TrendingUp className="text-amber-500/20" size={120} />
                            </div>

                            <div className="mb-8">
                                <h3 className="text-3xl text-white font-light mb-4 drop-shadow-lg">Mission Driven. <br />Global Vision.</h3>
                                <p className="text-neutral-200 drop-shadow-md max-w-sm">
                                    I am not a salesperson. I am a Real Estate Practitioner. My advice is rooted in my own survival and success.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="p-4 bg-white/10 dark:bg-neutral-900/80 backdrop-blur-sm border border-white/20 dark:border-neutral-800">
                                    <span className="block text-3xl font-bold text-white mb-1">2021</span>
                                    <span className="text-xs text-neutral-300 dark:text-neutral-400 uppercase">PropNex Millionaire</span>
                                </div>
                                <div className="p-4 bg-white/10 dark:bg-neutral-900/80 backdrop-blur-sm border border-white/20 dark:border-neutral-800">
                                    <span className="block text-3xl font-bold text-white mb-1">Top 1%</span>
                                    <span className="text-xs text-neutral-300 dark:text-neutral-400 uppercase">Sales Volume</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const MethodologySection = () => {
    return (
        <section id="methodology" className="py-24 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <Reveal>
                        <span className="text-amber-600 dark:text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">The JNA Methodology</span>
                        <h2 className="text-4xl md:text-5xl text-neutral-900 dark:text-white mt-4 font-light">
                            Data-Driven. Factual. <span className="font-serif italic text-neutral-500">Patient.</span>
                        </h2>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <StatCard
                        icon={BarChart2}
                        value="Analysis"
                        label="In-Depth & Factual"
                        subtext="Using technical data tools to spot undervalued opportunities invisible to the naked eye."
                        delay={0}
                    />
                    <StatCard
                        icon={Building2}
                        value="8 Props"
                        label="Portfolio Builder"
                        subtext="I don't just sell. I build portfolios. My 8 properties are proof of the system."
                        delay={200}
                    />
                    <StatCard
                        icon={TrendingUp}
                        value="Wealth"
                        label="Exit Strategy"
                        subtext="Every purchase has a clear exit plan designed for capital appreciation and legacy."
                        delay={400}
                    />
                </div>

                <Reveal delay={600}>
                    <div className="mt-16 p-8 md:p-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm dark:shadow-none">
                        <div>
                            <h3 className="text-2xl text-neutral-900 dark:text-white mb-2">Detailed Market Analysis</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 max-w-lg">
                                Watch my latest &quot;New Launch Reviews&quot; and market explanations on the JNA Real Estate YouTube channel.
                            </p>
                        </div>
                        <a href="https://www.youtube.com/c/JNARealEstate" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-6 py-3 border border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                            <Youtube size={20} />
                            <span>Visit JNA YouTube</span>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const PortfolioSection = () => {
    const [activeId, setActiveId] = useState(1);

    const portfolioItems = [
        {
            id: 1,
            title: "The First Leap",
            location: "District 19",
            type: "Residential",
            stats: { roi: "+28%", yield: "3.8%" },
            desc: "Upgrading from HDB to Condo using the 'Asset Progression' model.",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Undervalued Gem",
            location: "Core Central Region",
            type: "Luxury",
            stats: { roi: "+15%", yield: "4.2%" },
            desc: "Spotted a below-market entry price in a prime district using gap analysis.",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Industrial Cashflow",
            location: "B2 Industrial",
            type: "Commercial",
            stats: { roi: "N/A", yield: "6.5%" },
            desc: "Diversifying into high-yield industrial assets for consistent passive income.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "The 8th Property",
            location: "District 15",
            type: "Investment",
            stats: { roi: "Pending", yield: "3.5%" },
            desc: "Capitalizing on the transformation of the East Coast region.",
            image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "The Shophouse",
            location: "Chinatown",
            type: "Heritage",
            stats: { roi: "+45%", yield: "2.9%" },
            desc: "Preserving heritage while securing a scarce asset class with perpetual value.",
            image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670&auto=format&fit=crop"
        }
    ];

    return (
        <section id="portfolio" className="py-24 bg-neutral-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end">
                <Reveal>
                    <span className="text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">The Track Record</span>
                    <h2 className="text-4xl md:text-5xl text-white mt-4 font-light">
                        8 Properties <span className="text-neutral-500 font-serif italic">@ 27</span>
                    </h2>
                </Reveal>
                <Reveal delay={200}>
                    <p className="text-neutral-400 max-w-md mt-6 md:mt-0 text-right md:text-left">
                        A look into my personal portfolio. These aren&apos;t just transactions; they are carefully engineered assets.
                        <span className="block text-xs text-amber-500 mt-2 font-mono uppercase tracking-wider md:hidden">Scroll to view more →</span>
                    </p>
                </Reveal>
            </div>

            {/* Interactive Accordion Gallery with Horizontal Scroll */}
            <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
                <div className="min-w-[1000px] md:min-w-0 md:w-full px-6 h-[600px] flex flex-row gap-4">
                    {portfolioItems.map((item, index) => (
                        <div
                            key={item.id}
                            onMouseEnter={() => setActiveId(item.id)}
                            onClick={() => setActiveId(item.id)} // For mobile tap interaction
                            className={`relative rounded-2xl overflow-hidden cursor-pointer transition-[flex] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] flex-shrink-0 md:flex-shrink ${activeId === item.id
                                ? 'flex-[3] min-w-[350px] shadow-2xl shadow-amber-900/20'
                                : 'flex-[1] min-w-[100px] opacity-60 hover:opacity-80'
                                }`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className={`w-full h-full object-cover transition-transform duration-1000 ${activeId === item.id ? 'scale-110' : 'scale-100'}`}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/20 to-neutral-900 transition-opacity duration-500 ${activeId === item.id ? 'opacity-90' : 'opacity-60'}`} />
                            </div>

                            {/* Content Content - Visible when Active */}
                            <div className={`absolute inset-0 p-8 flex flex-col justify-end transition-all duration-500 ${activeId === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <div className="bg-neutral-900/80 backdrop-blur-md p-6 rounded-xl border border-neutral-800">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="min-w-0">
                                            <span className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-2 block truncate">{item.type}</span>
                                            <h3 className="text-3xl font-light text-white truncate">{item.title}</h3>
                                            <p className="text-neutral-400 text-sm mt-1 truncate">{item.location}</p>
                                        </div>
                                        <div className="bg-white text-black rounded-full p-2 flex-shrink-0 ml-4">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>

                                    <p className="text-neutral-300 text-sm mb-6 leading-relaxed border-l-2 border-amber-500 pl-4 line-clamp-3 md:line-clamp-none">
                                        {item.desc}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 border-t border-neutral-800 pt-4">
                                        <div>
                                            <p className="text-xs text-neutral-500 uppercase">Est. Appreciation</p>
                                            <p className="text-xl font-bold text-white">{item.stats.roi}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 uppercase">Rental Yield</p>
                                            <p className="text-xl font-bold text-white">{item.stats.yield}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Vertical Label - Visible when Inactive (Desktop) */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeId === item.id ? 'opacity-0' : 'opacity-100'}`}>
                                <h3 className="text-2xl font-bold text-white tracking-widest uppercase -rotate-90 whitespace-nowrap drop-shadow-lg pointer-events-none">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CTASection = ({ onOpenContact }: { onOpenContact: () => void }) => {
    return (
        <section className="py-32 bg-white dark:bg-neutral-900 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert dark:invert-0"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <Reveal>
                    <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 tracking-tight">
                        Ready to build your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">legacy?</span>
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">
                        I help Singaporeans move from uncertainty to owning high-performing asset portfolios. Let&apos;s analyze your next move.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onOpenContact}
                            className="w-full sm:w-auto px-10 py-5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium hover:bg-amber-500 dark:hover:bg-amber-400 hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            Book a Consultation
                        </button>
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto px-10 py-5 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Instagram size={20} />
                            <span>Follow Lifestyle</span>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-neutral-950 border-t border-neutral-900 py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <h4 className="text-2xl font-bold text-white tracking-tighter mb-2">CHRISTIAN <span className="text-amber-500">OH</span></h4>
                    <p className="text-neutral-500 text-sm">Real Estate Practitioner. Investor. Mentor.</p>
                </div>

                <div className="flex space-x-6">
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Youtube size={20} /></a>
                </div>

                <div className="text-neutral-600 text-sm">
                    © {new Date().getFullYear()} Christian Oh. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

// --- Main Page Component ---

export default function Home() {
    const [modalType, setModalType] = useState<'video' | 'story' | 'contact' | null>(null);
    const [isDark, setIsDark] = useState(true);

    const closeModal = () => setModalType(null);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <div className={`font-sans transition-colors duration-300 ${isDark ? 'dark bg-neutral-950 text-neutral-200' : 'bg-neutral-50 text-neutral-900'}`}>
            <div className="min-h-screen selection:bg-amber-500 selection:text-white scroll-smooth">
                <Navigation
                    onOpenContact={() => setModalType('contact')}
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                />
                <Hero
                    onOpenStory={() => setModalType('story')}
                    onOpenVideo={() => setModalType('video')}
                />
                <StorySection />
                <MethodologySection />
                <PortfolioSection />
                <CTASection onOpenContact={() => setModalType('contact')} />
                <Footer />

                {/* --- Modals --- */}

                {/* Video Modal */}
                <Modal isOpen={modalType === 'video'} onClose={closeModal} className="max-w-5xl bg-black">
                    <div className="aspect-video w-full">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/I2ykHYy_fhU?autoplay=1" // Updated journey video
                            title="Christian Oh Journey"
                            className="border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Modal>

                {/* Story Modal */}
                <Modal isOpen={modalType === 'story'} onClose={closeModal} className="max-w-2xl">
                    <div className="p-8 md:p-12">
                        <div className="flex items-center space-x-4 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" alt="Christian Oh" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">The Origin Story</h3>
                                <p className="text-amber-600 dark:text-amber-500 text-sm tracking-widest uppercase">From Bankruptcy to Wealth</p>
                            </div>
                        </div>

                        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
                            <p className="lead text-lg text-neutral-700 dark:text-neutral-300 italic">
                                &quot;I am not just an agent. I am an investor first.&quot;
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                My journey didn&apos;t start with wealth; it started with the loss of it. As a teenager, I watched my family suffer through a severe bankruptcy. The trauma of losing our home and stability defined my early years and instilled in me a relentless drive for financial security.
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                I secured a prestigious MOE Scholarship, a safe path to a teaching career. But &apos;safe&apos; wasn&apos;t enough to rebuild what my family had lost. I took the biggest risk of my life: I broke my bond. I pivoted into real estate not to sell, but to understand how wealth is built.
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                I became an &quot;accidental investor&quot; out of necessity. I analyzed the market with a teacher&apos;s academic rigor and an investor&apos;s desperation. It worked. By age 27, I had acquired 8 properties.
                            </p>
                            <p className="font-bold text-neutral-900 dark:text-white">
                                Now, as Director of Investments at JNA, my mission is simple: To place a property investor in every household.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                            <button
                                onClick={() => { closeModal(); setModalType('contact'); }}
                                className="text-amber-600 dark:text-amber-500 hover:text-amber-500 dark:hover:text-amber-400 font-medium flex items-center gap-2"
                            >
                                Start Your Journey <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Contact/Consultation Modal */}
                <Modal isOpen={modalType === 'contact'} onClose={closeModal} className="max-w-4xl overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-neutral-100 dark:bg-neutral-800/50 p-8 flex flex-col justify-between border-r border-neutral-200 dark:border-neutral-800">
                        <div>
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Let&apos;s Talk Numbers.</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-3 text-neutral-600 dark:text-neutral-400">
                                    <Mail className="mt-1" size={20} />
                                    <div>
                                        <p className="text-neutral-900 dark:text-white font-medium">Email</p>
                                        <p className="text-sm">hello@christianoh.sg</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 text-neutral-600 dark:text-neutral-400">
                                    <Phone className="mt-1" size={20} />
                                    <div>
                                        <p className="text-neutral-900 dark:text-white font-medium">WhatsApp</p>
                                        <p className="text-sm">+65 9123 4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 text-neutral-600 dark:text-neutral-400">
                                    <Building2 className="mt-1" size={20} />
                                    <div>
                                        <p className="text-neutral-900 dark:text-white font-medium">JNA Real Estate</p>
                                        <p className="text-sm">PropNex Singapore</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <p className="text-xs text-neutral-500">
                                Prefer a direct link? <a href="https://linktr.ee/christianoh" target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-500 underline">View Linktree</a>
                            </p>
                        </div>
                    </div>

                    <div className="md:w-2/3 bg-white dark:bg-neutral-900 p-8">
                        <h4 className="text-lg font-medium text-neutral-900 dark:text-white mb-6">Request a Portfolio Analysis</h4>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your interest! This is a demo form."); closeModal(); }}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-neutral-500 uppercase font-medium">First Name</label>
                                    <input type="text" className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-neutral-500 uppercase font-medium">Last Name</label>
                                    <input type="text" className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-neutral-500 uppercase font-medium">Email Address</label>
                                    <input type="email" className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="john@example.com" />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs text-neutral-500 uppercase font-medium">Phone Number</label>
                                    <input type="tel" className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="+65" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-neutral-500 uppercase font-medium">Investment Goal</label>
                                <select className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors">
                                    <option>First Property Purchase</option>
                                    <option>Portfolio Restructuring</option>
                                    <option>Asset Progression</option>
                                    <option>Just Exploring</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-neutral-500 uppercase font-medium">Message (Optional)</label>
                                <textarea rows={3} className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="Tell me about your current situation..."></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold tracking-wide rounded transition-colors flex items-center justify-center gap-2 mt-4">
                                Send Inquiry <Send size={18} />
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
