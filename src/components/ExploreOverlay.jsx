import React, { useState, useEffect } from 'react';
import { TiTimes, TiArrowSortedDown } from "react-icons/ti";
import PrototypeCard from './PrototypeCard.jsx';
import { estatesData } from './estatesData.jsx';

const ExploreOverlay = ({ onClose, onContact }) => {
    // 1. Extract unique locations from data
    const locations = [...new Set(estatesData.map(item => item.location))];

    // 2. State for filtering
    const [activeLocation, setActiveLocation] = useState(locations[0]);
    const [activeEstateId, setActiveEstateId] = useState('');

    // 3. Filter estates based on active location
    const filteredEstates = estatesData.filter(e => e.location === activeLocation);

    // 4. Automatically select the first estate when location changes
    useEffect(() => {
        if (filteredEstates.length > 0) {
            setActiveEstateId(filteredEstates[0].id);
        }
    }, [activeLocation]);

    // 5. Find the currently selected estate object to get its prototypes
    const currentEstate = filteredEstates.find(e => e.id === activeEstateId);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-7xl h-[90vh] bg-neutral-900 text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- Header Section --- */}
                <div className="p-6 border-b border-neutral-800 bg-neutral-900 z-10">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-lg md:text-xl text-neutral-300">
                            Tap a location tab to view our available estates
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-3xl text-neutral-400 hover:text-white transition-colors"
                        >
                            <TiTimes />
                        </button>
                    </div>

                    {/* --- Tabs (Locations) --- */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {locations.map((loc) => (
                            <button
                                key={loc}
                                onClick={() => setActiveLocation(loc)}
                                className={`px-6 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-all border ${
                                    activeLocation === loc
                                        ? 'bg-violet-300 text-black border-violet-300'
                                        : 'bg-transparent text-neutral-400 border-neutral-700 hover:border-white hover:text-white'
                                }`}
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Main Content Section (Scrollable) --- */}
                <div className="flex-1 overflow-y-auto p-6">

                    {/* --- Estate Selector (Dropdown) --- */}
                    <div className="mb-8">
                        <label className="block text-sm text-neutral-500 mb-2 uppercase tracking-wider">
                            Select an Estate in {activeLocation}
                        </label>
                        <div className="relative max-w-md">
                            <select
                                value={activeEstateId}
                                onChange={(e) => setActiveEstateId(e.target.value)}
                                className="w-full appearance-none bg-neutral-800 text-white text-lg py-3 px-4 pr-10 rounded-lg border border-neutral-700 focus:outline-none focus:border-violet-300 cursor-pointer"
                            >
                                {filteredEstates.map((estate) => (
                                    <option key={estate.id} value={estate.id}>
                                        {estate.plainTitle}
                                    </option>
                                ))}
                            </select>
                            <TiArrowSortedDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-xl" />
                        </div>
                    </div>

                    {/* --- Prototypes Grid --- */}
                    {currentEstate && (
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-violet-300 pl-4">
                                Available Prototypes
                            </h3>

                            {/* Reusing PrototypeCard, but in a Grid layout instead of a slider */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center md:justify-items-start">
                                {currentEstate.prototypes.map((proto, index) => (
                                    <PrototypeCard
                                        key={`${proto.name}-${index}`}
                                        prototype={proto}
                                        onContact={onContact}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExploreOverlay;