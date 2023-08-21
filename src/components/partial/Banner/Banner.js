import classNames from 'classnames/bind';
import React, { useRef } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import styles from './Banner.module.scss';
const scss = classNames.bind(styles);

SwiperCore.use([Navigation]);

function Banner() {
    const banners = [
        {
            imageUrl: 'https://baobariavungtau.com.vn/dataimages/202301/original/images1783236_11m1.jpg',
            text: 'banh canh banh canh banh canh',
        },
        {
            imageUrl: 'https://baobariavungtau.com.vn/dataimages/202301/original/images1783236_11m1.jpg',
            text: 'banh canh banh canh banh canh',
        },
        {
            imageUrl: 'https://baobariavungtau.com.vn/dataimages/202301/original/images1783236_11m1.jpg',
            text: 'banh canh banh canh banh canh',
        },
        {
            imageUrl: 'https://baobariavungtau.com.vn/dataimages/202301/original/images1783236_11m1.jpg',
            text: 'banh canh banh canh banh canh',
        },
    ];

    const swiperPrevRef = useRef(null);
    const swiperNextRef = useRef(null);

    return (
        <div className={scss('wrapper')}>
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
                className={scss('banner-swiper')}
            >
                {banners.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.imageUrl} alt={item.text} />
                    </SwiperSlide>
                ))}

                <button ref={swiperPrevRef} className={scss('banner-navigation', 'prev-btn')}>
                    <BsChevronCompactLeft />
                </button>

                <button ref={swiperNextRef} className={scss('banner-navigation', 'next-btn')}>
                    <BsChevronCompactRight />
                </button>
            </Swiper>
        </div>
    );
}

export default Banner;
