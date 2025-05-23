import React, { useEffect, useState } from 'react';
import { FaUsers, FaHandsHelping, FaRegHeart, FaRegComment } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CommunityProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://garden-heaven-server.vercel.app/community-projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching community projects:', error);
        setLoading(false);
        Swal.fire('Error', 'Failed to load ', error);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex  justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-base-content flex items-center justify-center">
            <FaUsers className="text-primary mr-3" />
            Community Garden Projects
          </h2>
          <p className="text-lg text-base-content/80 mt-2">
            Join these collaborative gardening initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure>
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title">{project.title}</h3>
                  <span className="badge badge-outline">{project.location}</span>
                </div>
                <p className="text-base-content/80">{project.description}</p>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={project.progress}
                    max="100"
                  ></progress>
                </div>

                <div className="flex justify-between mt-4 text-sm">
                  <div className="flex items-center">
                    <FaHandsHelping className="mr-1" />
                    {project.supporters} supporters
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center hover:text-primary">
                      <FaRegHeart className="mr-1" /> 24
                    </button>
                    <button className="flex items-center hover:text-primary">
                      <FaRegComment className="mr-1" /> 7
                    </button>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">
                    Get Involved
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn btn-outline btn-primary">
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityProjects;