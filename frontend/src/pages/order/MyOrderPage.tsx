import React, { useCallback } from 'react';
import ReactModal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import OrderDetail from '../../components/order/OrderDetail';
import OrderList from '../../components/order/OrderList';
import useModal from '../../hooks/common/useModal';
import useOrderManagement from '../../hooks/order/useOrderManagement';
import { FindPayload } from '../../models/common';
import { LoginMember } from '../../models/members';
import { RootState } from '../../store';

function MyOrderPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }} />
    }

    const [orderManagementState, useOrderManagementMethods] = useOrderManagement({
        column: "memberId", 
        keyword: (loginMember as LoginMember).id + ""
    });
    const {orderPageState, orderState} = orderManagementState;
    const {updatePageCriteria, selectOrder, updateOrder} = useOrderManagementMethods;
    
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectOrder = useCallback((id: number) => {
        selectOrder(id);
        openUpdateModal();
    }, [selectOrder]);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        updatePageCriteria({
            ...(orderPageState.payload as FindPayload).pageCriteria,
            page: selectedItem.selected + 1
        });
    }, [updatePageCriteria, orderPageState.payload]);

    return (
        <Layout>
            <MyPageLayout>
                <h3>주문내역</h3>
                {orderPageState.result &&
                <>
                    <OrderList 
                        orderList={orderPageState.result.list}
                        onSelectOrder={onSelectOrder} 
                        onUpdateOrder={updateOrder} 
                    />
                    <div className="row pt--30">
                        <div className="col-md-12">
                            <div className="pagination-block">
                                <ReactPaginate 
                                    pageCount={Math.ceil(orderPageState.result.totalCount / 10)}
                                    pageRangeDisplayed={10}
                                    marginPagesDisplayed={0}
                                    onPageChange={onPageChange}
                                    containerClassName={"pagination-btns flex-center"}
                                    previousLinkClassName={"single-btn prev-btn"}
                                    previousLabel={"<"}
                                    activeClassName={"active"}
                                    pageLinkClassName={"single-btn"}
                                    nextLinkClassName={"single-btn next-btn"}
                                    nextLabel={">"}
                                />
                            </div>
                        </div>
                    </div>
                </>}
                {orderState.result && 
                <ReactModal
                    isOpen={updateModalIsOpen}
                    onRequestClose={closeUpdateModal}
                >
                    <button type="button" className="close modal-close-btn ml-auto" data-dismiss="modal"
                        aria-label="Close" onClick={closeUpdateModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <OrderDetail order={orderState.result}/>
                </ReactModal>}
            </MyPageLayout>
        </Layout>
    )
};

export default MyOrderPage;