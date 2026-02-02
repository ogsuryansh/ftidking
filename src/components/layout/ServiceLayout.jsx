import React, { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronUp, Shield, Star, Zap, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const themes = {
    cyan: {
        bg: "bg-cyan-500/20",
        border: "border-cyan-500/40",
        text: "text-cyan-400",
        hover: "hover:bg-cyan-500/30 hover:border-cyan-500/60",
        shadow: "hover:shadow-lg hover:shadow-cyan-500/30",
        gradient: "from-cyan-400 via-cyan-300 to-cyan-500",
        textHover: "hover:text-cyan-300",
        borderActive: "border-cyan-400/60",
        bgHover: "hover:bg-cyan-500/20",
        glow: "shadow-cyan-500/30",
        particle: "particle-cyan"
    },
    red: {
        bg: "bg-red-500/20",
        border: "border-red-500/40",
        text: "text-red-400",
        hover: "hover:bg-red-500/30 hover:border-red-500/60",
        shadow: "hover:shadow-lg hover:shadow-red-500/30",
        gradient: "from-red-400 via-red-300 to-red-500",
        textHover: "hover:text-red-300",
        borderActive: "border-red-400/60",
        bgHover: "hover:bg-red-500/20",
        glow: "shadow-red-500/30",
        particle: "particle-red"
    }
};

const ScrollToTop = ({ serviceColor = "cyan" }) => {
    const [visible, setVisible] = useState(false);
    const theme = themes[serviceColor] || themes.cyan;

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) setVisible(true);
            else setVisible(false);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={clsx(
                "fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full border backdrop-blur-sm transition-all duration-300 flex items-center justify-center",
                theme.bg, theme.border, theme.text, theme.hover, theme.shadow,
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            )}
            aria-label="Scroll to top"
        >
            <ChevronUp className="w-6 h-6" />
        </button>
    );
};

const ServiceLayout = ({ children, serviceName, serviceColor, navItems }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const theme = themes[serviceColor] || themes.cyan;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [footerData] = useState({
        tagline: "The Ultimate Digital Services Hub",
        copyright: "© 2025 Sonic. All rights reserved."
    });

    const particles = useMemo(() =>
        [...Array(25)].map((_, i) => ({
            id: i,
            size: 1.5 + Math.random() * 2.5,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: i * 0.3,
            duration: 18 + Math.random() * 12,
            type: i % 4 === 0 ? theme.particle : (i % 2 === 0 ? "particle-gold" : "particle-cyan")
        })), [theme.particle]
    );

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <div className="relative min-h-screen overflow-x-hidden font-sans">
            <div className="fixed inset-0 z-0 premium-bg" />
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute inset-0 aurora-layer" />
            </div>
            <div className="particle-container">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className={`particle-premium ${p.type}`}
                        style={{
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`
                        }}
                    />
                ))}
            </div>

            <header className="relative z-50">
                <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-4 group">
                            <div className={`w-12 h-12 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                                <Zap className={`w-6 h-6 ${theme.text}`} />
                            </div>
                            <div className="flex flex-col">
                                <h1 className={`text-3xl font-bebas tracking-[0.15em] uppercase bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent leading-tight mb-1`}>
                                    {serviceName}
                                </h1>
                                <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-bold">
                                    Premium Service
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map(item => {
                            const isActive = currentPath === item.path;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => clsx(
                                        "px-5 py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 border backdrop-blur-sm",
                                        isActive
                                            ? `${theme.bg} ${theme.border} ${theme.text} shadow-[0_0_15px_rgba(6,182,212,0.4)]`
                                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white"
                                    )}
                                >
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden w-12 h-12 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center transition-all active:scale-95`}
                    >
                        {isMenuOpen ? <X className={theme.text} /> : <Menu className={theme.text} />}
                    </button>
                </div>

                {/* Mobile Navigation Sidepanel */}
                <div className={clsx(
                    "fixed inset-0 z-[60] md:hidden transition-all duration-500",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}>
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Panel */}
                    <div className={clsx(
                        "absolute top-0 right-0 h-full w-[300px] bg-black border-l border-white/10 p-8 transition-transform duration-500 shadow-2xl flex flex-col",
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    )}>
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-xl font-bebas tracking-widest text-white uppercase">Menu</h2>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                            >
                                <X className="w-5 h-5 text-white/60" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4">
                            {navItems.map((item, i) => {
                                const isActive = currentPath === item.path;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) => clsx(
                                            "w-full px-6 py-4 rounded-xl text-lg font-bebas tracking-widest uppercase transition-all duration-300 border flex items-center justify-between group",
                                            isActive
                                                ? `${theme.bg} ${theme.border} ${theme.text} shadow-[0_0_15px_rgba(6,182,212,0.3)]`
                                                : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-cyan-500/20 hover:text-white"
                                        )}
                                        style={{ transitionDelay: `${i * 50}ms` }}
                                    >
                                        {item.label}
                                        <Zap className={clsx(
                                            "w-4 h-4 transition-all group-hover:scale-125",
                                            isActive ? theme.text : "opacity-0 group-hover:opacity-100"
                                        )} />
                                    </NavLink>
                                );
                            })}
                        </nav>

                        <div className="mt-auto">
                            <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2 text-center">Contact Support</p>
                                <a
                                    href="https://t.me/yourusername"
                                    className="block w-full py-3 rounded-xl bg-cyan-500 text-black font-bebas tracking-widest uppercase text-center hover:scale-105 active:scale-95 transition-all"
                                >
                                    Telegram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 py-10">
                <div className="entrance-section">
                    {children}
                </div>
            </main>

            <footer className="relative z-10 mt-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-cyan-400/60" />
                            </div>
                            <span className="text-sm text-white/60">{footerData.tagline}</span>
                        </div>
                        <p className="text-xs text-center text-white/40">{footerData.copyright}</p>
                    </div>
                </div>
            </footer>

            <ScrollToTop serviceColor={serviceColor} />
        </div>
    );
};

export default ServiceLayout;
