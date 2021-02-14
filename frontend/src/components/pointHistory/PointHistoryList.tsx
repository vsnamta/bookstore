import React from 'react';
import { PointHistoryResult } from '../../models/pointHistories';

interface PointHistoryListProps {
    pointhistoryList: PointHistoryResult[];
}

function PointHistoryList({pointhistoryList}: PointHistoryListProps) {    
    return (
        <div className="myaccount-table table-responsive text-center">
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>날짜</th>
                        <th>상태</th>
                        <th>포인트</th>
                        <th>내역</th>
                    </tr>
                </thead>
                <tbody>
                    {pointhistoryList.map(pointhistory => (
                        <tr key={pointhistory.id}>                                         
                            <td>{pointhistory.createdDate}</td>
                            <td>{pointhistory.statusName}</td>
                            <td>{pointhistory.amounts}</td>
                            <td>{pointhistory.contents}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default React.memo(PointHistoryList);