
export default function loadComponentsProductPage(editor, opt = {}) {

    //#region productList
    const domc = editor.DomComponents;

  
    domc.addType("ProductPage", {
        model: {
          defaults: {
            traits: [
              {
                type:'ProductPage-numProducts', 
                label:'Products per page'

              }
            ],
          },
          init() {
          },
          initData() {},
          handleTypeChangeData() {},
          // This function run when component created - we setup listen to change atri
        },
      });
  }
  