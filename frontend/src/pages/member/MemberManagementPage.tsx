import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FindPayload, SearchCriteria } from '../../models/common';
import { RootState } from '../../store';
import { createMemberPageFindAction } from '../../store/member/action';
import MemberManagementTemplate from '../../components/member/MemberManagementTemplate';

function MemberManagementPage() {
    const dispatch = useDispatch();
    const memberPageAsync = useSelector((state: RootState) => state.members.memberPageAsync);

    useEffect(() => {
        dispatch(createMemberPageFindAction({
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(createMemberPageFindAction({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createMemberPageFindAction({
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