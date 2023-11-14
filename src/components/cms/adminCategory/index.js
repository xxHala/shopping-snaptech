import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from '@/components/cms/ProductTable.module.scss';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ title: '' });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/getData/category/');
      setCategories(response.data.result);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post('/api/addData/category/', newCategory);
      setNewCategory({ title: '' });
      fetchCategories();
      setSuccessMessage('Category added successfully.');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {

    try {
      await axios.delete(`/api/deleteData/category?id=${id}`);
      fetchCategories();
      setShowDeleteConfirmation(null);
      setSuccessMessage('Category deleted successfully.');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const openModal = () => {
    modalRef.current.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalRef.current.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={styles.catCms}>
      <div>
        <div>
          <button onClick={openModal} className={styles.addProductBtn}>
            Add New Category
          </button>
          <div ref={modalRef} className={styles.modal} style={{ display: 'none' }}>
            <div className={styles.modalContent}>
              <span className={styles.closeBtn} onClick={closeModal}>
                &times;
              </span>
              <h2>Add New Category</h2>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                />
              </div>
              <button onClick={handleAddCategory} className={styles.addProductBtn}>
                Add !
              </button>
            </div>
          </div>
        </div>
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.title}</td>
                <td>
                  <button className={styles.butn} onClick={() => setEditCategoryId(category.id)}>
                    Edit
                  </button>
                  <button
                    className={styles.butn}
                    onClick={() => setShowDeleteConfirmation(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDeleteConfirmation && (
          <div className={styles.deleteConfirmation}>
            <p>Are you sure you want to delete this category?</p>
            <button onClick={() => handleDeleteCategory(showDeleteConfirmation)}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(null)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTable;
