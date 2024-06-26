import React from "react";
import Image from "next/image";
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
    TiArrowSortedDown,
    TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
    return (
        <div className={Style.footer}>
            <div className={Style.footer_box}>
                <div className={Style.footer_box_social}>
                    <Image src={images.logo} alt="footer logo" height={100} width={100} />
                    <p>
                        Buy, Sell, and Explore marketplace
                        for crypto NFTs and collectibles.
                    </p>

                    <div className={Style.footer_social}>
                        <a href="#">
                            <TiSocialFacebook />
                        </a>
                        <a href="#">
                            <TiSocialLinkedin />
                        </a>
                        <a href="#">
                            <TiSocialTwitter />
                        </a>
                        <a href="#">
                            <TiSocialYoutube />
                        </a>
                        <a href="#">
                            <TiSocialInstagram />
                        </a>
                    </div>
                </div>

                <div className={Style.footer_box_discover}>
                    <h3>Explore</h3>
                    <Discover />
                </div>

                <div className={Style.footer_box_help}>
                    <h3>Service Support</h3>
                    <HelpCenter />
                </div>

                <div className={Style.subscribe}>
                    <h3>Subscribe</h3>

                    <div className={Style.subscribe_box}>
                        <input type="email" placeholder="Enter your email *" />
                        <RiSendPlaneFill className={Style.subscribe_box_send} />
                    </div>
                    <div className={Style.subscribe_box_info}>
                        <p>
                            Explore, buy, and sell outstanding NFTs
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
