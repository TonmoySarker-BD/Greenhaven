import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/tips')
      .then(res => res.json())
      .then(data => {
        const userTips = data.filter(tip => tip.user?.email === user?.email);
        setTips(userTips);
      })
      .catch(err => {
        console.error('Error fetching tips:', err);
        Swal.fire('Error', 'Failed to load tips', 'error');
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this tip!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#22c55e',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        const updatedTips = tips.filter(tip => tip.id !== id);
        setTips(updatedTips);
        Swal.fire('Deleted!', 'Your tip has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="p-4 pt-20 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Gardening Tips</h2>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tips.length > 0 ? (
              tips.map(tip => (
                <tr key={tip.id}>
                  <td>
                    <div className="h-16 w-16 rounded overflow-hidden">
                      <img
                        src={tip.image}
                        alt={tip.title}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </td>
                  <td>{tip.title}</td>
                  <td>{tip.category}</td>
                  <td>{tip.availability}</td>
                  <td>{new Date(tip.date).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => navigate(`/update-tip/${tip._id}`)}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tip.id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No tips found for your account.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {tips.length > 0 ? (
          tips.map(tip => (
            <div key={tip.id} className="card bg-base-200 shadow-sm">
              <figure className="p-4">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="rounded-xl object-cover w-full max-h-48"
                />
              </figure>
              <div className="card-body p-4 pt-0">
                <h3 className="text-lg font-semibold">{tip.title}</h3>
                <p className="text-sm text-base-content/70">{tip.category} • {tip.availability}</p>
                <p className="text-xs text-base-content/50">{new Date(tip.date).toLocaleDateString()}</p>

                <div className="card-actions mt-3 justify-end">
                  <button
                    onClick={() => navigate(`/update-tip/${tip._id}`)}
                    className="btn btn-sm btn-info"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(tip.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-base-content/70">No tips found for your account.</p>
        )}
      </div>
    </div>
  );
};

export default MyTips;
