import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FindPayload, SearchCriteria } from '../../models/common';
import { RootState } from '../../store';
import { actions } from '../../store/member';
import MemberManagementTemplate from '../../components/member/MemberManagementTemplate';

function MemberManagementPage() {
    const dispatch = useDispatch();
    const memberPageAsync = useSelector((state: RootState) => state.members.memberPageAsync);

    useEffect(() => {
        dispatch(actions.fetchMemberPage({
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(actions.fetchMemberPage({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(actions.fetchMemberPage({
            ...memberPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(memberPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [memberPageAsync.payload]);

    return (
        <MemberManagementTemplate 
            memberPageAsync={memberPageAsync}
            onUpdateSearchCriteria={onUpdateSearchCriteria}
            onPageChange={onPageChange}
        />
    )
};

export default MemberManagementPage;