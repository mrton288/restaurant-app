import React from "react";

import HomeContainer from "./HomeContainer";
import { useStateValue } from "../context/StateProvider";
import { useEffect } from "react";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import OfferContainer from "./OfferContainer";
import AboutUsContainer from "./AboutUsContainer";

const MainContainer = () => {
    const [{ cartShow }, dispatch] = useStateValue();

    useEffect(() => {}, [cartShow]);
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <HomeContainer />
            <OfferContainer />
            <MenuContainer />
            {cartShow && <CartContainer />}
            <AboutUsContainer />
        </div>
    );
};

export default MainContainer;
