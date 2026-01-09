"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, Video, X, Send, PhoneCall } from 'lucide-react';

export default function ContactWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCallOpen, setIsCallOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);
    const hasOpened = useRef(false);

    // Hardcoded phone number for now - replace with actual number
    const PHONE_NUMBER = "6590000000"; // Replace with actual number
    const PHONE_DISPLAY = "+65 9000 0000";

    useEffect(() => {
        setIsMounted(true);

        // Auto-open logic
        const timer = setTimeout(() => {
            if (!hasOpened.current) {
                setIsOpen(true);
                hasOpened.current = true;
            }
        }, 1500);

        // Close on click outside
        const handleClickOutside = (event: MouseEvent) => {
            if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsCallOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            clearTimeout(timer);
        };
    }, []);

    // Handle typing animation when opened
    useEffect(() => {
        if (isOpen && !isMessageVisible) {
            setIsTyping(true);
            const typingTimer = setTimeout(() => {
                setIsTyping(false);
                setIsMessageVisible(true);
            }, 3000);
            return () => clearTimeout(typingTimer);
        }
    }, [isOpen, isMessageVisible]);

    if (!isMounted) return null;

    const handleWhatsAppClick = () => {
        setIsOpen(!isOpen);
        if (isCallOpen) setIsCallOpen(false);
    };

    const handleCallClick = () => {
        setIsCallOpen(!isCallOpen);
        if (isOpen) setIsOpen(false);
    };

    const handleStartChat = () => {
        window.open(`https://wa.me/${PHONE_NUMBER}`, '_blank');
    };

    return (
        <div
            ref={widgetRef}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4"
        >
            {/* WhatsApp Chat Window */}
            <div
                className={`
                    absolute bottom-20 right-0 w-80 sm:w-96 bg-[#E5DDD5] rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 origin-bottom-right
                    ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}
                `}
            >
                {/* Header */}
                <div className="bg-[#075E54] p-4 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                                <img src="/hero.png" alt="Christian Oh" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075E54] rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-base leading-tight">Christian Oh</h3>
                            <p className="text-xs text-green-100 opacity-80">Replies within an hour</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="pt-2 pb-12 px-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-90 flex flex-col">
                    {isTyping && (
                        <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm self-start max-w-[85%] relative speech-bubble text-gray-800 ml-2">
                            <div className="flex space-x-1 h-5 items-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}

                    {isMessageVisible && (
                        <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm self-start max-w-[85%] relative speech-bubble text-gray-800 text-sm animate-fade-in ml-2">
                            <p className="mb-1">Hi there! 👋</p>
                            <p>How can I help you with your property journey today?</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 bg-[#F0F2F5] flex items-center justify-center">
                    <button
                        onClick={handleStartChat}
                        className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 px-6 rounded-full font-medium transition-colors shadow-sm w-full justify-center"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="text-white"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        <span>Start Chat</span>
                    </button>
                </div>
            </div>

            <div
                className={`
                    absolute bottom-20 right-20 w-48 bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 origin-bottom-right
                    ${isCallOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}
                `}
            >
                <div className="p-1">
                    <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors w-full"
                    >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <Phone size={16} />
                        </div>
                        <span className="font-medium text-sm">Voice Call</span>
                    </a>
                    <a
                        href={`facetime:${PHONE_NUMBER}`}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors w-full"
                    >
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <Video size={16} />
                        </div>
                        <span className="font-medium text-sm">FaceTime</span>
                    </a>
                </div>
            </div>

            {/* Main Buttons */}
            <div className="flex flex-row items-center space-x-3">
                <button
                    onClick={handleCallClick}
                    className={`
                        w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300
                        ${isCallOpen ? 'bg-gray-200 text-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'}
                    `}
                    aria-label="Call Options"
                >
                    {isCallOpen ? <X size={20} /> : <PhoneCall size={20} />}
                </button>

                <button
                    onClick={handleWhatsAppClick}
                    className={`
                        w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 relative group
                        ${isOpen ? 'bg-[#128C7E] text-white' : 'bg-[#25D366] text-white hover:bg-[#128C7E] hover:scale-105'}
                    `}
                    aria-label="Toggle WhatsApp Chat"
                >
                    <div className="relative flex items-center justify-center w-full h-full">
                        <svg
                            viewBox="0 0 24 24"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="text-white"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border border-[#25D366]"></span>
                    </div>
                </button>
            </div>

            <style jsx>{`
                .speech-bubble::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -8px;
                    width: 0;
                    height: 0;
                    border: 8px solid transparent;
                    border-right-color: white;
                    border-top: 0;
                    border-left: 0;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
