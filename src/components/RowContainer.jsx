import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { MdShoppingBasket } from "react-icons/md";

import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
    const rowContainer = useRef();

    const [items, setItems] = useState([]);

    const [{ cartItems }, dispatch] = useStateValue();

    const addToCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items, // Nối thêm mặt hàng mới vào mảng mặt hàng
        });
        localStorage.setItem("cartItems", JSON.stringify(items)); // Lưu các thông tin vào bộ nhớ cục bộ
    };

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    console.log(rowContainer.current);

    useEffect(() => {
        addToCart();
    }, [items]);

    return (
        <div
            ref={rowContainer}
            className={`w-full my-12 flex gap-4 scroll-smooth scroll ${
                flag
                    ? "overflow-x-scroll scrollbar-none"
                    : "overflow-x-hidden flex-wrap justify-center items-center`"
            }`}
        >
            {data && data.length > 0 ? (
                data.map((item) => (
                    <div
                        key={item?.id}
                        className="w-150 min-w-[150px] lg:w-275 lg:min-w-[275px] bg-cardOverlay rounded-lg my-2 lg:mt-12 shadow-md hover:drop-shadow-lg"
                    >
                        <div className="w-full lg:flex items-center lg:justify-between">
                            <motion.img
                                whileTap={{ scale: 1.2 }}
                                src={item?.imageURL}
                                alt={item?.calories}
                                className="max-h-[120px] min-h-[120px] lg:-mt-8 cursor-pointer"
                            />
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                className="w-8 h-8 rounded-full bg-red-600 flex float-right
                                items-center justify-center cursor-pointer hover:shadow-md mr-3"
                                onClick={() => setItems([...cartItems, item])}
                            >
                                <MdShoppingBasket className="text-white" />
                            </motion.div>
                        </div>

                        <div className="w-full flex flex-col justify-end items-end p-3">
                            <div className="h-8">
                                <p className="lg:text-base text-textColor font-semibold ">
                                    {item?.title}
                                </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item?.calories} Calories</p>
                            <p className="mt-1 text-sm font-semibold">
                                <span className="text-red-500 text-sm font-semibold px-1">$</span>
                                {item?.price}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full flex flex-col items-center justify-center">
                    <img src={NotFound} alt="Not Found" className="h-225" />
                    <p className="text-xl text-headingColor font-semibold my-2">
                        Items Not Avaliable
                    </p>
                </div>
            )}
        </div>
    );
};

export default RowContainer;
