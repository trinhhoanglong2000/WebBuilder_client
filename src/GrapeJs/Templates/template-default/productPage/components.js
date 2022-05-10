
export default function loadComponentsProductPage(editor, opt = {}) {

  //#region productList
  const domc = editor.DomComponents;


  domc.addType("ProductPage", {
    model: {
      defaults: {
        traits: [
          {
            type: 'ProductPage-numProducts',
            label: 'Products per page'

          }
        ],
      },
      init() {
      },
      initData() { },
      handleTypeChangeData() { },
      // This function run when component created - we setup listen to change atri
    },

  });
  domc.addType("ProductPage", {
    model: {
      defaults: {
        traits: [
          {
            type: "product-heading", // Type of the trait
            label: "Heading", // The label you will see in Settings
            placeholder: "Header",
          },
          {
            type: "product-heading-align",
            label: "Alignment",
          },
          {
            type: 'ProductPage-numProducts',
            label: 'Products per page'

          }

        ],
      },
      init() {
      },
      initData() { },
      handleTypeChangeData() { },
      // This function run when component created - we setup listen to change atri
    },

  });
}
