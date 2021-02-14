import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';

interface DiscountPolicyUpdateModalProps {
    isOpen: boolean;
    onRequestClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
    discountPolicy: DiscountPolicyResult;
    onUpdateDiscountPolicy: (id: number, payload: DiscountPolicySaveOrUpdatePayload) => void;
}

function DiscountPolicyUpdateModal({ isOpen, onRequestClose, discountPolicy, onUpdateDiscountPolicy }: DiscountPolicyUpdateModalProps) {
    const { register, handleSubmit, errors } = useForm<DiscountPolicySaveOrUpdatePayload>();

    const onSubmit = useCallback((payload: DiscountPolicySaveOrUpdatePayload) => {
        onUpdateDiscountPolicy(discountPolicy.id, payload);
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
                    <h3 className="ct_title">할인정책 수정</h3>
                    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">                                                
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>이름 <span className="required">*</span></label>
                                    <input type="text" 
                                        name="name" 
                                        className="form-control"
                                        defaultValue={discountPolicy.name}
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
                                        defaultValue={discountPolicy.discountPercent}
                                        ref={register({ required: true, min: 0, max: 100 })} 
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
                                        defaultValue={discountPolicy.depositPercent}
                                        ref={register({ required: true, min: 0 })} 
                                    />
                                    {errors.depositPercent?.type === "required" && <span>적립률을 입력해주세요.</span>}
                                    {errors.depositPercent?.type === "min" && <span>적립률을 0% 이상 입력해주세요.</span>}
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

export default React.memo(DiscountPolicyUpdateModal);