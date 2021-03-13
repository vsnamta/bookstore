import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import PointHistoryList from '../../components/pointHistory/PointHistoryList';
import { PointHistoryFindPayload } from '../../models/pointHistories';
import { RootState } from '../../store';
import { findPointHistoryPage } from '../../store/pointHistory/action';

function MyPointHistoryPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }} />
    }

    const pointHistoryPageAsync = useSelector((state: RootState) => state.pointHistories.pointHistoryPageAsync);

    useEffect(() => {
        dispatch(findPointHistoryPage({
            memberId: loginMember.id,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findPointHistoryPage({
            ...pointHistoryPageAsync.payload as PointHistoryFindPayload,
            pageCriteria: {
                ...(pointHistoryPageAsync.payload as PointHistoryFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [pointHistoryPageAsync.payload]);
    
    return (
        <Layout>
            <MyPageLayout>
                <h3>포인트내역</h3>
                <PointHistoryList pointhistoryList={pointHistoryPageAsync.result?.list} />
                <Pagination
                    page={pointHistoryPageAsync.payload?.pageCriteria.page}  
                    totalCount={pointHistoryPageAsync.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {pointHistoryPageAsync.error && <ErrorDetail message={pointHistoryPageAsync.error.message} />}
            </MyPageLayout>                       
        </Layout>
    )
};

export default MyPointHistoryPage;