import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { MemberDetailResult, MemberUpdatePayload } from '../../models/members';

interface MemberDetailProps {
    member?: MemberDetailResult;
    onUpdateMember: (id: number, payload: MemberUpdatePayload) => void;
}

function MemberDetail({member, onUpdateMember}: MemberDetailProps) {    
    if(!member) {
        return null;
    }

    const { register, handleSubmit, errors } = useForm<MemberUpdatePayload>();

    const onSubmit = useCallback((payload: MemberUpdatePayload) => {
        onUpdateMember(member.id, payload);
    }, []);

    return (
        <div className="account-details-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">    
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>이메일 <span className="required">*</span></label>
                            <input type="text" 
                                name="email" 
                                className="form-control"
                                defaultValue={member.email}
                                disabled={true} 
                            />
                        </div>
                    </div>
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

export default React.memo(MemberDetail);