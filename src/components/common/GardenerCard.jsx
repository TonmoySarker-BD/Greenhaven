import React, { useState } from 'react';
import GardenerModal from './GardenerModal';

const GardenerCard = ({ gardener }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const handleOpen = () => setIsModalOpen(true);
      const handleClose = () => setIsModalOpen(false);
    return (
        <div key={gardener.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
            <figure className="px-6 pt-6">
                <div className="avatar">
                    <div className="rounded-xl mx-auto">
                        <img src={gardener.image} alt={gardener.name} />
                    </div>
                </div>
            </figure>
            <div className="text-center p-5">
                <h3 className="card-title text-2xl">{gardener.name}</h3>


                <div className='flex items-center justify-between gap-2 mt-2'>
                    <div className="badge badge-primary mb-1">{gardener.specialty}
                    </div>
                    <strong className="text-base-content/80 text-sm">{gardener.location}</strong>
                </div>


                {/* <p className="text-base-content/80 text-sm">
                  
                  • {gardener.experience}
                </p> */}


                {/* <p className="text-base-content/70 text-sm">
                  Age: {gardener.age} • Gender: {gardener.gender} • Status: {gardener.status}
                </p> */}

                {/* <div className="flex justify-center gap-6 mt-3">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{gardener.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <FaSeedling className="text-primary mr-1" />
                    <span>{gardener.plants} plants</span>
                  </div>
                </div> */}

                {/* <p className="mt-2 text-sm text-base-content/70">
                  Tips Shared: <strong>{gardener.tips}</strong>
                </p> */}

                {/* <div className="mt-4 gap-2">
                  <Link
                    to={`/gardener/${gardener._id}`}
                    className="btn btn-primary btn-sm w-full"
                  >
                    View Profile
                  </Link>
                  <button className="btn btn-outline btn-sm flex-1">Message</button>
                </div> */}

                <div className="mt-4">
                    <button onClick={handleOpen} className="btn btn-primary btn-sm w-full">
                        View Profile
                    </button>
                </div>
            </div>

            {/* Modal Component */}
            <GardenerModal
                gardener={gardener}
                isOpen={isModalOpen}
                onClose={handleClose}
            />

        </div>
    );
};

export default GardenerCard;