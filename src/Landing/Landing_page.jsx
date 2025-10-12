import React from 'react';
import Hero from './Hero';
import Leftss from '../components/Leftss';
import Rightss from '../components/Rightss';
import Joining from './Joining';
import Header from '../components/Header';

function Landing_page() {
    return (
        <>
            <div id='/'>
                <Hero />
                <Leftss
                    id="feature1"
                    title="BUY AND SELL IN SECONDS"
                    points={[
                        "Post listings instantly",
                        "verified campus-only buyers",
                        "Zero commission",
                    ]}
                    image="/images/feature1.png"
                />
                <Rightss
                    id="feature2"
                    title="CAMPUS-ONLY MARKETPLACE"
                    points={[
                        "Students only, safe & trusted",
                        "Meet within your campus",
                        "No fake profiles",
                    ]}
                    image="/images/feature2.png"
                />
                <Leftss
                    id="feature3"
                    title="CONNECT & DEAL SAFELY"
                    points={[
                        "In app messeaging",
                        "secure meetups",
                        "Trusted by your peers",
                    ]}
                    image="/images/feature1.png"
                />
                 <Rightss
                    id="feature4"
                    title="SMART CATEGORIES"
                    points={[
                        "Easy browsing",
                        "Quick filters",
                        "Find exaclty what you need",
                    ]}
                    image="/images/feature2.png"
                />
                <Joining />
            </div>
        </>
    );
}

export default Landing_page;