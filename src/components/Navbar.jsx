import React, { useEffect, useRef, useState } from 'react';
import Button from "./Button.jsx";
import { TiLocationArrow, TiThMenu, TiTimes } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navItems = ['Home', 'About', 'Contact'];

const Navbar = ({ setIsContactOpen }) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();

    const handleNavClick = (e, item) => {
        if (item === 'Contact') {
            e.preventDefault();
            setIsContactOpen(true);
        }
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    useGSAP(() => {
        gsap.set(mobileMenuRef.current, { x: '100%', autoAlpha: 0 });
    }, []);

    useGSAP(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            const tl = gsap.timeline();
            tl.to(mobileMenuRef.current, {
                x: '0%',
                autoAlpha: 1,
                duration: 0.5,
                ease: 'power3.out',
            });
            tl.fromTo('.mobile-nav-item',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
                "-=0.3"
            );
        } else {
            document.body.style.overflow = 'auto';
            gsap.to(mobileMenuRef.current, {
                x: '100%',
                autoAlpha: 0,
                duration: 0.4,
                ease: 'power3.in',
            });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-24 border-none transition-all duration-700 sm:inset-x-6">
                <header className="absolute top-1/2 w-full -translate-y-1/2">
                    <nav className="flex size-full items-center justify-between p-4">
                        <div className="flex items-center gap-7">
                            <img src="/img/logo.png" alt="logo" className="w-32 cursor-pointer" onClick={() => window.location.href = '/'} />

                            {/* Added '/' to href here as well */}
                            <a href="/#products" className="hidden md:block">
                                <Button
                                    id="product-button"
                                    title="Products"
                                    rightIcon={<TiLocationArrow />}
                                    containerClass="bg-blue-50 flex items-center justify-center gap-1"
                                />
                            </a>
                        </div>

                        <div className="flex h-full items-center">
                            <div className="hidden md:block">
                                {navItems.map((item) => (
                                    <a
                                        key={item}
                                        // --- FIX START ---
                                        // Added '/' before the hash to make it an absolute path
                                        href={
                                            item === 'Contact' ? '#' :
                                                item === 'About' ? '/#about-section' :
                                                    `/#${item.toLowerCase()}`
                                        }
                                        // --- FIX END ---
                                        className="nav-hover-btn !text-xl mx-4"
                                        onClick={(e) => handleNavClick(e, item)}
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>

                            <button className="ml-5 md:ml-10 flex items-center space-x-0.5" onClick={toggleAudioIndicator}>
                                <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
                                {[1, 2, 3, 4].map((bar) => (
                                    <div
                                        key={bar}
                                        className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                        style={{ animationDelay: `${bar * 0.1}s` }}
                                    />
                                ))}
                            </button>

                            <button
                                className="ml-5 text-3xl text-white md:hidden z-[60] relative"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <TiTimes /> : <TiThMenu />}
                            </button>
                        </div>
                    </nav>
                </header>
            </div>

            <div
                ref={mobileMenuRef}
                className="fixed inset-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-black/95 backdrop-blur-lg text-white invisible opacity-0"
            >
                <div className="flex flex-col items-center space-y-8">
                    {navItems.map((item) => (
                        <a
                            key={item}
                            // --- FIX START ---
                            // Added '/' here as well for mobile menu
                            href={
                                item === 'Contact' ? '#' :
                                    item === 'About' ? '/#about-section' :
                                        `/#${item.toLowerCase()}`
                            }
                            // --- FIX END ---
                            className="mobile-nav-item text-4xl font-bold uppercase tracking-widest hover:text-violet-300 transition-colors"
                            onClick={(e) => handleNavClick(e, item)}
                        >
                            {item}
                        </a>
                    ))}

                    <div className="mobile-nav-item pt-8">
                        {/* Added '/' here too */}
                        <a href="/#products" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button
                                id="mobile-product-button"
                                title="View Products"
                                rightIcon={<TiLocationArrow />}
                                containerClass="bg-violet-300 text-black px-8 py-4 flex items-center justify-center gap-2"
                            />
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-violet-900/20 to-transparent pointer-events-none"></div>
            </div>
        </>
    )
}
export default Navbar;