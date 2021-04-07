import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { LoginPayload } from '../../models/auth';
import { LoginAsyncPayload } from '../../models/auth/store';

interface LoginFormProps {
    onLogin: (payload: LoginAsyncPayload) => void
} 

function LoginForm({ onLogin }: LoginFormProps) {
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm<LoginPayload>();

    const onSubmit = useCallback((payload: LoginPayload) => {
        onLogin({
            payload: payload,
            onSuccess: () => history.push("/"),
            onFailure: error => alert(`오류 발생 : ${error}`)
        });
    }, []);
    
    return (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="login-form">
                        <h4 className="login-title">로그인</h4>
                        {/* <p><span className="font-weight-bold">I am a returning customer</span></p> */}
                        <div className="row">
                            <div className="col-md-12 col-12 mb--15">
                                <label htmlFor="id">아이디</label>
                                <input 
                                    className="mb-0 form-control"
                                    type="id"
                                    name="id"
                                    placeholder="Enter you email address here..."
                                    ref={register({ required: true })}  
                                />
                                {errors.id && <span>아이디를 입력해주세요.</span>}
                            </div>
                            <div className="col-12 mb--20">
                                <label htmlFor="password">비밀번호</label>
                                <input 
                                    className="mb-0 form-control" 
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    ref={register({ required: true })}  
                                />
                                {errors.password && <span>비밀번호를 입력해주세요.</span>}
                            </div>
                            <div className="col-md-12">
                                <button type="submit" name="submit" className="btn btn-outlined">로그인</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default React.memo(LoginForm);