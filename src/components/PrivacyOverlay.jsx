import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { TiTimes } from "react-icons/ti";

const PrivacyOverlay = ({ onClose }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        gsap.from(contentRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-4xl max-h-[85vh] bg-neutral-900 rounded-2xl border border-neutral-800 text-neutral-300 overflow-hidden flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- Header (Sticky) --- */}
                <div className="flex justify-between items-center p-6 border-b border-neutral-800 bg-neutral-900 z-10">
                    <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
                    <button
                        onClick={onClose}
                        className="text-3xl text-neutral-500 hover:text-white transition-colors"
                    >
                        <TiTimes />
                    </button>
                </div>

                {/* --- Scrollable Content --- */}
                <div className="p-6 md:p-8 overflow-y-auto scrollbar-hide space-y-6 text-sm md:text-base leading-relaxed">
                    <p>Last updated: November 2025</p>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-violet-300">1. Introduction</h3>
                        <p>
                            Welcome to Double King Estate Ltd. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-violet-300">2. Information We Collect</h3>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-violet-300">3. How We Use Your Data</h3>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                            <li>To process your inquiries about our properties.</li>
                            <li>To manage our relationship with you.</li>
                            <li>To improve our website, products/services, marketing, and customer relationships.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-violet-300">4. Contact Us</h3>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: <span className="text-white">Info@doublekingestate.com</span>
                        </p>
                    </div>

                    {/* Bottom spacing */}
                    <div className="h-8"></div>
                </div>
            </div>
        </section>
    );
};

export default PrivacyOverlay;