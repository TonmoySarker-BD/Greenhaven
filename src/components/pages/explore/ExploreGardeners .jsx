import React, { useState, useEffect } from 'react';
import { FaUser, FaSeedling, FaLeaf, FaVenusMars, FaChartLine, FaMapMarkerAlt } from 'react-icons/fa';

const ExploreGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
            document.title = "Explore Gardeners | Green Heaven";
        }, []);

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const response = await fetch('https://garden-heaven-server.vercel.app/gardeners');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setGardeners(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGardeners();
  }, []);

  const filteredGardeners = activeFilter === 'all'
    ? gardeners
    : gardeners.filter(gardener => gardener.status === activeFilter);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error) return (
    <div className="alert alert-error mt-20 max-w-md mx-auto mt-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Error loading gardeners: {error}</span>
    </div>
  );

  return (
    <div className="bg-base-100 pt-20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2 flex items-center justify-center">
            <FaLeaf className="text-primary mr-3" />
            Explore Gardeners
          </h1>
          <p className="text-lg text-base-content/80">
            Connect with gardening enthusiasts from around the world
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-8 space-x-4">
          {['all', 'active', 'inactive'].map(status => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`btn capitalize ${activeFilter === status ? 'btn-primary' : 'btn-outline'}`}
            >
              {status} Gardeners
            </button>
          ))}
        </div>

        {/* Gardeners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGardeners.map((gardener) => (
            <div key={gardener.id} className={`card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow ${gardener.status === 'inactive' ? 'opacity-80' : ''}`}>
              <figure className="px-6 pt-6">
                <div className="avatar">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={gardener.image} alt={gardener.name} />
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center">
                {/* Status Badge */}
                <div className={`badge ${gardener.status === 'active' ? 'badge-primary' : 'badge-neutral'} mb-2`}>
                  {gardener.status}
                </div>

                <h2 className="card-title text-2xl">{gardener.name}</h2>

                {/* Basic Info */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <div className="badge badge-outline">
                    <FaUser className="mr-1" /> {gardener.age} yrs
                  </div>
                  <div className="badge badge-outline">
                    <FaVenusMars className="mr-1" /> {gardener.gender}
                  </div>
                  <div className="badge badge-outline">
                    <FaMapMarkerAlt className="mr-1" /> {gardener.location}
                  </div>
                </div>

                {/* Specialty */}
                <div className="badge badge-primary mb-2">
                  <FaSeedling className="mr-1" /> {gardener.specialty}
                </div>

                {/* Stats */}
                <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100 w-full mb-4">
                  <div className="stat">
                    <div className="stat-title">Experience</div>
                    <div className="text-primary">{gardener.experience}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Plants</div>
                    <div className="text-secondary">{gardener.plants}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Tips</div>
                    <div className="">{gardener.tips}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="rating rating-sm mb-4">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name={`rating-${gardener.id}`}
                      className="mask mask-star-2 bg-orange-400"
                      checked={i < Math.round(gardener.rating)}
                      readOnly
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="card-actions">
                  <button className="btn btn-primary">
                    View Profile
                  </button>
                  <button className="btn btn-outline">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGardeners.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-medium">No gardeners found</h3>
            <p className="text-base-content/70 mt-2">
              {activeFilter === 'active'
                ? "There are currently no active gardeners"
                : activeFilter === 'inactive'
                  ? "There are currently no inactive gardeners"
                  : "No gardener data available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreGardeners;
