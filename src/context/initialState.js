import { fetchUser } from "../utils/fetchLocalStorageData";
import { fetchCart } from "../utils/fetchLocalStorageData";

// Những biến lưu trữ cục bộ
const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,
};
