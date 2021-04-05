import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { MemberSavePayload } from '../../models/members';
import { MemberSaveActionPayload } from '../../store/member/action';

interface RegisterFormProps {
    onSaveMember: (payload: MemberSaveActionPayload) => void
}

function RegisterForm({ onSaveMember }: RegisterFormProps) {
    const history = useHistory();

    const { register, handleSubmit, getValues, errors } = useForm<MemberSavePayload>();

    const validatePasswordConfirm = useCallback((passwordConfirm: string) => {
        return passwordConfirm === getValues("password");
    }, []);

    const onSubmit = useCallback((payload: MemberSavePayload) => {
        onSaveMember({
            payload: payload,
            onSuccess: member => {
                alert("가입되었습니다.");
                history.push("/login");
            },
            onFailure: error => alert(`오류발생 = ${error.message}`)
        });
    }, []);
    
    return (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb--30 mb-lg--0">
                {/* <!-- Login Form s--> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="login-form">
                        <h4 className="login-title">회원가입</h4>
                        {/* <p><span className="font-weight-bold">I am a new customer</span></p> */}
                        <div className="row">
                            <div className="col-md-12 col-12 mb--15">
                                <label htmlFor="id">아이디</label>
                                <input 
                                    className="mb-0 form-control" 
                                    type="text" 
                                    name="id"
                                    placeholder="Enter your full name"
                                    ref={register({ required: true })}  
                                />
                                {errors.id && <span>아이디를 입력해주세요.</span>}
                            </div>
                            <div className="col-lg-6 mb--20">
                                <label htmlFor="password">비밀번호</label>
                                <input 
                                    className="mb-0 form-control" 
                                    type="password" 
                                    name="password" 
                                    placeholder="Enter your password" 
                                    ref={register({ required: true, minLength:8, maxLength: 16 })} 
                                />
                                {errors.password?.type === "required" && <span>비밀번호를 입력해주세요.</span>}
                                {errors.password?.type === "minLength" && <span>비밀번호를 8자 이상 입력해주세요.</span>}
                                {errors.password?.type === "maxLength" && <span>비밀번호를 16자 이하 입력해주세요.</span>}
                            </div>
                            <div className="col-lg-6 mb--20">
                                <label htmlFor="password">비밀번호 확인</label>
                                <input 
                                    className="mb-0 form-control" 
                                    type="password" 
                                    name="passwordConfirm" 
                                    placeholder="Enter your password" 
                                    ref={register({ required: true, minLength:8, maxLength: 16, validate: validatePasswordConfirm })} 
                                />
                                {errors.passwordConfirm?.type === "required" && <span>비밀번호를 입력해주세요.</span>}
                                {errors.passwordConfirm?.type === "minLength" && <span>비밀번호를 8자 이상 입력해주세요.</span>}
                                {errors.passwordConfirm?.type === "maxLength" && <span>비밀번호를 16자 이하 입력해주세요.</span>}
                                {errors.passwordConfirm?.type === "validate" && <span>비밀번호 다시 확인해주세요.</span>}
                            </div>
                            <div className="col-12 mb--20">
                                <label htmlFor="name">이름</label>
                                <input 
                                    className="mb-0 form-control"
                                    type="text"
                                    name="name" 
                                    placeholder="Enter Your Email Address Here.."
                                    ref={register({ required: true })}  
                                />
                                {errors.name && <span>이름을 입력해주세요.</span>}
                            </div>
                            <div className="col-12 mb--20">
                                <label htmlFor="phoneNumber">휴대폰번호</label>
                                <input 
                                    className="mb-0 form-control" 
                                    type="text" 
                                    name="phoneNumber" 
                                    placeholder="Enter Your Email Address Here.." 
                                    ref={register({ required: true })} 
                                />
                                {errors.phoneNumber && <span>휴대폰번호를 입력해주세요.</span>}
                            </div>
                            <div className="col-12 mb--20">
                                <label htmlFor="zipCode">우편번호</label>
                                <input 
                                    className="mb-0 form-control" 
                                    type="text" 
                                    name="zipCode" 
                                    placeholder="Enter Your Email Address Here.."
                                    ref={register({ required: true })}  
                                />
                                {errors.zipCode && <span>우편번호를 입력해주세요.</span>}
                            </div>
                            <div className="col-12 mb--20">
                                <label htmlFor="address1">주소</label>
                                <input 
                                    className="mb-0 form-control" 
                                    type="text" 
                                    name="address1" 
                                    placeholder="Enter Your Email Address Here.." 
                                    ref={register({ required: true })} 
                                />
                                {errors.address1 && <span>주소를 입력해주세요.</span>}
                            </div>
                            <div className="col-12 mb--20">
                                <label htmlFor="address2">상세주소</label>
                                <input 
                                    className="mb-0 form-control" 
                                    type="text" 
                                    name="address2" 
                                    placeholder="Enter Your Email Address Here.." 
                                    ref={register({ required: true })} 
                                />
                                {errors.address2 && <span>상세주소를 입력해주세요.</span>}
                            </div>
                            <div className="col-md-12">
                                <button type="submit" name="submit" className="btn btn-outlined">등록</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default React.memo(RegisterForm);