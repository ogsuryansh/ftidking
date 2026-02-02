import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const CountryCard = ({ country, contactPath }) => {
    const [showAll, setShowAll] = useState(false);

    const services = country.services || [];
    const sortedServices = [...services].sort((a, b) =>
        a.display_order !== b.display_order
            ? a.display_order - b.display_order
            : a.courier.localeCompare(b.courier)
    );

    const limit = 5;
    const displayServices = showAll ? sortedServices : sortedServices.slice(0, limit);
    const hasMore = sortedServices.length > limit;

    return (
        <div className="group relative rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-sm overflow-hidden transition-all duration-500 ease-out hover:translate-y-[-4px] hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 border border-cyan-500/20 h-full flex flex-col">
            <div className="p-4 sm:p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                    {country.flag_emoji && (
                        <span className="text-3xl sm:text-4xl">{country.flag_emoji}</span>
                    )}
                    <div>
                        <h3 className="text-lg sm:text-xl font-orbitron font-bold text-cyan-500 group-hover:text-cyan-400 transition-colors uppercase tracking-wider">
                            {country.name}
                        </h3>
                        {country.code && (
                            <p className="text-white/40 text-xs sm:text-sm font-orbitron">{country.code}</p>
                        )}
                    </div>
                </div>

                <div className="flex-grow">
                    {sortedServices.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-orbitron font-semibold text-white/50 mb-3 uppercase tracking-widest">Services</h4>
                            <div className="grid grid-cols-1 gap-2">
                                {displayServices.map((service) => (
                                    <div key={service.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all">
                                        <span className="text-sm font-medium text-white">{service.courier}</span>
                                        <span className="text-sm font-bold text-cyan-500 font-orbitron">${service.price}</span>
                                    </div>
                                ))}
                            </div>
                            {hasMore && (
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="mt-2 w-full min-h-[44px] py-3 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 font-bold transition-colors rounded-lg font-orbitron"
                                >
                                    {showAll ? "Show Less" : `Show More (${sortedServices.length - limit} more)`}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Weighted Pricing Section */}
                    {(country.weighted_price_per_lb || country.weighted_price_per_kg) && (
                        <div className="mb-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                            <div className="flex items-center gap-2 mb-3">
                                <Package className="w-4 h-4 text-cyan-500" />
                                <span className="text-xs sm:text-sm font-orbitron font-semibold text-cyan-500 uppercase tracking-wider">Weighted Pricing</span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                                {country.weight_unit === "lb" && country.weighted_price_per_lb && (
                                    <div className="font-orbitron">
                                        <span className="text-white/40 uppercase">Per {country.weight_unit}: </span>
                                        <span className="text-cyan-500 font-bold ml-1">${country.weighted_price_per_lb}</span>
                                    </div>
                                )}
                                {country.weight_unit === "kg" && country.weighted_price_per_kg && (
                                    <div className="font-orbitron">
                                        <span className="text-white/40 uppercase">Per {country.weight_unit}: </span>
                                        <span className="text-cyan-500 font-bold ml-1">${country.weighted_price_per_kg}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-4">
                    <Link
                        to={contactPath}
                        className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-500 font-orbitron font-bold tracking-[0.2em] uppercase transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                        <span>Buy Now</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CountryCard;
