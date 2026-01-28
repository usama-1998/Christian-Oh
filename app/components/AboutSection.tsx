import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface AboutSectionProps {
    onOpenVideo: (videoId: string) => void;
}

const AboutSection = ({ onOpenVideo }: AboutSectionProps) => {
    return (
        <section className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-300 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neutral-200/20 dark:bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[500px]">

                    {/* Left Column - Vertical Image */}
                    <div className="lg:col-span-3 flex flex-col h-full">
                        <div className="relative w-full h-full aspect-[3/4] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden group border border-neutral-200 dark:border-neutral-800 transition-all duration-500 hover:border-amber-500/30 shadow-lg">
                            <Image
                                src="/About me image.jpg"
                                alt="Christian Oh"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                            {/* Optional: Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Middle Column - Success Story Video Popup */}
                    <div className="lg:col-span-4 flex flex-col justify-center">
                        <div className="relative aspect-[9/16] w-full bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 group hover:border-amber-500/50 transition-all duration-500">
                            <button
                                onClick={() => onOpenVideo("sMFja0TBvBI")}
                                className="w-full h-full relative group cursor-pointer"
                            >
                                <Image
                                    src="https://img.youtube.com/vi/sMFja0TBvBI/maxresdefault.jpg"
                                    alt="The Monopoly Code"
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300 shadow-lg border border-white/20">
                                        <Play className="text-white ml-1" size={28} fill="currentColor" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - About Me Content */}
                    <div className="lg:col-span-5 flex flex-col h-full">
                        <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 lg:p-8 h-full flex flex-col shadow-sm transition-all duration-500 hover:shadow-xl hover:border-amber-500/30">

                            {/* Text Content */}
                            <div className="flex-1 flex flex-col">
                                <div className="mb-4">
                                    <span className="text-amber-500 font-mono text-xs tracking-[0.2em] uppercase block mb-2">My Story</span>
                                    <h2 className="text-3xl font-serif italic text-neutral-900 dark:text-white">About Me</h2>
                                </div>

                                <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 flex-grow overflow-y-auto custom-scrollbar pr-2">
                                    <p>
                                        I’m Christian Oh—an investor, advisor, and steward focused on helping people make wiser long-term decisions with capital and life. My journey didn’t start with success; it began with watching my family lose everything through poor financial advice. That experience reshaped how I view money—not as status, but as responsibility.
                                    </p>
                                    <p>
                                        Over time, I built and now manage a nine-property portfolio across residential and commercial assets, creating stable, recurring income for my family. More important than the outcome was the discipline behind it—prioritising risk management, clear thinking, and sustainable growth over hype or shortcuts.
                                    </p>
                                    <p>
                                        Today, I work with families, professionals, and investors who want to grow steadily without unnecessary risk. I believe real wealth is built through integrity over speed, process over noise, and stewardship over ego.
                                    </p>
                                    <p className="font-medium text-neutral-900 dark:text-white italic">
                                        This platform exists to share practical insights on investing, decision-making, and long-term thinking—so others can build with confidence and create a lasting legacy.
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Christian Oh</p>
                                    <p className="text-[10px] text-neutral-400 mt-0.5">JNA Real Estate • PropNex</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(245, 158, 11, 0.3);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(245, 158, 11, 0.6);
                }
            `}</style>
        </section>
    );
};

export default AboutSection;
