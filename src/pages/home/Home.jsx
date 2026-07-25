import React from 'react';
import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import Services from '../Services/Services';
import Benefits from '../Benefits/Benefits';
import Brands from '../Brands/Brands';
import CallToAction from '../CallToAction/CallToAction';
import Reviews from '../Reviews/Reviews';
import FAQ from '../FAQ/FAQ';

const Home = () => {
    return (
        <div className="pt-8">
            <Banner></Banner>
            <Features></Features>
            <Services></Services>
            <Brands></Brands>
            <Benefits></Benefits>
            <CallToAction></CallToAction>
            <Reviews></Reviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;
