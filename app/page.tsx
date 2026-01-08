'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BarChart2, Building2, ChevronDown, Instagram, Linkedin, Play, TrendingUp, Youtube, Menu, X, Mail, Phone, ArrowUpRight, Send, Sun, Moon, Check } from 'lucide-react';
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
                    <a href="#videos" className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-white transition-colors">The Origin</a>
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
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="/team_hero.webp"
                    alt="Christian Oh Team"
                    className="object-cover object-center w-full h-full opacity-100 dark:opacity-60 transition-opacity duration-500"
                    fill
                    priority
                    quality={100}
                />

                {/* Light Mode Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-100 via-neutral-100/50 to-transparent dark:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/90 via-white/20 to-transparent dark:hidden" />

                {/* Dark Mode Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/30 hidden dark:block" />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-transparent to-transparent hidden dark:block" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
                <div className="max-w-4xl pt-20">
                    <Reveal delay={100}>
                        <div className="inline-flex items-center border border-amber-500/30 rounded-full px-4 py-1.5 mb-8 bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-sm">
                            <span className="text-amber-600 dark:text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">Christian Oh & Partners</span>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        <h1 className="text-6xl md:text-8xl lg:text-[110px] font-light text-neutral-900 dark:text-white leading-[0.9] tracking-tighter mb-6 drop-shadow-sm dark:drop-shadow-2xl transition-colors duration-500">
                            Real Data. <br />
                            Real <span className="text-amber-600 dark:text-amber-500 font-serif italic">Results</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={300}>
                        <p className="text-2xl md:text-3xl text-neutral-700 dark:text-neutral-200 font-serif italic mb-6 max-w-lg leading-tight transition-colors duration-500">
                            &quot;The accidental investors&quot;
                        </p>

                        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-10 max-w-lg leading-relaxed">
                            Positioning your wealth with a team that treats your portfolio like their own. From bankruptcy to a $50M+ portfolio management empire.
                        </p>
                    </Reveal>

                    <Reveal delay={400}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <a
                                href="#portfolio"
                                className="group flex items-center justify-center px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium transition-all hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white shadow-lg hover:shadow-xl rounded-none"
                            >
                                Check Our Portfolio
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </a>
                            <a
                                href="#videos"
                                className="flex items-center space-x-3 text-neutral-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-500 transition-colors group px-4 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                            >
                                <div className="w-12 h-12 rounded-full border border-neutral-300 dark:border-white/30 flex items-center justify-center group-hover:border-amber-500 transition-colors bg-white/40 dark:bg-white/5 backdrop-blur-sm">
                                    <Play size={20} className="ml-1" fill="currentColor" />
                                </div>
                                <span className="font-medium text-sm tracking-wide">Watch the Monopolycode</span>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-neutral-400 dark:text-white/50 hidden md:block z-20">
                <ChevronDown size={32} />
            </div>
        </section>
    );
};

const VideoShowcase = ({ onOpenVideo }: { onOpenVideo: (videoId: string) => void }) => {
    // Real Video IDs extracted from playlist
    const testimonials = [
        { id: "UyRY8srDA10", title: "Herron", name: "Client Success" },
        { id: "61Y4_aS_nks", title: "Steven", name: "Client Success" },
        { id: "D1x3ivP_ceU", title: "Stewardship Client", name: "Client Success" },
        { id: "bmECa9mAZNk", title: "Client Success", name: "Client Success" },
    ];

    return (
        <section id="videos" className="bg-black py-20 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <Reveal>
                        <span className="text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">Client Success</span>
                        <h2 className="text-3xl md:text-5xl font-light mt-4">The Monopoly Code</h2>
                    </Reveal>
                </div>

                {/* Main Video */}
                <div className="mb-16">
                    <Reveal delay={200}>
                        <div className="aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden text-center shadow-2xl border border-neutral-800 relative group">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/I2ykHYy_fhU?autoplay=1&mute=1&loop=1&playlist=I2ykHYy_fhU"
                                title="The Monopolycode Video"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </Reveal>
                </div>

                {/* Testimonials */}
                <div className="mb-8">
                    <Reveal>
                        <h3 className="text-2xl font-light text-white">Success Stories</h3>
                    </Reveal>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                    {testimonials.map((video, index) => (
                        <Reveal key={index} delay={300 + (index * 100)}>
                            <button
                                onClick={() => onOpenVideo(video.id)}
                                className="group cursor-pointer block w-full text-left"
                            >
                                <div className="aspect-[9/16] bg-neutral-900 rounded-xl overflow-hidden relative border border-neutral-800 group-hover:border-amber-500 transition-colors">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                        alt={video.title} // Fallback to Title if Name is not generic
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                                            <Play className="text-white ml-1" size={20} fill="currentColor" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                                        <p className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">{video.name}</p>
                                        <p className="text-white font-medium leading-tight line-clamp-2">{video.title}</p>
                                    </div>
                                </div>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TargetAudience = () => {
    return (
        <section className="py-24 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <Reveal>
                    <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 dark:text-white mb-6">
                        People We Are <span className="text-amber-500 italic font-serif">Looking For</span>
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                        We are looking for people who like to <span className="font-bold text-neutral-900 dark:text-white">optimize their property portfolio</span>, or are seeking guidance for the <span className="font-bold text-neutral-900 dark:text-white">next best buy</span> in the market.
                    </p>
                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        <span className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full text-sm">Portfolio Optimization</span>
                        <span className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full text-sm">Market Analysis</span>
                        <span className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full text-sm">Strategic Entry</span>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const StorySection = () => {
    const milestones = [
        { year: "The Struggle", title: "Financial Trauma", desc: "My family suffered severe bankruptcy during my teenage years. I witnessed the pain of financial instability firsthand." },
        { year: "The Pivot", title: "Broken Bond", desc: "I walked away from a safe MOE Scholarship and teaching career to save my family, becoming an 'accidental investor' out of necessity." },
        { year: "The Action", title: "Risk & Reward", desc: "Dove into real estate when others hesitated. Used data, not emotion, to guide my first purchase." },
        { year: "2021", title: "PropNex Millionaire", desc: "Achieved the prestigious PropNex Millionaire award for outstanding performance." },
        { year: "2024", title: "PropNex Millionaire", desc: "Consistently delivering top-tier results for clients." },
        { year: "2025", title: "PropNex Millionaire", desc: "Continuing the legacy of excellence and wealth creation." },
        { year: "Today", title: "8 Properties @ 27", desc: "Director of Investments. My mission is to place a property investor in every household." }
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
                                src="/mission_background.png"
                                alt="Global Vision - Singapore Skyline"
                                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent dark:from-neutral-950 dark:via-neutral-950/80" />
                        </div>

                        <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                            <div className="mb-8">
                                <h3 className="text-3xl text-white font-light mb-4 drop-shadow-lg">
                                    Mission Driven. <br />
                                    <span className="flex items-center gap-3">
                                        Global Vision.
                                        <TrendingUp className="text-amber-500" size={32} />
                                    </span>
                                </h3>
                                <p className="text-neutral-200 drop-shadow-md max-w-sm">
                                    I am not a salesperson. I am a Real Estate Practitioner. My advice is rooted in my own survival and success.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="p-4 bg-white/10 dark:bg-neutral-900/80 backdrop-blur-sm border border-white/20 dark:border-neutral-800">
                                    <span className="block text-3xl font-bold text-white mb-1">2021, 2024, 2025</span>
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
                            The 1OPM <span className="font-serif italic text-neutral-500">Method</span>
                        </h2>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    <StatCard
                        icon={TrendingUp}
                        value="1st"
                        label="Mover Advantage"
                        subtext="Entering early to capture maximum capital appreciation before market saturation."
                        delay={0}
                    />
                    <StatCard
                        icon={X}
                        value="Filter"
                        label="Overpay Filter"
                        subtext="Proprietary valuation modeling to prevent emotional overpaying."
                        delay={100}
                    />
                    <StatCard
                        icon={BarChart2}
                        value="Gap"
                        label="Price Gap Play"
                        subtext="Identifying and exploiting price disparities across districts and tenures."
                        delay={200}
                    />
                    <StatCard
                        icon={Building2}
                        value="Size"
                        label="Multiplier Size"
                        subtext="Scaling portfolio size through clear leverage quantification and asset power."
                        delay={300}
                    />
                </div>

                <div className="text-center mt-12 pb-12">
                    {/* <p className="text-sm text-neutral-500 font-mono uppercase tracking-widest">(1OPM Method)</p> */}
                </div>
            </div>
        </section>
    );
};

const PortfolioSection = () => {
    const portfolioItems = [
        {
            year: "2018",
            title: "1st Investment",
            location: "1+Study -> 4 Bedder",
            type: "Residential",
            stats: { roi: "Recycled", yield: "4.5% Prev" },
            desc: "Rented at 4.5% rental yield previously. Recycled and invested into 4 bedder new launch.",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
        },
        {
            year: "2020",
            title: "2nd Property",
            location: "Retirement Plan",
            type: "Residential",
            stats: { roi: "+36.7%", yield: "$6.7k/mo" },
            desc: "Rose 36.7% in 3 years. Sold and reinvested into a high rental 6% property.",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        },
        {
            year: "2021",
            title: "3rd Property",
            location: "Assets Progression",
            type: "Residential",
            stats: { roi: "+37%", yield: "$5.8k/mo" },
            desc: "Rose 37% in 3.5 years. Rented at $5.8K, sold to transit to next property.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
        },
        {
            year: "2022",
            title: "4th Property",
            location: "Dual Key Unit",
            type: "Residential",
            stats: { roi: "Dad's Retirement", yield: "6.8%" },
            desc: "High rental yield Dual Key Unit 6.8%, $4500 to retire my dad.",
            image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2670&auto=format&fit=crop"
        },
        {
            year: "2023",
            title: "5th Property",
            location: "Co-Investment",
            type: "Residential",
            stats: { roi: "Family", yield: "$6.4k/mo" },
            desc: "Co-invested with sister - $6.4k Rental.",
            image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670&auto=format&fit=crop"
        },
        {
            year: "2024",
            title: "Commercial",
            location: "4 Commercial Props",
            type: "Commercial",
            stats: { roi: "15.5% ROE", yield: "$27,250/mo" },
            desc: "4 commercial properties. 15.5% ROE consistently through nett rental alone.",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
        }
    ];

    return (
        <section id="portfolio" className="py-24 bg-neutral-900 text-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
                <Reveal>
                    <span className="text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">The Track Record</span>
                    <h2 className="text-4xl md:text-5xl text-white mt-4 font-light">
                        9 Properties <span className="text-neutral-500 font-serif italic">Managed</span>
                    </h2>
                    <p className="text-2xl mt-4 text-amber-500 font-bold">$50,650 <span className="text-sm font-normal text-neutral-400">Monthly Rental Income</span></p>
                </Reveal>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />

                    <div className="space-y-8 md:space-y-0">
                        {portfolioItems.map((item, index) => (
                            <Reveal key={index} delay={index * 100}>
                                <div className={`flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Empty Space for alignment */}
                                    <div className="hidden md:block w-1/2" />

                                    {/* Timeline Node */}
                                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 border border-amber-500 z-10 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 text-left' : 'md:pl-16 text-left'}`}>
                                        <div className="group relative bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/50 hover:border-amber-500/50 rounded-2xl p-1 overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-900/10 hover:bg-neutral-800/60">

                                            <div className="flex flex-col sm:flex-row h-full">
                                                {/* Image Section */}
                                                <div className="relative h-48 sm:h-auto sm:w-1/3 overflow-hidden rounded-xl">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-mono text-amber-500 border border-white/10">
                                                        {item.year}
                                                    </div>
                                                </div>

                                                {/* Text Section */}
                                                <div className="p-5 sm:w-2/3 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="text-xl font-medium text-white mb-1 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                                                        <p className="text-neutral-400 text-xs uppercase tracking-wider mb-3">{item.location}</p>
                                                        <p className="text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                                            {item.desc}
                                                        </p>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <div className="px-3 py-1.5 rounded bg-amber-500/10 border border-amber-500/20">
                                                            <span className="text-[10px] text-amber-500/70 block uppercase">ROI</span>
                                                            <span className="text-sm font-bold text-amber-500">{item.stats.roi}</span>
                                                        </div>
                                                        <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10">
                                                            <span className="text-[10px] text-neutral-400 block uppercase">Yield</span>
                                                            <span className="text-sm font-bold text-neutral-200">{item.stats.yield}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTASection = ({ onOpenContact }: { onOpenContact: () => void }) => {
    const checklistItems = [
        "Investors looking to transition from HDB/Condo to multiple asset classes.",
        "Families planning multi-generational wealth and retirement via rental income.",
        "Business owners seeking commercial assets with >5% yield and tax efficiency."
    ];

    return (
        <section className="py-32 bg-white dark:bg-neutral-900 relative overflow-hidden transition-colors duration-300">
            {/* Background Texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert dark:invert-0"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <Reveal>
                        <div>
                            <span className="text-amber-500 font-mono text-xs tracking-[0.2em] uppercase mb-4 block">Take Action</span>
                            <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 tracking-tight">
                                Are You Ready <br />
                                To <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 font-serif italic pr-2">Scale?</span>
                            </h2>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-xl">
                                We are looking for partners who are serious about optimizing their property portfolio. Whether you're seeking guidance for your next best buy or looking to restructure for retirement.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <button
                                    onClick={onOpenContact}
                                    className="w-full sm:w-auto px-10 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium hover:bg-amber-500 dark:hover:bg-amber-400 hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                                >
                                    Book a Consultation <ArrowRight size={18} />
                                </button>
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full sm:w-auto px-10 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Instagram size={20} />
                                    <span>Follow Lifestyle</span>
                                </a>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        <div className="bg-neutral-50 dark:bg-neutral-800/50 p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-2xl relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-500">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-colors duration-700 pointer-events-none" />

                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 relative z-10">Who We Work Best With</h3>

                            <div className="space-y-6 relative z-10">
                                {checklistItems.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="mt-1 min-w-[24px] w-6 h-6 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center border border-green-500/20">
                                            <Check size={14} className="text-green-600 dark:text-green-400" strokeWidth={3} />
                                        </div>
                                        <p className="text-neutral-700 dark:text-neutral-300 font-medium leading-snug">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
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
    const [activeVideoId, setActiveVideoId] = useState<string>("I2ykHYy_fhU");
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
                    onOpenVideo={() => {
                        setActiveVideoId("I2ykHYy_fhU");
                        setModalType('video');
                    }}
                />
                <VideoShowcase onOpenVideo={(videoId) => {
                    setActiveVideoId(videoId);
                    setModalType('video');
                }} />
                <MethodologySection />
                <PortfolioSection />
                <StorySection />
                {/* <TargetAudience /> */}
                <CTASection onOpenContact={() => setModalType('contact')} />
                <Footer />

                {/* --- Modals --- */}

                {/* Video Modal */}
                <Modal isOpen={modalType === 'video'} onClose={closeModal} className="max-w-5xl bg-black">
                    <div className="aspect-video w-full">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
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
                                <img src="/hero.png" alt="Christian Oh" className="w-full h-full object-cover" />
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
                            <div className="mb-2">
                                <h4 className="text-neutral-900 dark:text-white font-bold mb-1">2021/2024/2025</h4>
                                <p className="text-sm text-amber-600 dark:text-amber-500">Millionaire Propnex</p>
                            </div>

                            <p className="text-xs text-neutral-500 mt-4">
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
