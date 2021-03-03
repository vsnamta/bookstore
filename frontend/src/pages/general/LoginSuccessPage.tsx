import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginMember } from '../../models/members';
import memberApi from '../../apis/memberApi';
import { setMyData } from '../../store/loginMember';
import { ApiError } from '../../error/ApiError';

function LoginSuccessPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        memberApi.findMyData()
            .then(loginMember => {
                if(loginMember !== "") {
                    localStorage.setItem("loginMember", JSON.stringify(loginMember as LoginMember));
                    dispatch(setMyData(loginMember as LoginMember));                   
                }

                history.push("/");
            })
            .catch((error: ApiError) => {
                
            });
    }, []);

    return null;
};

export default LoginSuccessPage;