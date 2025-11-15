import React, { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;

    // ==== Separate refs (one ref per video) ====
    const miniVideoRef = useRef(null);    // small preview inside mask
    const nextVideoRef = useRef(null);    // the "expanded" next video after click
    const baseVideoRef = useRef(null);    // always-playing background/base video

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    const getVideoSrc = (index) => `videos/hero-${index}x.mp4`;
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    };

    useEffect(() => {
        if (loadedVideos >= totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

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

    // === GSAP: animation when user clicks mini preview ===
    useGSAP(
        () => {
            if (!hasClicked) return;

            // Ensure next video is visible and animate it in
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
                    } catch (e) {
                        // ignore play errors
                    }
                },
            });

            // Animate mini preview wrapper (scale-out or other effect)
            gsap.from("#mini-video-wrapper", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.2,
                ease: "power1.inOut",
            });

            // If you want to also animate the base video slightly (fade/scale),
            // you can do so here:
            gsap.fromTo(
                "#base-video",
                { opacity: 0.9, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 1.2, ease: "power1.inOut" }
            );
        },
        { dependencies: [currentIndex, hasClicked], revertOnUpdate: true }
    );

    // === GSAP: clip-path + scroll-trigger animation (restored) ===
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
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
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
                            className="size-64 origin-center scale-150 object-cover object-center"
                            onLoadedData={handleVideoLoad}
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
                    className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                    onLoadedData={handleVideoLoad}
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
                    className="absolute left-0 top-0 size-full object-cover object-center"
                    onLoadedData={handleVideoLoad}
                />

                {/* text layers */}
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    L<b>u</b>x<b>u</b>ry re<b>d</b>efi<b>n</b>ed
                </h1>

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
