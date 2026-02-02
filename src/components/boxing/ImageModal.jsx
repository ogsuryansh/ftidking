import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ imageUrl, isOpen, onClose, productName }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative max-w-7xl max-h-[90vh] w-full mx-2 sm:mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-10 sm:-top-12 right-0 sm:right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                    aria-label="Close image"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="relative w-full h-full flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={productName || "Product image"}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%231a1a2e' width='400' height='300'/%3E%3Ctext fill='%23666' font-family='Arial' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                        }}
                    />
                    {productName && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 rounded-b-lg">
                            <p className="text-white text-xs sm:text-sm font-medium text-center">{productName}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
