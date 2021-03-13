import React from 'react';
import { Link } from 'react-router-dom';
import { ProductResult } from '../../models/products';

interface AdminProductListProps {
    productList?: ProductResult[];
}

function AdminProductList({ productList }: AdminProductListProps) { 
    if(!productList) {
        return null;
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="myaccount-table table-responsive text-center">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th>상품</th>
                                <th>저자</th>
                                <th>출판사</th>
                                <th>출판일</th>
                                <th>정가</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map(product => (
                                <tr key={product.id}>                                
                                    <td>
                                        <Link to={`/admin/product/${product.id}`}>{product.name}</Link>
                                    </td>
                                    <td>{product.author}</td>
                                    <td>{product.publisher}</td>
                                    <td>{product.publishedDate}</td>
                                    <td>{product.regularPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    )
};

export default React.memo(AdminProductList);