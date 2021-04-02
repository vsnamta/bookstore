import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import memberApi from '../../apis/memberApi';
import { ApiError } from '../../error/ApiError';
import { createSetMyDataAction } from '../../store/member/action';

function LogoutSuccessPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        memberApi.findMyData()
            .then(loginMember => {
                if(loginMember === "") {
                    localStorage.removeItem("tempMyData");
                    dispatch(createSetMyDataAction(undefined));
                }
            })
            .catch((error: ApiError) => console.log(error.message))
            .finally(() => history.push("/"));
    }, []);

    return null;
};

export default LogoutSuccessPage;