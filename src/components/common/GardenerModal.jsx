import React, { useEffect } from 'react';
import { FaLeaf, FaMapMarkerAlt, FaStar, FaRegClock, FaSeedling, FaLightbulb, FaUser } from 'react-icons/fa';
import { GiPlantWatering } from 'react-icons/gi';
import Modal from 'react-modal';


const GardenerModal = ({ gardener, isOpen, onClose }) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            Modal.setAppElement('#root'); // Set the app element for accessibility
        }
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            closeTimeoutMS={300}
        >
            <div className="relative bg-gradient-to-br from-green-500 to-white max-w-2xl w-full rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-100 rounded-full opacity-20 transform -translate-x-20 translate-y-20"></div>

                {/* Close button with expanded click area */}
                <div
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                    aria-label="Close"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onClose()}
                >
                    {/* <button
                        className="p-2 text-gray-500 focus:outline-none"
                        aria-hidden="true"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button> */}
                </div>

                {/* Profile header */}
                <div className="flex flex-col items-center mb-8 relative z-10">
                    <div className="relative mb-4">
                        <img
                            src={gardener.image}
                            alt={gardener.name}
                            className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <span className={`absolute bottom-4 right-4 w-6 h-6 rounded-full border-2 border-white ${gardener.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{gardener.name}</h2>
                    <p className="text-green-600 font-medium mb-2">{gardener.specialty}</p>
                    <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(gardener.rating) ? 'fill-current' : 'fill-current opacity-30'} />
                        ))}
                        <span className="ml-2 text-gray-600 text-sm">({gardener.rating})</span>
                    </div>
                </div>

                {/* Stats grid - single column on mobile */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                    <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm flex flex-col items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mb-1 sm:mb-2 text-green-600">
                            <FaSeedling className="text-sm sm:text-lg" />
                        </div>
                        <span className="text-gray-500 text-xs sm:text-sm">Plants</span>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">{gardener.plants}</span>
                    </div>

                    <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm flex flex-col items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mb-1 sm:mb-2 text-green-600">
                            <FaLightbulb className="text-sm sm:text-lg" />
                        </div>
                        <span className="text-gray-500 text-xs sm:text-sm">Tips</span>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">{gardener.tips}</span>
                    </div>

                    <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm flex flex-col items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mb-1 sm:mb-2 text-green-600">
                            <FaRegClock className="text-sm sm:text-lg" />
                        </div>
                        <span className="text-gray-500 text-xs sm:text-sm">Experience</span>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">{gardener.experience}</span>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 text-green-600">
                            <FaMapMarkerAlt className="text-lg" />
                        </div>
                        <div>
                            <h4 className="text-gray-500 text-sm">Location</h4>
                            <p className="text-gray-800">{gardener.location}</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 text-green-600">
                            <GiPlantWatering className="text-lg" />
                        </div>
                        <div>
                            <h4 className="text-gray-500 text-sm">Status</h4>
                            <p className={`font-medium ${gardener.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                {gardener.status.charAt(0).toUpperCase() + gardener.status.slice(1)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 text-green-600">
                            <FaUser className="text-lg" />
                        </div>
                        <div>
                            <h4 className="text-gray-500 text-sm">About</h4>
                            <p className="text-gray-800">{gardener.age} years • {gardener.gender}</p>
                        </div>
                    </div>
                </div>

                {/* Action button */}
                <div className="mt-8">
                    <button className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Contact Gardener
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default GardenerModal;