import React, { useState } from 'react';
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
import PrivacyOverlay from './components/PrivacyOverlay.jsx'; // <-- 1. Import
import PropertyContactForm from './components/PropertyContactForm.jsx'; // 1. Import new form

const App = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);

    // 2. Create State for Privacy Overlay
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    // 2. New State for Selected Property Form
    const [selectedProperty, setSelectedProperty] = useState(null);

    // 3. Helper function to open the form with specific property data
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
                />
            </div>

            <div id="about-section">
                <Timeline />
                <Leadership />
                <Story setIsExploreOpen={setIsExploreOpen} />
            </div>

            <Contact setIsContactOpen={setIsContactOpen} />

            {/* 3. Pass the setter to Footer */}
            <Footer
                setIsContactOpen={setIsContactOpen}
                setIsPrivacyOpen={setIsPrivacyOpen}
            />

            {isContactOpen && (
                <Contactform onClose={() => setIsContactOpen(false)} />
            )}

            {isExploreOpen && (
                <ExploreOverlay
                    onClose={() => setIsExploreOpen(false)}
                    onContact={handlePropertyContact}
                />
            )}

            {/* 4. Render Privacy Overlay */}
            {isPrivacyOpen && (
                <PrivacyOverlay onClose={() => setIsPrivacyOpen(false)} />
            )}

            {/* 6. Render the Property Contact Form if a property is selected */}
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