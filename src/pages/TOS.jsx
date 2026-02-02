import React, { useState } from 'react';
import ServiceLayout from '../components/layout/ServiceLayout';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import clsx from 'clsx';

const TOSSection = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between gap-4 text-left transition-colors hover:text-cyan-400"
            >
                <span className={clsx(
                    "text-lg font-orbitron font-medium transition-colors",
                    isOpen ? "text-cyan-500" : "text-white/80"
                )}>
                    {title}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-cyan-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-white/20" />
                )}
            </button>
            <div
                className={clsx(
                    "transition-all duration-300 ease-in-out overflow-hidden",
                    isOpen ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
                )}
            >
                <p className="text-white/60 leading-relaxed font-sans px-2">
                    {content}
                </p>
            </div>
        </div>
    );
};

const TOS = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const tosData = [
        {
            title: "1. Service Agreement",
            content: "By using Sonic Boxing services, you agree to these terms. All services are provided as-is and subject to availability. We reserve the right to modify or terminate services at any time."
        },
        {
            title: "2. Service Usage",
            content: "Users must provide accurate information for all service requests. Any misuse of the service or provision of fraudulent information will result in immediate termination of access without refund."
        },
        {
            title: "3. Pricing and Payment",
            content: "Prices are subject to change without notice. All payments must be made in full before service processing begins. We accept various payment methods as specified at the time of purchase."
        },
        {
            title: "4. Refund Policy",
            content: "Due to the nature of digital and specialized shipping services, refunds are handled on a case-by-case basis. Generally, once service processing has started, refunds are not provided."
        }
    ];

    const navItems = [
        { label: "Home", path: "/boxing" },
        { label: "FAQ", path: "/boxing/faq" },
        { label: "TOS", path: "/boxing/tos" },
        { label: "Contact", path: "/boxing/contact" }
    ];

    return (
        <ServiceLayout
            serviceName="Boxing"
            serviceColor="cyan"
            navItems={navItems}
        >
            <div className="max-w-4xl mx-auto py-12 px-4 relative z-10">
                <div className="text-center mb-12 animate-fade-up">
                    <h1 className="text-4xl md:text-6xl font-bebas tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                        TERMS OF SERVICE
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-orbitron tracking-wide">
                        Please review our terms before using our services.
                    </p>
                </div>

                <div className="rounded-2xl bg-black/60 border border-cyan-500/20 overflow-hidden animate-fade-up shadow-2xl" style={{ animationDelay: "0.2s" }}>
                    {/* Header Bar */}
                    <div className="bg-cyan-500/5 border-b border-cyan-500/10 px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                            <FileText className="w-4 h-4 text-cyan-500" />
                        </div>
                        <h2 className="text-sm font-bebas tracking-[0.2em] text-white uppercase">
                            Boxing Terms of Service
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-2">
                        {tosData.map((item, index) => (
                            <TOSSection
                                key={index}
                                title={item.title}
                                content={item.content}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            />
                        ))}
                    </div>

                    {/* Footer Bar */}
                    <div className="bg-white/5 px-6 py-4 flex justify-between items-center text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                        <span>Last updated: January 1, 2024</span>
                        <span>4 sections</span>
                    </div>
                </div>
            </div>
        </ServiceLayout>
    );
};

export default TOS;
