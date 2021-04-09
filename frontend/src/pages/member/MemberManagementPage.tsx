import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FindPayload, SearchCriteria } from '../../models/common';
import { RootState, rootActions } from '../../store';
import MemberManagementTemplate from '../../components/member/MemberManagementTemplate';

function MemberManagementPage() {
    const dispatch = useDispatch();
    const asyncMemberPage = useSelector((state: RootState) => state.members.asyncMemberPage);

    useEffect(() => {
        dispatch(rootActions.fetchMemberPage({
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(rootActions.fetchMemberPage({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(rootActions.fetchMemberPage({
            ...asyncMemberPage.payload as FindPayload,
            pageCriteria: {
                ...(asyncMemberPage.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [asyncMemberPage.payload]);

    return (
        <MemberManagementTemplate 
            asyncMemberPage={asyncMemberPage}
            onUpdateSearchCriteria={onUpdateSearchCriteria}
            onPageChange={onPageChange}
        />
    )
};

export default MemberManagementPage;