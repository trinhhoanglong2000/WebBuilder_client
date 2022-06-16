
export default function loadComponentsProductPage(editor, opt = {}) {

  //#region productList
  const domc = editor.DomComponents;

  domc.addType("ProductPage-text", {
    model: {
      defaults: {
        tagName: "h2",
        name: "Text",
        attributes: {
          class: "section-header",
          name: "products-section-text",
        },
        style: { "text-align": "center" },
        removable: false,
        draggable: false,
        droppable: false,
        highlightable: false,
        copyable: false,
        selectable: false,
        hoverable: false,
        traits: [

        ],
      },
      init() {
      },
      initData() { },
      handleTypeChangeData() { },
    },


  });
  domc.addType("ProductGrid", {
    model: {
      defaults: {
        name: "ProductGrid",

        attributes: {
          class: "new-arrivals-content",
          name: "products-section-grid",
        },
        highlightable: false,
        copyable: false,
        selectable: false,
        hoverable: false,
        removable: false,
        droppable: false,
        draggable: false,
        
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
        attributes: {
          class: "container",
          name: "products-section",
        },
        name: "Product Section",
//        draggable: ".main-content",
        copyable: false,
        removable: false,
        droppable: false,
        draggable: false,
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
