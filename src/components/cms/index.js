// TwoDivs.js
import React from 'react';
import styles from './ProductTable.module.scss'
import Accordion from '../Accordion';

const AdminCms = () => {
  return (
    <div className={styles.CMScontainer}>
      <div className={styles.box_black}>
        <h1>
          Welcome Admin!
        </h1>
        <p>
          Start By Selecting which Content You Need To Manage.
        </p>

      </div>
      <div className={styles.box}>
        <Accordion />
      </div>
    </div>
  );
};

export default AdminCms;
