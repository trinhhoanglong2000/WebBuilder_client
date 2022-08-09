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
          const arr = ['carousel', 'Cart', 'contact-Form', 'IMAGE', 'image-With-Text', 'multicolumn', 'Payment', 'product-list', 'collections', 'Rich-Text', 'videoCustomType', 'page-not-found', 'terms-of-service',
            'refund-policy', 'slideshow-Gallery', 'tracking-Order', 'tracking-Order-Form',  'product-detail'
          ]
          if (target == undefined) return false
          if (arr.includes(target.get('type'))) {
            return true
          }
          return false

        },
        // droppable: `[data-gjs-type=carousel]`,
        highlightable: !opt.isDeloy,
        copyable:  !opt.isDeloy,
        selectable: !opt.isDeloy,
        hoverable:  !opt.isDeloy,
        removable:  !opt.isDeloy,
        editable:  !opt.isDeloy,
        draggable:  !opt.isDeloy,
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
  if (!opt.isDeloy) {
    editor.BlockManager.add("Main", {
      label: "Main",
      category: "Main",
      content: {
        type: "Main",
      },
    });
  }
  //#endregion
}
