import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginMember } from '../../models/members';
import { PointHistoryFindPayload } from '../../models/pointHistories';
import { RootState } from '../../store';
import { createFindPointHistoryPageAction } from '../../store/pointHistory/action';
import MyPointHistoryTemplate from '../../components/pointHistory/MyPointHistoryTemplate';

function MyPointHistoryPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember) as LoginMember;
    const pointHistoryPageAsync = useSelector((state: RootState) => state.pointHistories.pointHistoryPageAsync);

    useEffect(() => {
        dispatch(createFindPointHistoryPageAction({
            memberId: loginMember.id,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createFindPointHistoryPageAction({
            ...pointHistoryPageAsync.payload as PointHistoryFindPayload,
            pageCriteria: {
                ...(pointHistoryPageAsync.payload as PointHistoryFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [pointHistoryPageAsync.payload]);
    
    return (
        <MyPointHistoryTemplate 
            pointHistoryPageAsync={pointHistoryPageAsync}
            onPageChange={onPageChange}
        />
    )
};

export default MyPointHistoryPage;