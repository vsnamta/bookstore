import React from 'react';
import { AsyncPointHistoryPage } from '../../models/pointHistory/store';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import PointHistoryList from './PointHistoryList';

interface MyPointHistoryManagementProps {
    asyncPointHistoryPage: AsyncPointHistoryPage;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;}

function MyPointHistoryManagement({ asyncPointHistoryPage, onPageChange }: MyPointHistoryManagementProps) {    
    return (
        <>
            <PointHistoryList pointhistoryList={asyncPointHistoryPage.result?.list} />
            <Pagination
                page={asyncPointHistoryPage.payload?.pageCriteria.page}  
                totalCount={asyncPointHistoryPage.result?.totalCount}
                onPageChange={onPageChange}
            />
            {asyncPointHistoryPage.error && <ErrorDetail message={asyncPointHistoryPage.error.message} />}                     
        </>
    )
};

export default React.memo(MyPointHistoryManagement);