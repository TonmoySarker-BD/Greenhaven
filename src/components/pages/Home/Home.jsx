import React from 'react';
import Banner from './Banner';
import FeaturedGardeners from './FeaturedGardeners';
import TrendingTips from './TrendingTips';
import SeasonalPlantingGuide from './Extra/SeasonalPlantingGuide';
import CommunityProjects from './Extra/CommunityProjects';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            
            <TrendingTips></TrendingTips>
            <SeasonalPlantingGuide></SeasonalPlantingGuide>
            <CommunityProjects></CommunityProjects>
            <FeaturedGardeners></FeaturedGardeners>
            
        </div>
    );
};

export default Home;