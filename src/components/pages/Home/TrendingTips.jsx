import React, { useEffect, useState } from 'react';
import { FaLeaf, FaUser, FaSeedling, FaChartLine, FaEye } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const TrendingTips = () => {
    const [trendingTips, setTrendingTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingTips = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://garden-heaven-server.vercel.app/trending-tips');

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Failed to fetch trending tips');
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error('Data format error');
                }

                const publicTips = data
                    .filter((tip) => tip.availability === 'Public')
                    .sort((a, b) => b.likes - a.likes);
                setTrendingTips(publicTips);
            } catch (error) {
                Swal.fire('Error', error.message || 'Failed to load trending tips');
            } finally {
                setLoading(false);
            }
        };
        fetchTrendingTips();
    }, []);

    // const getDifficultyColor = (difficulty) => {
    //     switch (difficulty) {
    //         case 'Easy':
    //             return 'badge-success';
    //         case 'Medium':
    //             return 'badge-warning';
    //         case 'Hard':
    //             return 'badge-error';
    //         default:
    //             return 'badge-info';
    //     }
    // };

    if (loading) {
        return (
            <div className="text-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="bg-base-100 py-12 px-4 mt-5 sm:px-6 lg:px-8">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {trendingTips.map((tip) => {
                        const {
                            _id,
                            image,
                            title,
                            category,
                            plantType,
                            // description,
                            // user,
                            likes,
                            date,
                            // tags = [],
                        } = tip;

                        return (
                            <div
                                key={_id}
                                className="card bg-base-200 max-w-[320px] mx-auto shadow-xl hover:shadow-2xl transition-shadow"
                            >
                                <figure className="px-4 pt-4">
                                    <img
                                        src={image}
                                        alt={title || 'Gardening Tip'}
                                        className="rounded-xl h-48 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    {/* Category and Plant Type Badges */}
                                    <div className='flex items-center justify-between gap-2 mt-2'>
                                        <div className="badge badge-primary">{category || 'General'}</div>
                                        <div className="badge badge-outline">
                                            <FaSeedling className="" /> {plantType || 'Various'}
                                        </div>
                                

                                    {/* <div className={`badge ${getDifficultyColor(difficulty)}`}>
                                            {difficulty || 'Unknown'}
                                        </div> */}
                                    {/* <div className="badge badge-primary">{category || 'General'}</div>
                                        <div className="badge badge-outline">
                                            <FaSeedling className="mr-1" /> {plantType || 'Various'}
                                        </div> */}
                                </div>
                                <h3 className="card-title">{title}</h3>





                                {/* <p className="text-base-content/80 line-clamp-3">{description}</p> */}

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

                                {/* <div className="mt-4 flex items-center">
                                        <div className="avatar mr-3">
                                            <div className="w-8 rounded-full bg-base-300 flex items-center justify-center text-primary font-bold">

                                                <img src={tip.user.userImage} alt={tip.user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-medium">{user?.name || 'Unknown User'}</p>
                                            <p className="text-sm text-base-content/60">{user?.email || 'No Email'}</p>
                                        </div>
                                    </div> */}

                                <div className='flex justify-between items-center'>
                                    <p className="">
                                        <FaLeaf className="inline mr-2 text-green-600" />
                                        {likes} Likes
                                    </p>
                                    <p className='text-right'>{date ? format(new Date(date), 'MMM dd, yyyy') : 'No Date'}</p>
                                </div>

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
        </div >
    );
};

export default TrendingTips;
