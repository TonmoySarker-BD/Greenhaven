import React, { useEffect, useState } from 'react';
import { FaLeaf, FaUser, FaSeedling, FaChartLine, FaEye } from 'react-icons/fa';
import { Link } from 'react-router';

const TrendingTips = () => {
    const [trendingTips, setTrendingTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/trending-tips')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error('Data format error');
                }
                const publicTips = data
                    .filter((tip) => tip.availability === 'Public')
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 6);
                setTrendingTips(publicTips);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching tips:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'badge-success';
            case 'Medium':
                return 'badge-warning';
            case 'Hard':
                return 'badge-error';
            default:
                return 'badge-info';
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-base-content mb-2">
                        <FaChartLine className="inline text-primary mr-2" />
                        Top Trending Tips
                    </h2>
                    <p className="text-lg text-base-content/80">
                        Most popular gardening tips from our community
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trendingTips.map((tip) => {
                        const {
                            id,
                            image,
                            title,
                            difficulty,
                            category,
                            plantType,
                            description,
                            user,
                            likes,
                            date,
                            // tags = [],
                        } = tip;

                        return (
                            <div
                                key={id}
                                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
                            >
                                <figure className="px-4 pt-4">
                                    <img
                                        src={image}
                                        alt={title || 'Gardening Tip'}
                                        className="rounded-xl h-48 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <div className={`badge ${getDifficultyColor(difficulty)}`}>
                                            {difficulty || 'Unknown'}
                                        </div>
                                        <div className="badge badge-primary">{category || 'General'}</div>
                                        <div className="badge badge-outline">
                                            <FaSeedling className="mr-1" /> {plantType || 'Various'}
                                        </div>
                                    </div>
                                    <h3 className="card-title">{title}</h3>
                                    <p className="text-base-content/80 line-clamp-3">{description}</p>

                                    {/* Tags
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {tags.map((tag, idx) => (
                                            <div
                                                key={idx}
                                                className="badge badge-outline badge-sm lowercase"
                                            >
                                                #{tag}
                                            </div>
                                        ))}
                                    </div> */}

                                    <div className="mt-4 flex items-center">
                                        <div className="avatar mr-3">
                                            <div className="w-8 rounded-full bg-base-300 flex items-center justify-center text-primary font-bold">

                                                <img src={tip.user.userImage} alt={tip.user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-medium">{user?.name || 'Unknown User'}</p>
                                            <p className="text-sm text-base-content/60">{user?.email || 'No Email'}</p>
                                        </div>
                                    </div>

                                    <p className="mt-2 text-sm text-base-content/70">
                                        <FaLeaf className="inline mr-1 text-green-600" />
                                        {likes} Likes &nbsp;|&nbsp; {date ? new Date(date).toLocaleDateString() : 'No Date'}
                                    </p>

                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/tips/${tip._id}`}>
                                            <button aria-label={`View details for ${title}`} className="btn btn-primary btn-sm">
                                                <FaEye /> View Tip
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link to="/tips">
                        <button className="btn btn-outline btn-primary">View All Tips</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrendingTips;
