import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from '@/components/cms/ProductTable.module.scss';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', image: '', category: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/getData/product/');
      setProducts(response.data.result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('/api/addData/product/', newProduct);
      setNewProduct({ title: '', price: '', description: '', image: '', category: '' });
      fetchProducts();
      setSuccessMessage('Product added successfully.');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    const updatedProduct = products.find((product) => product.id === editProductId);
    try {
      await axios.post(`/api/updateData/product?id=${editProductId}`, updatedProduct);
      fetchProducts();
      setSuccessMessage('Product Updated successfully.');
      setEditProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/deleteData/product?id=${id}`);
      fetchProducts();
      setShowDeleteConfirmation(null);
      setSuccessMessage('Product Deleted successfully.');
    } catch (error) {
      console.error('Error deleting product:', error);
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
    <div className={styles.cms}>
      <div>
        <div>
          <button onClick={openModal} className={styles.addProductBtn}>
            Add New Product</button>
          <div ref={modalRef} className={styles.modal} style={{ display: 'none' }}>
            <div className={styles.modalContent}>
              <span className={styles.closeBtn} onClick={closeModal}>
                &times;
              </span>
              <h2>Add New Product</h2>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>
              <div>
                <label>Image:</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
              </div>
              <div>
                <label>Category:</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
              </div>
              <button onClick={handleAddProduct} className={styles.addProductBtn}>Add !</button>
            </div>
          </div>
        </div>
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="text"
                      value={product.title}
                      onChange={(e) =>
                        setProducts((prev) =>
                          prev.map((item) => (item.id === product.id ? { ...item, title: e.target.value } : item))
                        )
                      }
                    />
                  ) : (
                    product.title
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) =>
                        setProducts((prev) =>
                          prev.map((item) => (item.id === product.id ? { ...item, price: e.target.value } : item))
                        )
                      }
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) =>
                        setProducts((prev) =>
                          prev.map((item) => (item.id === product.id ? { ...item, description: e.target.value } : item))
                        )
                      }
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="text"
                      value={product.image}
                      onChange={(e) =>
                        setProducts((prev) =>
                          prev.map((item) => (item.id === product.id ? { ...item, image: e.target.value } : item))
                        )
                      }
                    />
                  ) : (
                    product.image
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="text"
                      value={product.category}
                      onChange={(e) =>
                        setProducts((prev) =>
                          prev.map((item) => (item.id === product.id ? { ...item, category: e.target.value } : item))
                        )
                      }
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <>
                      <button onClick={handleUpdateProduct}>Save</button>
                      <button onClick={() => setEditProductId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className={styles.butn} onClick={() => setEditProductId(product.id)}>Edit</button>
                      <button className={styles.butn} onClick={() => setShowDeleteConfirmation(product.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDeleteConfirmation && (
          <div className={styles.deleteConfirmation}>
            <p>Are you sure you want to delete this product?</p>
            <button onClick={() => handleDeleteProduct(showDeleteConfirmation)}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(null)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
