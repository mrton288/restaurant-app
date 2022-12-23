import React from "react";
import {
    MomoIcon,
    VisaIcon,
    AtmIcon,
    ZaloPayIcon,
    VnPayIcon,
    PayIcon,
    InstallmentICon,
    FacebookIcon,
    YoutubeIcon,
    ZaloIcon,
    MocaIcon,
} from "./Icons";
import Delivery from "../img/delivery.png";
import QrCode from "../img/qrcode.png";
import TikTokIcon from "../img/tiktokIcon.svg";

const AboutUsContainer = () => {
    return (
        <div
            className="h-510 w-full flex items-center justify-around my-16 sm:overflow-x-auto"
            id="about"
        >
            <div className="bg-white h-full p-4 flex flex-col">
                <h4 className="text-sm text-headingAbout font-semibold mb-4">Hỗ trợ khách hàng</h4>
                <p className="text-xs text-contentAbout mb-2">
                    Hotline: <span className="text-headingAbout font-semibold">037.2756.335</span>
                    <br />
                    (1000 đ/phút, 8-21h kể cả T7, CN)
                </p>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Các câu hỏi thường gặp
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Gửi yêu cầu hỗ trợ
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Hướng dẫn đặt hàng
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Phương thức vận chuyển
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Chính sách đổi trả
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Hướng dẫn trả góp
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Chính sách hàng nhập khẩu
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Hỗ trợ khách hàng:hotro@mrton.vn
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Báo lỗi bảo mật: security@mrton.vn
                </a>
            </div>
            <div className="bg-white h-full p-4 flex flex-col">
                <h4 className="text-sm text-headingAbout font-semibold mb-4">Về GoodFood</h4>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Giới thiệu GoodFood
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Tuyển dụng
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Chính sách bảo mật thanh toán
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Chính sách bảo mật thông tin cá nhân
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Chính sách giải quyết khiếu nại
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Điều khoản sử dụng
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Giới thiệu GoodFood Xu
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Gói thành viên đặc quyền
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Tiếp thị liên kết
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Bán hàng doanh nghiệp
                </a>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Điều kiện vận chuyển
                </a>
            </div>
            <div className="bg-white h-full p-4 flex flex-col">
                <h4 className="text-sm text-headingAbout font-semibold mb-4">Hợp tác liên kết</h4>
                <a href="/" className="text-xs text-contentAbout mb-2 hover:underline">
                    Quy chế hoạt động sàn GDTMĐT
                </a>
                <a href="/" className="text-xs text-contentAbout mb-6 hover:underline">
                    Bán hàng cùng GoodFood
                </a>
                <h4 className="text-sm text-headingAbout font-semibold mb-4">Chứng nhận bởi</h4>
                <div className="flex gap-2">
                    <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                        width="32"
                        height="32"
                        alt=""
                    ></img>
                    <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                        height="32"
                        width="83"
                        alt=""
                    ></img>
                </div>
            </div>
            <div className="bg-white h-full p-4 flex flex-col">
                <h4 className="text-sm text-headingAbout font-semibold mb-4">
                    Phương thức thanh toán
                </h4>
                <div className="grid grid-cols-4 gap-2 cursor-pointer">
                    <MomoIcon />
                    <VisaIcon />
                    <AtmIcon />
                    <ZaloPayIcon />
                    <VnPayIcon />
                    <PayIcon />
                    <InstallmentICon />
                    <MocaIcon />
                </div>
                <h4 className="text-sm text-headingAbout font-semibold mb-4 mt-6">
                    Dịch vụ giao hàng
                </h4>
                <div className="flex max-w-fit items-center bg-orange-100 rounded-full gap-2 py-1 px-2 cursor-pointer">
                    <p className="text-orange-500 font-semibold">Bike Delivery</p>
                    <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
                        <img
                            src={Delivery}
                            className="w-full h-full object-contain"
                            alt="Delivery"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white h-full p-4 flex flex-col">
                <h4 className="text-sm text-headingAbout font-semibold mb-4">
                    Kết nối với chúng tôi
                </h4>
                <div className="flex gap-2">
                    <a href="https://www.facebook.com/ducnv288/" title="Facebook">
                        <FacebookIcon />
                    </a>

                    <a href="https://www.youtube.com/channel/UC5kgc2rmB_SwJpJ6Qqqlssw">
                        <YoutubeIcon />
                    </a>
                    <a href="/">
                        <ZaloIcon />
                    </a>
                    <a href="https://www.tiktok.com/@duc__nv288">
                        <img src={TikTokIcon} className="w-[32px] h-[33px] rounded-full" alt="tiktok" />
                    </a>
                </div>
                <h4 className="text-sm text-headingAbout font-semibold mb-4 mt-16">
                    Tải ứng dụng trên điện thoại
                </h4>
                <div className="flex items-center justify-start">
                    <img className="w-24 h-w-24" src={QrCode} alt="qrcode" />
                    <div className="flex flex-col gap-y-2">
                        <img
                            className="cursor-pointer"
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                            width="122"
                            alt="appstore"
                        />
                        <img
                            className="cursor-pointer"
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                            width="122"
                            alt="googleplay"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsContainer;
