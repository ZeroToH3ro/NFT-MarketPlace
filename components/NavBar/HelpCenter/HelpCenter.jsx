import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
    const helpCenter = [
        {
            name: "About Us",
            link: "aboutus",
        },
        {
            name: "Reach Us",
            link: "contactus",
        },
        // {
        //     name: "Sign Up",
        //     link: "signUp",
        // },
        // {
        //     name: "Sign In",
        //     link: "signIn",
        // },
        {
            name: "Subscription",
            link: "subscription",
        },
    ];
    return (
        <div className={Style.box}>
            {helpCenter.map((el, i) => (
                <div className={Style.helpCenter}>
                    <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </div>
            ))}
        </div>
    );
};

export default HelpCenter;
