import React, { useState } from 'react';
import ServiceLayout from '../components/layout/ServiceLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

const FAQItem = ({ question, answer, index, isOpen, onClick }) => {
    return (
        <div
            className={clsx(
                "group mb-4 rounded-xl border transition-all duration-300 overflow-hidden",
                isOpen
                    ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                    : "bg-black/40 border-white/5 hover:border-cyan-500/30"
            )}
        >
            <button
                onClick={onClick}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
            >
                <div className="flex items-center gap-4">
                    <span className={clsx(
                        "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border transition-colors",
                        isOpen
                            ? "bg-cyan-500 border-cyan-500 text-white"
                            : "bg-white/5 border-white/10 text-white/40 group-hover:border-cyan-500/50 group-hover:text-cyan-500"
                    )}>
                        {index + 1}
                    </span>
                    <span className={clsx(
                        "text-lg font-orbitron font-medium transition-colors",
                        isOpen ? "text-white" : "text-white/70 group-hover:text-white"
                    )}>
                        {question}
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-cyan-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-white/20 group-hover:text-white/40" />
                )}
            </button>

            <div
                className={clsx(
                    "transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-6 pb-6 pt-2 ml-12 border-l-2 border-cyan-500/30">
                    <p className="text-white/60 leading-relaxed font-sans">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqData = [
        {
            question: "What is Boxing?",
            answer: "Boxing is a premium service that provides professional boxing and FTID (Fake Tracking ID) services for packages. We help you manage your shipments with top-tier methods and specialized handling for various platforms."
        },
        {
            question: "How does the service work?",
            answer: "Once you select a service and country, our team processes your shipment using highly optimized methods. You'll receive updates throughout the process until completion. We specialize in various courier systems including UPS, FedEx, and DHL."
        },
        {
            question: "What countries do you support?",
            answer: "We currently provide extensive coverage across the United States, Canada, and the United Kingdom. We are constantly expanding our operations to include more international destinations."
        },
        {
            question: "What is weighted pricing?",
            answer: "Weighted pricing is a flexible billing method based on the actual weight of the package. This ensures you pay a fair price proportional to the shipping volume and weight, often results in better rates for smaller or larger shipments."
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
                <div className="text-center mb-16 animate-fade-up">
                    <h1 className="text-4xl md:text-6xl font-bebas tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                        FREQUENTLY ASKED QUESTIONS
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-orbitron tracking-wide">
                        Everything you need to know about our Boxing services.
                    </p>
                </div>

                <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                    {faqData.map((item, index) => (
                        <FAQItem
                            key={index}
                            index={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </ServiceLayout>
    );
};

export default FAQ;
