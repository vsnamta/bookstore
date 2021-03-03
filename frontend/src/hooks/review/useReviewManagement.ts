import { useCallback, useState } from "react";
import { FindPayload, Page, PageCriteria, SearchCriteria } from "../../models/common";
import { ReviewResult, ReviewSavePayload, ReviewUpdatePayload } from "../../models/reviews";
import reviewApi from '../../apis/reviewApi';
import usePage, { PageState } from "../common/usePage";
import { ApiError } from "../../error/ApiError";

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
    ] = usePage<ReviewResult>(initialSearchCriteria, reviewApi.findAll);

    const [review, setReview] = useState<ReviewResult>();

    const selectReview = useCallback((id: number) => {
        const selected = (reviewPageState.result as Page<ReviewResult>).list.find(review => review.id === id);
        setReview(selected);
    }, [reviewPageState.result]); 

    const saveReview = useCallback((payload: ReviewSavePayload) => {
        return reviewApi.save(payload)
            .then(savedReview => {
                updateSearchCriteria(initialSearchCriteria);
            })
            .catch((error: ApiError) => {
                
            }); 
    }, [updateSearchCriteria]);

    const updateReview = useCallback((id: number, payload: ReviewUpdatePayload) => {
        return reviewApi.update(id, payload)
            .then(updatedReview => {              
                setReviewPage(reviewPage => ({
                    ...reviewPage as Page<ReviewResult>,
                    list: (reviewPageState.result as Page<ReviewResult>).list
                        .map(review => 
                            review.id === updatedReview.id ? updatedReview : review
                        )
                }));
            })
            .catch((error: ApiError) => {
                
            });
    }, []);

    const removeReview = useCallback((id: number) => {
        return reviewApi.remove(id)
            .then(() => {
                updatePageCriteria((reviewPageState.payload as FindPayload).pageCriteria);
            })
            .catch((error: ApiError) => {
                
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