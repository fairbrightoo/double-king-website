import React, { useState } from 'react';
import { TiLocationArrow } from "react-icons/ti";

// Import components
import { estatesData } from './estatesData.jsx';
import BentoTilt from './BentoTilt.jsx';
import BentoCard from './BentoCard.jsx';
import EstateOverlay from './EstateOverlay.jsx';
// Removed ExploreOverlay import (it's in App.jsx now)

// 1. Accept the prop
const Features = ({ setIsExploreOpen, onContact }) => {
    const [selectedEstate, setSelectedEstate] = useState(null);

    // Removed local isExploreOpen state

    const primelux = estatesData.find(e => e.id === 'primelux');
    const treasuregate = estatesData.find(e => e.id === 'treasuregate');
    const peaceland = estatesData.find(e => e.id === 'peaceland');
    const sunview = estatesData.find(e => e.id === 'sunview');

    return (
        <section className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32 text-center">
                    <p className="font-circular-web text-lg bento-title text-blue-50">Explore Our Visionary Estates</p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50 mx-auto">
                        Immerse yourself in our portfolio of landmark developments, where luxury,
                        innovation, and unparalleled design converge to shape your world.
                    </p>
                </div>

                {primelux && (
                    <BentoTilt
                        className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
                        onClick={() => setSelectedEstate(primelux)}
                    >
                        <BentoCard {...primelux} />
                    </BentoTilt>
                )}

                <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
                    {treasuregate && (
                        <BentoTilt
                            className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2"
                            onClick={() => setSelectedEstate(treasuregate)}
                        >
                            <BentoCard {...treasuregate} />
                        </BentoTilt>
                    )}

                    {peaceland && (
                        <BentoTilt
                            className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0"
                            onClick={() => setSelectedEstate(peaceland)}
                        >
                            <BentoCard {...peaceland} />
                        </BentoTilt>
                    )}

                    {sunview && (
                        <BentoTilt
                            className="bento-tilt_1 me-14 md:col-span-1 md:me-0"
                            onClick={() => setSelectedEstate(sunview)}
                        >
                            <BentoCard {...sunview} />
                        </BentoTilt>
                    )}

                    <BentoTilt
                        className="bento-tilt_2"
                        onClick={() => setIsExploreOpen(true)} // 2. Use the prop here
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
            </div>

            {/* Render Single Estate Overlay (Still local) */}
            {selectedEstate && (
                <EstateOverlay
                    estate={selectedEstate}
                    onClose={() => setSelectedEstate(null)}
                    onContact={onContact}
                />
            )}

            {/* Removed ExploreOverlay rendering (Moved to App.jsx) */}
        </section>
    )
}
export default Features;