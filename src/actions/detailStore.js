export const changeKeySelected = (number) => {
    return {
      type: "CHANGEKEYSELECTED",
      payload: number,
    };
};
export const changeNameStoreSelected = (name) => {
  return {
    type: "CHANGENAMESTORESELECTED",
    payload: name,
  };
};
export const changeListStore = (list) => {
  return {
    type: "CHANGELISTSTORE",
    payload: list,
  };
};