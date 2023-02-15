/*
import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";

function Footer() {

    return (
        <footer className="swiper-wrapper footer-container" id="swiper-wrapper">
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                navigation={true}
                className="mySwiper"
                id="mySwiper"
                breakpoints={{
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1500: {
                        slidesPerView: 4
                    },
                    1800: {
                        slidesPerView: 5
                    }
                }}
            >
                {Object.keys(imageData).length > 0 && imageData.map((image) => (
                    <SwiperSlide key={image.blur_hash}>
                        <div className="swiper_img-wrapper">
                            <img
                                className="swiper_img"
                                src={image.urls.full}
                                alt="Car image"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </footer>
    )
}

export default Footer;*/
