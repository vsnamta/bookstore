import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ReviewResult } from '../../models/reviews';
import { ReviewRemoveActionPayload } from '../../store/review/action';

interface MyReviewListProps {
    reviewList?: ReviewResult[];
    onSelectReview: (id: number) => void;
    onRemoveReview: (payload: ReviewRemoveActionPayload) => void;
}

function MyReviewList({ reviewList, onSelectReview, onRemoveReview }: MyReviewListProps) {
    if(!reviewList) {
        return null;
    }
    
    const onClickUpdateBtn = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onSelectReview(parseInt(event.currentTarget.value));
    }, [onSelectReview]);

    const onClickRemoveBtn = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(confirm("삭제하시겠습니까?")) {
            onRemoveReview({
                id: parseInt(event.currentTarget.value),
                onSuccess: () => alert("삭제되었습니다."),
                onFailure: error => alert(`오류발생 = ${error.message}`)
            });
        }
    }, []);
    
    return (
        <div className="row">
            <div className="col-12">
                <div className="myaccount-table table-responsive text-center">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th>상품명</th>
                                <th>평점</th>
                                <th>내용</th>
                                <th>작성일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviewList.map(review => (
                                <tr key={review.id}>   
                                    <td>
                                        <Link to={`/admin/product/${review.productId}`}>{review.productName}</Link>
                                    </td>   
                                    <td>
                                        <div className="rating-block">
                                            {new Array(5)
                                                .fill(0)
                                                .fill(1, 0, Math.round(review.rating))
                                                .map(value => (
                                                    <span className={value === 1 ? "star_on" : ""}><FontAwesomeIcon icon={faStar} /></span>
                                                ))
                                            }
                                        </div>
                                    </td>
                                    <td>{review.contents}</td>
                                    <td>{review.createdDate}</td>
                                    <td>
                                        <div className="add-cart-btn">
                                            <button className="btn btn-outlined--primary" value={review.id} onClick={onClickUpdateBtn} >수정</button>
                                            <button className="btn btn-outlined--primary" value={review.id} onClick={onClickRemoveBtn} >삭제</button> 
                                        </div>   
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>	
            </div>
        </div>
    )
};

export default React.memo(MyReviewList);