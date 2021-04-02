import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginMember } from '../../models/members';
import memberApi from '../../apis/memberApi';
import { createSetMyDataAction } from '../../store/member/action';
import { ApiError } from '../../error/ApiError';

function LoginSuccessPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        memberApi.findMyData()
            .then(loginMember => {
                if(loginMember !== "") {
                    localStorage.setItem("tempMyData", JSON.stringify(loginMember as LoginMember));
                    dispatch(createSetMyDataAction(loginMember as LoginMember));                   
                }
            })
            .catch((error: ApiError) => console.log(error.message))
            .finally(() => history.push("/"));
    }, []);

    return null;
};

export default LoginSuccessPage;