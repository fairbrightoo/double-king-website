import React, { useState } from 'react';
import { TiLocationArrow } from "react-icons/ti";

// Import components
import BentoTilt from './BentoTilt.jsx';
import BentoCard from './BentoCard.jsx';
import EstateOverlay from './EstateOverlay.jsx';

const Features = ({ setIsExploreOpen, onContact, estatesData, isLoading }) => {
    const [selectedEstate, setSelectedEstate] = useState(null);

    const primelux = !isLoading && estatesData.find(e => e.id === 'primelux');
    const treasuregate = !isLoading && estatesData.find(e => e.id === 'treasuregate');
    const peaceland = !isLoading && estatesData.find(e => e.id === 'peaceland');
    const sunview = !isLoading && estatesData.find(e => e.id === 'sunview');

    return (
        <section className="bg-black pb-52 relative">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32 text-center">
                    <p className="font-circular-web text-lg bento-title text-blue-50">Explore Our Visionary Estates</p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50 mx-auto">
                        Immerse yourself in our portfolio of landmark developments, where luxury,
                        innovation, and unparalleled design converge to shape your world.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex-center h-96 w-full text-white/50 text-lg">
                        Loading Estates...
                    </div>
                ) : (
                    <>
                        {primelux && (
                            <BentoTilt
                                className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
                                onClick={() => setSelectedEstate(primelux)}
                            >
                                <BentoCard {...primelux} />
                            </BentoTilt>
                        )}

                        {/* --- 1. GRID CONTAINER UPDATED --- */}
                        {/* Mobile: grid-cols-1, auto height */}
                        {/* Desktop: md:grid-cols-2, md:grid-rows-3, fixed height */}
                        <div className="grid h-auto grid-cols-1 md:h-[135vh] md:grid-cols-2 md:grid-rows-3 gap-7">
                            {treasuregate && (
                                <BentoTilt
                                    className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2"
                                    onClick={() => setSelectedEstate(treasuregate)}
                                >
                                    <BentoCard {...treasuregate} />
                                </BentoTilt>
                            )}

                            {peaceland && (
                                // --- 2. MARGINS REMOVED ---
                                <BentoTilt
                                    className="bento-tilt_1 row-span-1 md:col-span-1"
                                    onClick={() => setSelectedEstate(peaceland)}
                                >
                                    <BentoCard {...peaceland} />
                                </BentoTilt>
                            )}

                            {sunview && (
                                // --- 3. MARGINS REMOVED ---
                                <BentoTilt
                                    className="bento-tilt_1 row-span-1 md:col-span-1"
                                    onClick={() => setSelectedEstate(sunview)}
                                >
                                    <BentoCard {...sunview} />
                                </BentoTilt>
                            )}

                            <BentoTilt
                                className="bento-tilt_2"
                                onClick={() => setIsExploreOpen(true)}
                            >
                                <div className="flex size-full flex-col justify-between bg-violet-300 p-5 cursor-pointer">
                                    <h1 className="bento-title special-font max-w-64 text-black">Expl<b>o</b>re m<b>o</b>re pr<b>o</b>p<b>e</b>rties!</h1>
                                    <TiLocationArrow className="m-5 scale-[5] self-end" />
                                </div>
                            </BentoTilt>

                            <BentoTilt className="bento-tilt_2">
                                {<img src="/img/estate.png"/>}
                            </BentoTilt>
                        </div>
                    </>
                )}

            </div>

            {selectedEstate && (
                <EstateOverlay
                    estate={selectedEstate}
                    onClose={() => setSelectedEstate(null)}
                    onContact={onContact}
                />
            )}
        </section>
    )
}
export default Features;