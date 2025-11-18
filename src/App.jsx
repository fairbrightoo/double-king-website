import React, { useState, useEffect } from 'react';
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Features from "./components/Features.jsx";
import Story from "./components/Story.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Timeline from "./components/Timeline.jsx";
import Leadership from "./components/Leadership.jsx";
import Contactform from "./components/Contactform.jsx";
import ExploreOverlay from './components/ExploreOverlay.jsx';
import PrivacyOverlay from './components/PrivacyOverlay.jsx';
import PropertyContactForm from './components/PropertyContactForm.jsx';

const App = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const [estatesData, setEstatesData] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
        const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
        const RANGE = 'Sheet1!E3:P';

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
                );
                const data = await response.json();

                const processedData = processSheetData(data.values || []);
                setEstatesData(processedData);
                setIsDataLoading(false);
            } catch (error) {
                console.error("Error fetching sheet data:", error);
                setIsDataLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- HELPER FUNCTION ---
    const processSheetData = (rows) => {
        const estatesMap = new Map();

        for (const row of rows) {
            // --- FIX IS HERE ---
            // Changed variable names to match your sheet
            const [
                id, plainTitle, location, description, src, youtubeLink,
                prototypeName, prototypeImage, prototypeStatus, prototypePlotSize, prototypeOldPrice, prototypeNewPrice
            ] = row;

            const prototype = {
                name: prototypeName,     // <-- Use prototypeName
                image: prototypeImage,   // <-- Use prototypeImage
                status: prototypeStatus,
                plotSize: prototypePlotSize,
                oldPrice: prototypeOldPrice,
                newPrice: prototypeNewPrice,
            };
            // --- END OF FIX ---

            if (estatesMap.has(id)) {
                estatesMap.get(id).prototypes.push(prototype);
            } else {
                estatesMap.set(id, {
                    id,
                    plainTitle,
                    location,
                    description,
                    src,
                    youtubeLink,
                    title: <>{plainTitle.split('').map((char, i) => i % 3 === 1 ? <b key={i}>{char}</b> : char)}</>,
                    prototypes: [prototype]
                });
            }
        }
        return Array.from(estatesMap.values());
    };


    const handlePropertyContact = (property) => {
        setSelectedProperty(property);
    };

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Navbar setIsContactOpen={setIsContactOpen} />

            <div id="home">
                <Hero />
            </div>

            <About />

            <div id="products">
                <Features
                    setIsExploreOpen={setIsExploreOpen}
                    onContact={handlePropertyContact}
                    estatesData={estatesData}
                    isLoading={isDataLoading}
                />
            </div>

            <div id="about-section">
                <Timeline isLoading={isDataLoading} />
                <Leadership />
                <Story setIsExploreOpen={setIsExploreOpen} />
            </div>

            <Contact setIsContactOpen={setIsContactOpen} />

            <Footer
                setIsContactOpen={setIsContactOpen}
                setIsPrivacyOpen={setIsPrivacyOpen}
            />

            {isContactOpen && <Contactform onClose={() => setIsContactOpen(false)} />}

            {isPrivacyOpen && <PrivacyOverlay onClose={() => setIsPrivacyOpen(false)} />}

            {isExploreOpen && (
                <ExploreOverlay
                    onClose={() => setIsExploreOpen(false)}
                    onContact={handlePropertyContact}
                    estatesData={estatesData}
                />
            )}

            {selectedProperty && (
                <PropertyContactForm
                    property={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                />
            )}
        </main>
    )
}
export default App;