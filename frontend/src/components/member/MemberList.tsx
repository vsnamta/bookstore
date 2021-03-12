import React from 'react';
import { MemberResult } from '../../models/members';

interface MemberListProps {
    memberList?: MemberResult[];
}

function MemberList({memberList}: MemberListProps) {   
    if(!memberList) {
        return null;
    }

    return (
        <div className="myaccount-table table-responsive text-center">
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>아이디</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>회원유형</th>
                        <th>가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.map(member => (
                        <tr key={member.id}>                                         
                            <td>{member.id}</td>
                            <td>{member.email}</td>
                            <td>{member.phoneNumber}</td>
                            <td>{member.roleName}</td>
                            <td>{member.createdDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    )
};

export default React.memo(MemberList);