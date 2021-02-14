import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { ReviewSavePayload } from '../../models/reviews';

interface ReviewSaveModalProps {
    isOpen: boolean;
    onRequestClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
    onSaveReview: (payload: ReviewSavePayload) => void
}

function ReviewSaveModal({ isOpen, onRequestClose, onSaveReview }: ReviewSaveModalProps) {
    const { register, handleSubmit, errors } = useForm<ReviewSavePayload>();
    
    const onSubmit = useCallback((payload: ReviewSavePayload) => {
        onSaveReview(payload);
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
                    <form id="contact-form" className="contact-form" onSubmit={handleSubmit(onSubmit)} >
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>평점 <span className="required">*</span></label>
                                    <select 
                                        name="rating" 
                                        className="form-control" 
                                        ref={register({ required: true })}
                                    >                             
                                        <option value="1">1</option>  
                                        <option value="2">2</option> 
                                        <option value="3">3</option> 
                                        <option value="4">4</option>                                      												
                                        <option value="5">5</option> 
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
                                        ref={register({ required: true, maxLength: 100 })} 
                                    />
                                    {errors.contents?.type === "required" && <span>내용을 입력해주세요.</span>}
                                    {errors.contents?.type === "maxLength" && <span>내용을 100자 이하 입력해주세요.</span>}
                                </div>
                            </div>  
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input 
                                        type="hidden" 
                                        name="productId" 
                                        className="form-control"
                                        ref={register({ required: true })} 
                                    />
                                    {errors.productId && <span>평점을 입력해주세요.</span>}
                                </div>
                            </div>        
                            <div className="col-lg-6">
                                <div className="form-btn">
                                    <button type="submit" value="submit" id="submit" className="btn btn-black"
                                        name="submit">저장</button>
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

export default React.memo(ReviewSaveModal);