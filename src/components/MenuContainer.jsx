import React from "react";
import { useEffect, useState } from "react";
import { MdFastfood } from "react-icons/md";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
    const [filter, setFilter] = useState("chicken");

    const [{ foodItems }, dispatch] = useStateValue();

    // const [scrollValue, setScrollValue] = useState(0);

    // Khi thay đổi cần sử dụng useEffect để lắng nghe sự
    // thay đổi đó để setup đúng hiệu ứng
    useEffect(() => {}, [filter]);

    return (
        <section className="w-full pt-16" id="menu">
            <div className="w-full flex flex-col items-start justify-center">
                <p
                    className="text-xl font-semibold text-headingColor relative capitalize
                    before:absolute before:left-0 before:rounded-lg before:w-20 before:h-1 before:-bottom-2
                    before:bg-gradient-to-tr from-red-700 to-red-300"
                >
                    Our Hot Dishes
                </p>
            </div>

            <div
                className="w-full flex items-center justify-start lg:justify-center gap-4 lg:gap-8 py-6 overflow-x-scroll
            scrollbar-none"
            >
                {categories &&
                    categories.map((category) => (
                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            key={category.id}
                            className={`group ${
                                filter === category.urlParamName ? "bg-red-600" : "bg-card"
                            } w-24 h-28 min-w-[94px] cursor-pointer rounded-lg drop-shadow-xl flex flex-col
                            gap-3 items-center justify-center hover:bg-red-600 duration-100 transition-all ease-in-out`}
                            onClick={() => setFilter(category.urlParamName)}
                        >
                            <div
                                className={`w-10 h-10 rounded-full shadow-lg ${
                                    filter === category.urlParamName ? "bg-white" : "bg-red-600"
                                } group-hover:bg-card flex items-center justify-center`}
                            >
                                <MdFastfood
                                    className={`${
                                        filter === category.urlParamName
                                            ? "text-textColor"
                                            : "text-white"
                                    } group-hover:text-textColor text-lg`}
                                />
                            </div>
                            <p
                                className={`text-sm ${
                                    filter === category.urlParamName
                                        ? "text-white"
                                        : "text-textColor"
                                } group-hover:text-white`}
                            >
                                {category.name}
                            </p>
                        </motion.div>
                    ))}
            </div>
            <div className="w-full">
                <RowContainer flag={false} data={foodItems?.filter((n) => n.category === filter)} />
            </div>
        </section>
    );
};

export default MenuContainer;
