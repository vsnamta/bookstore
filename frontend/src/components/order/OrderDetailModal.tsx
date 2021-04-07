import React from 'react';
import ReactModal from 'react-modal';
import { OrderDetailResult } from '../../models/order';
import OrderDetail from './OrderDetail';

interface OrderDetailModalProps {
    order?: OrderDetailResult;
    isOpen: boolean;
    onRequestClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

function OrderDetailModal({ order, isOpen, onRequestClose }: OrderDetailModalProps) {
    if(!order) {
        return null;
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <button type="button" className="close modal-close-btn ml-auto" data-dismiss="modal"
                aria-label="Close" onClick={onRequestClose}>
                <span aria-hidden="true">&times;</span>
            </button>
            <OrderDetail order={order}/>
        </ReactModal>
    )
};

export default React.memo(OrderDetailModal);