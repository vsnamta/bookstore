import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { CategoryResult, CategorySaveOrUpdatePayload } from '../../models/categories';
import { CategoryUpdateActionPayload } from '../../store/category/action';

interface CategoryUpdateModalProps {
    category?: CategoryResult;
    categoryList?: CategoryResult[];
    isOpen: boolean;
    onUpdateCategory: (payload: CategoryUpdateActionPayload) => void;
    onRequestClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

function CategoryUpdateModal({ category, categoryList, isOpen, onUpdateCategory, onRequestClose }: CategoryUpdateModalProps) {
    if(!category) {
        return null;
    }

    const { register, handleSubmit, errors } = useForm<CategorySaveOrUpdatePayload>();

    const onSubmit = useCallback((payload: CategorySaveOrUpdatePayload) => {
        onUpdateCategory({
            id: category.id,
            payload: payload,
            onSuccess: category => alert("변경되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        });
    }, [category.id]);

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
                    <h3 className="ct_title">카테고리 수정</h3>
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
                                            <option 
                                                value={superCategory.id} 
                                                key={superCategory.id} 
                                                selected={superCategory.id === category.parentId}
                                            >
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
                                        defaultValue={category.name} 
                                        ref={register({ required: true })} 
                                    />
                                    {errors.name && <span>이름을 입력해주세요.</span>}
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

export default React.memo(CategoryUpdateModal);