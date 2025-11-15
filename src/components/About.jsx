import React from 'react'
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import AnimatedTitle from "./AnimatedTitle.jsx";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            }
        })
        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0,

        })
    })
    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <h2 className="font-general text-base uppercase md:text-xs">Welcome to Double King</h2>

                <AnimatedTitle title="UNV<b>E</b>ILING AFRICA'S <br /> MOST V<b>I</b>SIONARY ESTATE DEVELOPER" containerClass="mt-5 !text-black text-center" />


                <div className="about-subtext">
                    <p>Behind every landmark is a team dedicated to your future, </p>
                    <p>driven by a collective vision to build the foundations of tomorrow.</p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image">
                    <img
                        src="img/about.webp"
                        alt="Background"
                        className="absolute left-0 top-0 size-full object-cover"

                    />

                </div>

            </div>
        </div>
    )
}
export default About
