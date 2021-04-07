import React from 'react';
import { Link } from 'react-router-dom';
import { ProductResult } from '../../models/product';

interface BestProductListProps {
    productList?: ProductResult[];
}

function BestProductList({ productList }: BestProductListProps) {
    if(!productList) {
        return null;
    }
    
    return (
        <div className="shop-product-wrap grid-four with-pagination row space-db--30 shop-border">
            {productList.map(product => (
                <BestProduct key={product.id} product={product} />
            ))}
        </div>
    )
};

interface BestProductProps {
    product: ProductResult;
}

const BestProduct = ({ product }: BestProductProps) => {
    return (
        <div className="col-lg-4 col-sm-6">
            <div className="product-card">
                <div className="product-grid-content">
                    <div className="product-card--body">
                        <div className="card-image">
                            <Link to={`/product/${product.id}`} >
                                <img src={`/api/files/${product.imageFileName}`} alt="" />
                            </Link>							
                        </div>
                        <div className="price-block">
                            {product.author}
                            <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
                            <span className="price">{(product.regularPrice * (1 -(product.discountPercent / 100)))}원</span>
                            <del className="price-old">{product.regularPrice}원</del>
                            <span className="price-discount">{product.discountPercent}%</span>
                        </div>
                    </div>
                </div>							
            </div>
        </div>
    );
};

export default React.memo(BestProductList);