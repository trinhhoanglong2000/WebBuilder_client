// import loadTraitMolumnLink from "./trait"
import loadBlockColumnItem from "./columnItem";
import loadTraitMulticolumnItem from "./trait";
export default function loadBlockMulticolumn(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  loadBlockColumnItem(editor,c)
  loadTraitMulticolumnItem(editor,c)
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
          {
            label: "Align",
            type: "multicolumn-padding-mode",
          },
          {
            label: "Heading",
            type: "multicolumn-heading",
            placeholder:"Label"
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
            label: "Padding",
            type: "padding-setting",
          },
        ],
        // This is default attributes
        attributes: {
          "ez-mall-type": "multicolumn",
          numCols: 3
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
    content: [
      { 
        name: 'Multicolumn',
        type: "multicolumn",
        attributes: {class: "multicolumn-numCols-3"},
        components: [{
          attributes: { class: "" },
          tagName: "h2",
          name: "Multicolumn Tittle",
          style: { "text-align": "center", "padding": "0px" },
          content: `Card Title`,
          layerable: false,
          hoverable: false,
          selectable: false,
          highlightable: false,
          droppable: false,
          draggable:false,
        },
        {
          name: 'multicolumn',
          layerable: false,
          hoverable: false,
          selectable: false,
          highlightable: false,
          draggable:false,
          attributes: {class: "row ezMall-multicolumn"},
          components: [
            {
              tagName: "a",
              droppable: false,
              name: "ColumnItem",
              attributes: { name: "columnItem", class: "ezMall-column-item card  container ezMall-col" },
              type: "ColumnItem",
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
            {
              tagName: "a",
              droppable: false,
              name: "ColumnItem",
              attributes: { name: "columnItem", class: "ezMall-column-item card  container ezMall-col" },
              type: "ColumnItem",
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
            {
              tagName: "a",
              droppable: false,
              name: "ColumnItem",
              attributes: { name: "columnItem", class: "ezMall-column-item card  container ezMall-col" },
              type: "ColumnItem",
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
          ]
        }]
    },
  
  ]
  });
  //#endregion
  //LONG-TP 2022-02-22 TEST TRAITS - ADD END 
}
