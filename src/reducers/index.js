import { combineReducers } from "redux";

import {changeKeySelected, changeNameStoreSelected, changeListStore} from "./detailStore";

const allReducers = combineReducers({
    changeKeySelected,
    changeNameStoreSelected,
    changeListStore,
  // add more reducers here
});

export default allReducers;