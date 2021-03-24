import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';
import { DiscountPolicySaveActionPayload } from '../../store/discountPolicy/action';

interface DiscountPolicySaveModalProps {
    isOpen: boolean;
    onSaveDiscountPolicy: (payload: DiscountPolicySaveActionPayload) => void
    onRequestClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

function DiscountPolicySaveModal({ isOpen, onSaveDiscountPolicy, onRequestClose }: DiscountPolicySaveModalProps) {
    const { register, handleSubmit, errors } = useForm<DiscountPolicySaveOrUpdatePayload>();

    const onSubmit = useCallback((payload: DiscountPolicySaveOrUpdatePayload) => {
        onSaveDiscountPolicy({
            payload: payload,
            onSuccess: discountPolicy => alert("저장되었습니다."),
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
                    <h3 className="ct_title">할인정책 등록</h3>
                    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">                                                
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>이름 <span className="required">*</span></label>
                                    <input type="text" 
                                        name="name" 
                                        className="form-control"
                                        ref={register({ required: true })} 
                                    />
                                    {errors.name && <span>이름을 입력해주세요.</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>할인율 <span className="required">*</span></label>
                                    <input type="text" 
                                        name="discountPercent" 
                                        className="form-control"
                                        ref={register({ required: true, min:0, max: 100 })} 
                                    />
                                    {errors.discountPercent?.type === "required" && <span>할인율을 입력해주세요.</span>}
                                    {errors.discountPercent?.type === "min" && <span>할인율을 0% 이상 입력해주세요.</span>}
                                    {errors.discountPercent?.type === "max" && <span>할인율을 100% 이하 입력해주세요.</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>적립율 <span className="required">*</span></label>
                                    <input type="text" 
                                        name="depositPercent" 
                                        className="form-control"
                                        ref={register({ required: true, min: 0 })} 
                                    />
                                    {errors.depositPercent?.type === "required" && <span>적립률을 입력해주세요.</span>}
                                    {errors.depositPercent?.type === "min" && <span>적립률을 0% 이상 입력해주세요.</span>}
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

export default React.memo(DiscountPolicySaveModal);