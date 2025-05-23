import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaEye, FaRegThumbsUp, FaSearch, FaFilter } from 'react-icons/fa';

const Tips = () => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
         document.title = "Gardening Tips & Guides | Green Heaven";
        const fetchTips = async () => {
            try {
                const response = await fetch('https://garden-heaven-server.vercel.app/tips');
                if (!response.ok) {
                    throw new Error('Failed to fetch tips');
                }
                const data = await response.json();
                setTips(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTips();
    }, []);

    const filteredTips = tips.filter(tip => {
        const isPublic = tip.availability === 'Public';
        const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tip.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || tip.category === categoryFilter;
        const matchesDifficulty = difficultyFilter === 'all' || tip.difficulty === difficultyFilter;
        return isPublic && matchesSearch && matchesCategory && matchesDifficulty;
    });

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (error) return (
        <div className="alert alert-error mt-20 max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error loading tips: {error}</span>
        </div>
    );

    // Get unique categories and difficulties for filter dropdowns
    const categories = [...new Set(tips.map(tip => tip.category))];
    const difficulties = ['Easy', 'Medium', 'Hard'];

    return (
        <div className="bg-base-100 pt-20 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                        Gardening Tips & Guides
                    </h1>
                    <p className="text-lg text-base-content/80">
                        Learn from our community's shared knowledge
                    </p>
                </div>

                {/* Desktop Filters */}
                <div className="hidden md:flex justify-between items-center mb-6 gap-4">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search tips..."
                            className="input input-bordered w-full pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-base-content/50" />
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="select select-bordered w-40"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <select
                            className="select select-bordered w-32"
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                        >
                            <option value="all">All Levels</option>
                            {difficulties.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Mobile Filters */}
                <div className="md:hidden mb-6">
                    <div className="flex gap-2 mb-2">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search tips..."
                                className="input input-bordered w-full pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-3 text-base-content/50" />
                        </div>
                        <button
                            className="btn btn-square"
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                        >
                            <FaFilter />
                        </button>
                    </div>

                    {showMobileFilters && (
                        <div className="bg-base-200 p-4 rounded-lg mb-4">
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    className="select select-bordered w-full"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <select
                                    className="select select-bordered w-full"
                                    value={difficultyFilter}
                                    onChange={(e) => setDifficultyFilter(e.target.value)}
                                >
                                    <option value="all">All Levels</option>
                                    {difficulties.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tips Table */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Desktop Table Head */}
                        <thead className="hidden md:table-header-group">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Difficulty</th>
                                <th>Author</th>
                                <th>Likes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {/* Mobile Table Head */}
                        <thead className="md:hidden">
                            <tr>
                                <th colSpan="2">Tips</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTips.length > 0 ? (
                                filteredTips.map(tip => (
                                    <React.Fragment key={tip._id}>
                                        {/* Desktop Row */}
                                        <tr className="hidden md:table-row">
                                            <td>
                                                <div className="avatar">
                                                    <div className="w-16 rounded">
                                                        <img src={tip.image} alt={tip.title} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-medium">{tip.title}</div>
                                                <div className="text-sm text-base-content/70 line-clamp-1">
                                                    {tip.description}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge badge-outline md:w-48">{tip.category}</span>
                                            </td>
                                            <td>
                                                <span className={`badge ${tip.difficulty === 'Easy' ? 'badge-success' :
                                                    tip.difficulty === 'Medium' ? 'badge-warning' : 'badge-error'
                                                    }`}>
                                                    {tip.difficulty}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <div className="avatar">
                                                        <div className="w-8 rounded-full">
                                                            <img src={tip.user.userImage} alt={tip.user.name} />
                                                        </div>
                                                    </div>
                                                    <span>{tip.user.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-1">
                                                    <FaRegThumbsUp className="text-primary" />
                                                    {tip.likes}
                                                </div>
                                            </td>
                                            <td>
                                                <Link to={`/tips/${tip._id}`}>
                                                    <button className="btn w-24 btn-primary btn-sm">
                                                        <FaEye/> View Tip
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>

                                        {/* Mobile Row */}
                                        <tr className="md:hidden">
                                            <td colSpan="2">
                                                <div className="flex flex-col p-4 bg-base-200 rounded-lg">
                                                    <div className="flex items-start gap-4 mb-3">
                                                        <div className="avatar">
                                                            <div className="w-16 rounded">
                                                                <img src={tip.image} alt={tip.title} />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-bold">{tip.title}</h3>
                                                            <p className="text-sm text-base-content/70 line-clamp-2">
                                                                {tip.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <span className="badge badge-outline">{tip.category}</span>
                                                        <span className={`badge ${tip.difficulty === 'Easy' ? 'badge-success' :
                                                            tip.difficulty === 'Medium' ? 'badge-warning' : 'badge-error'
                                                            }`}>
                                                            {tip.difficulty}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <div className="avatar">
                                                                <div className="w-6 rounded-full">
                                                                    <img src={tip.user.userImage} alt={tip.user.name} />
                                                                </div>
                                                            </div>
                                                            <span className="text-sm">{tip.user.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1">
                                                                <FaRegThumbsUp className="text-primary" />
                                                                <span>{tip.likes}</span>
                                                            </div>

                                                            <Link to={`/tips/${tip._id}`}>
                                                                <button className="btn btn-primary btn-sm">
                                                                    <FaEye/> View Tip
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-8">
                                        <div className="text-5xl mb-4">🌱</div>
                                        <h3 className="text-xl font-medium">No tips found</h3>
                                        <p className="text-base-content/70 mt-2">
                                            Try adjusting your search or filters
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tips;