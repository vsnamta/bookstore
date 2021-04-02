import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { ProductDetailResult } from '../../models/products';
import { StockSavePayload } from '../../models/stocks';
import { StockSaveActionPayload } from '../../store/stock/action';

interface StockSaveModalProps {
    product?: ProductDetailResult;
    isOpen: boolean;
    onSaveStock: (payload: StockSaveActionPayload) => void;
    onRequestClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

function StockSaveModal({ product, isOpen, onSaveStock, onRequestClose }: StockSaveModalProps) {
    if(!product) {
        return null;
    }
    
    const { register, handleSubmit, errors } = useForm<StockSavePayload>();

    const onSubmit = useCallback((payload: StockSavePayload) => {
        onSaveStock({
            payload: payload,
            onSuccess: stock => alert("저장되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        });
    }, [onSaveStock]);

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
                    <h3 className="ct_title">상품 재고 등록</h3>
                    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>구분<span className="required">*</span></label>
                                    <select 
                                        name="status" 
                                        className="form-control" 
                                        ref={register({ required: true })}
                                    >
                                        <option value="PURCHASE">입고</option>												
                                    </select>
                                    {errors.status && <span>구분을 선택해주세요.</span>}
                                </div>
                            </div>                                       
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>수량 <span className="required">*</span></label>
                                    <input type="text" 
                                        name="quantity" 
                                        className="form-control"
                                        ref={register({ required: true, min: 1 })} 
                                    />
                                    {errors.quantity?.type === "required" && <span>수량을 입력해주세요.</span>}
                                    {errors.quantity?.type === "min" && <span>수량을 1 이상 입력해주세요.</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>내역 <span className="required">*</span></label>
                                    <input 
                                        type="text" 
                                        name="contents" 
                                        className="form-control"
                                        ref={register({ required: true })} 
                                    />
                                    {errors.contents && <span>내역을 입력해주세요.</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input 
                                        type="hidden" 
                                        name="productId" 
                                        className="form-control"
                                        defaultValue={product.id} 
                                        ref={register({ required: true })} 
                                    />
                                    {errors.productId && <span>상품을 선택해주세요.</span>}
                                </div>
                            </div>                           
                            <div className="col-lg-6">
                                <div className="form-btn">
                                    <button type="submit" value="submit" className="btn btn-black"
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

export default React.memo(StockSaveModal);