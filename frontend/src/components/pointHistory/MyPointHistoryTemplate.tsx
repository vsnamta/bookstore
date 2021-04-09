import React from 'react';
import { AsyncPointHistoryPage } from '../../models/pointHistory/store';
import Layout from '../common/Layout';
import MyPageLayout from '../common/MyPageLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import PointHistoryList from './PointHistoryList';

interface MyPointHistoryTemplateProps {
    asyncPointHistoryPage: AsyncPointHistoryPage;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;}

function MyPointHistoryTemplate({ asyncPointHistoryPage, onPageChange }: MyPointHistoryTemplateProps) {    
    return (
        <Layout>
            <MyPageLayout>
                <h3>포인트내역</h3>
                <PointHistoryList pointhistoryList={asyncPointHistoryPage.result?.list} />
                <Pagination
                    page={asyncPointHistoryPage.payload?.pageCriteria.page}  
                    totalCount={asyncPointHistoryPage.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {asyncPointHistoryPage.error && <ErrorDetail message={asyncPointHistoryPage.error.message} />}
            </MyPageLayout>                       
        </Layout>
    )
};

export default MyPointHistoryTemplate;