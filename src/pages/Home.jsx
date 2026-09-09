import React from 'react';
import ForDrivers from '../components/Sections/ForDrivers';
import Trust from '../components/Sections/Trust';
import FAQ from '../components/Sections/FAQ';
import TeamCalculator from '../components/Sections/TeamCalculator';

const Home = ({ language, t }) => {
    return (
        <div className="flex flex-col gap-10 md:gap-14">
            <ForDrivers t={t} />
            <TeamCalculator />
            <Trust t={t} />
            <FAQ language={language} t={t} viewMode="driver" />
            <div className="h-10"></div>
        </div>
    );
};

export default Home;
