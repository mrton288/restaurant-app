import React from "react";
import Delivery from "../img/delivery.png";
import BackgroundHome from "../img/heroBg.png";
import { foodData } from "../utils/data";
import { motion } from "framer-motion";

const HomeContainer = () => {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full pt-16" id="home">
            <div className="flex flex-col items-start justify-center gap-6 lg:gap-4">
                <div className="flex items-center bg-orange-100 rounded-full gap-2 py-1 px-4">
                    <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
                    <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
                        <img
                            src={Delivery}
                            className="w-full h-full object-contain"
                            alt="Delivery"
                        />
                    </div>
                </div>
                <p className="text-[2.5rem] lg:text-[3.75rem] tracking-wide font-bold text-headingColor">
                    The Fastest Delivery in
                    <span className="text-orange-600 text-[3rem] lg:text-[4rem]">Your City</span>
                </p>

                <p className="text-base text-textColor text-center lg:text-left">
                    Lorem, the carrots, consectetur adipisicing developer. The least wants to flight
                    the distinction is for the pleasure of pleasure, the just abandoned rejected the
                    less them, the pains of the painkill !
                </p>
                <motion.button
                    whileTap={{scale: 0.7}}
                    type="button"
                    className="bg-gradient-to-br from-blue-400 to-blue-500 px-4 py-2 w-full lg:w-auto rounded-xl 
                      hover:shadow-lg transition-all ease-in-out duration-100 text-white"
                >
                    Order Now
                </motion.button>
            </div>
            <div className="flex flex-1 items-center relative">
                <img
                    src={BackgroundHome}
                    className="ml-auto h-420 w-full lg:h-580 lg:w-auto"
                    alt="background"
                />
                <div className="absolute w-full h-full flex items-center justify-center gap-2 lg:gap-4 flex-wrap lg:px-30 lg:p-4">
                    {foodData &&
                        foodData.map((n) => (
                            <div
                                key={n.id}
                                className="w-[160px] h-[160px] lg:w-200 lg:h-200 lg:ml-3 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl items-center justify-center flex flex-col shadow-md"
                            >
                                <img
                                    className="w-20 lg:w-36 -mt-10 lg:-mt-20"
                                    src={n.image}
                                    alt={n.name}
                                />
                                <p className="text-sm lg:text-base font-semibold text-textColor mt-2 lg:mt-4">
                                    {n.name}
                                </p>
                                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-2">
                                    {n.des}
                                </p>
                                <p className="text-[12px] lg:text-sm font-semibold text-headingColor">
                                    <span className="#text-red-500">$</span>
                                    {n.price}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default HomeContainer;
