
export const getStorageManager = (storeId,pageId,token) => (
    {
        type: "remote",

        autosave: false,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        id: "",
        urlStore: `${process.env.REACT_APP_API_URL}stores/${storeId}/${pageId}/content`,
        urlLoad: `${process.env.REACT_APP_API_URL}stores/${storeId}/${pageId}/content`,
      }
)
