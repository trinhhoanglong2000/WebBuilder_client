// import loadTraitMolumnLink from "./trait"
import loadBlockColumnItem from "./columnItem";
import loadTraitMulticolumnItem from "./trait";
export default function loadBlockMulticolumn(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  loadTraitMulticolumnItem(editor, c)
  loadBlockColumnItem(editor, c)
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
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" width="48" height="48" style="padding-left: 3px;">
<path id="XMLID_469_" d="M315,30H15C6.716,30,0,36.716,0,45v60v180c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V105V45
	C330,36.716,323.284,30,315,30z M150,120v60H30v-60H150z M180,120h120v60H180V120z M30,210h120v60H30V210z M180,270v-60h120v60H180z
	"></path>
</svg>
    <div>Multicolumn</div> `,
    category: c.multicolumn,
    draggable: ".main-content",
    content: [
      {
        name: 'Multicolumn',
        type: "multicolumn",
        attributes: { class: "multicolumn-numCols-3" },
        components: [{
          attributes: { class: "" },
          tagName: "h2",
          name: "Multicolumn Tittle",
          style: { "text-align": "center", "font-weight": "bold", "padding": "0px" },
          content: `Card Title`,
          layerable: false,
          hoverable: false,
          selectable: false,
          highlightable: false,
          droppable: false,
          draggable: false,
        },
        {
          name: 'multicolumn',
          layerable: false,
          hoverable: false,
          selectable: false,
          highlightable: false,
          draggable: false,
          attributes: { class: "row ezMall-multicolumn" },

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
                  draggable: false,
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
                  draggable: false,
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
                      draggable: false,
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
                      draggable: false,
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
                  draggable: false,
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
                  draggable: false,
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
                      draggable: false,
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
                      draggable: false,
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
                  draggable: false,
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
                  draggable: false,
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
                      draggable: false,
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
                      draggable: false,
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
