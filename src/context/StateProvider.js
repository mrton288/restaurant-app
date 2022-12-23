import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

// Provider: cho phép cung cấp store xuống tất cả component thông qua context
// children: là một wrapper => Provider đang ôm component con
// createContext: tạo component ôm
// dispatch : là một hành động để giúp action được kích hoạt
// useContext: Trả về một giá trị trạng thái và một hàm để cập nhật nó.
// useReducer: cũng giống như useState, sử dụng khi logic phức tạp

/* Bonus*/
// useContext chúng ta có thể chia sẻ state tới các component,
// useReducer thì cho phép chúng ta cập nhật giá trị mới cho state
// khi mà App của bạn có quy mô nhỏ, không nhiều state và bạn chỉ muốn chia sẻ state
// giữa các Component thì bạn hoàn toàn có thể sử dụng useContext để thay thế cho Redux.
