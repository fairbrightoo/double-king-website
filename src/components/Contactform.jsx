import React, {useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from "./Button";
import { TiLocationArrow, TiTimes } from "react-icons/ti";
import emailjs from '@emailjs/browser'; // 1. Import EmailJS

// Accept 'onClose' as a prop
const Contactform = ({ onClose }) => {
    const containerRef = useRef(null);
    const formBoxRef = useRef(null);
    const formRef = useRef(); // 2. Ref for the actual HTML form

    // 3. State for loading/success
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    useGSAP(() => {
        gsap.from(formBoxRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        });

        gsap.from('.contact-anim', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.2
        });
    }, { scope: containerRef });

    // 4. Handle Submit Function
    const sendEmail = (e) => {
        e.preventDefault(); // Stop page reload
        setIsSubmitting(true);

        // This is your new "record to sheet" function
        const recordToSheet = () => {
            const formData = new FormData(formRef.current);
            // We fetch the data to our script URL
            fetch(import.meta.env.VITE_GOOGLE_SHEET_WEB_APP_URL, {
                method: "POST",
                body: formData
            }).then(res => res.json()).then(data => {
                console.log("Google Sheet Response:", data);
            }).catch(err => {
                console.error("Google Sheet Error:", err);
            });
        };

        // Replace these with your actual IDs from Step 1
        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                // 2. If successful, Send Auto-Reply to CLIENT
                // We use the SAME form data, just a different Template ID
                return emailjs.sendForm(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID, // <--- The New Template ID
                    formRef.current,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                );
            })
            .then((result) => {
                console.log("Both emails sent!");
                // --- CALL THE NEW FUNCTION HERE ---
                recordToSheet(); // <-- Add this line
                setIsSubmitting(false);
                setSubmitStatus('success');
                e.target.reset(); // Clear the form

                // Optional: Close form after 3 seconds
                setTimeout(() => {
                    onClose();
                    setSubmitStatus(null);
                }, 3000);
            })
            .catch( (error) => {
                console.error("Email Error:", error);
                setIsSubmitting(false);
                setSubmitStatus('error');
            });
    };

    return (
        <section
            ref={containerRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            onClick={onClose}
        >
            <div
                ref={formBoxRef}
                // FIX: Added 'overflow-x-hidden'.
                // This allows vertical scrolling (y-auto) for mobile but kills the side-scrolling.
                className="relative w-full max-w-6xl max-h-[85vh] overflow-y-auto overflow-x-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 bg-neutral-900 p-6 md:p-8 rounded-2xl border border-neutral-800 text-white scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Gradient Blob */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl text-neutral-500 hover:text-white transition-colors z-10"
                >
                    <TiTimes />
                </button>

                {/* Text Side */}
                <div className="flex flex-col justify-center">
                    <h2 className="contact-anim text-3xl md:text-4xl font-bold special-font mb-4 md:mb-6">
                        Let's Build Your <br /> Legacy
                    </h2>
                    <p className="contact-anim text-base md:text-lg text-neutral-400 mb-6 md:mb-8 max-w-md">
                        Ready to secure your future? Whether you are looking for a new home or an investment opportunity, our team is here to guide you.
                    </p>

                    <div className="contact-anim space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-violet-300">
                                <TiLocationArrow className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">Visit Us</p>
                                <p className="font-semibold">Suit B4, HCR Plaza, Jabi, Abuja</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="contact-anim bg-neutral-900/50 border border-neutral-800 p-6 md:p-8 rounded-2xl backdrop-blur-sm">
                    <form ref={formRef} onSubmit={sendEmail} className="space-y-6">

                        {/* Success Message */}
                        {submitStatus === 'success' && (
                            <div className="p-4 bg-green-900/50 border border-green-500 text-green-200 rounded-lg text-center">
                                Message sent successfully! We'll contact you soon.
                            </div>
                        )}

                        {/* Error Message */}
                        {submitStatus === 'error' && (
                            <div className="p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg text-center">
                                Something went wrong. Please try again later.
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-neutral-400 ml-1">Name</label>
                                <input required name="user_name" type="text" placeholder="John Doe" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-neutral-400 ml-1">Phone</label>
                                <input required name="user_phone" type="tel" placeholder="+234..." className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-neutral-400 ml-1">Email</label>
                            <input required name="user_email" type="email" placeholder="john@example.com" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-neutral-400 ml-1">Message</label>
                            <textarea required name="message" rows="4" placeholder="I'm interested in Primelux Estate..." className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors"></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full font-bold py-4 rounded-lg transition-all duration-300 ${
                                isSubmitting
                                    ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                                    : 'bg-violet-300 text-black hover:bg-violet-400'
                            }`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {/*<Button
                            title="Send Message"
                            containerClass="w-full bg-violet-300 text-black font-bold py-4 rounded-lg hover:bg-violet-400 transition-colors"
                        />*/}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contactform;