import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContainer, Header, MainContainer } from "./components";
import { actionType } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunction";

const App = () => {
    const [{ foodItems }, dispatch] = useStateValue();

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            });
        });
    };

    useEffect(() => {
        fetchData();
    });
    return (
        <div className="w-screen h-auto flex flex-col bg-primary">
            <Header />
            <main className="mt-14 px-4 lg:px-16 w-full flex justify-center items-center">
                <Routes>
                    <Route path="/" element={<MainContainer />} />
                    <Route path="/createItem" element={<CreateContainer />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
