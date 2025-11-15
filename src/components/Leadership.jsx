import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

// --- Register GSAP Plugins ---
gsap.registerPlugin(ScrollTrigger);

// --- 1. Leader Data (Unchanged) ---
const groupMD = {
    name: "Dr. EMMANUEL OSII",
    title: "Group Managing Director",
    branch: "Double King Estate Ltd",
    image: "/img/swordman.webp",
    socials: [
        { href: "#", icon: <FaLinkedin /> },
        { href: "#", icon: <FaTwitter /> },
        { href: "mailto:#", icon: <FaEnvelope /> },
    ]
};

const otherMDs = [
    {
        name: "Engr Bright Osisiogu",
        title: "Managing Director",
        branch: "Double King, Utako",
        image: "/img/bright.webp",
        socials: [
            { href: "#", icon: <FaLinkedin /> },
            { href: "#", icon: <FaTwitter /> },
            { href: "mailto:#", icon: <FaEnvelope /> },
        ]
    },
    {
        name: "Mr Ekene Ugoh",
        title: "Managing Director",
        branch: "Double King, Garki",
        image: "/img/ekene.webp",
        socials: [
            { href: "#", icon: <FaLinkedin /> },
            { href: "#", icon: <FaTwitter /> },
            { href: "mailto:#", icon: <FaEnvelope /> },
        ]
    },
    {
        name: "Mr. Datti .Y. Awwal",
        title: "Managing Director",
        branch: "Double King, Minna",
        image: "/img/datti.webp",
        socials: [
            { href: "#", icon: <FaLinkedin /> },
            { href: "#", icon: <FaTwitter /> },
            { href: "mailto:#", icon: <FaEnvelope /> },
        ]
    },
    {
        name: "Mr Uchenna Omah",
        title: "Managing Director",
        branch: "Double King, Jikwoyi",
        image: "/img/uchenna.webp",
        socials: [
            { href: "#", icon: <FaLinkedin /> },
            { href: "#", icon: <FaTwitter /> },
            { href: "mailto:#", icon: <FaEnvelope /> },
        ]
    },
    {
        name: "Mr Emmanuel Akinniyi",
        title: "Managing Director",
        branch: "Double King, Jabi (HQ)",
        image: "/img/emmanuel.webp",
        socials: [
            { href: "#", icon: <FaLinkedin /> },
            { href: "#", icon: <FaTwitter /> },
            { href: "mailto:#", icon: <FaEnvelope /> },
        ]
    },
    {
        name: "Mr Excel Popoola",
        title: "Managing Director",
        branch: "Double King, Kuje",
        image: "/img/excel.webp",
        socials: [
            { href: "#", icon: <FaLinkedin /> },
            { href: "#", icon: <FaTwitter /> },
            { href: "mailto:#", icon: <FaEnvelope /> },
        ]
    },
    {
        name: "Mr Daniel",
        title: "Managing Director",
        branch: "Double King, Gwarimpa",
        image: "/img/daniel.webp",
        socials: [
            { href: "#", icon: <FaLinkedin /> },
            { href: "#", icon: <FaTwitter /> },
            { href: "mailto:#", icon: <FaEnvelope /> },
        ]
    },
    {
        name: "Mr Chigozirim Nkele",
        title: "Managing Director",
        branch: "Double King, Asaba",
        image: "/img/nkele.webp",
        socials: [
            { href: "#", icon: <FaLinkedin /> },
            { href: "#", icon: <FaTwitter /> },
            { href: "mailto:#", icon: <FaEnvelope /> },
        ]
    },
];

// --- 2. LeaderCard Component (Unchanged) ---
// This component is already well-sized for both layouts.
const LeaderCard = ({ person }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [tiltStyle, setTiltStyle] = useState("");
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;
        const tiltX = (relativeY - 0.5) * 20;
        const tiltY = (relativeX - 0.5) * -20;
        setTiltStyle(`rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`);
    };

    const handleMouseLeave = () => {
        setTiltStyle("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    const combinedTransform = `${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'} ${tiltStyle}`;

    return (
        <div
            className="leader-card-container w-56 h-72 md:w-64 md:h-80"
            style={{ perspective: '1000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                ref={cardRef}
                className="relative w-full h-full text-center transition-transform duration-700 ease-in-out"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: combinedTransform,
                    transition: 'transform 0.7s',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Card Front */}
                <div
                    className="absolute w-full h-full bg-neutral-800 rounded-3xl overflow-hidden flex flex-col items-center"
                    style={{
                        backfaceVisibility: 'hidden',
                    }}
                >
                    <div className="w-full h-3/5">
                        <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <hr className="w-3/4 border-t border-white/20 my-3" />
                    <div className="px-4 text-center">
                        <h4 className="font-bold text-white text-lg md:text-xl">{person.name}</h4>
                        <p className="text-sm text-neutral-300">{person.title}</p>
                        <p className="text-sm text-violet-300">{person.branch}</p>
                    </div>
                </div>

                {/* Card Back */}
                <div
                    className="absolute w-full h-full bg-violet-300 rounded-3xl p-4 flex flex-col items-center justify-center text-black"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <h4 className="font-bold text-lg mb-4">Connect</h4>
                    <div className="flex gap-4">
                        {person.socials.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-3xl text-black hover:text-white transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3. Main Leadership Component (UPDATED with 2 Layouts) ---
const Leadership = () => {
    const sectionRef = useRef(null);

    // GSAP animations will only target elements in the desktop layout
    // by using specific class names that only exist there.
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                toggleActions: 'play none none none',
            }
        });

        // These classes only exist in the desktop layout
        tl.from('.org-line', {
            x: '100%',
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out'
        });

        tl.from('.group-md-card', {
            opacity: 0,
            clipPath: 'inset(50% 50% 50% 50%)',
            duration: 1,
            ease: 'power3.out'
        }, "-=1.0");

        tl.from('.other-md-card', {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, "-=0.5");

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="bg-black text-white py-24 sm:py-32 overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Header (Shared) */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold bento-title special-font text-violet-300">
                        O<b>u</b>r Lead<b>e</b>rs
                    </h2>
                    <p className="text-lg text-neutral-300 max-w-2xl mx-auto mt-4">
                        Meet our team of dedicated leaders that you can trust
                    </p>
                </div>

                {/* --- A. DESKTOP LAYOUT --- */}
                {/* This is your original code, now hidden on mobile */}
                <div className="hidden lg:flex flex-col lg:flex-row items-center justify-center gap-16 md:gap-24">
                    {/* GMD Card (Desktop) */}
                    <div className="group-md-card mt-12 md:mt-0">
                        <LeaderCard person={groupMD} />
                    </div>

                    {/* Org Chart Lines & Other MDs (Desktop) */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 w-full h-full flex items-center">
                            <div className="org-line absolute left-0 w-full h-1 bg-neutral-700">
                                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-violet-300 rounded-full"></div>
                            </div>
                        </div>
                        <div className="relative flex justify-around mb-32 md:mb-48">
                            {otherMDs.slice(0, 4).map((md) => (
                                <div key={md.name} className="flex flex-col items-center relative other-md-card">
                                    <div className="org-line absolute -top-20 md:-top-24 w-1 h-20 md:h-24 bg-neutral-700"></div>
                                    <LeaderCard person={md} />
                                </div>
                            ))}
                        </div>
                        <div className="relative flex justify-around">
                            {otherMDs.slice(4, 8).map((md) => (
                                <div key={md.name} className="flex flex-col items-center relative other-md-card">
                                    <div className="org-line absolute -bottom-20 md:-bottom-24 w-1 h-20 md:h-24 bg-neutral-700"></div>
                                    <LeaderCard person={md} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- B. NEW MOBILE LAYOUT --- */}
                {/* This section is visible ONLY on mobile/tablet */}
                <div className="block lg:hidden">
                    {/* GMD Card (Mobile) */}
                    <div className="flex justify-center mt-12">
                        <LeaderCard person={groupMD} />
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-12">
                        <hr className="flex-1 border-t-2 border-neutral-700" />
                        <span className="text-violet-300 font-semibold text-lg">Our Directors</span>
                        <hr className="flex-1 border-t-2 border-neutral-700" />
                    </div>

                    {/* MDs Horizontal Slider (Mobile) */}
                    <div
                        className="flex overflow-x-auto gap-6 p-4"
                        style={{
                            scrollSnapType: 'x mandatory',
                            // Hiding scrollbar
                            scrollbarWidth: 'none', // Firefox
                        }}
                    >
                        {otherMDs.map((md) => (
                            <div
                                key={md.name}
                                className="flex-shrink-0"
                                style={{ scrollSnapAlign: 'center' }}
                            >
                                <LeaderCard person={md} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Leadership;