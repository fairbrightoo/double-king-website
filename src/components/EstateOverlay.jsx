import React from 'react';
import { TiTimes } from "react-icons/ti"; // This is the correct "X" icon
import { FaYoutube } from "react-icons/fa";
import PrototypeCard from './PrototypeCard.jsx'; // <-- Added .jsx extension

const EstateOverlay = ({ estate, onClose, onContact }) => {
    return (
        // Backdrop
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-lg"
            onClick={onClose} // Close when clicking backdrop
        >
            {/* Modal Content */}
            <div
                className="relative w-full max-w-7xl h-full max-h-[90vh] bg-neutral-900/50 text-white rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-2 flex-shrink-0">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-violet-300 special-font">{estate.plainTitle}</h2>
                        {estate.youtubeLink && (
                            <a
                                href={estate.youtubeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors mt-2"
                            >
                                <FaYoutube className="text-red-500" />
                                <span>watch site video on youtube</span>
                            </a>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-4xl text-neutral-400 hover:text-white transition-colors"
                    >
                        <TiTimes /> {/* Use the correct icon name */}
                    </button>
                </div>

                {/* Horizontal Scrolling Carousel */}
                <div
                    className="flex-1 py-6 overflow-x-auto"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#7D6B34 #333'
                    }}
                >
                    <div className="flex gap-6 pb-4 pr-6 snap-x snap-mandatory">
                        {estate.prototypes.map((proto, index) => (
                            <PrototypeCard
                                key={`${proto.name}-${index}`}
                                prototype={proto}
                                onContact={onContact}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstateOverlay;