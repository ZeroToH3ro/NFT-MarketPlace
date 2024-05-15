import React from "react";
import {
    HeroSection,
    Service,
    BigNFTSlider,
    Subscribe,
    Title,
    Category,
    Filter,
    NFTCard,
    Collection,
    FollowerTab,
    AudioLive,
    Slider,
    Loader,
    Brand, Video
} from "../components/componentsindex"
import { getTopCreators } from "../TopCreators/TopCreators";
import Style from "../styles/index.module.css";

const index = () => {
    const nfts = [];

    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSlider />
            <Title
                heading="Audio Collection"
                paragraph="Discover the most outstanding NFTs in all topics of life."
            />
            <AudioLive />
            {/*{creators.length == 0 ? (*/}
            {/*    <Loader />*/}
            {/*) : (*/}
            {/*    <FollowerTab TopCreator={creators} />*/}
            {/*)}*/}

            <Slider />
            <Collection />
            <Title
                heading="Featured NFTs"
                paragraph="Discover the most outstanding NFTs in all topics of life."
            />
            <Filter />
            {/*{nfts.length == 0 ? <Loader /> : <NFTCard />}*/}

            <Title
                heading="Browse by category"
                paragraph="Explore the NFTs in the most featured categories."
            />
            <Category />
            <Subscribe />
            <Brand />
            <Video />
        </div>
    )
};

export default index;
