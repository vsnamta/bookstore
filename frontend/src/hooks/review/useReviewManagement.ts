import { useCallback, useState } from "react";
import { FindPayload, Page, PageCriteria, SearchCriteria } from "../../models/common";
import { ReviewResult, ReviewSavePayload, ReviewUpdatePayload } from "../../models/reviews";
import reviewService from '../../services/reviewService';
import usePage, { PageState } from "../common/usePage";

interface ReviewManagementState {
    reviewPageState: PageState<ReviewResult>;
    review?: ReviewResult;
}

interface UseReviewManagementMethods {
    updateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    updatePageCriteria: (pageCriteria: PageCriteria) => void;
    selectReview: (id: number) => void;
    saveReview: (payload: ReviewSavePayload) => Promise<void>;
    updateReview: (id: number, payload: ReviewUpdatePayload) => Promise<void>;
    removeReview: (id: number) => Promise<void>;
}

function useReviewManagement(initialSearchCriteria: SearchCriteria): [ 
    ReviewManagementState, 
    UseReviewManagementMethods 
] {
    const [
        reviewPageState,
        setReviewPage, 
        updateSearchCriteria, 
        updatePageCriteria
    ] = usePage<ReviewResult>(initialSearchCriteria, reviewService.findAll);

    const [review, setReview] = useState<ReviewResult>();

    const selectReview = useCallback((id: number) => {
        const selected = (reviewPageState.result as Page<ReviewResult>).list.find(review => review.id === id);
        setReview(selected);
    }, [reviewPageState.result]); 

    const saveReview = useCallback((payload: ReviewSavePayload) => {
        return reviewService.save(payload)
            .then(id => {
                updateSearchCriteria(initialSearchCriteria);
            });   
    }, [updateSearchCriteria]);

    const updateReview = useCallback((id: number, payload: ReviewUpdatePayload) => {
        return reviewService.update(id, payload)
            .then(id => {              
                setReviewPage(reviewPage => ({
                    ...reviewPage as Page<ReviewResult>,
                    list: (reviewPageState.result as Page<ReviewResult>).list
                        .map(review => 
                            review.id === id
                                ? { ...review, rating: payload.rating, contents: payload.contents } 
                                : review
                        )
                }));
            });
    }, []);

    const removeReview = useCallback((id: number) => {
        return reviewService.remove(id)
            .then(id => {
                updatePageCriteria((reviewPageState.payload as FindPayload).pageCriteria);
            });
    }, [updatePageCriteria]);

    return [{
        reviewPageState,
        review
    }, {
        updateSearchCriteria,
        updatePageCriteria,
        selectReview,
        saveReview,
        updateReview,
        removeReview
    }];
}

export default useReviewManagement;