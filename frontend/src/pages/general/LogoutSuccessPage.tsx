import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import memberService from '../../services/memberService';
import { setMyData } from '../../store/loginMember';

function LogoutSuccessPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        memberService.findMyData()
            .then(loginMember => {
                if(loginMember === "") {
                    localStorage.removeItem("loginMember");
                    dispatch(setMyData(undefined));
                }
                
                history.push("/");
            });
    }, []);

    return null;
};

export default LogoutSuccessPage;