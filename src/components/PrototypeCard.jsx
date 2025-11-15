import React from 'react';

// This is the card from your sketch
const PrototypeCard = ({ prototype, onContact }) => {
    const isAvailable = prototype.status === 'Available';
    return (
        <div className="flex-shrink-0 w-[320px] sm:w-[350px] bg-white text-black rounded-xl shadow-lg snap-center">
            {/* Image Section */}
            <div className="w-full h-48 bg-gray-200 rounded-t-xl flex items-center justify-center">
                <img
                    src={prototype.image}
                    alt={prototype.name}
                    className="w-full h-full object-cover rounded-t-xl"
                    // Placeholder in case your image path is broken
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/350x192.png?text=Image+Not+Found'; }}
                />
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title and Status */}
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-lg max-w-[220px]">{prototype.name}</h4>
                    <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                            isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {prototype.status}
                    </span>
                </div>

                {/* Plot Size */}
                <p className="text-sm text-gray-600 mb-2">
                    Plot Size: <span className="font-medium text-gray-800">{prototype.plotSize}</span>
                </p>

                {/* Price */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500 line-through">{prototype.oldPrice}</p>
                    <p className="text-2xl font-bold text-violet-300">{prototype.newPrice}</p>
                </div>

                {/* CTA */}
                <p className="text-xs text-gray-600 mb-2">For more info or to book an inspection</p>
                <button
                    onClick={() => onContact(prototype)} // Call the function with this property's data
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold transition-opacity hover:opacity-80"
                >
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default PrototypeCard;