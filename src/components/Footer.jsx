import React from 'react'
import {
    FaDiscord,
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaEnvelope,
    FaPhoneAlt
} from "react-icons/fa";

// --- Data for Office Addresses ---
const officeLocations = [
    {
        title: "Head Office",
        address: "Suit B4/HCR plaza plot 528 Sylvester Ugo Crescent Jabi Abuja"
    },
    {
        title: "Jikwoyi Office",
        address: "Amanda plaza right Wing Ground Floor after Cele Bus stop Jikwoyi Abuja"
    },
    {
        title: "Kuje Office",
        address: "Attec plaza,plot No C6 AA3 Layout card Zone L17,Adjacent Custom barracks kuje abuja"
    },
    {
        title: "Asaba Office",
        address: "No 15 Adigwu street before summit Junction off Onitsha Benin Express way Asaba."
    },
    {
        title: "Garki Office",
        address: "No 5 Kaltungo Street Beside Zenith Bank Plc. After Garki Old Market Garki II. Abuja"
    },
    {
        title: "Gwarimpa Office",
        address: "Suits 41,44 Rvs mall Opp LG Showroom 3rd Avenue Gwarimpa Fct Abuja"
    },
    {
        title: "Utako Office",
        address: "Suits 50B Vicbalkon Tower. Utako Abuja"
    },
    {
        title: "Minna Office",
        address: "Paniel Albarka plaza minnasuit C12 Opposite Federal High Court Minna"
    }
];

// --- Data for Quick Links ---
// Updated hrefs to match the IDs in App.jsx
const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about-section' }, // Targets Timeline/Leadership/Story
    { name: 'Our Estates', href: '#products' },    // Targets Features.jsx
    { name: 'Contact Us', href: '#' },             // Special handling for Overlay
]

// --- Data for Social Links ---
const socialLinks = [
    { href: 'https://discord.com', icon: <FaDiscord /> },
    { href: 'https://twitter.com', icon: <FaTwitter /> },
    { href: 'https://instagram.com', icon: <FaInstagram /> },
    { href: 'https://facebook.com', icon: <FaFacebook /> },
]

// 1. Accept the prop here
const Footer = ({ setIsContactOpen, setIsPrivacyOpen }) => {

    // Helper to handle link clicks
    const handleLinkClick = (e, linkName) => {
        if (linkName === 'Contact Us') {
            e.preventDefault(); // Stop navigation
            setIsContactOpen(true); // Open overlay
        }
    };

    // 2. New handler for Privacy Policy
    const handlePrivacyClick = (e) => {
        e.preventDefault();
        setIsPrivacyOpen(true);
    }

    return (
        <footer className="w-screen bg-black-250 text-neutral-300">
            <div className="container mx-auto px-4 py-16">

                {/* --- Top Section: Brand Info, Quick Links, and Offices --- */}
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-4">

                    {/* --- Left Column: Brand Info (Spans 1 column) --- */}
                    <div className="lg:col-span-1">
                        <a href="https://doublekingestate.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/img/logo.png"
                                alt="Double King Estate Ltd Logo"
                                className="w-20"
                            />
                        </a>
                        <h3 className="mt-4 text-2xl font-semibold text-violet-300">
                            Double King Estate Ltd
                        </h3>
                        <p className="mt-2 text-sm text-neutral-400">
                            your realtor for life!
                        </p>
                        <a
                            href="mailto:Info@doublekingestate.com"
                            className="mt-6 flex items-center gap-3 text-base transition-colors hover:text-white"
                        >
                            <FaEnvelope />
                            <span>Info@doublekingestate.com</span>
                        </a>
                    </div>

                    {/* --- Right Columns: Links & Offices (Spans 3 columns) --- */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

                            {/* Quick Links Column */}
                            <div className="md:col-span-1">
                                <h4 className="mb-4 text-xl font-semibold text-violet-300">
                                    Quick Links
                                </h4>
                                <ul className="space-y-3">
                                    {quickLinks.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="transition-colors hover:text-white hover:underline"
                                                // 2. Attach the click handler
                                                onClick={(e) => handleLinkClick(e, link.name)}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Offices Columns (Spans 3 columns) */}
                            <div className="md:col-span-3">
                                <h4 className="mb-4 text-xl font-semibold text-violet-300">
                                    Our Offices
                                </h4>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {officeLocations.map((office) => (
                                        <div key={office.title}>
                                            <h5 className="mb-2 font-semibold text-violet-300">
                                                {office.title}
                                            </h5>
                                            <p className="text-sm leading-relaxed">{office.address}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Bar: Copyright & Socials --- */}
                <hr className="my-12 border-neutral-700" />

                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <p className="text-center text-sm md:text-left">
                        &copy; Double King Estate Ltd {new Date().getFullYear()}. All rights reserved.
                    </p>

                    <div className="flex justify-center gap-5 md:justify-start">
                        {socialLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-300 transition-colors hover:text-white"
                                style={{ fontSize: '1.5rem' }}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>

                    {/* 3. Update the Privacy Policy Link */}
                    <a
                        href="#privacy-policy"
                        className="text-center text-sm hover:text-white hover:underline md:text-right cursor-pointer"
                        onClick={handlePrivacyClick}
                    >
                        Privacy Policy
                    </a>
                </div>

                {/* --- Developer Credit & Phone --- */}
                <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-neutral-700 pt-8 text-sm md:flex-row md:gap-6">
                    <p className="text-neutral-400">
                        Developed by Engr Bright osisiogu
                    </p>
                    <a
                        href="tel:+2347045763306"
                        className="flex items-center gap-2 text-neutral-400 transition-colors hover:text-white"
                    >
                        <FaPhoneAlt />
                        <span>+2347045763306</span>
                    </a>
                </div>

            </div>
        </footer>
    )
}
export default Footer