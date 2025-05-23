import React, { useEffect, useState } from 'react';
import { FaLeaf, FaStar, FaSeedling } from 'react-icons/fa';
import { Link } from 'react-router';

const FeaturedGardeners = () => {
  const [activeGardeners, setActiveGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://garden-heaven-server.vercel.app/featured-gardeners')
      .then((res) => {
        if (!res.ok) throw new Error('');
        return res.json();
      })
      .then((data) => {
        const active = data.filter((gardener) => gardener.status === 'active');
        setActiveGardeners(active);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching gardeners:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-base-content mb-2">
            <FaLeaf className="inline text-primary mr-2" />
            Active Gardeners
          </h2>
          <p className="text-lg text-base-content/80">
            Meet our  gardening experts from across the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeGardeners.map((gardener) => (
            <div key={gardener.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-6 pt-6">
                <div className="avatar">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={gardener.image} alt={gardener.name} />
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl">{gardener.name}</h3>
                <div className="badge badge-primary mb-1">{gardener.specialty}</div>
                <p className="text-base-content/80 text-sm">
                  <strong>{gardener.location}</strong> • {gardener.experience}
                </p>
                <p className="text-base-content/70 text-sm">
                  Age: {gardener.age} • Gender: {gardener.gender} • Status: {gardener.status}
                </p>

                <div className="flex justify-center gap-6 mt-3">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{gardener.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <FaSeedling className="text-primary mr-1" />
                    <span>{gardener.plants} plants</span>
                  </div>
                </div>

                <p className="mt-2 text-sm text-base-content/70">
                  Tips Shared: <strong>{gardener.tips}</strong>
                </p>

                <div className="card-actions mt-4">
                  <button className="btn btn-primary btn-sm">View Profile</button>
                  <button className="btn btn-outline btn-sm">Message</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={'/explore'}>
          <button className="btn btn-outline btn-primary">View All Gardeners</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGardeners;
