import React from "react";
import { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { app } from "../firebase.config";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
    // Trả về một JSON WEB TOKEN được sử dụng để xác định người sử dụng firebase
    const firebaseAuth = getAuth(app);

    // Tạo thông tin xác thực cho Google. Cần có ít nhất một mã thông báo ID và mã thông báo truy cập.
    const provider = new GoogleAuthProvider();

    // Cú pháp nhận : value từ component cha truyền xuống
    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    // trạng thái giám sát user: Khi đăng nhập thì hiện ra 2 options: new items and logout
    // điều này chỉ đúng khi đó là admin
    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        /**Nếu chưa có người dùng thì thực thi */
        if (!user) {
            /**Chờ cửa sổ pop-up bật lên */
            const {
                user: { providerData },
            } = await signInWithPopup(firebaseAuth, provider);

            /**Gửi ra các dữ liệu */
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));
        } else {
            /**Nếu đó là một người dùng thì */
            setIsMenu(!isMenu);
        }
    };

    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    // Show/hidden thanh chức năng
    const [feature, setFeature] = useState(true);

    return (
        <header
            className="fixed z-50 w-screen px-4 lg:p-2 lg:px-16 bg-gradient-to-b from-red-400 to-orange-300
     "
        >
            {/* desktop & tablet */}
            <div className="hidden lg:flex w-full h-full items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2" onClick={() => setFeature(true)}>
                    <img src={Logo} className="w-10 object-cover" alt="logo" />
                    <p className="text-white text-xl font-bold">GoodFood</p>
                </Link>

                <div className="flex items-center gap-x-8">
                    {feature && (
                        <div className="flex items-center gap-x-8">
                            <motion.ul
                                inherit={{ opacity: 0, x: 200 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 200 }}
                                className="flex items-center gap-8"
                            >
                                <li className="text-base text-white hover:bg-gray-500 px-5 rounded-md py-1 hover:text-gray-50 duration-100 translate-all ease-in-out cursor-pointer">
                                    <a href="#home">Home</a>
                                </li>

                                <li className="text-base text-white hover:bg-gray-500 px-5 rounded-md py-1 hover:text-gray-50 duration-100 translate-all ease-in-out cursor-pointer">
                                    <a href="#menu">Menu</a>
                                </li>
                                <li className="text-base text-white hover:bg-gray-500 px-5 rounded-md py-1 hover:text-gray-50 duration-100 translate-all ease-in-out cursor-pointer">
                                    <a href="#about">About Us</a>
                                </li>
                                <li className="text-base text-white hover:bg-gray-500 px-5 rounded-md py-1 hover:text-gray-50 duration-100 translate-all ease-in-out cursor-pointer">
                                    <a href="#service">Service</a>
                                </li>
                            </motion.ul>
                            <div
                                className="relative flex items-center justify-center"
                                onClick={showCart}
                            >
                                <MdShoppingBasket className="text-white text-2xl cursor-pointer" />
                                {cartItems && cartItems.length > 0 && (
                                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center">
                                        <p className="text-xs text-white font-semibold">
                                            {cartItems.length}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="relative">
                        <motion.img // motion : thêm chuyển động
                            whileTap={{
                                scale: 0.7,
                            }}
                            /**Xem trong firebase có data không nếu có lấy ra dữ liệu avatar */
                            src={user ? user.photoURL : Avatar}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                            alt="userProfile"
                            onClick={login}
                        />

                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                            >
                                {user && user.email === "nd280801@gmail.com" && (
                                    <Link to={"/createItem"}>
                                        <p
                                            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-salte-100 transition-all duration-100 easa-in-out text-textColor text-base"
                                            onClick={() => setFeature(false)}
                                        >
                                            New Item <MdAdd />
                                        </p>
                                    </Link>
                                )}

                                <p
                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-salte-100 transition-all duration-100 easa-in-out text-textColor text-base"
                                    onClick={logout}
                                >
                                    Logout <MdLogout />
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className="flex items-center justify-between lg:hidden w-full h-full p-4">
                <div className="relative flex items-center justify-center" onClick={showCart}>
                    <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                    {cartItems && cartItems.length > 0 && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center">
                            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                    )}
                </div>
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-8 object-cover" alt="logo" />
                    <p className="text-headingColor text-xl font-bold">GoodFood</p>
                </Link>

                <div className="relative">
                    <motion.img // motion : thêm chuyển động
                        whileTap={{ scale: 0.7 }}
                        /**Xem trong firebase có data không nếu có lấy ra dữ liệu avatar */
                        src={user ? user.photoURL : Avatar}
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                        alt="userProfile"
                        onClick={login}
                    />

                    {isMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
                        >
                            {user && user.email === "nd280801@gmail.com" && (
                                <Link to={"/createItem"}>
                                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-salte-200 transition-all duration-100 easa-in-out text-textColor text-base hover:bg-gray-300">
                                        New Item <MdAdd />
                                    </p>
                                </Link>
                            )}

                            <motion.ul className="flex flex-col">
                                <li className="text-base text-textColor ease-in-out cursor-pointer px-4 py-2 hover:bg-gray-300">
                                    Home
                                </li>
                                <li className="text-base text-textColor ease-in-out cursor-pointer px-4 py-2 hover:bg-gray-300">
                                    Menu
                                </li>
                                <li className="text-base text-textColor ease-in-out cursor-pointer px-4 py-2 hover:bg-gray-300">
                                    About Us
                                </li>
                                <li className="text-base text-textColor ease-in-out cursor-pointer px-4 py-2 hover:bg-gray-300">
                                    Service
                                </li>
                            </motion.ul>

                            <p
                                className="m-4 p-2 rounded-md shadow-md flex items-center justify-center gap-3 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all duration-100 easa-in-out text-textColor text-base"
                                onClick={logout}
                            >
                                Logout <MdLogout />
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
