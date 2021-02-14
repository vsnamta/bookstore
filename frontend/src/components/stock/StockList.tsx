import React from 'react';
import { StockResult } from '../../models/stocks';

interface StockListProps {
    stockList: StockResult[];
}

function StockList({stockList}: StockListProps) {    
    return (
        <div className="myaccount-table table-responsive text-center">
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>날짜</th>
                        <th>수량</th>
                        <th>상태</th>
                        <th>내역</th>
                    </tr>
                </thead>
                <tbody>
                    {stockList.map(stock => (
                        <tr key={stock.id}>
                            <td>{stock.createdDate}</td>                                         
                            <td>{stock.quantity}</td>
                            <td>{stock.statusName}</td>
                            <td>{stock.contents}</td>                                          
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    )
};

export default React.memo(StockList);