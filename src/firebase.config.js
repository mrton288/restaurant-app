import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB_5HSlsfW9T6MD48kTV8OLHi62fckjc3Y",
    authDomain: "restaurant-app-ad2f2.firebaseapp.com",
    databaseURL: "https://restaurant-app-ad2f2-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-ad2f2",
    storageBucket: "restaurant-app-ad2f2.appspot.com",
    messagingSenderId: "584740333757",
    appId: "1:584740333757:web:2f29ae8f9724b8eb5cafd4",
};

/**Kiểm tra xem có người dùng không nếu không thì khởi tạo mới
 */
const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, storage, firestore };
