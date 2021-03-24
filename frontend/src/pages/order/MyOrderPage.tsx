import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import OrderDetailModal from '../../components/order/OrderDetailModal';
import OrderList from '../../components/order/OrderList';
import useModal from '../../hooks/useModal';
import { FindPayload } from '../../models/common';
import { LoginMember } from '../../models/members';
import { OrderUpdatePayload } from '../../models/orders';
import { RootState } from '../../store';
import { findOrder, findOrderPage, updateOrder } from '../../store/order/action';
import MyOrderTemplate from '../../templates/order/MyOrderTemplate';

function MyOrderPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember) as LoginMember;
    const { orderPageAsync, orderAsync } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(findOrderPage({
            searchCriteria: { 
                column: "memberId", 
                keyword: loginMember.id + ""
             },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectOrder = useCallback((id: number) => {
        dispatch(findOrder(id));
        openUpdateModal();
    }, []);

    const onUpdateOrder = useCallback((id: number, payload: OrderUpdatePayload) => {
        dispatch(updateOrder({
            id: id,
            payload: payload,
            onSuccess: order => alert("변경되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findOrderPage({
            ...orderPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(orderPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [orderPageAsync.payload]);

    return (
        <MyOrderTemplate 
            orderPageAsync={orderPageAsync}
            orderAsync={orderAsync}
            updateModalIsOpen={updateModalIsOpen}
            onSelectOrder={onSelectOrder}
            onUpdateOrder={onUpdateOrder}
            closeUpdateModal={closeUpdateModal}
            onPageChange={onPageChange}
        />
        // <Layout>
        //     <MyPageLayout>
        //         <h3>주문내역</h3>
        //         <OrderList 
        //             orderList={orderPageAsync.result?.list}
        //             onSelectOrder={onSelectOrder} 
        //             onUpdateOrder={onUpdateOrder} 
        //         />
        //         <Pagination
        //             page={orderPageAsync.payload?.pageCriteria.page}  
        //             totalCount={orderPageAsync.result?.totalCount}
        //             onPageChange={onPageChange}
        //         />
        //         {orderPageAsync.error && <ErrorDetail message={orderPageAsync.error.message} />}
        //         <OrderDetailModal 
        //             order={orderAsync.result}
        //             isOpen={updateModalIsOpen}
        //             onRequestClose={closeUpdateModal}
        //         />
        //     </MyPageLayout>
        // </Layout>
    )
};

export default MyOrderPage;