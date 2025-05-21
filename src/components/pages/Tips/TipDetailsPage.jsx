import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { FaLeaf, FaRegThumbsUp, FaThumbsUp, FaUser, FaCalendarAlt, FaSeedling } from 'react-icons/fa';

const TipDetailsPage = () => {
    const { id } = useParams();
    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    

    useEffect(() => {
        const fetchTip = async () => {
            try {
                const response = await fetch('/gardeningTips.json');
                if (!response.ok) throw new Error('Failed to fetch tips');

                const data = await response.json();
                const foundTip = data.find(t => t.id === parseInt(id));
                if (!foundTip) throw new Error('Tip not found');

                setTip(foundTip);
                setLikeCount(foundTip.likes || 0);

                const likedTips = JSON.parse(localStorage.getItem('likedTips') || '[]');
                setLiked(likedTips.includes(parseInt(id)));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTip();
    }, [id]);

    const handleLike = () => {
        const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
        setLikeCount(newLikeCount);
        setLiked(!liked);

        const likedTips = JSON.parse(localStorage.getItem('likedTips') || '[]');
        if (liked) {
            localStorage.setItem(
                'likedTips',
                JSON.stringify(likedTips.filter(tipId => tipId !== parseInt(id)))
            );
        } else {
            localStorage.setItem(
                'likedTips',
                JSON.stringify([...likedTips, parseInt(id)])
            );
        }

        console.log(`Updated tip ${id} likes to ${newLikeCount}`);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (error) return (
        <div className="alert alert-error max-w-md mx-auto mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
        </div>
    );

    return (
        <div className="bg-base-100 pt-20 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <div className="mb-6">
                    <Link to="/tips" className="btn btn-primary">
                        ← Back to Tips
                    </Link>
                </div>

                {/* Tip Content */}
                <div className="card bg-base-200 shadow-xl">
                    <figure className="px-4 pt-4">
                        <img
                            src={tip.image}
                            alt={tip.title}
                            className="rounded-xl w-full h-96 object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <div className={`badge ${tip.difficulty === 'Easy' ? 'badge-success' :
                                tip.difficulty === 'Medium' ? 'badge-warning' : 'badge-error'}`}>
                                {tip.difficulty}
                            </div>
                            <div className="badge badge-primary">
                                {tip.category}
                            </div>
                            <div className="badge badge-outline">
                                <FaSeedling className="mr-1" /> {tip.plantType}
                            </div>
                        </div>

                        <h1 className="card-title text-3xl">{tip.title}</h1>

                        {/* Author and Date */}
                        <div className="flex items-center gap-4 my-4">
                            <div className="flex items-center">
                                <div className="avatar mr-2">
                                    <div className="w-10 rounded-full">
                                        <FaUser className="h-full w-full p-2 bg-base-300" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium">{tip.user.name}</p>
                                    <p className="text-sm text-base-content/60">{tip.user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaCalendarAlt className="mr-2 text-base-content/60" />
                                <span className="text-base-content/60">
                                    {new Date(tip.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {/* Description and Guide */}
                        <div className="prose max-w-none">
                            <p className="text-lg mb-4">{tip.description}</p>

                            {tip.tags && tip.tags.length > 0 && (
                                <div className="mt-6">
                                    <div className="flex flex-wrap gap-2">
                                        {tip.tags.map(tag => (
                                            <span key={tag} className="badge badge-outline">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Like Button */}
                        <div className="card-actions justify-end mt-8">
                            <button
                                onClick={handleLike}
                                className="btn btn-outline gap-2"
                            >
                                {liked ? (
                                    <FaThumbsUp className="text-primary" />
                                ) : (
                                    <FaRegThumbsUp />
                                )}
                                <span>{likeCount} Likes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipDetailsPage;
