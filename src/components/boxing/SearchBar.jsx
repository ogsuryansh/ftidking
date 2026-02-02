import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search countries..." }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(value);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [value, onSearch]);

    return (
        <div className="relative w-full max-w-md mx-auto mb-8">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                />
            </div>
        </div>
    );
};

export default SearchBar;
