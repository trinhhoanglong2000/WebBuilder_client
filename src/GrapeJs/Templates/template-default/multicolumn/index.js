import loadBlockColumnItem from "./columnItem";
import loadTraitMulticolumnItem from "./trait";
import { MULTICOLUMN_LABEL } from "../../../../asset/icon/svg";

export default function loadBlockMulticolumn(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  loadTraitMulticolumnItem(editor, c)

  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const textType = domc.getType("text");

  //THIS IS SETTING COMPONENT
  domc.addType("multicolumn", {
    model: {
      defaults: {
        tagName: 'div',
        name: 'Multicolumn',
        droppable: false,
        copyable: false,
        draggable: ".main-content",
        traits: [
          {
            label: "Align",
            type: "multicolumn-padding-mode",
          },
          {
            label: "Heading",
            type: "multicolumn-heading",
            placeholder: "Label"
          },
          {
            label: false,
            type: "multicolumn-heading-align",
          },
          {
            label: "Number Items per row",
            type: "multicolumn-numCols",
          },
          {
            label: "Padding Top",
            type: "padding-setting",
            typeSetting: "padding-top"
          },
          {
            label: "Padding Bottom",
            type: "padding-setting",
            typeSetting: "padding-bottom"
          },
          {
            label: "Padding Left",
            type: "padding-setting",
            typeSetting: "padding-left"
          },
          {
            label: "Padding Right",
            type: "padding-setting",
            typeSetting: "padding-right"
          },
        ],
        // This is default attributes
        attributes: {
          "ez-mall-type": "multicolumn",
          numCols: 3,
          headAlign: "center"
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

  domc.addType("multicolumn-tittle", {
    model: {
      defaults: {
        traits: [
        
        ],
        // This is default attributes
        name: "Multicolumn Tittle",
        tagName: "h2",
        layerable: false,
        hoverable: false,
        selectable: false,
        highlightable: false,
        droppable: false,
        draggable: false,
        removable : false,
        copyable: false,
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

  domc.addType("multicolumn-body", {
    model: {
      defaults: {
        traits: [
        ],
        // This is default attributes
        name: 'Multicolumn Body',
        droppable: (target, destination) => {
          const arr = ['ColumnItem']
          if (target == undefined) return false
          if (arr.includes(target.get('type'))) {
            return true
          }
          return false

        },
        layerable: true,
        hoverable: false,
        selectable: false,
        highlightable: false,
        draggable: false,
        removable : false,
        copyable: false,
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
    ${MULTICOLUMN_LABEL}
    <div>Multicolumn</div> `,
    category: c.multicolumn,
    content: [
      {
        type: "multicolumn",
        attributes: { class: "multicolumn-numCols-3",},
        components: [
          {
          type: "multicolumn-tittle",
          attributes: { style: "text-align : center; font-weight : bold ;padding:0px" },
          content: `Card Title`,
        },
        {
          type: "multicolumn-body",
          attributes: { class: "row ezMall-multicolumn" },
          components: [
            {
              type: "ColumnItem",
              attributes: { class: "ezMall-column-item card container ezMall-col navbar"},
              components: [
                {
                  type: "columnItem-image",
                  attributes: { class: "column-item-image" },
                  content: `
                  <a href="#"> <img class="card-img-top" src="https://ananas.vn/wp-content/uploads/Banner_Sale-off-1.jpg" alt="Card image cap"></a>
                `,
                },
                {
                  type: "columnItem-description",
                  components: [
                    {
                      type: "columnItem-title",
                      attributes: { class: "card-title", style: "text-decoration: none;text-align: center" },
                      content: `Card title`,
                    }
                    , {
                      type: "columItem-header",
                      attributes: {style: "font-size : medium" } ,
                      content: `<p class="card-text">Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.</p>`,
                    }]
                },
              ]
            },
            {
              type: "ColumnItem",
              attributes: { class: "ezMall-column-item card container ezMall-col navbar"},
              components: [
                {
                  type: "columnItem-image",
                  attributes: { class: "column-item-image" },
                  content: `
                  <a href="#"> <img class="card-img-top" src="https://ananas.vn/wp-content/uploads/Banner_Sale-off-1.jpg" alt="Card image cap"></a>
                `,
                },
                {
                  type: "columnItem-description",
                  components: [
                    {
                      type: "columnItem-title",
                      attributes: { class: "card-title", style: "text-decoration: none;text-align: center" },
                      content: `Card title`,
                    }
                    , {
                      type: "columItem-header",
                      attributes: {style: "font-size : medium" } ,
                      content: `<p class="card-text">Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.</p>`,
                    }]
                },
              ]
            },
          ]
        }]
      },

    ]
  });
  loadBlockColumnItem(editor, c)
  //#endregion
  //LONG-TP 2022-02-22 TEST TRAITS - ADD END 
}
