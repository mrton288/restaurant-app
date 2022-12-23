import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { BiMinus, BiPlus } from "react-icons/bi";
let items = [];

const CartItem = ({ item, setFlag, flag }) => {
    const [{ cartItems }, dispatch] = useStateValue();
    const [count, setCount] = useState(item.count);

    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(items)); // Lưu các thông tin vào bộ nhớ cục bộ
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items, // Nối thêm mặt hàng mới vào mảng mặt hàng
        });
    };

    const updateCount = (action, id) => {
        if (action === "add") {
            setCount(count + 1);
            cartItems.map((item) => {
                if (item.id === id) {
                    item.count += 1;
                    setFlag(flag + 1);
                }
            });
            cartDispatch();
        } else {
            // Khởi tạo state value là 1 nên cần kiểm tra nếu nó nhỏ hơn 1 (remove)
            if (count == 1) {
                items = cartItems.filter((item) => item.id !== id);
                setFlag(flag + 1);
                cartDispatch();
            } else {
                // Nếu số lượng không bằng 1 chúng ta cần loại bỏ bằng cách giảm nó
                setCount(count - 1);
                cartItems.map((item) => {
                    if (item.id === id) {
                        item.count -= 1;
                        setFlag(flag + 1);
                    }
                });
                cartDispatch();
            }
        }
    };

    // Bất cứ khi nào có thay đổi về số lượng thì hãy lấy các vật phẩm
    useEffect(() => {
        items = cartItems;
    }, [count, items]);

    console.log(count);

    return (
        <div>
            <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
                <img
                    src={item?.imageURL}
                    alt="item"
                    className="w-12 h-12 m-4 rounded-full object-contain"
                />

                {/* Name section */}
                <div className="flex flex-col gap-2">
                    <p className="text-base text-gray-50">{item?.title}</p>
                    <p className="text-sm text-gray-300 font-semibold">
                        $ {(parseFloat(item?.price) * count).toFixed(2)}
                    </p>
                </div>

                {/* Button section */}
                <div className="group flex items-center gap-3 ml-auto cursor-pointer">
                    <motion.div
                        whileTap={{ scale: 0.7 }}
                        onClick={() => updateCount("remove", item?.id)}
                        className="text-base"
                    >
                        <BiMinus className="text-gray-50" />
                    </motion.div>
                    <p className="text-base text-gray-50 flex items-center justify-center">
                        {count}
                    </p>
                    <motion.div
                        whileTap={{ scale: 0.7 }}
                        onClick={() => updateCount("add", item?.id)}
                        className="text-base"
                    >
                        <BiPlus className="text-gray-50" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
