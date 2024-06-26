import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillBook, AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";

//INTERNAL IMPORT
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import Button from "../Button/Button";

const BigNFTSilder = () => {
    const [idNumber, setIdNumber] = useState(0);

    const sliderData = [
        {
            title: "Toons NFT",
            name: "April Rashford",
            price: "000045 ETH",
            image: images.user2,
            nftImage: images.nft_image_2,
            time: {
                days: 40,
                hours: 13,
                minutes: 31,
                seconds: 40,
            },
        },
        {
            title: "Ape NFT",
            name: "Vincent Arthur",
            price: "0000089 ETH",
            image: images.user3,
            nftImage: images.nft_image_3,
            time: {
                days: 43,
                hours: 33,
                minutes: 10,
                seconds: 49,
            },
        },
    ];

    //-------INC
    const inc = useCallback(() => {
        if (idNumber + 1 < sliderData.length) {
            setIdNumber(idNumber + 1);
        }
    }, [idNumber, sliderData.length]);

    //-------DEC
    const dec = useCallback(() => {
        if (idNumber > 0) {
            setIdNumber(idNumber - 1);
        }
    }, [idNumber]);

    return (
        <div className={Style.bigNFTSlider}>
            <div className={Style.bigNFTSlider_box}>
                <div className={Style.bigNFTSlider_box_left}>
                    <h2>{sliderData[idNumber].title}</h2>
                    <div className={Style.bigNFTSlider_box_left_creator}>
                        <div className={Style.bigNFTSlider_box_left_creator_profile}>
                            <Image
                                className={Style.bigNFTSlider_box_left_creator_profile_img}
                                src={sliderData[idNumber].image}
                                alt="profile image"
                                width={50}
                                height={50}
                            />
                            <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                                <p>Creator</p>
                                <h4>
                                    {sliderData[idNumber].name}{" "}
                                    <span>
                    <MdVerified />
                  </span>
                                </h4>
                            </div>
                        </div>

                        <div className={Style.bigNFTSlider_box_left_creator_collection}>
                            <AiFillBook
                                className={Style.bigNFTSlider_box_left_creator_collection_icon}
                            />

                            <div
                                className={Style.bigNFTSlider_box_left_creator_collection_info}
                            >
                                <h4>{sliderData[idNumber].collection}</h4>
                            </div>
                        </div>
                    </div>

                    <div className={Style.bigNFTSlider_box_left_bidding}>
                        <div className={Style.bigNFTSlider_box_left_bidding_box}>
                            <small>Current Bid</small>
                            <p>
                                {sliderData[idNumber].price}
                            </p>
                        </div>

                        <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>

                            <span>Auction Deadline</span>
                        </p>

                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                            <div
                                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                            >
                                <p>{sliderData[idNumber].time.days}</p>
                                <span>Days</span>
                            </div>

                            <div
                                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                            >
                                <p>{sliderData[idNumber].time.hours}</p>
                                <span>Hours</span>
                            </div>

                            <div
                                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                            >
                                <p>{sliderData[idNumber].time.minutes}</p>
                                <span>mins</span>
                            </div>

                            <div
                                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                            >
                                <p>{sliderData[idNumber].time.seconds}</p>
                                <span>secs</span>
                            </div>
                        </div>

                        <div className={Style.bigNFTSlider_box_left_button}>
                            <Button btnName="Spot" handleClick={() => {}} />
                            <Button btnName="View" handleClick={() => {}} />
                        </div>
                    </div>

                    <div className={Style.bigNFTSlider_box_left_sliderBtn}>
                        <TbArrowBigLeftLines
                            className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                            onClick={() => dec()}
                        />
                        <TbArrowBigRightLine
                            className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                            onClick={() => inc()}

                        />
                    </div>
                </div>

                <div className={Style.bigNFTSlider_box_right}>
                    <div className={Style.bigNFTSlider_box_right_box}>
                        <Image
                            src={sliderData[idNumber].nftImage}
                            alt="NFT IMAGE"
                            className={Style.bigNFTSlider_box_right_box_img}
                        />

                        <div className={Style.bigNFTSlider_box_right_box_like}>
                            <AiFillHeart />
                            <span>{sliderData[idNumber].like}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BigNFTSilder;
