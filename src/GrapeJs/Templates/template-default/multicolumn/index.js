import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
// import loadTraitMolumnLink from "./trait"
import loadBlockColumnItem from "./columnItem"
export default function loadBlockMulticolumn(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  loadBlockColumnItem(editor,c)
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const textType = domc.getType("text");

  //THIS IS SETTING COMPONENT
  domc.addType("multicolumn", {
    model: {
      defaults: {
        tagName: 'div',
        droppable: false,
        traits: [
        ],
        // This is default attributes
        attributes: {
          "ez-mall-type": "multicolumn",
        }
      },
      // This function run when component created - we setup listen to change atri

      init() {
        this.on('change:attributes:data', this.handleTypeChangeData);
        this.on('change:attributes:placeholder', this.handleTypeChangePlaceHold);

      },
      async Update() {
      },
      async handleTypeChangeData() {
        this.Update()
      },
      initData() {
      },
      handleTypeChangePlaceHold() {
        const atributeData = this.attributes.attributes;

      },
    },
    view: {
      init() {
        const attributes = this.model.attributes;
        const rootElement = this.el;
      },
      events: {

      },
      handleClick: function (e) {
        const attributes = this.model.attributes;
        const rootElement = this.el;
      },
      render: function () {
        // Extend the original render method
        defaultType.view.prototype.render.apply(this, arguments);
        return this;
      },
    },
  });
  //THIS IS SETTING BLOCK
  bm.add("multicolumn", {
    // THIS IS HTML DISPLAY ON THE LEFT (BLOCK BAR)
    label: `
    <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 38h20V8H14v30zM4 34h8V12H4v22zm32-22v22h8V12h-8z"/><path d="M0 0h48v48H0z" fill="none"/>
    </svg>
    <div>Multicolumn</div> `,
    category: c.multicolumn,
    draggable: ".main-content",
    content: [{ 
        name: 'multicolumn',
        attributes: {class: "row ezMall-multicolumn"},
    }]
  });
  //#endregion
  //LONG-TP 2022-02-22 TEST TRAITS - ADD END 
}
