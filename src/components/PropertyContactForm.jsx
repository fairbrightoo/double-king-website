import React, { useRef, useState } from 'react'; // 1. Import useState
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from "./Button";
import { TiTimes, TiPlus, TiMinus } from "react-icons/ti"; // 2. Import Plus/Minus icons
import emailjs from '@emailjs/browser'; // Import EmailJS

const PropertyContactForm = ({ onClose, property }) => {
    const containerRef = useRef(null);
    const formBoxRef = useRef(null);
    const formRef = useRef(); // Ref for the form

    // 3. State for the accordion toggle
    const [showMarketer, setShowMarketer] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useGSAP(() => {
        gsap.from(formBoxRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // This is your new "record to sheet" function
        const recordToSheet = () => {
            const formData = new FormData(formRef.current);
            fetch(import.meta.env.VITE_GOOGLE_SHEET_WEB_APP_URL, {
                method: "POST",
                body: formData
            }).then(res => res.json()).then(data => {
                console.log("Google Sheet Response:", data);
            }).catch(err => {
                console.error("Google Sheet Error:", err);
            });
        };

        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                console.log("Both emails sent!");

                // --- CALL THE NEW FUNCTION HERE ---
                recordToSheet(); // <-- Add this line
                setIsSubmitting(false);
                setSubmitStatus('success');
                e.target.reset();
                setTimeout(() => { onClose(); setSubmitStatus(null); }, 3000);
            }, (error) => {
                console.error("EmailJS Error:", error); // Added this line to USE the error variable
                setIsSubmitting(false);
                setSubmitStatus('error');
            });
    };

    return (
        <section
            ref={containerRef}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
            onClick={onClose}
        >
            <div
                ref={formBoxRef}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden grid grid-cols-1 md:grid-cols-2 bg-neutral-900 rounded-2xl border border-neutral-800 text-white shadow-2xl scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl text-white z-20 bg-black/50 rounded-full p-1 backdrop-blur-md hover:bg-violet-500 transition-colors"
                >
                    <TiTimes />
                </button>

                {/* --- LEFT SIDE: Property Preview --- */}
                <div className="relative h-64 md:h-auto bg-neutral-800">
                    <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                        <span className="px-3 py-1 bg-violet-300 text-black text-xs font-bold uppercase tracking-wider w-fit rounded mb-2">
                            Selected Property
                        </span>
                        <h3 className="text-3xl font-bold leading-tight">{property.name}</h3>
                        <p className="text-violet-300 font-semibold text-xl mt-2">{property.newPrice}</p>
                        <p className="text-neutral-400 text-sm mt-1">{property.plotSize}</p>
                    </div>
                </div>

                {/* --- RIGHT SIDE: The Form --- */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Make it Yours</h2>
                        <p className="text-neutral-400 text-sm">
                            Fill out the form below to schedule an inspection or request more details about this specific property.
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={sendEmail} className="space-y-5">

                        {/* Hidden input to send property name in the email */}
                        <input type="hidden" name="property_name" value={property.name} />

                        {submitStatus === 'success' && (
                            <div className="p-3 bg-green-900/50 border border-green-500 text-green-200 rounded text-center text-sm">
                                Request sent successfully!
                            </div>
                        )}

                        <div>
                            <label className="text-xs text-neutral-500 uppercase tracking-wide ml-1">Full Name</label>
                            <input required name="user_name" type="text" placeholder="Enter your name" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-neutral-500 uppercase tracking-wide ml-1">Phone</label>
                                <input required name="user_phone" type="tel" placeholder="+234..." className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs text-neutral-500 uppercase tracking-wide ml-1">Email</label>
                                <input required name="user_email" type="email" placeholder="you@example.com" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors" />
                            </div>
                        </div>

                        {/* --- MARKETER ACCORDION START --- */}
                        <div className="pt-2 border-t border-neutral-800">
                            <button
                                type="button"
                                onClick={() => setShowMarketer(!showMarketer)}
                                className="flex items-center gap-2 text-sm text-violet-300 hover:text-white transition-colors focus:outline-none"
                            >
                                {showMarketer ? <TiMinus /> : <TiPlus />}
                                <span>Referred by a Marketer?</span>
                            </button>

                            {/* Conditional Rendering with simple slide/fade logic */}
                            {showMarketer && (
                                <div className="grid grid-cols-2 gap-4 mt-4 animate-fadeIn">
                                    <div>
                                        <label className="text-xs text-neutral-500 uppercase tracking-wide ml-1">Marketer Name</label>
                                        <input name="marketer_name" type="text" placeholder="Agent Name" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-neutral-500 uppercase tracking-wide ml-1">Marketer Phone</label>
                                        <input name="marketer_phone" type="tel" placeholder="Agent Phone" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors" />
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* --- MARKETER ACCORDION END --- */}

                        <div>
                            <label className="text-xs text-neutral-500 uppercase tracking-wide ml-1">Message</label>
                            <textarea
                                name="message"
                                rows="3"
                                defaultValue={`I am interested in the ${property.name}. Please contact me regarding inspection and payment plans.`}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-300 transition-colors"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full font-bold py-4 rounded-lg transition-all duration-300 ${
                                isSubmitting
                                    ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                                    : 'bg-violet-300 text-black hover:bg-violet-400'
                            }`}
                        >
                            {isSubmitting ? 'Sending Request...' : 'Request Details'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PropertyContactForm;