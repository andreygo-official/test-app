import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { deleteProduct, fetchProducts } from '../features/products/productsSlice';
import { Link } from 'react-router-dom';
import styles from './ProductListView.module.css';

const ProductListView = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);
    const [sortOption, setSortOption] = useState('name');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'name') return a.name.localeCompare(b.name);
        if (sortOption === 'count') return a.count - b.count;
        return 0;
    });

    if (status === 'loading') return <div className={styles.loading}>Loading products...</div>;
    if (status === 'failed') return <div className={styles.error}>Error loading products. Please try again.</div>;

    const handleDelete = (productId, productName) => {
        if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
            dispatch(deleteProduct(productId));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Product List</h1>
                <div className={styles.controls}>
                    <select 
                        className={styles.select}
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="name">Sort by Name</option>
                        <option value="count">Sort by Count</option>
                    </select>
                    <button 
                        className={styles.button}
                        onClick={() => console.log('Open Add Modal')}
                    >
                        Add Product
                    </button>
                </div>
            </div>

            <div className={styles.productsGrid}>
                {sortedProducts.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <Link 
                            to={`/product/${product.id}`} 
                            className={styles.productLink}
                        >
                            {product.name}
                        </Link>
                        <p>Count: {product.count}</p>
                        <div className={styles.productActions}>
                            <Link 
                                to={`/product/${product.id}`} 
                                className={styles.button}
                                style={{ textDecoration: 'none', textAlign: 'center' }}
                            >
                                View Details
                            </Link>
                            <button 
                                className={`${styles.button} ${styles.delete}`}
                                onClick={() => handleDelete(product.id, product.name)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListView;