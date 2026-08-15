import React from 'react';
import Hero from '../components/Sections/Hero';
import Services from '../components/Sections/Services';
import Standards from '../components/Sections/Standards';
import BookingForm from '../components/Forms/BookingForm';

const Home = ({ language, t }) => {
    return (
        <div className="flex flex-col gap-20">
            <Hero t={t} />
            <Services language={language} t={t} />
            <Standards language={language} t={t} />

            <section id="booking" className="max-w-4xl mx-auto w-full px-4 mb-20 scroll-mt-28">
                <BookingForm language={language} t={t} />
            </section>
        </div>
    );
};

export default Home;
