import React, { useCallback } from 'react';
import { DiscountPolicyResult } from '../../models/discountPolicies';

interface DiscountPolicyListProps {
    discountPolicyList: DiscountPolicyResult[];
    onSelectDiscountPolicy: (id: number) => void;
}

function DiscountPolicyList({discountPolicyList, onSelectDiscountPolicy}: DiscountPolicyListProps) {    
    const onClickUpdateBtn = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onSelectDiscountPolicy(parseInt(event.currentTarget.value));
    }, [onSelectDiscountPolicy]);
    
    return (
        <div className="myaccount-table table-responsive text-center">
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>이름</th>
                        <th>할인율</th>
                        <th>적립률</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {discountPolicyList.map(discountPolicy => (
                        <tr key={discountPolicy.id}>                                         
                            <td>{discountPolicy.name}</td>
                            <td>{discountPolicy.discountPercent}</td>
                            <td>{discountPolicy.depositPercent}</td>
                            <td>
                                <div className="add-cart-btn">
                                    <button className="btn btn-outlined--primary" value={discountPolicy.id} onClick={onClickUpdateBtn} >수정</button>
                                </div>                                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    )
};

export default React.memo(DiscountPolicyList);