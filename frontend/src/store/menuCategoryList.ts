import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { CategoryResult } from '../models/categories';

const SET_MENU_CATEGORY_LIST = 'category/SET_MENU_CATEGORY_LIST';

export const setMenuCategoryList = createAction(SET_MENU_CATEGORY_LIST)<CategoryResult[] | undefined>();

export const actions = { setMenuCategoryList };

type MenuCategoryListAction = ActionType<typeof actions>;

interface MenuCategoryListState {
    menuCategoryList?: CategoryResult[];
}

const initialState: MenuCategoryListState = {
    menuCategoryList : undefined
};

export default createReducer<MenuCategoryListState, MenuCategoryListAction>(initialState, {
    [SET_MENU_CATEGORY_LIST]: (state, action) => ({
        menuCategoryList: action.payload
    })
});