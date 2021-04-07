import React from 'react';
import { PointHistoryPageAsync } from '../../models/pointHistory/store';
import Layout from '../common/Layout';
import MyPageLayout from '../common/MyPageLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import PointHistoryList from './PointHistoryList';

interface MyPointHistoryTemplateProps {
    pointHistoryPageAsync: PointHistoryPageAsync;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;}

function MyPointHistoryTemplate({ pointHistoryPageAsync, onPageChange }: MyPointHistoryTemplateProps) {    
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

export default MyPointHistoryTemplate;