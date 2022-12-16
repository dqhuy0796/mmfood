import classNames from 'classnames/bind';
import React, { useRef } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import styles from './Banner.module.scss';
const cb = classNames.bind(styles);

SwiperCore.use([Navigation]);

function Banner() {
    const banners = [
        {
            imageUrl: 'https://banhcanhghemuoiotxanh.com/wp-content/uploads/2021/06/banner-banh-canh-ghe.jpg',
            text: 'banh canh banh canh banh canh',
        },
        {
            imageUrl: 'https://banhcanhghemuoiotxanh.com/wp-content/uploads/2021/06/banner-banh-canh-ghe.jpg',
            text: 'banh canh banh canh banh canh',
        },
        {
            imageUrl: 'https://banhcanhghemuoiotxanh.com/wp-content/uploads/2021/06/banner-banh-canh-ghe.jpg',
            text: 'banh canh banh canh banh canh',
        },
        {
            imageUrl: 'https://banhcanhghemuoiotxanh.com/wp-content/uploads/2021/06/banner-banh-canh-ghe.jpg',
            text: 'banh canh banh canh banh canh',
        },
    ];

    const swiperPrevRef = useRef(null);
    const swiperNextRef = useRef(null);

    return (
        <div className={cb('wrapper')}>
            <Swiper
                loop={true}
                autoplay={true}
                navigation={{
                    prevEl: swiperPrevRef.current ? swiperPrevRef.current : undefined,
                    nextEl: swiperNextRef.current ? swiperNextRef.current : undefined,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = swiperPrevRef.current;
                    swiper.params.navigation.nextEl = swiperNextRef.current;
                }}
                className={cb('banner-swiper')}
            >
                {banners.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.imageUrl} alt={item.text} />
                    </SwiperSlide>
                ))}

                <button ref={swiperPrevRef} className={cb('banner-navigation', 'prev-btn')}>
                    <BsChevronCompactLeft />
                </button>

                <button ref={swiperNextRef} className={cb('banner-navigation', 'next-btn')}>
                    <BsChevronCompactRight />
                </button>
            </Swiper>
        </div>
    );
}

export default Banner;
