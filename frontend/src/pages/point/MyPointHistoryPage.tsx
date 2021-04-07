import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyPointHistoryTemplate from '../../components/pointHistory/MyPointHistoryTemplate';
import { MyData } from '../../models/auth';
import { PointHistoryFindPayload } from '../../models/pointHistory';
import { RootState, rootActions } from '../../store';

function MyPointHistoryPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const pointHistoryPageAsync = useSelector((state: RootState) => state.pointHistories.pointHistoryPageAsync);

    useEffect(() => {
        dispatch(rootActions.fetchPointHistoryPage({
            memberId: loginMember.id,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(rootActions.fetchPointHistoryPage({
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