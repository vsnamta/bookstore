import React, { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import OrderDetail from '../../components/order/OrderDetail';
import OrderList from '../../components/order/OrderList';
import useModal from '../../hooks/useModal';
import { FindPayload } from '../../models/common';
import { LoginMember } from '../../models/members';
import { OrderUpdatePayload } from '../../models/orders';
import { RootState } from '../../store';
import { findOrder, findOrderPage, updateOrder } from '../../store/order/action';

function MyOrderPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }} />
    }

    const { orderPageState, orderState } = useSelector((state: RootState) => ({
        orderPageState: state.orders.orderPageAsync,
        orderState: state.orders.orderAsync
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findOrderPage({
            searchCriteria: { 
                column: "memberId", 
                keyword: (loginMember as LoginMember).id + ""
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
            onFailure: error => {}
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findOrderPage({
            ...orderPageState.payload as FindPayload,
            pageCriteria: {
                ...(orderPageState.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [orderPageState.payload]);

    return (
        <Layout>
            <MyPageLayout>
                <h3>주문내역</h3>
                <OrderList 
                    orderList={orderPageState.result?.list}
                    onSelectOrder={onSelectOrder} 
                    onUpdateOrder={onUpdateOrder} 
                />
                <Pagination
                    page={orderPageState.payload?.pageCriteria.page}  
                    totalCount={orderPageState.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {orderPageState.error && <ErrorDetail message={"오류 발생"} />}
                <ReactModal
                    isOpen={updateModalIsOpen}
                    onRequestClose={closeUpdateModal}
                >
                    <button type="button" className="close modal-close-btn ml-auto" data-dismiss="modal"
                        aria-label="Close" onClick={closeUpdateModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <OrderDetail order={orderState.result}/>
                </ReactModal>
            </MyPageLayout>
        </Layout>
    )
};

export default MyOrderPage;