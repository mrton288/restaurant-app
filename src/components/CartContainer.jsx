import React from "react";
import { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { GrClear } from "react-icons/gr";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    const hiddenCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    // Tính tổng từ một mảng cụ thể
    // giá trị khởi tạo là : 0 =>  0 + số lượng * giá
    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumlator, item) {
            return accumlator + item.count * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot);
    }, [tot, flag]);

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });
        localStorage.setItem("cartItems", JSON.stringify([]));
    };

    return (
        <motion.div
            initial={{ opacity: 0.75, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="w-full lg:w-375 fixed bg-white h-screen flex flex-col drop-shadow-md
    top-0 right-0 z-[101]"
        >
            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
                <motion.div whileTap={{ scale: 0.75 }} onClick={hiddenCart}>
                    <MdOutlineKeyboardBackspace className="text-3xl text-textColor" />
                </motion.div>

                <p className="text-textColor text-lg font-semibold">Cart</p>
                <motion.p
                    onClick={clearCart}
                    whileTap={{ scale: 0.75 }}
                    className="flex items-center justify-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md
                    cursor-poiter text-textColor text-base"
                >
                    Clear <GrClear />
                </motion.p>
            </div>
            {/* Bottom section */}
            {cartItems && cartItems.length > 0 ? (
                <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
                    <div
                        className="w-full h-370 px-6 py-10 flex flex-col gap-3 overflow-y-scroll
                scrollbar-none"
                    >
                        {/* Cart Items */}
                        {cartItems &&
                            cartItems.map((item) => (
                                <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} />
                            ))}
                    </div>
                    {/* Cart total section */}

                    <div
                        className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center 
              justify-evenly px-8 py-2"
                    >
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Sub Total</p>
                            <p className="text-gray-400 text-lg">$ {(tot).toFixed(2)}</p>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Delivery</p>
                            <p className="text-gray-400 text-lg">$ 2.5</p>
                        </div>

                        <div className="w-full border-b border-gray-600 my-2"></div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-200 text-xl font-semibold">Total</p>
                            <p className="text-gray-200 text-xl font-semibold">$ {(tot + 2.5).toFixed(2)}</p>
                        </div>
                        {user ? (
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                className="px-20 py-1 text-base text-gray-50 bg-gradient-to-tr from-orange-400
                              to-orange-600 hover:shadow-lg rounded-full cursor-pointer"
                            >
                                Check out
                            </motion.div>
                        ) : (
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                className="px-20 py-1 text-base text-gray-50 bg-gradient-to-tr from-orange-400
                          to-orange-600 hover:shadow-lg rounded-full cursor-pointer"
                            >
                                Login to check out
                            </motion.div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={EmptyCart} className="w-300" alt="/" />
                    <p className="text-xl text-textColor font-semibold">
                        Add some items to your cart
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default CartContainer;
