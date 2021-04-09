import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyPointHistoryTemplate from '../../components/pointHistory/MyPointHistoryTemplate';
import { MyData } from '../../models/auth';
import { PointHistoryFindPayload } from '../../models/pointHistory';
import { RootState, rootActions } from '../../store';

function MyPointHistoryPage() {
    const dispatch = useDispatch();
    const myData = useSelector((state: RootState) => state.auths.myData) as MyData;
    const asyncPointHistoryPage = useSelector((state: RootState) => state.pointHistories.asyncPointHistoryPage);

    useEffect(() => {
        dispatch(rootActions.fetchPointHistoryPage({
            memberId: myData.id,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(rootActions.fetchPointHistoryPage({
            ...asyncPointHistoryPage.payload as PointHistoryFindPayload,
            pageCriteria: {
                ...(asyncPointHistoryPage.payload as PointHistoryFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [asyncPointHistoryPage.payload]);
    
    return (
        <MyPointHistoryTemplate 
            asyncPointHistoryPage={asyncPointHistoryPage}
            onPageChange={onPageChange}
        />
    )
};

export default MyPointHistoryPage;