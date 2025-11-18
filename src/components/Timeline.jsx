import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

// --- Register Plugins ---
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- Sample Data (Unchanged) ---
const timelineData = [
    {
        id: 'timeline-2005',
        year: '2022',
        title: 'Our Foundation',
        description: 'Double King Estate Ltd. was founded on the vision of transforming landscapes and building not just homes, but lasting legacies for communities in Abuja.',
        image: '/img/prototypes/primelux-detached.jpeg'
    },
    {
        id: 'timeline-2012',
        year: '2023',
        title: 'First Landmark: Primelux Estate',
        description: 'We broke ground on our first signature development, Primelux Estate in Apo, setting a new benchmark for luxury and modern design in the capital city.',
        image: '/img/prototypes/primelux-terrace.jpeg'
    },
    {
        id: 'timeline-2018',
        year: '2024',
        title: 'Expanding Horizons',
        description: 'Following our initial success, we expanded our vision, launching Sunview City (Kuje) and Peaceland Estate (Kurudu) to bring quality living to new, high-growth areas.',
        image: '/img/prototypes/primelux-semidetached.jpeg'
    },
    {
        id: 'timeline-2025',
        year: '2025',
        title: 'The Future of Living',
        description: 'We embrace the future, integrating smart home technology and sustainable design into all new developments, as we continue to build the future of property ownership.',
        image: 'img/prototypes/primelux-fulldetached.jpeg'
    },
];

const TimelineItem = ({ item }) => {
    return (
        <div id={item.id} className="timeline-item w-full h-full p-4">
            <div className="grid h-full grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className="text-content">
                    <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-white">
                        {item.title}
                    </h2>
                    <p className="text-neutral-300 md:text-lg max-w-lg">
                        {item.description}
                    </p>
                </div>
                <div className="image-content mt-6 md:mt-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover rounded-lg [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]"
                    />
                </div>
            </div>
        </div>
    );
};


const Timeline = ({ isLoading }) => {
    const sectionRef = useRef(null);
    const pinRef = useRef(null);
    const contentContainerRef = useRef(null);
    const masterTimeline = useRef(null);
    const isDesktop = useRef(true);

    // --- FIX START: Simplified handleYearClick ---
    const handleYearClick = (index) => {
        // This function will NOW ONLY run if it's NOT desktop
        if (!isDesktop.current) {
            const years = gsap.utils.toArray('.timeline-year');
            const items = gsap.utils.toArray('.timeline-item');
            const contentContainer = contentContainerRef.current;

            if (contentContainer && items[index]) {
                // Scroll the horizontal container
                gsap.to(contentContainer, {
                    scrollTo: { x: items[index], autoKill: false },
                    duration: 1,
                    ease: 'power2.inOut'
                });
                // Manually update year style
                gsap.to(years, { opacity: 0.4, scale: 1, color: '#FFFFFF' });
                gsap.to(years[index], { opacity: 1, scale: 1.25, color: '#7D6B34' });
            }
        }
        // If it IS desktop, do nothing.
    };
    // --- FIX END ---

    useGSAP(() => {

        if (isLoading) return;

        const years = gsap.utils.toArray('.timeline-year');
        const items = gsap.utils.toArray('.timeline-item');
        const contentContainer = contentContainerRef.current;

        ScrollTrigger.matchMedia({
            // --- A. DESKTOP ---
            "(min-width: 768px)": () => {
                isDesktop.current = true;

                gsap.set(items, {
                    opacity: 0,
                    x: '50%',
                    position: 'absolute',
                    inset: 0,
                    height: '100%'
                });
                gsap.set(items[0], { opacity: 1, x: '0%' });
                gsap.set(years, { opacity: 0.4 });
                gsap.set(years[0], {
                    opacity: 1, scale: 1.25, color: '#7D6B34', transformOrigin: 'left center'
                });

                masterTimeline.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: `+=${items.length * 100}%`,
                        pin: pinRef.current,
                        scrub: 0.5,
                    }
                });
                const tl = masterTimeline.current;

                // --- FIX: Removed .addLabel('year_0') ---

                items.forEach((item, index) => {
                    if (index === 0) return;
                    // --- FIX: Removed .addLabel() from the animation chain ---
                    tl.to(items[index - 1], {
                        opacity: 0, x: '-50%', duration: 0.5, ease: 'power2.in'
                    }, `+=${0.5}`)
                        .to(years[index - 1], {
                            opacity: 0.4, scale: 1, color: '#FFFFFF', duration: 0.5
                        }, '<')
                        .to(item, {
                            opacity: 1, x: '0%', duration: 0.5, ease: 'power2.out'
                        }, '>')
                        .to(years[index], {
                            opacity: 1, scale: 1.25, color: '#7D6B34', duration: 0.5
                        }, '<');
                });
            },

            // --- B. MOBILE (Unchanged) ---
            "(max-width: 767px)": () => {
                isDesktop.current = false;

                gsap.set(contentContainer, {
                    display: 'flex',
                    overflowX: 'auto',
                    snapType: 'x mandatory',
                    scrollbarWidth: 'none',
                });
                contentContainer.style.setProperty('-webkit-overflow-scrolling', 'touch');
                contentContainer.style.setProperty('::-webkit-scrollbar', 'display: none');

                gsap.set(items, {
                    position: 'relative',
                    opacity: 1,
                    x: 0,
                    width: '100%',
                    flexShrink: 0,
                    snapAlign: 'center'
                });

                gsap.set('.years-container', {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '0 1rem'
                });
                gsap.set(years, { fontSize: '1.5rem', opacity: 0.4 });
                gsap.set(years[0], { opacity: 1, scale: 1.25, color: '#7D6B34' });

                const setActiveYear = (index) => {
                    if (index < 0 || index >= years.length) return;
                    gsap.to(years, { opacity: 0.4, scale: 1, color: '#FFFFFF', duration: 0.3 });
                    gsap.to(years[index], { opacity: 1, scale: 1.25, color: '#7D6B34', duration: 0.3 });
                };

                let activeIndex = -1;

                contentContainer.addEventListener('scroll', () => {
                    const itemWidth = contentContainer.offsetWidth;
                    const newIndex = Math.round(contentContainer.scrollLeft / itemWidth);

                    if (newIndex !== activeIndex) {
                        activeIndex = newIndex;
                        setActiveYear(activeIndex);
                    }
                });
            }

        });

    }, {
        scope: sectionRef,
        dependencies: [isLoading]
    });

    return (
        <section ref={sectionRef} className="bg-black text-white relative py-24 sm:py-32 pb-24 sm:pb-32 overflow-hidden">

            <div ref={pinRef} className="container mx-auto px-4 ">

                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold bento-title special-font text-violet-300">
                        The St<b>o</b>ry of our Emerg<b>e</b>nce
                    </h2>
                    <p className="text-lg text-neutral-300 max-w-2xl mx-auto mt-4">
                        A journey of vision, dedication, and building the future of property ownership in Abuja, one landmark at a time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    {/* Left Column (Years) */}
                    <div className="md:col-span-1">
                        <div className="p-4">
                            <div className="years-container md:space-y-10">
                                {timelineData.map((item, index) => (
                                    <div
                                        key={item.year}
                                        id={item.year}
                                        // The cursor-pointer will still be here, but the click
                                        // handler will just do nothing on desktop.
                                        className="timeline-year text-5xl md:text-6xl font-black cursor-pointer"
                                        onClick={() => handleYearClick(index)}
                                    >
                                        {item.year}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Content) */}
                    <div
                        ref={contentContainerRef}
                        className="md:col-span-2 relative h-full mt-12 md:mt-0"
                    >
                        {timelineData.map((item) => (
                            <TimelineItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;