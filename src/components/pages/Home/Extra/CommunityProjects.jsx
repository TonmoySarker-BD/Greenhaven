import React from 'react';
import { FaUsers, FaHandsHelping, FaRegHeart, FaRegComment } from 'react-icons/fa';

const CommunityProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Urban Food Forest Initiative",
      location: "Portland, OR",
      description: "Transforming vacant lots into productive food forests for community harvest",
      progress: 65,
      supporters: 142,
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "School Garden Network",
      location: "Chicago, IL",
      description: "Building gardens in 50 public schools to teach kids about growing food",
      progress: 32,
      supporters: 89,
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Pollinator Pathway",
      location: "Austin, TX",
      description: "Creating a 5-mile corridor of native plants to support bees and butterflies",
      progress: 78,
      supporters: 215,
      image: "https://images.unsplash.com/photo-1526397751294-331021109fbd?w=800&auto=format&fit=crop"
    }
  ];

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