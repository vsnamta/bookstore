import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { CategoryResult } from '../../models/category';
import { DiscountPolicyResult } from '../../models/discountPolicy';
import { ProductDetailResult, ProductSaveOrUpdatePayload } from '../../models/product';
import { ProductUpdateAsyncPayload } from '../../models/product/store';

interface ProductUpdateFormProps {
	product?: ProductDetailResult;
    discountPolicyList?: DiscountPolicyResult[]; 
    categoryList?: CategoryResult[];
    onUpdateProduct: (payload: ProductUpdateAsyncPayload) => void;
}

function ProductUpdateForm({ product, discountPolicyList, categoryList, onUpdateProduct }: ProductUpdateFormProps) {
	if(!product || !discountPolicyList || !categoryList) {
        return null;
    }

	const history = useHistory();
	
	const { register, handleSubmit, errors } = useForm<ProductSaveOrUpdatePayload>();

	const [subCategoryList, setSubCategoryList] = useState<CategoryResult[]>(
		(categoryList.find(category => 
			category.id === product.superCategoryId
		) as CategoryResult)
		.children
	);  

	const [imageFileInfo, setImageFileInfo] = useState<{imageFile?: File, imageURL?: string}>({
		imageFile: undefined, 
		imageURL: `/api/files/${product.imageFileName}`
	});

    const onChangeSuperCategory = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const superCategory = categoryList.find(category => category.id === Number.parseInt(event.target.value)) as CategoryResult;
        setSubCategoryList(superCategory.children);
    }, [categoryList]);
	
	const onChangeImageFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const file = (event.currentTarget.files as FileList)[0];

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setImageFileInfo({
				imageFile: file, 
				imageURL: fileReader.result as string
			});
		};

		fileReader.readAsDataURL(file);
	}, []);
	
	const onSubmit = useCallback((payload: ProductSaveOrUpdatePayload) => {
		onUpdateProduct({
            id: product.id, 
            payload: payload,
            file: imageFileInfo.imageFile,
            onSuccess: product => {
                alert("?????????????????????.");
                history.push(`/admin/product/${product.id}`);
            }, 
            onFailure: error => alert(`???????????? = ${error.message}`)
        });
	}, [imageFileInfo, product]);

	const onUpdateCancel = useCallback(() => {
        history.goBack();
    }, []);

    return (
		<div className="row mb--60">
			<div className="col-lg-5 mb--30">
				{/* <!-- Product Details Slider Big Image--> */}
				<div className="product-details-slider sb-slick-slider arrow-type-two">
					<div className="single-slide">
						{imageFileInfo.imageURL &&
							<img src={imageFileInfo.imageURL} alt="" />
						}
					</div>
				</div>
			</div>
			<div className="col-lg-7">
				<div className="product-details-info pl-lg--30">
					<div className="contact_form">
						<h3 className="ct_title">?????? ??????</h3>
						<form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="col-lg-12">
									<div className="form-group">
										<label>???????????? <span className="required">*</span></label>
										<select 
											name="discountPolicyId" 
											className="form-control" 
											ref={register({ required: true })}
										>
											{discountPolicyList.map(discountPolicy => 
												<option 
													value={discountPolicy.id} 
													key={discountPolicy.id} 
													selected={product.discountPolicyId === discountPolicy.id}
												>
													{`${discountPolicy.name}(?????? ${discountPolicy.discountPercent}%, ?????? ${discountPolicy.depositPercent}%)`}
												</option>
											)}													
										</select>
										{errors.discountPolicyId && <span>??????????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>?????? ???????????? <span className="required">*</span></label>
										<select className="form-control" onChange={onChangeSuperCategory}>
											{categoryList.map(category => 
												<option 
													value={category.id} 
													key={category.id}
													selected={product.superCategoryId === category.id}
												>
													{category.name}
												</option>
											)}																									
										</select>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>?????? ???????????? <span className="required">*</span></label>
										<select name="categoryId" className="form-control" ref={register({ required: true })}>													
											{subCategoryList.map(category => 
												<option 
													value={category.id} 
													key={category.id}
													selected={product.subCategoryId === category.id}
												>
													{category.name}
												</option>
											)}
										</select>
										{errors.categoryId && <span>??????????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>?????? ????????? <span className="required">*</span></label>
										<input
											type="file" 
											accept=".gif, .png, .jpg, .jpeg"
											className="form-control" 
											onChange={onChangeImageFile}
										/>
										<input 
											type="hidden" 
											name="imageFileName"
											className="form-control"
											defaultValue={product.imageFileName} 
											ref={register({ required: true })} 
										/>
										{errors.imageFileName && <span>?????????????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>?????? <span className="required">*</span></label>
										<input type="text" 
											name="name" 
											className="form-control"
											defaultValue={product.name} 
											ref={register({ required: true })} 
										/>
										{errors.name && <span>????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>?????? <span className="required">*</span></label>
										<input 
											type="text" 
											name="author" 
											className="form-control"
											defaultValue={product.author} 
											ref={register({ required: true })} 
										/>
										{errors.author && <span>????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>?????????*</label>
										<input 
											type="text" 
											name="publisher" 
											className="form-control"
											defaultValue={product.publisher}  
											ref={register({ required: true })} 
										/>
										{errors.publisher && <span>???????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>?????????*</label>
										<input 
											type="text" 
											name="publishedDate" 
											className="form-control"
											defaultValue={product.publishedDate}  
											ref={register({ required: true, pattern: /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/ })}
										/>
										{errors.publishedDate?.type === "required" && <span>???????????? ??????????????????.</span>}
										{errors.publishedDate?.type === "pattern" && <span>YYYY-MM-DD ????????? ?????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>??? ?????????*</label>
										<input 
											type="text" 
											name="totalPage" 
											className="form-control"
											defaultValue={product.totalPage}  
											ref={register({ required: true })}
										/>
										{errors.totalPage && <span>??? ???????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>ISBN*</label>
										<input 
											type="text"
											name="isbn" 
											className="form-control"
											defaultValue={product.isbn}  
											ref={register({ required: true })}
										/>
										{errors.isbn && <span>ISBN??? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
									<label>??????*</label>
										<input 
											type="text"
											name="regularPrice" 
											className="form-control"
											defaultValue={product.regularPrice} 
											ref={register({ required: true, min: 0 })}
										/>
										{errors.regularPrice?.type === "required" && <span>????????? ??????????????????.</span>}
										{errors.regularPrice?.type === "min" && <span>????????? 0??? ?????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>?????? ??????</label>
										<textarea 
											name="authorIntroduction"
											className="form-control" 
											ref={register({ required: true })}
										>
											{product.authorIntroduction} 
										</textarea>
										{errors.authorIntroduction && <span>??????????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>??? ??????</label>
										<textarea 
											name="bookIntroduction"
											className="form-control" 
											ref={register({ required: true })}
										>
											{product.bookIntroduction}
										</textarea>
										{errors.bookIntroduction && <span>??? ????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<label>??????</label>
										<textarea 
											name="tableOfContents"
											className="form-control" 
											ref={register({ required: true })}
										>
											{product.tableOfContents}
										</textarea>
										{errors.tableOfContents && <span>????????? ??????????????????.</span>}
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-btn">
										<button type="submit" value="submit" className="btn btn-black"
											name="submit">??????</button>
										{" "}<button type="button" className="btn btn-black" onClick={onUpdateCancel}>??????</button>	
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
			</div>
		</div>				
    )
};

export default React.memo(ProductUpdateForm);