import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import loadTraitColumnItem from "./traint"

export default function loadBlockColumnItem(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;


  //LONG-TP 2022-02-22 TEST TRAITS - ADD START
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const textType = domc.getType("text");
  //THIS IS SETTING COMPONENT
  
  domc.addType("columnItem", {
    model: {
      defaults: {
        droppable: false,
        traits: [
          {
            label: "Image",
            type: "Column-Item-Image",
          },
          {
            label: "Heading",
            type: "Column-Item-Heading",
          },
          {
            label: false,
            type: "Column-Item-Heading-Align",
          },
          {
            label: "Description",
            type: "Column-Item-Trait-RichText",
          },
          {
            label: "Font Size",
            type: "Column-Item-RichText-TextFontSize-Trait",
          },
        ],
        // This is default attributes
        attributes: {
          "ez-mall-type": "columnItem",
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
        const atributeData = this.attributes.attributes;
        this.Update()
      },
      initData() {
        this.Update()
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
      // Event on layout
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
  bm.add("columnItem", {
    label: `
    <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 38h20V8H14v30zM4 34h8V12H4v22zm32-22v22h8V12h-8z"/><path d="M0 0h48v48H0z" fill="none"/>
    </svg>
    <div>Column Item</div> `,
    category: c.multicolumn,
    content: [
      {
        droppable: false,
        name: "columnItem",
        attributes: { name: "columnItem", class: "ezMall-column-item card  container col-md-4 col-sm-6 " },
        type: "columnItem",
        draggable: ".ezMall-multicolumn",
        components: [
          {
            attributes: { class: "column-item-image" },
            name: "columnItem-image",
            layerable: false,
            hoverable: false,
            selectable: false,
            highlightable: false,
            droppable: false,
            draggable:false,
            content: `
            <a href="#"> <img class="card-img-top" src="https://ananas.vn/wp-content/uploads/Banner_Sale-off-1.jpg" alt="Card image cap"></a>
          `,
          },
          {
            attributes: { class: "card-body" },
            layerable: false,
            hoverable: false,
            selectable: false,
            highlightable: false,
            droppable: false,
            draggable:false,
            components: [
              {
                attributes: { class: "card-title", style: "text-decoration: none;" },
                name: "columnItem-title",
                style: { "text-align": "center" },
                content: `Card title`,
                layerable: false,
                hoverable: false,
                selectable: false,
                highlightable: false,
                droppable: false,
                draggable:false,
              }
              , {
                removable: false,
                name: "Text",
                layerable: false,
                hoverable: false,
                selectable: false,
                highlightable: false,
                style: { "font-size": "medium" },
                editable: true,
                droppable: false,
                draggable:false,
                draggable: ".Rich-Text",
                content: `<p class="card-text">Share information about your brand with your customers. Describe a product, make announcements, or
                welcome customers to your store.</p>`,
              }]

          },
        ]
      },
    ],
  });
  //#endregion
  //LONG-TP 2022-02-22 TEST TRAITS - ADD END 
  loadTraitColumnItem(editor, c);
}
