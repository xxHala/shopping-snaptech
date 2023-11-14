import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './carousl.module.scss';
import Image from 'next/image';
import Link from "next/link";

const MyCarousel = ({ data }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className={styles.carousel}>
      <Carousel
        responsive={responsive}
        itemClass={styles.carouselItem}
      >
        {data.map((item) => (
          <Link key={item.id}
            href={{ pathname: `/product/${item.id}`, query: item }}>
            <div>
              <Image src={item.image} alt={item.title} height={220} width={200} />
              <h3>{item.title}</h3>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
