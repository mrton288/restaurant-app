/**
 * Hàm này sẽ kiểm tra trong localStorage có người dùng hay
 * không nếu có thì chuyển nó JSON => javascript => gán cho userInfo, Nếu không thì xoá
 */

export const fetchUser = () => {
    const userInfo =
        localStorage.getItem("user") !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : localStorage.clear();

    return userInfo;
};

// Đẩy ra dữ liệu xem ở components
export const fetchCart = () => {
    const cartInfo =
        localStorage.getItem("cartItems") !== "undefined"
            ? JSON.parse(localStorage.getItem("cartItems"))
            : localStorage.clear();

    return cartInfo ? cartInfo : [];
};
