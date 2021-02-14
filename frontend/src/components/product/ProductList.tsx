import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductResult } from '../../models/products';

interface ProductListProps {
    productList: ProductResult[];
}

function ProductList({productList}: ProductListProps) {    
    return (
        <div className="shop-product-wrap list with-pagination row space-db--30 shop-border">
            {productList.map(product => (
                <Product key={product.id} product={product} />
            ))}							
        </div>
    )
};

interface ProductProps {
    product: ProductResult;
}

const Product = ({ product }: ProductProps) => {
    return (
        <div className="col-lg-4 col-sm-6">
            <div className="product-card card-style-list">
                <div className="product-list-content">
                    <div className="card-image">
                        <img src={`/api/files/${product.imageFileName}`} className="img-fluid" alt="" />
                    </div>
                    <div className="product-card--body">
                        <div className="product-header">
                            <a href="javascript:void(0)" className="author">
                                {product.author}
                            </a>
                            <h3>
                                <Link to={`/product/${product.id}`} tabIndex={0}>
                                    {product.name}
                                </Link>
                            </h3>
                        </div>
                        <div className="price-block">
                            <span className="price">{(product.regularPrice * (1 -(product.discountPercent / 100)))}원</span>
                            <del className="price-old">{product.regularPrice}원</del>
                            <span className="price-discount">{product.discountPercent}%</span>
                        </div>
                        <div className="rating-block">
                            {new Array(5)
                                .fill(0)
                                .fill(1, 0, Math.round(product.rating))
                                .map(value => (
                                    <span className={value === 1 ? "star_on" : ""}><FontAwesomeIcon icon={faStar} /></span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductList);