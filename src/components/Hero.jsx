import React, { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedLogoLoader from "./AnimatedLogoLoader.jsx"; // Assuming this is your logo loader

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // const [loadedVideos, setLoadedVideos] = useState(0); // <-- REMOVED

    const totalVideos = 4;

    const miniVideoRef = useRef(null);
    const nextVideoRef = useRef(null);
    const baseVideoRef = useRef(null);

    // Ref to track loading state inside listeners
    const isLoadingRef = useRef(true);
    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);


    // const handleVideoLoad = () => { ... }; // <-- REMOVED

    const getVideoSrc = (index) => `videos/hero-${index}x.mp4`;
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    };

    // useEffect(() => { ... }, [loadedVideos]); // <-- REMOVED

    // iOS: attempt an early play on first touch so autoplay is unlocked
    useEffect(() => {
        const tryUnlock = () => {
            [miniVideoRef, nextVideoRef, baseVideoRef].forEach((v) => {
                if (v.current) v.current.play().catch(() => {});
            });
            window.removeEventListener("touchstart", tryUnlock);
        };
        window.addEventListener("touchstart", tryUnlock, { once: true });
        return () => window.removeEventListener("touchstart", tryUnlock);
    }, []);

    // --- NEW "RACE" LOADING LOGIC ---
    useEffect(() => {
        const video = baseVideoRef.current;
        if (!video) return;

        let failsafeTimer = null;

        const hideLoader = () => {
            // Check ref to prevent firing twice
            if (!isLoadingRef.current) return;

            isLoadingRef.current = false;
            setIsLoading(false);

            // Clean up both listeners
            if (failsafeTimer) {
                clearTimeout(failsafeTimer);
            }
            video.removeEventListener('canplaythrough', hideLoader);
        };

        // Path 1: The video loads successfully
        video.addEventListener('canplaythrough', hideLoader);

        // Path 2: The 2.5-second failsafe timer
        failsafeTimer = setTimeout(hideLoader, 2500);

        // Try to play (helps iOS)
        video.play().catch(error => {
            console.warn("Autoplay was prevented (normal on Low Power Mode):", error);
        });

        // Cleanup on unmount
        return () => {
            if (failsafeTimer) clearTimeout(failsafeTimer);
            if (video) video.removeEventListener('canplaythrough', hideLoader);
        };
    }, []); // Runs once on mount

    // === GSAP: animation when user clicks mini preview (Unchanged) ===
    useGSAP(
        () => {
            if (!hasClicked) return;
            gsap.set("#next-video", { visibility: "visible" });
            gsap.to("#next-video", {
                transformOrigin: "center center",
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.inOut",
                onStart: () => {
                    try {
                        nextVideoRef.current?.play();
                    } catch (e) {}
                },
            });
            gsap.from("#mini-video-wrapper", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.2,
                ease: "power1.inOut",
            });
            gsap.fromTo(
                "#base-video",
                { opacity: 0.9, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 1.2, ease: "power1.inOut" }
            );
        },
        { dependencies: [currentIndex, hasClicked], revertOnUpdate: true }
    );

    // === GSAP: clip-path + scroll-trigger animation (Unchanged) ===
    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
            borderRadius: "0 0 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 0 0",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <AnimatedLogoLoader />
                </div>
            )}

            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                {/* MINI PREVIEW (clickable) */}
                <div id="mini-video-wrapper" className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div onClick={handleMiniClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                        <video
                            id="mini-video"
                            ref={miniVideoRef}
                            src={getVideoSrc(upcomingVideoIndex)}
                            loop
                            muted
                            playsInline
                            preload="auto"
                            poster="/videos/hero-poster.jpg" // <-- ADDED POSTER
                            className="size-64 origin-center scale-150 object-cover object-center"
                            // onLoadedData={handleVideoLoad} // <-- REMOVED
                        />
                    </div>
                </div>

                {/* NEXT VIDEO (expanded on click) */}
                <video
                    id="next-video"
                    ref={nextVideoRef}
                    src={getVideoSrc(currentIndex)}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/videos/hero-poster.jpg" // <-- ADDED POSTER
                    className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                    // onLoadedData={handleVideoLoad} // <-- REMOVED
                />

                {/* BASE VIDEO (always visible / fallback) */}
                <video
                    id="base-video"
                    ref={baseVideoRef}
                    src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/videos/hero-poster.jpg" // <-- ADDED POSTER
                    className="absolute left-0 top-0 size-full object-cover object-center"
                    // onLoadedData={handleVideoLoad} // <-- REMOVED
                />

                {/* text layers */}
                <h2 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    L<b>u</b>x<b>u</b>ry re<b>d</b>efi<b>n</b>ed
                </h2>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            Do<b>u</b>ble Ki<b>n</b>g
                        </h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Building More Than Just Homes. <br /> Creating Your Lasting Legacy
                        </p>

                        <a href="#about-section">
                            <Button
                                id="watch-trailer"
                                title="Experience the Journey"
                                leftIcon={<TiLocationArrow />}
                                containerClass="bg-yellow-100 flex-center gap-1"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                redefi<b>n</b>ed
            </h1>
        </div>
    );
};

export default Hero;