import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const ReceiptCard = ({ country, receipts, contactPath, onReceiptClick }) => {
    const [showAll, setShowAll] = useState(false);

    const sortedReceipts = [...receipts].sort((a, b) =>
        (a.display_order || 0) - (b.display_order || 0) || a.name.localeCompare(b.name)
    );

    const limit = 5;
    const displayReceipts = showAll ? sortedReceipts : sortedReceipts.slice(0, limit);
    const hasMore = sortedReceipts.length > limit;

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
                    {sortedReceipts.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-orbitron font-semibold text-white/50 mb-3 uppercase tracking-widest">Receipts</h4>
                            <div className="grid grid-cols-1 gap-2">
                                {displayReceipts.map((receipt) => (
                                    <div
                                        key={receipt.id}
                                        onClick={() => onReceiptClick && onReceiptClick(receipt)}
                                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
                                    >
                                        <span className="text-sm font-medium text-white">{receipt.name}</span>
                                        <span className="text-sm font-bold text-cyan-500 font-orbitron">${receipt.price}</span>
                                    </div>
                                ))}
                            </div>
                            {hasMore && (
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="mt-2 w-full min-h-[44px] py-3 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 font-bold transition-colors rounded-lg font-orbitron"
                                >
                                    {showAll ? "Show Less" : `Show More (${sortedReceipts.length - limit} more)`}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-4">
                    <Link
                        to={contactPath}
                        className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-500 font-orbitron font-bold tracking-[0.2em] uppercase transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReceiptCard;
