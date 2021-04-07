import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { CategoryResult, CategorySaveOrUpdatePayload } from '../../models/category';
import { CategorySaveAsyncPayload } from '../../models/category/store';

interface CategorySaveModalProps {
    categoryList?: CategoryResult[];
    isOpen: boolean;
    onSaveCategory: (payload: CategorySaveAsyncPayload) => void;
    onRequestClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

function CategorySaveModal({ categoryList, isOpen, onSaveCategory, onRequestClose }: CategorySaveModalProps) {
    const { register, handleSubmit, errors } = useForm<CategorySaveOrUpdatePayload>();

    const onSubmit = useCallback((payload: CategorySaveOrUpdatePayload) => {
        onSaveCategory({
            payload: payload,
            onSuccess: category => alert("저장되었습니다."),
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
                    <h3 className="ct_title">카테고리 등록</h3>
                    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">      
                            {categoryList && 
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>부모카테고리 <span className="required">*</span></label>
                                    <select 
                                        name="parentId" 
                                        className="form-control" 
                                        ref={register({ required: true })}
                                    >
                                        {categoryList.map(superCategory => 
                                            <option value={superCategory.id} key={superCategory.id}>
                                                {superCategory.name}
                                            </option>
                                        )}													
                                    </select>
                                    {errors.parentId && <span>부모 카테고리를 선택해주세요.</span>}
                                </div>
                            </div>}                   
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>카테고리 <span className="required">*</span></label>
                                    <input type="text" 
                                        name="name" 
                                        className="form-control"
                                        ref={register({ required: true })} 
                                    />
                                    {errors.name && <span>이름을 입력해주세요.</span>}
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

export default React.memo(CategorySaveModal);