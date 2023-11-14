import React from 'react';
import heroImage from "@/images/hero-img.png"
import Image from 'next/image';
import styles from "./homepage.module.scss";
import { useTranslation } from 'next-i18next'
import Link from "next/link";
import { useRouter } from 'next/router';
import cx from 'classnames'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head'; // Import the Head component

const HeroSection = () => {

  const { t } = useTranslation()
  const { locale } = useRouter()
  const pageTitle = 'Home Page';
  const pageDescription = 'User Home Page with basic heroSection and product carousel.';


  return (

    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <section className={styles.Hero_root}>
        <div className={styles.Hero_image}>
          <div className={styles.Image_wrap}>
            <Image src={heroImage} alt='Hero image for homepage' />
          </div>
        </div>
        <div className={cx(styles.Hero_text, styles[locale])}>
          <div>
            <h1 className={cx(styles.Hero_title, styles[locale])}>
              {t("DisCover")}
            </h1>
            <h2 className={cx(styles.Hero_subtitle, styles[locale])}>
              {t("desc")}
            </h2>
          </div>
          <div className={cx(styles.Hero_ctas, styles[locale])}>
            <div className={cx(styles.Hero_cta, styles[locale])}>
              <Link href="/category" className={styles.Button_root}>
                {t("shopNow")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carousl */}

    </div>
  );
};

export default HeroSection;
