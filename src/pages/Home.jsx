import React from 'react';
import Hero from '../components/Sections/Hero';
import Fleet from '../components/Sections/Fleet';
import Services from '../components/Sections/Services';
import Corporate from '../components/Sections/Corporate';
import Standards from '../components/Sections/Standards';
import ForDrivers from '../components/Sections/ForDrivers';
import FAQ from '../components/Sections/FAQ';
import Trust from '../components/Sections/Trust';
import BookingForm from '../components/Forms/BookingForm';

const Home = ({ language, t, viewMode }) => {
    return (
        <div className="flex flex-col gap-10 md:gap-14">
            {viewMode === 'client' ? (
                <>
                    <Hero t={t} />
                    <Fleet language={language} t={t} />
                    <Services language={language} t={t} />
                    <Corporate t={t} />
                    <Standards language={language} t={t} />
                    <Trust t={t} />

                    <section id="booking" className="max-w-4xl mx-auto w-full px-4 scroll-mt-28 mt-4 md:mt-8">
                        <BookingForm language={language} t={t} />
                    </section>

                    <FAQ language={language} t={t} />
                </>
            ) : (
                <>
                    <ForDrivers t={t} />
                    <Trust t={t} />
                    <FAQ language={language} t={t} />
                </>
            )}
            <div className="h-10"></div>
        </div>
    );
};

export default Home;
