import React from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from "react-icons/md";
import { categories } from "../utils/data";
import { Loader } from "./Icons";
import { storage } from "../firebase.config";
import { uploadBytesResumable, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunction";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CreateContainer = () => {
    const nameRef = useRef();

    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [isLoanding, setIsLoanding] = useState(false);

    const [{ foodItems }, dispatch] = useStateValue();

    const uploadImage = (e) => {
        setIsLoanding(true);
        const imageFile = e.target.files[0];
        // ref: Hàm gọi đến bộ nhớ database để nhập gói đó
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);

        // uploadBytesResumable: Tiếp tục tải lên byte
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        // nếu không có lỗi thì nó sẽ đóng url tải xuống đó là tùy chọn cuối cùng
        // đây là ba chức năng khác nhau mà nó sẽ cung cấp cho bạn trên ảnh chụp nhanh

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
                setFields(true);
                setMsg("Error while uploading: Try Again ☠️");
                // khi đặt trạng thái cảnh báo thì cần đặt thời gian chờ và xoá cảnh
                // báo đó sau 4 giây
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoanding(false);
                }, 4000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);
                    setIsLoanding(false);
                    setFields(true);
                    setMsg("Image Uploaded Successfully 😊");
                    setAlertStatus("success");
                    setTimeout(() => {
                        setFields(false);
                    }, 4000);
                });
            }
        );
    };

    const deleteImage = () => {
        setIsLoanding(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoanding(false);
            setFields(true);
            setMsg("Image Deleted Successfully 👍");
            setAlertStatus("success");
            setTimeout(() => {
                setFields(false);
            }, 4000);
        });
    };

    const saveDetails = () => {
        try {
            if (!title || !imageAsset || !price || !category) {
                setFields(true);
                setMsg("Required fields can't be empty 😫");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                }, 1000);
            } else {
                setIsLoanding(true);
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    calories: calories,
                    count: 1,
                    price: price,
                };
                // saveItem(data);
                console.log(data);
                setIsLoanding(false);
                setFields(true);
                setMsg("Data Uploaded Successfully 👍");
                clearData();
                setAlertStatus("success");
                nameRef.current.focus();
                setTimeout(() => {
                    setFields(false);
                }, 4000);
            }
        } catch (error) {
            setFields(true);
            setMsg("Error while uploading: Try Again ☠️");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false);
                setIsLoanding(false);
            }, 4000);
        }
        fetchData();
    };

    const clearData = () => {
        setTitle("");
        setImageAsset(null);
        setCalories("");
        setPrice("");
        setCategory("Select Category");
    };

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            });
        });
    };

    return (
        <div className="w-full flex items-center justify-center lg:py-8 py-16">
            <div className="w-[90%] lg:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col justify-center items-center gap-4">
                {/* Tên của sản phẩm muốn bán */}
                <div className="w-full py-2 flex justify-center items-center border-b border-gray-300 gap-2">
                    <MdFastfood className="text-xl text-gray-700" />
                    <input
                        ref={nameRef}
                        type="text"
                        value={title}
                        placeholder="Give me a title..."
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        className="w-full h-full text-base bg-transparent font-semibold 
                        border-none outline-none placeholder:text-gray-500 text-textColor"
                    />
                </div>
                {/* Loại sản phẩm muốn bán */}
                <div className="w-full">
                    <select
                        defaultValue={"other"}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border-gray-200 p-1 rounded-md cursor-pointer outline-none focus-visible:outline-slate-600"
                    >
                        <option value="other" className="bg-white">
                            Select Category
                        </option>
                        {categories &&
                            categories.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.urlParamName}
                                    className="text-base capitalize bg-white text-headingColor"
                                >
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Xử lý event upload ảnh */}
                <div
                    className="w-full h-225 lg:h-300 flex justify-center items-center 
                rounded-lg border-gray-300 border-2 border-dotted cursor-pointer focus-visible:border-solid"
                >
                    {isLoanding ? (
                        <Loader />
                    ) : (
                        <>
                            {!imageAsset ? (
                                <>
                                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-gray-700 ">
                                        <div className=" w-full h-full flex flex-col items-center justify-center cursor-pointer ">
                                            <MdCloudUpload className="text-3xl" />
                                            <p className="">Click here to upload</p>
                                        </div>
                                        <input
                                            type="file"
                                            name="uploadimage"
                                            accept="image/*"
                                            onChange={uploadImage}
                                            className="w-0 h-0"
                                        />
                                    </label>
                                </>
                            ) : (
                                // Điều này chỉ hiển thị khi nó là nội dung hình ảnh
                                <div className="relative h-full">
                                    <img
                                        className="max-w-[225px] max-h-[225px] items-center justify-center"
                                        src={imageAsset}
                                        alt="uploadImage"
                                    />
                                    <button
                                        type="button"
                                        className="absolute bottom-2 right-2 p-3 rounded-full 
                                        bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md 
                                        duration-500 transiton-all ease-in-out"
                                        onClick={deleteImage}
                                    >
                                        <MdDelete className="text-white" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {/* Nơi nhập thông tin lượng calo của sản phẩm */}
                <div className="w-full flex justify-center items-center border-b border-gray-300 gap-2">
                    <MdFoodBank className="text-xl text-gray-700" />
                    <input
                        type="text"
                        value={calories}
                        placeholder="Calories"
                        onChange={(e) => {
                            setCalories(e.target.value);
                        }}
                        className="w-full h-full text-base bg-transparent
                        border-none outline-none placeholder:text-gray-500 text-textColor"
                    />
                </div>
                {/* Nơi nhập giá của sản phẩm */}
                <div className="w-full flex justify-center items-center border-b border-gray-300 gap-2">
                    <MdAttachMoney className="text-xl text-gray-700" />
                    <input
                        type="text"
                        value={price}
                        placeholder="Price"
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        className="w-full h-full text-base bg-transparent
                        border-none outline-none placeholder:text-gray-500 text-textColor"
                    />
                </div>
                {/* Button thực hiện lưu thông tin */}
                <div className="flex items-center w-full">
                    <button
                        type="button"
                        className="w-full lg:ml-[80%] py-1 border-none outline-none
                        text-lg bg-green-500 rounded-lg text-white font-semibold
                        hover:border-black"
                        onClick={saveDetails}
                    >
                        Save
                    </button>
                </div>
                {/* Gửi ra thông báo cho người bán */}
                {fields && (
                    <motion.p
                        initial={{ opacity: 1, right: -70 }}
                        animate={{ opacity: 1, right: 5 }}
                        exit={{ opacity: 0 }}
                        className={`lg:absolute bottom-[50%] w-64 p-2 rounded-lg text-center text-base font-semibold ${
                            alertStatus === "danger"
                                ? "bg-red-400 text-red-800"
                                : "bg-green-400 text-green-800"
                        }`}
                    >
                        {msg}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default CreateContainer;
