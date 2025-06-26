import React, { useEffect, useState } from 'react';
import { FaLeaf, FaStar, FaSeedling } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import GardenerModal from '../../common/GardenerModal';
import GardenerCard from '../../common/GardenerCard';

const FeaturedGardeners = () => {
  const [activeGardeners, setActiveGardeners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGardeners = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://garden-heaven-server.vercel.app/featured-gardeners');
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to fetch gardeners');
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error('Unexpected data format');
        }

        const active = data.filter((gardener) => gardener.status === 'active');
        setActiveGardeners(active);
      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to load gardeners');
      } finally {
        setLoading(false);
      }
    };
    fetchGardeners();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-base-content mb-2">
            <FaLeaf className="inline text-primary mr-2" />
            Featured Gardeners
          </h2>
          <p className="text-lg text-base-content/80">
            Meet our  gardening experts from across the world.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {activeGardeners.map((gardener) => (
            <GardenerCard key={gardener._id} gardener={gardener} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={'/explore'}>
            <button className="btn btn-outline btn-primary">View All Gardeners</button>
          </Link>
        </div>
      </div>
    </div >
  );
};

export default FeaturedGardeners;
