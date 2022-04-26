import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import loadTraitColumnLink from "./traint"

export default function loadBlockColumnLink(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  loadTraitColumnLink(editor, c);
  //LONG-TP 2022-02-22 TEST TRAITS - ADD START
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const textType = domc.getType("text");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textModel = textType.model;
  const textView = textType.view;
  const sfx = opt.socialClssfx;
  //THIS IS SETTING COMPONENT
  domc.addType("RichText-Text", {
    model: {
      defaults: {
        traits: [
          {
            type: "RichText-Text-Trait", // Type of the trait
            label: "Description", // The label you will see in Settings
          },
          {
            type: "RichText-TextFontSize-Trait",
            label: "Font size",
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
  domc.addType("columnLink-Img", {
    model: {
      defaults: {
        traits: [
          {
            type: "RichText-Text-Trait", // Type of the trait
            label: "Description", // The label you will see in Settings
          },
          {
            type: "RichText-TextFontSize-Trait",
            label: "Font size",
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
  domc.addType("columnLink", {
    model: {
      defaults: {
        tagName: 'div',
        droppable: false,
        traits: [
        ],
        // This is default attributes
        attributes: {
          "ez-mall-type": "columnLink",
        }
      },
      // This function run when component created - we setup listen to change atri

      init() {
        this.on('change:attributes:data', this.handleTypeChangeData);
        this.on('change:attributes:placeholder', this.handleTypeChangePlaceHold);

        // loadScripts(
        //   ["http://localhost:5000/files/dist/js/template-default/carousel/carousel.js"]
        //   , function () {
        //     //console.log('carousel.js is loaded');
        //   });
      },
      async Update() {
      },
      async handleTypeChangeData() {
        //console.log("Data")
        const atributeData = this.attributes.attributes;
        //console.log(document.querySelector(".gjs-frame").contentDocument.querySelector("html"))
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this
        this.Update()
      },
      initData() {
        //change uuid
        this.set({
          content: this.attributes.content.replace(
            /myCarousel/g,
            `A${uuidv4()}`
          ),
        });
        this.Update()
      },
      handleTypeChangePlaceHold() {
        console.log("placeHold");
        const atributeData = this.attributes.attributes;
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this
        //this.view.el.innerHTML = atributeData.data
      },
    },
    view: {
      init() {
        const attributes = this.model.attributes;
        const rootElement = this.el;
      },
      // Event on layout
      events: {
        // click: "handleClick",
        // dblclick: function () {
        //   alert("Hi!");
        // },
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
  bm.add("columnLink", {
    // THIS IS HTML DISPLAY ON THE LEFT (BLOCK BAR)
    label: `
    <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 38h20V8H14v30zM4 34h8V12H4v22zm32-22v22h8V12h-8z"/><path d="M0 0h48v48H0z" fill="none"/>
    </svg>
    <div>Column link</div> `,
    // THIS PROPERTY IS CATEGORY GROUP OF BLOCK
    category: c.carousel_category,
    content: [
      {
        name: "columnLink",
        attributes: { name: "columnLink", class: "ezMall-columnLink card m-3 container" },
        // draggable: ".main-content .cell",
        //LONG-TP 2022-02-22 TEST TRAITS - ADD START
        type: "columnLink",
        //LONG-TP 2022-02-22 TEST TRAITS - ADD END
        components: [
          {
            name: "columnLink-image",
            content: `
            <a href="#"> <img class="card-img-top" src="https://ananas.vn/wp-content/uploads/Banner_Sale-off-1.jpg" alt="Card image cap"></a>
          `,
          },
          {
            attributes: {class: "card-body"},
            components: [
              {
                attributes: {class: "card-title", style: "text-decoration: none;"},
                type: "product-text",
                name: "columnLink-title",
                style: { "text-align": "center" },
                content: `Card title`
              }
              ,{
              removable: false,
              name: "Text",
              type: "RichText-Text",
              style: { "font-size": "medium" },
  
              editable: true,
              droppable: false,
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
}
