import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaLeaf } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const UpdateTip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    plantType: '',
    difficulty: 'Medium',
    description: '',
    image: '',
    category: 'Plant Care',
    availability: 'Public',
    tags: ''
  });

  const categories = [
    'Plant Care', 'Composting', 'Vertical Gardening',
    'Organic Gardening', 'Sustainability', 'Hydroponics'
  ];

  useEffect(() => {
    const fetchTip = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/tips/${id}`);
        const foundTip = await response.json();

        if (foundTip) {
          setFormData({
            title: foundTip.title || '',
            plantType: foundTip.plantType || '',
            difficulty: foundTip.difficulty || 'Medium',
            description: foundTip.description || '',
            image: foundTip.image || '',
            category: foundTip.category || 'Plant Care',
            availability: foundTip.availability || 'Public',
            tags: (foundTip.tags || []).join(', ')
          });
        } else {
          throw new Error('Tip not found');
        }
      } catch (err) {
        console.error('Failed to load tip:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Could not load the tip',
          confirmButtonColor: '#ef4444'
        });
        navigate('/my-tips');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTip();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedTip = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
    };

    try {
      const response = await fetch(`http://localhost:3000/tips/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTip)
      });

      if (!response.ok) {
        throw new Error('Failed to update the tip');
      }

      Swal.fire({
        icon: 'success',
        title: 'Tip Updated!',
        text: 'Your gardening tip was successfully updated.',
        confirmButtonColor: '#22c55e'
      });

      navigate('/my-tips');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-base-100 py-8 pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2 flex items-center justify-center">
            <FaLeaf className="text-primary mr-3" />
            Update Your Gardening Tip
          </h1>
          <p className="text-lg text-base-content/80">
            Make changes to your shared knowledge
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-lg py-10">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="card bg-base-200 shadow-xl p-6 w-full">
            <div className="space-y-4">

              {/* User Info */}
              <div className="p-4 bg-base-300 rounded-lg">
                <h3 className="font-bold mb-2">Updating as:</h3>
                <div className="flex items-center">
                  <div className="avatar mr-3">
                    <div className="w-10 h-10 rounded-full bg-base-100 overflow-hidden">
                      <img
                        src={currentUser?.photoURL || '/default-avatar.png'}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{currentUser?.displayName || 'Anonymous Gardener'}</p>
                    <p className="text-sm text-base-content/70">{currentUser?.email}</p>
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              {[
                { id: 'title', label: 'Tip Title*', type: 'text' },
                { id: 'plantType', label: 'Plant Type/Topic*', type: 'text' },
                { id: 'image', label: 'Image URL', type: 'url' },
                { id: 'tags', label: 'Tags (comma separated)', type: 'text' }
              ].map(field => (
                <div className="form-control" key={field.id}>
                  <label className="label" htmlFor={field.id}>
                    <span className="label-text">{field.label}</span>
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    className="input input-bordered w-full"
                    value={formData[field.id]}
                    onChange={handleChange}
                    required={field.label.includes('*')}
                  />
                </div>
              ))}

              {/* Difficulty */}
              <div className="form-control">
                <label className="label" htmlFor="difficulty">
                  <span className="label-text">Difficulty Level*</span>
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  className="select select-bordered w-full"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label" htmlFor="description">
                  <span className="label-text">Description*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="textarea textarea-bordered h-32 w-full"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label" htmlFor="category">
                  <span className="label-text">Category*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className="select select-bordered w-full"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div className="form-control">
                <label className="label" htmlFor="availability">
                  <span className="label-text">Visibility*</span>
                </label>
                <select
                  id="availability"
                  name="availability"
                  className="select select-bordered w-full"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                >
                  <option value="Public">Public</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full"
                >
                  {isLoading ? 'Updating...' : 'Update Tip'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateTip;