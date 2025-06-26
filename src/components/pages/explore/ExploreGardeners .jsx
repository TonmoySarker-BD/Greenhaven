import React, { useState, useEffect } from 'react';
import { FaUser, FaSeedling, FaLeaf, FaVenusMars, FaChartLine, FaMapMarkerAlt, FaSearch, FaFilter } from 'react-icons/fa';
import GardenerModal from '../../common/GardenerModal';
import GardenerCard from '../../common/GardenerCard';

const ExploreGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);


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

  const filteredGardeners = gardeners.filter(gardener => {
    // Apply status filter
    const statusMatch = activeFilter === 'all' || gardener.status === activeFilter;

    // Apply search term filter
    const searchMatch = searchTerm === '' ||
      gardener.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gardener.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gardener.location.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error) return (
    <div className="alert alert-error mt-20 max-w-md mx-auto">
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

        {/* Desktop Filters */}
        <div className="hidden md:flex justify-between items-center mb-6 gap-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search gardeners..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-base-content/50" />
          </div>
          <div className="flex gap-2">
            <select
              className="select select-bordered w-40"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="all">All Gardeners</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Mobile Search and Filter */}
        <div className="md:hidden flex gap-2 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search gardeners..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-base-content/50" />
          </div>
          <button
            className="btn btn-square"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <FaFilter />
          </button>
        </div>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div className="md:hidden bg-base-200 p-4 rounded-lg mb-6">
            <div className="flex gap-2">
              {['all', 'active', 'inactive'].map(status => (
                <button
                  key={status}
                  onClick={() => {
                    setActiveFilter(status);
                    setShowMobileFilters(false);
                  }}
                  className={`btn btn-sm capitalize flex-1 ${activeFilter === status ? 'btn-primary' : 'btn-outline'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gardeners Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredGardeners.map((gardener) => (
            <GardenerCard key={gardener._id} gardener={gardener} />

            // <div key={gardener.id} className={`card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow ${gardener.status === 'inactive' ? 'opacity-80' : ''}`}>
            //   <figure className="px-6 pt-6">
            //     <div className="avatar">
            //       <div className="w-24 sm:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            //         <img src={gardener.image} alt={gardener.name} />
            //       </div>
            //     </div>
            //   </figure>
            //   <div className="card-body items-center text-center px-4">
            //     {/* Status Badge */}
            //     <div className={`badge ${gardener.status === 'active' ? 'badge-primary' : 'badge-neutral'} mb-2`}>
            //       {gardener.status}
            //     </div>

            //     <h2 className="card-title text-xl sm:text-2xl">{gardener.name}</h2>

            //     {/* Basic Info */}
            //     <div className="flex flex-wrap justify-center gap-2 mb-4 text-sm">
            //       <div className="badge badge-outline">
            //         <FaUser className="mr-1" /> {gardener.age} yrs
            //       </div>
            //       <div className="badge badge-outline">
            //         <FaVenusMars className="mr-1" /> {gardener.gender}
            //       </div>
            //       <div className="badge badge-outline">
            //         <FaMapMarkerAlt className="mr-1" /> {gardener.location}
            //       </div>
            //     </div>

            //     {/* Specialty */}
            //     <div className="badge badge-primary mb-3 text-sm">
            //       <FaSeedling className="mr-1" /> {gardener.specialty}
            //     </div>

            //     {/* Stats - Enhanced Horizontal Layout */}
            //     <div className="flex justify-around items-center bg-base-100 rounded-box p-3 mb-4 border border-base-300 shadow-sm">
            //       <div className="flex flex-col items-center px-2">
            //         <span className="text-xs font-semibold text-base-content/70 mb-1">Experience</span>
            //         <span className="text-primary font-bold text-lg">{gardener.experience}</span>
            //       </div>
            //       <div className="h-8 w-px bg-base-300"></div>
            //       <div className="flex flex-col items-center px-2">
            //         <span className="text-xs font-semibold text-base-content/70 mb-1">Plants</span>
            //         <span className="text-secondary font-bold text-lg">{gardener.plants}</span>
            //       </div>
            //       <div className="h-8 w-px bg-base-300"></div>
            //       <div className="flex flex-col items-center px-2">
            //         <span className="text-xs font-semibold text-base-content/70 mb-1">Tips</span>
            //         <span className="font-bold text-lg">{gardener.tips}</span>
            //       </div>
            //     </div>

            //     {/* Rating */}
            //     <div className="rating rating-sm mb-4">
            //       {[...Array(5)].map((_, i) => (
            //         <input
            //           key={i}
            //           type="radio"
            //           name={`rating-${gardener.id}`}
            //           className="mask mask-star-2 bg-orange-400"
            //           checked={i < Math.round(gardener.rating)}
            //           readOnly
            //         />
            //       ))}
            //     </div>

            //     {/* Action Buttons */}
            //     <div className="card-actions flex gap-2">
            //       <button className="btn btn-primary w-full sm:w-auto">View Profile</button>
            //       <button className="btn btn-outline w-full sm:w-auto">Message</button>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGardeners.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-medium">No gardeners found</h3>
            <p className="text-base-content/70 mt-2">
              {activeFilter === 'active'
                ? "There are currently no active gardeners matching your search"
                : activeFilter === 'inactive'
                  ? "There are currently no inactive gardeners matching your search"
                  : "No gardener data available matching your search"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreGardeners;