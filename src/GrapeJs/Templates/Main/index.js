export default function loadBlockMain(editor, opt = {}) {
  //#region productList
  const domc = editor.DomComponents;
  domc.addType("defaultCustom", {
    model: {
      defaults: {
        removable: false,
        draggable: false,
        droppable: false,
        highlightable: false,
        copyable: false,
        selectable: false,
        hoverable: false,
        editable: false,
        layerable: false,
      },
      init() {
      },

      updated(property, value, prevValue) {
      },
      initData() { },

    },
  });

  domc.addType("defaultCustomEmpty", {
    model: {
      defaults: {

      },
      init() {
      },

      updated(property, value, prevValue) {
      },
      initData() { },

    },
  });

  domc.addType("Main", {
    model: {
      defaults: {
        droppable: (target, destination) => {
          const arr = ['carousel', 'Cart', 'contactForm', 'imageCustomType', 'imageWithText', 'multicolumn', 'Payment', 'product-list', 'ProductPage', 'RichText', 'videoCustomType', 'pageNotFound', 'termsOfService',
            'refundPolicy'
          ]
          if (target == undefined) return false
          if (arr.includes(target.get('type'))) {
            return true
          }
          return false

        },
        // droppable: `[data-gjs-type=carousel]`,
        highlightable: false,
        copyable: false,
        selectable: false,
        hoverable: false,
        removable: false,
        editable: false,
        draggable: false,
        name: "Main",
        tagName: "main",

        attributes: {
          class: "main-content",
          style: "min-height:100px;width:100%",
        },
      },
      init() {
      },

      updated(property, value, prevValue) {
      },
      initData() { },

      // This function run when component created - we setup listen to change atri
    },
  });

  editor.BlockManager.add("Main", {
    label: "Main",
    category: "Main",
    content: {
      type: "Main",

    },
  });
  //#endregion
}
