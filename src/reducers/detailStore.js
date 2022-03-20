const changeKeySelected = (state = 1, action) => {
    switch (action.type) {
      case "CHANGEKEYSELECTED":
        return action.payload;
      default:
        return state;
    }
};
const changeNameStoreSelected = (state = "", action) => {
  switch (action.type) {
    case "CHANGENAMESTORESELECTED":
      return action.payload;
    default:
      return state;
  }
};
  
const changeListStore = (state = null, action) => {
  switch (action.type) {
    case "CHANGELISTSTORE":
      return action.payload;
    default:
      return state;
  }
};
export {changeKeySelected, changeNameStoreSelected, changeListStore} ;