import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/gardeningTips.json') // Load all tips
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
    <div className="p-6 pt-20">
      <h2 className="text-2xl font-bold mb-4">My Gardening Tips</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
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
                  <td>{tip.title}</td>
                  <td>{tip.category}</td>
                  <td>{tip.availability}</td>
                  <td>{tip.date}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => navigate(`/update-tip/${tip.id}`)}
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
                <td colSpan="5" className="text-center">No tips found for your account.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTips;
