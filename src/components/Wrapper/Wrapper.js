import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from './wrapper.module.scss';
import CategoryCarousel from "@/components/carousl";

const Wrapper = ({ children }) => {
  const [carouselData, setContent] = useState([]);
  const { query: { slug } } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/getData/product`);
        setContent(response.data.result);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        {children}</div>
      <section className={styles.carousel}>
        <CategoryCarousel data={carouselData} />
      </section>
      <Footer />
    </div>
  );
}
export default Wrapper;