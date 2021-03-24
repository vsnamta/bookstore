import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import PointHistoryList from '../../components/pointHistory/PointHistoryList';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { PointHistoryFindPayload, PointHistoryResult } from '../../models/pointHistories';

interface MyPointHistoryTemplateProps {
    pointHistoryPageAsync?: {
        payload?: PointHistoryFindPayload | undefined;
        result?: Page<PointHistoryResult> | undefined;
        error?: ApiError | undefined;
    };
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;}

function MyPointHistoryTemplate({ pointHistoryPageAsync, onPageChange }: MyPointHistoryTemplateProps) {    
    return (
        <Layout>
            <MyPageLayout>
                <h3>포인트내역</h3>
                <PointHistoryList pointhistoryList={pointHistoryPageAsync?.result?.list} />
                <Pagination
                    page={pointHistoryPageAsync?.payload?.pageCriteria.page}  
                    totalCount={pointHistoryPageAsync?.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {pointHistoryPageAsync?.error && <ErrorDetail message={pointHistoryPageAsync.error.message} />}
            </MyPageLayout>                       
        </Layout>
    )
};

export default MyPointHistoryTemplate;