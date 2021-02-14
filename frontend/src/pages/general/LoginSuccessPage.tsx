import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginMember } from '../../models/members';
import memberService from '../../services/memberService';
import { setMyData } from '../../store/loginMember';

function LoginSuccessPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        memberService.findMyData()
            .then(loginMember => {
                if(loginMember !== "") {
                    localStorage.setItem("loginMember", JSON.stringify(loginMember as LoginMember));
                    dispatch(setMyData(loginMember as LoginMember));                   
                }

                history.push("/");
            });
    }, []);

    return null;
};

export default LoginSuccessPage;