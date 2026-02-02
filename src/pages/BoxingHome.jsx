import React, { useState, useMemo, useEffect } from 'react';
import ServiceLayout from '../components/layout/ServiceLayout';
import CountryCard from '../components/boxing/CountryCard';
import ReceiptCard from '../components/boxing/ReceiptCard';
import SearchBar from '../components/boxing/SearchBar';
import ImageModal from '../components/boxing/ImageModal';
import { Package, RotateCw, Box } from 'lucide-react';

const mockCountries = [
    {
        id: "us", name: "United States", code: "US", flag_emoji: "🇺🇸",
        services: [
            { id: "1", courier: "UPS", price: 25, display_order: 1 },
            { id: "2", courier: "FedEx", price: 30, display_order: 2 }
        ],
        weight_unit: "lb", weighted_price_per_lb: 5
    },
    {
        id: "ca", name: "Canada", code: "CA", flag_emoji: "🇨🇦",
        services: [
            { id: "3", courier: "Canada Post", price: 20, display_order: 1 }
        ],
        weight_unit: "lb", weighted_price_per_lb: 6
    },
    {
        id: "uk", name: "United Kingdom", code: "UK", flag_emoji: "🇬🇧",
        services: [
            { id: "4", courier: "Royal Mail", price: 15, display_order: 1 }
        ],
        weight_unit: "kg", weighted_price_per_kg: 10
    }
];

const mockReceipts = [
    {
        id: "r1", name: "Amazon Receipt", price: 10, country: { id: "us", name: "United States", flag_emoji: "🇺🇸" },
        image: "https://placehold.co/600x800", display_order: 1
    },
    {
        id: "r2", name: "Apple Receipt", price: 15, country: { id: "us", name: "United States", flag_emoji: "🇺🇸" },
        image: "https://placehold.co/600x800", display_order: 2
    }
];

const BoxingHome = () => {
    const [activeTab, setActiveTab] = useState("boxing");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    // Mock Loading
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const navItems = [
        { label: "Home", path: "/boxing" },
        { label: "FAQ", path: "/boxing/faq" },
        { label: "TOS", path: "/boxing/tos" },
        { label: "Contact", path: "/boxing/contact" }
    ];

    const heroData = {
        title: "BOXING SERVICES",
        description: "Top tier boxing & FTID services worldwide.\nProfessional shipping solutions for your packages.",
        trustBadges: ["Verified Methods", "Fast Processing", "24/7 Support", "Secure"],
        stats: [
            { label: "Countries", value: "21", suffix: "+" },
            { label: "Success Rate", value: "98", suffix: "%" },
            { label: "Services", value: "100", suffix: "+" },
            { label: "Support", value: "24/7", suffix: "" }
        ]
    };

    const filteredCountries = useMemo(() => {
        if (!searchQuery) return mockCountries;
        const lower = searchQuery.toLowerCase();
        return mockCountries.filter(c =>
            c.name.toLowerCase().includes(lower) ||
            (c.code && c.code.toLowerCase().includes(lower))
        );
    }, [searchQuery]);

    // Group receipts by country ID
    const receiptsByCountry = useMemo(() => {
        const grouped = {};
        mockReceipts.forEach(r => {
            if (!grouped[r.country.id]) {
                grouped[r.country.id] = {
                    country: r.country,
                    receipts: []
                };
            }
            grouped[r.country.id].receipts.push(r);
        });

        let countries = Object.values(grouped);

        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            countries = countries.filter(group => {
                const countryMatch = group.country.name.toLowerCase().includes(lower);
                if (countryMatch) return true;
                const receiptMatch = group.receipts.some(r => r.name.toLowerCase().includes(lower));
                return receiptMatch;
            });
        }

        return countries;
    }, [searchQuery]);


    return (
        <ServiceLayout
            serviceName="Boxing"
            serviceColor="cyan"
            navItems={navItems}
        >
            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16 relative z-10 animate-fade-up px-2">
                <div className="relative inline-block mb-4 sm:mb-6">
                    <Box className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-500 opacity-80" />
                </div>
                <h1
                    className="text-5xl sm:text-6xl md:text-8xl font-bebas tracking-wider mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 animate-fade-up"
                    style={{ animationDelay: "0.1s" }}
                >
                    {heroData.title}
                </h1>
                <p
                    className="text-white/50 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed whitespace-pre-line break-words animate-fade-up px-2"
                    style={{ animationDelay: "0.2s" }}
                >
                    {heroData.description}
                </p>

                <div
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 animate-fade-up"
                    style={{ animationDelay: "0.3s" }}
                >
                    {heroData.trustBadges.map((badge, i) => (
                        <span key={i} className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
                            ✓ {badge}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 relative z-10 w-full max-w-[1400px] mx-auto">
                {heroData.stats.map((stat, i) => (
                    <div
                        key={i}
                        className="group rounded-2xl bg-black/40 border border-cyan-500/20 p-6 sm:p-8 text-center transition-all duration-500 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] animate-fade-up backdrop-blur-sm"
                        style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                    >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <Package className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-500" />
                        </div>
                        <p className="text-3xl sm:text-4xl font-bebas text-white mb-1 tracking-widest group-hover:text-cyan-500 transition-colors">
                            {stat.value}<span className="text-xl sm:text-2xl text-cyan-500 font-sans">{stat.suffix}</span>
                        </p>
                        <p className="text-xs sm:text-sm text-white/50 uppercase tracking-[0.2em] font-medium">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 relative z-10">
                    <RotateCw className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                    <p className="text-white/60">Loading services...</p>
                </div>
            )}

            {!loading && (
                <>
                    {/* Tabs */}
                    <div
                        className="flex gap-4 mb-8 sm:mb-12 relative z-10 animate-fade-up w-full max-w-4xl mx-auto"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <button
                            onClick={() => setActiveTab('boxing')}
                            className={`flex-1 px-8 py-4 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 border-2 ${activeTab === 'boxing'
                                ? "bg-cyan-500/10 border-cyan-500 text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                                : "bg-black/40 border-white/5 text-white/40 hover:border-cyan-500/50 hover:text-white"
                                }`}
                        >
                            <Box className="w-5 h-5" />
                            Boxing
                        </button>
                        <button
                            onClick={() => setActiveTab('receipts')}
                            className={`flex-1 px-8 py-4 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 border-2 ${activeTab === 'receipts'
                                ? "bg-cyan-500/10 border-cyan-500 text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                                : "bg-black/40 border-white/5 text-white/40 hover:border-cyan-500/50 hover:text-white"
                                }`}
                        >
                            <RotateCw className="w-5 h-5" />
                            Receipts
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6 sm:mb-8 relative z-10 animate-fade-up" style={{ animationDelay: "0.5s" }}>
                        <SearchBar
                            onSearch={setSearchQuery}
                            placeholder={activeTab === 'boxing' ? "Search countries..." : "Search receipts..."}
                        />
                    </div>

                    {/* Content Grid */}
                    {activeTab === 'boxing' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 relative z-10">
                            {filteredCountries.map((country, idx) => (
                                <div key={country.id} className="animate-fade-up h-full" style={{ animationDelay: `${0.6 + idx * 0.1}s` }}>
                                    <CountryCard
                                        country={country}
                                        contactPath="/boxing/contact"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'receipts' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 relative z-10">
                            {receiptsByCountry.map((group, idx) => (
                                <div key={group.country.id} className="animate-fade-up h-full" style={{ animationDelay: `${0.6 + idx * 0.1}s` }}>
                                    <ReceiptCard
                                        country={group.country}
                                        receipts={group.receipts}
                                        contactPath="/boxing/contact"
                                        onReceiptClick={(r) => r.image && setSelectedImage({ url: r.image, name: r.name })}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'boxing' && filteredCountries.length === 0 && (
                        <div className="text-center py-12 sm:py-16 relative z-10 animate-fade-up">
                            <p className="text-white/40 text-base sm:text-lg font-medium">No countries found</p>
                        </div>
                    )}
                </>
            )}

            <ImageModal
                isOpen={!!selectedImage}
                imageUrl={selectedImage?.url}
                productName={selectedImage?.name}
                onClose={() => setSelectedImage(null)}
            />
        </ServiceLayout>
    );
};

export default BoxingHome;
