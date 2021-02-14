import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ReviewResult } from '../../models/reviews';

interface ReviewListProps {
    reviewList: ReviewResult[];
}

function ReviewList({ reviewList }: ReviewListProps) {
    return (
        <div className="review-wrapper">
            {reviewList.map(review => (
                <div className="review-comment mb--20" key={review.id}>
                    <div className="text">
                        <div className="rating-block mb--15">
                            {new Array(5)
                                .fill(0)
                                .fill(1, 0, review.rating)
                                .map(value => (
                                    <span className={value === 1 ? "star_on" : ""}><FontAwesomeIcon icon={faStar} /></span>
                                ))
                            }
                        </div>
                        <h6 className="author">
                            {review.memberName + " "}<span className="font-weight-400">{review.createdDate}</span>
                        </h6>
                        <p>{review.contents}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default React.memo(ReviewList);