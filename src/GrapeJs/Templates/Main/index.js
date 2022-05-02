export default function loadBlockMain(editor, opt = {}) {
  //#region productList
  const domc = editor.DomComponents;

  domc.addType("Main", {
    model: {
      defaults: {
        highlightable :false,
        copyable :false,
        selectable :false,
        hoverable :false,
        // removable:false,
        droppable: true,
        editable :false,
      },
      init() {
      },

      updated(property, value, prevValue) {
      },
      initData() {},

      // This function run when component created - we setup listen to change atri
    },
  });
  editor.BlockManager.add("Main", {
    label: "Main",
    category: "Main",
    content: {
      name: "Main",
      
      type: "Main",

      attributes: {
        class: "main-content",
        style: "min-height:100px;width:100%",
      },
    },
  });
  //#endregion
}
