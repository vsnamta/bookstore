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
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }} />
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findPointHistoryPage({
            memberId: loginMember.id,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const pointHistoryPageState = useSelector((state: RootState) => state.pointHistories.pointHistoryPageAsync);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findPointHistoryPage({
            ...pointHistoryPageState.payload as PointHistoryFindPayload,
            pageCriteria: {
                ...(pointHistoryPageState.payload as PointHistoryFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [pointHistoryPageState.payload]);
    
    return (
        <Layout>
            <MyPageLayout>
                <h3>포인트내역</h3>
                <PointHistoryList pointhistoryList={pointHistoryPageState.result?.list} />
                <Pagination
                    page={pointHistoryPageState.payload?.pageCriteria.page}  
                    totalCount={pointHistoryPageState.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {pointHistoryPageState.error && <ErrorDetail message={"오류 발생"} />}
            </MyPageLayout>                       
        </Layout>
    )
};

export default MyPointHistoryPage;