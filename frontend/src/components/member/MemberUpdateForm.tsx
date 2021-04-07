import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { MemberDetailResult, MemberUpdatePayload } from '../../models/member';
import { MemberUpdateAsyncPayload } from '../../models/member/store';

interface MemberUpdateFormProps {
    member?: MemberDetailResult;
    onUpdateMember: (payload: MemberUpdateAsyncPayload) => void;
}

function MemberUpdateForm({ member, onUpdateMember }: MemberUpdateFormProps) {    
    if(!member) {
        return null;
    }

    const { register, handleSubmit, getValues, errors } = useForm<MemberUpdatePayload>();

    const validatePasswordConfirm = useCallback((passwordConfirm: string) => {
        return passwordConfirm === getValues("password");
    }, []);

    const onSubmit = useCallback((payload: MemberUpdatePayload) => {
        onUpdateMember({
            id: member.id,
            payload: payload,
            onSuccess: member => alert("변경되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        });
    }, []);

    return (
        <div className="account-details-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>이름 <span className="required">*</span></label>
                            <input type="text" 
                                name="name" 
                                className="form-control"
                                defaultValue={member.name} 
                                disabled={true}
                            />
                        </div>
                    </div>                
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>휴대폰번호 <span className="required">*</span></label>
                            <input type="text" 
                                name="phoneNumber" 
                                className="form-control"
                                defaultValue={member.phoneNumber} 
                                ref={register({ required: true })} 
                            />
                            {errors.phoneNumber && <span>휴대폰 번호를 입력해주세요.</span>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>우편번호 <span className="required">*</span></label>
                            <input type="text" 
                                name="zipCode" 
                                className="form-control"
                                defaultValue={member.zipCode} 
                                ref={register({ required: true })} 
                            />
                            {errors.zipCode && <span>우편 번호를 입력해주세요.</span>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>주소 <span className="required">*</span></label>
                            <input type="text" 
                                name="address1" 
                                className="form-control"
                                defaultValue={member.address1} 
                                ref={register({ required: true })} 
                            />
                            {errors.address1 && <span>주소를 입력해주세요.</span>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>상세 주소 <span className="required">*</span></label>
                            <input type="text" 
                                name="address2" 
                                className="form-control"
                                defaultValue={member.address2} 
                                ref={register({ required: true })} 
                            />
                            {errors.address2 && <span>상세 주소를 입력해주세요.</span>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>현재 비밀번호 <span className="required">*</span></label>
                            <input 
                                type="password" 
                                name="currentPassword" 
                                className="form-control"
                                ref={register({ required: true, minLength:8, maxLength: 16 })} 
                            />
                            {errors.currentPassword?.type === "required" && <span>현재 비밀번호를 입력해주세요.</span>}
                            {errors.currentPassword?.type === "minLength" && <span>현재 비밀번호를 8자 이상 입력해주세요.</span>}
                            {errors.currentPassword?.type === "maxLength" && <span>현재 비밀번호를 16자 이하 입력해주세요.</span>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>비밀번호 <span className="required">*</span></label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control"
                                ref={register({ required: true, minLength:8, maxLength: 16 })} 
                            />
                            {errors.password?.type === "required" && <span>비밀번호를 입력해주세요.</span>}
                            {errors.password?.type === "minLength" && <span>비밀번호를 8자 이상 입력해주세요.</span>}
                            {errors.password?.type === "maxLength" && <span>비밀번호를 16자 이하 입력해주세요.</span>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>비밀번호 확인<span className="required">*</span></label>
                            <input 
                                type="password" 
                                name="passwordConfirm" 
                                className="form-control"
                                ref={register({ required: true, min:8, max: 16, validate: validatePasswordConfirm })} 
                            />
                            {errors.passwordConfirm?.type === "required" && <span>비밀번호를 입력해주세요.</span>}
                            {errors.passwordConfirm?.type === "min" && <span>비밀번호를 8자 이상 입력해주세요.</span>}
                            {errors.passwordConfirm?.type === "max" && <span>비밀번호를 16자 이하 입력해주세요.</span>}
                            {errors.passwordConfirm?.type === "validate" && <span>비밀번호를 다시 확인해주세요.</span>}
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
        </div>
    )
};

export default React.memo(MemberUpdateForm);