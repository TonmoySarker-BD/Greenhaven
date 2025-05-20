import React from 'react';
import Banner from './Banner';
import FeaturedGardeners from './FeaturedGardeners';
import TrendingTips from './TrendingTips';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedGardeners></FeaturedGardeners>
            <TrendingTips></TrendingTips>
            
        </div>
    );
};

export default Home;