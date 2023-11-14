import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { UserAuth } from "../../context/AuthContext";
import { useTranslation } from 'next-i18next'
import styles from './navbar.module.scss';
import CartIcon from '@/images/svg/cart.svg';
import cx from 'classnames'

const Navbar = () => {
  const router = useRouter();
  const { asPath, locale, pathname, query, replace } = useRouter()
  const options = ['en', 'ar'];

  const handleClick = (selectedLocale) => {
    router.replace({ pathname, query }, asPath, { locale: selectedLocale });
  };

  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation()

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.navMenu}>
          <ul className={cx(styles.leftNav, styles[locale])}>
            <li className={styles.navItem} >
              <Link href="/">{t("HOME")}</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/category">{t("categories")}</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/product">{t("PRODUCT")}</Link>
            </li>
          </ul>
          <Link href="/" className={styles.navLogo}>
            E-SnapTech
          </Link>

          {loading ? null : !user ? (
            <ul className={styles.rightNav}>
              <li onClick={handleSignIn} className={styles.navItem}>
                {t("LOGIN")}
              </li>
              <li onClick={handleSignIn} className={styles.navItem}>
                {t("SIGNUP")}
              </li>
              <div className={styles.toggler}>
                <p className={styles.wlcmText}>Select Language:</p>
                <select onChange={(e) => handleClick(e.target.value)} value={router.locale}>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </ul>
          ) :
            (
              <div className={cx(styles.rightNav, {
                [styles.logedIn]: user != null
              })}>
                <p className={styles.wlcmText}>{t("Welcome")}, {user.displayName}</p>
                <Link href="/cart">
                  <CartIcon />
                </Link>
                <div className={styles.toggler}>
                  <p className={styles.wlcmText}>Select Language:</p>
                  <select onChange={(e) => handleClick(e.target.value)} value={router.locale}>
                    {options.map((option) => (
                      <option key={option} value={option} >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <a className={styles.wlcmText} onClick={handleSignOut}>
                  {t("SIGNOUT")}
                </a>
              </div>
            )}
        </div>
      </div>

    </div >
  );
};

export default Navbar;

