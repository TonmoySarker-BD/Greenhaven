import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { FaThumbsUp, FaUser, FaCalendarAlt, FaSeedling } from 'react-icons/fa';
import Swal from 'sweetalert2';

const TipDetailsPage = () => {
    const { id } = useParams();
    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchTip = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3000/tips/${id}`);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Failed to fetch tip');
                }
                const data = await response.json();
                setTip(data);
                setLikeCount(data.likes || 0);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTip();
    }, [id]);

    const handleLike = async () => {
        const originalLikeCount = likeCount;

        // Optimistic UI
        setLikeCount(prev => prev + 1);
        setTip(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));

        try {
            const response = await fetch(`http://localhost:3000/tips/${id}/like`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                setLikeCount(originalLikeCount);
                setTip(prev => ({ ...prev, likes: originalLikeCount }));
                throw new Error('Failed to like the tip.');
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thanks for liking this tip!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            setLikeCount(originalLikeCount);
            setTip(prev => ({ ...prev, likes: originalLikeCount }));
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message || 'Something went wrong!',
            });
        }
    };


    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <div className="alert alert-error max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error: {error}</span>
            </div>
        </div>
    );

    if (!tip) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                Tip not found.
            </div>
        </div>
    );

    return (
        <div className="bg-base-100 pt-20 py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link to="/tips" className="btn btn-primary">
                        ← Back to Tips
                    </Link>
                </div>

                <div className="card bg-base-200 shadow-xl">
                    <figure className="px-4 pt-4">
                        <img
                            src={tip.image}
                            alt={tip.title}
                            className="rounded-xl w-full max-h-[500px] object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <div className={`badge ${tip.difficulty === 'Easy' ? 'badge-success' :
                                tip.difficulty === 'Medium' ? 'badge-warning' : 'badge-error'}`}>
                                {tip.difficulty}
                            </div>
                            <div className="badge badge-primary">
                                {tip.category}
                            </div>
                            {tip.plantType && (
                                <div className="badge badge-outline">
                                    <FaSeedling className="mr-1" /> {tip.plantType}
                                </div>
                            )}
                        </div>

                        <h1 className="card-title text-3xl lg:text-4xl">{tip.title}</h1>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 my-4 text-sm">
                            {tip.user && (
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <div className="avatar mr-2">
                                        <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={tip.user.userImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(tip.user.name || 'User')}&background=random`} alt={tip.user.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium">{tip.user.name || 'Anonymous'}</p>
                                        {tip.user.email && <p className="text-xs text-base-content/70">{tip.user.email}</p>}
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center">
                                <FaCalendarAlt className="mr-2 text-base-content/70" />
                                <span className="text-base-content/70">
                                    {new Date(tip.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="prose max-w-none mt-4">
                            <p className="text-lg mb-4">{tip.description}</p>
                            {tip.guide && <div dangerouslySetInnerHTML={{ __html: tip.guide }} />}
                            {tip.tags && tip.tags.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tip.tags.map(tag => (
                                            <span key={tag} className="badge badge-ghost">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="card-actions justify-end mt-8">
                            <button
                                onClick={handleLike}
                                className="btn btn-lg btn-outline gap-2"
                            >
                                <FaThumbsUp />
                                <span>{likeCount} Like{likeCount !== 1 ? 's' : ''}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipDetailsPage;
