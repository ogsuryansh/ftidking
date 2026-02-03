import React from 'react';
import ServiceLayout from '../components/layout/ServiceLayout';
import { Send, Hash, MessageCircle, Zap } from 'lucide-react';

const ContactCard = ({ icon: Icon, title, description, link }) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center text-center p-8 rounded-2xl bg-black/40 border border-white/5 transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10"
    >
        <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300">
            <Icon className="w-6 h-6 text-cyan-500 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-bebas tracking-wider text-white mb-3 uppercase group-hover:text-cyan-400">
            {title}
        </h3>
        <p className="text-sm text-white/40 leading-relaxed font-sans max-w-[200px]">
            {description}
        </p>
    </a>
);

const Contact = () => {
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
            <div className="max-w-5xl mx-auto py-12 px-4 relative z-10 flex items-center justify-center min-h-[70vh]">
                <div className="relative w-full rounded-3xl bg-black/60 border border-cyan-500/20 p-8 md:p-12 animate-fade-up shadow-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.05)]">

                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-xl" />

                    <div className="text-center mb-12">
                        <div className="inline-flex w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                            <Zap className="w-8 h-8 text-cyan-500 fill-cyan-500" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bebas tracking-widest mb-4 text-white uppercase">
                            Get In Touch
                        </h1>
                        <p className="text-white/40 text-sm md:text-lg font-orbitron tracking-tight max-w-lg mx-auto">
                            Ready to get started? Contact us through your preferred method.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ContactCard
                            icon={Send}
                            title="Contact us"
                            description="Ready to order? Contact us for place your order and get started fast."
                            link="https://t.me/ftidkingg"
                        />
                        <ContactCard
                            icon={Zap}
                            title="Main Channel"
                            description="Stay updated on the hottest stores, exclusive promotions and important updates."
                            link="https://t.me/+0baCgaxlYZ4xZGQx"
                        />
                        <ContactCard
                            icon={MessageCircle}
                            title="Group Chat"
                            description="Join our open chat and connect with money-minded people like you."
                            link="https://t.me/+tcprGVazrzk5OGYx"
                        />
                    </div>
                </div>
            </div>
        </ServiceLayout>
    );
};

export default Contact;
