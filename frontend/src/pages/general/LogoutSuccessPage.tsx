import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import memberApi from '../../apis/memberApi';
import { ApiError } from '../../error/ApiError';
import { setMyData } from '../../store/member/action';

function LogoutSuccessPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        memberApi.findMyData()
            .then(loginMember => {
                if(loginMember === "") {
                    localStorage.removeItem("loginMember");
                    dispatch(setMyData(undefined));
                }
                
                history.push("/");
            })
            .catch((error: ApiError) => {
                
            });
    }, []);

    return null;
};

export default LogoutSuccessPage;