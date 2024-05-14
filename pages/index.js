import React from "react";
import { HeroSection, Service, BigNFTSlider, Subscribe, Title
} from "../components/componentsindex"
import Style from "../styles/index.module.css";

const index = () => {
    return (
        <div className={Style.homePage}>
            <HeroSection/>
            <Service/>
            <BigNFTSlider/>

            <Title
                heading="All featured NFTs"
                paragraph="Explore Top NFTs in every Sphere of life."
            />
            <Subscribe/>
        </div>
    )
};

export default index;
