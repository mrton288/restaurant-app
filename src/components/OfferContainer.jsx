import React from "react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

import RowContainer from "./RowContainer";

import { useStateValue } from "../context/StateProvider";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const OfferContainer = () => {
    // const rowContainer = useRef();

    const [{ foodItems }, dispatch] = useStateValue();

    const [scrollValue, setScrollValue] = useState(0);

    // const scroll = (scrollValue) => {
    //     rowContainer.current.scrollLeft += scrollValue;
    // };

    return (
        <div className="w-full pt-16" id="service">
            <section className="w-full">
                <div className="w-full flex items-center justify-between">
                    <p
                        className="text-xl font-semibold text-headingColor relative
        before:absolute before:rounded-lg before:w-32 before:h-1 before:-bottom-2
        before:left-0 before:bg-gradient-to-tr from-red-600 to-red-400"
                    >
                        Our Fresh & Healthy fruits
                    </p>

                    <div className="hidden lg:flex gap-3 items-center justify-center">
                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            className="w-8 h-8 bg-orange-500 hover:bg-orange-300 flex items-center justify-center 
            rounded-lg cursor-pointer hover:shadow-lg"
                            onClick={() => setScrollValue(-200)}
                        >
                            <MdChevronLeft className="text-lg text-white" />
                        </motion.div>
                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            className="w-8 h-8 bg-orange-500 hover:bg-orange-300 flex items-center justify-center 
            rounded-lg cursor-pointer hover:shadow-lg"
                            onClick={() => setScrollValue(-200)}
                        >
                            <MdChevronRight className="text-lg text-white" />
                        </motion.div>
                    </div>
                </div>
            </section>
            <RowContainer
                scrollValue={scrollValue}
                flag={true}
                data={foodItems?.filter((n) => n.category === "fruits")}
            />
        </div>
    );
};

export default OfferContainer;
