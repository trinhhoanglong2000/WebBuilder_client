import { callAPIWithGetMethod } from "./callAPI";

const validURL = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

function validImageURL(url) {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

const loadStoreComponents = async (editor, storeId) => {
  if (!editor || !storeId) {
    return false;
  }

  let domWrapper = editor.getWrapper().view;
  if (!domWrapper) {
    return false;
  }

  const result = await callAPIWithGetMethod("stores/" + storeId + "/store-components", true)
  if (!result) {
    return false;
  }

  const storeComponents = result.data;
  const canvasComponents = editor.getComponents();
  const header = canvasComponents.where({ name: 'Header' })[0];
  const footer = canvasComponents.where({ name: 'Footer' })[0];

  for (let key in storeComponents) {
    switch (key) {
      case "header": {
        header?.replaceWith(JSON.parse(storeComponents[key]))
        break;
      }
      case "footer": {
        footer?.replaceWith(JSON.parse(storeComponents[key]))
        break;
      }
      case "asset": {
        editor.AssetManager.load({
          assets: JSON.parse(storeComponents[key])
        })
        break;
      }
      default: {
        break;
      }
    }
  }

  editor.UndoManager.clear()

  return true;
}

const setAttribute = (component, attributes={}) => {
  const attr = { ...component.get('attributes'), ...attributes }
  delete attr.class;

  component.set('attributes', attr)
}

export { validURL, loadStoreComponents, setAttribute, validImageURL };