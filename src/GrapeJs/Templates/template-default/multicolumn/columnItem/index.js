import loadTraitColumnItem from "./traint"
import { COLUMN_ITEM_LABEL } from "../../../../../asset/icon/svg";

export default function loadBlockColumnItem(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;

  //LONG-TP 2022-02-22 TEST TRAITS - ADD START
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const textType = domc.getType("text");
  //THIS IS SETTING COMPONENT

  domc.addType("ColumnItem", {
    model: {
      defaults: {
        traits: [
          {
            label: "Image",
            type: "Column-Item-Image",
          },
          {
            label: "Link",
            type: "column-item-link",
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
          name: "columnItem",
          class: "ezMall-column-item card  container ezMall-col",
          TextFontSize: "medium"
        },
        tagName: "a",
        droppable: false,
        name: "ColumnItem",
        draggable: ".ezMall-multicolumn",
        copyable: false
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

  domc.addType("columnItem-image", {
    model: {
      defaults: {
        traits: [

        ],
        // This is default attributes
        name: "Column Image",
        layerable: false,
        hoverable: false,
        selectable: false,
        highlightable: false,
        droppable: false,
        draggable: false,
        attributes: { class: "column-item-image" },
        removeable:false
      },

      // This function run when component created - we setup listen to change atri
      init() {


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
  })
  domc.addType("columnItem-description", {
    model: {
      defaults: {
        traits: [

        ],
        // This is default attributes
        name: "Description",
        attributes: { class: "card-body" },
        layerable: false,
        hoverable: false,
        selectable: false,
        highlightable: false,
        draggable: false,
        draggable: false,
        editable: false,
        removeable:false

      },

      // This function run when component created - we setup listen to change atri
      init() {


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
  })
  domc.addType("columnItem-title", {
    model: {
      defaults: {
        traits: [

        ],
        // This is default attributes
        name: "columnItem-title",
        attributes: { class: "card-title", style: "text-decoration: none;text-align: center" },
        layerable: false,
        hoverable: false,
        selectable: false,
        highlightable: false,
        droppable: false,
        draggable: false,
      },

      // This function run when component created - we setup listen to change atri
      init() {
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
  })
  domc.addType("columItem-header", {
    model: {
      defaults: {
        traits: [

        ],
        // This is default attributes
        removeable: false,
        name: "Header",
        layerable: false,
        hoverable: false,
        selectable: false,
        highlightable: false,
        attributes: {style: "font-size : medium" } ,
        editable: true,
        droppable: false,
        draggable: false,
      },

      // This function run when component created - we setup listen to change atri
      init() {
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
  })

  bm.add("ColumnItem", {
    label: `
    ${COLUMN_ITEM_LABEL}
    <div>Column Item</div> `,
    category: c.multicolumn,
    content: [
      {
        type: "ColumnItem",
        components: [
          {
            type: "columnItem-image",
            content: `
            <a href="#"> <img class="card-img-top" src="https://ananas.vn/wp-content/uploads/Banner_Sale-off-1.jpg" alt="Card image cap"></a>
          `,
          },
          {
            type: "columnItem-description",
            components: [
              {
                type: "columnItem-title",
                content: `Card title`,
              }
              , {
                type: "columItem-header",
                content: `<p class="card-text">Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.</p>`,
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
