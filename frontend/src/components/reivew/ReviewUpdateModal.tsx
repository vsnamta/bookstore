import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { ReviewResult, ReviewUpdatePayload } from '../../models/reviews';
import { ReviewUpdateRequestActionPayload } from '../../store/review/action';

interface ReviewUpdateModalProps {
    review?: ReviewResult;
    isOpen: boolean;
    onUpdateReview: (payload: ReviewUpdateRequestActionPayload) => void;
    onRequestClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

function ReviewUpdateModal({ review, isOpen, onUpdateReview, onRequestClose }: ReviewUpdateModalProps) {
    if(!review) {
        return null;
    }
    
    const { register, handleSubmit, errors } = useForm<ReviewUpdatePayload>();

    const onSubmit = useCallback((payload: ReviewUpdatePayload) => {
        onUpdateReview({
            id: review.id,
            payload: payload,
            onSuccess: review => alert("변경되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        });
    }, []);

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <button type="button" className="close modal-close-btn ml-auto" data-dismiss="modal"
                aria-label="Close" onClick={onRequestClose}>
                <span aria-hidden="true">&times;</span>
            </button>
            <div className="product-details-modal">
                <div className="contact_form">
                    <h3 className="ct_title">Send Us a Message</h3>
                    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} >
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>평점 <span className="required">*</span></label>
                                    <select 
                                        name="rating" 
                                        className="form-control" 
                                        ref={register({ required: true })}
                                    >                             
                                        <option value="1" selected={review.rating === 1}>1</option>  
                                        <option value="2" selected={review.rating === 2}>2</option> 
                                        <option value="3" selected={review.rating === 3}>3</option> 
                                        <option value="4" selected={review.rating === 4}>4</option>                                      												
                                        <option value="5" selected={review.rating === 5}>5</option> 
                                    </select>
                                    {errors.rating && <span>평점을 선택해주세요.</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>내용 <span className="required">*</span></label>
                                    <input 
                                        type="text" 
                                        name="contents" 
                                        className="form-control"
                                        defaultValue={review.contents}
                                        ref={register({ required: true, maxLength: 30 })} 
                                    />
                                    {errors.contents?.type === "required" && <span>내용을 입력해주세요.</span>}
                                    {errors.contents?.type === "maxLength" && <span>내용을 30자 이하 입력해주세요.</span>}
                                </div>
                            </div>   
                            <div className="col-lg-6">
                                <div className="form-btn">
                                    <button type="submit" value="submit" id="submit" className="btn btn-black"
                                        name="submit">수정</button>
                                </div>
                                <div className="form__output"></div>
                            </div>
                        </div>
                    </form>
                    <div className="form-output">
                        <p className="form-messege"></p>
                    </div>
                </div>
                
            </div>
        </ReactModal>
    )
};

export default React.memo(ReviewUpdateModal);