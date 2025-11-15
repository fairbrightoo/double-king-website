import React from 'react';

const BentoCard = ({ src, title, description }) => {
    // Check if the src string ends with .mp4
    const isVideo = src.endsWith('.mp4');

    return (
        <div className="relative size-full">
            {isVideo ? (
                <video
                    src={src}
                    loop
                    muted
                    autoPlay
                    playsInline // Good for mobile
                    className="absolute left-0 top-0 size-full object-cover object-center"
                />
            ) : (
                <img
                    src={src}
                    alt={description || 'Estate feature background'}
                    className="absolute left-0 top-0 size-full object-cover object-center"
                />
            )}

            <div className="relative flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BentoCard;