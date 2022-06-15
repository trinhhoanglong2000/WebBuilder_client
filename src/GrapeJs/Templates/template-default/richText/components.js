
export default function loadComponentsRichText(editor, opt = {}) {

  //#region productList
  const domc = editor.DomComponents;
  domc.addType("RichText-Header", {
    model: {
      defaults: {
        droppable: false,
        name: "Header",
        tagName: "h1",
        editable: true,
        copyable: false,
        draggable: ".Rich-Text",
        traits: [
          {
            type: "richtext-heading", // Type of the trait
            label: "Description", // The label you will see in Settings
          },
          {
            type: "richtext-heading-align",
            label: "Alignment",
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
  domc.addType("RichText-Text", {
    model: {
      defaults: {
        name: "Text",
        attributes: {
          class: "rich-text-field",
        },
        style: { "font-size": "small" },

        editable: true,
        droppable: false,
        copyable: false,

        draggable: ".Rich-Text",

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
  domc.addType("RichText-Button", {
    model: {
      defaults: {
        editable: true,
          name: "RichText-Button",
          tagName: "a",
          droppable: false,
          copyable: false,
          
          draggable: ".Rich-Text",
          
          attributes: {
            class:
            "btn align-self-center d-inline-flex justify-content-center align-items-center",
          },
          style: {
            "min-width": "7rem",
            "min-height": "2.5rem",
            'background-color': '#0d6efd',
            'color': '#fff',
            'border': '#0d6efd'
          },
        traits: [
          {
            type: "richtext-heading", // Type of the trait
            label: "Label", // The label you will see in Settings
            placeholder: "Label"
          },
          {
            type: "RichText-Button-Color",
            label: "Button color"
          },
          {
            type: "richtext-Btn-Link",
            label: "Link"
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
  domc.addType("RichText", {

    model: {
      defaults: {
        droppable: (target, destination)=>{
          const arr = ['RichText-Button','RichText-Text','RichText-Header']
          if (arr.includes(target.get('type'))  ){
            return true
          }
          return false
          
        },
        style: {
          'background-color': 'white',
          'color': 'rgb(33, 37, 41)',
        },
        attributes: {
          class: "Rich-Text",
          name: "rich-text",
        },
        name: "Rich Text",
        draggable: ".main-content",
        copyable: false,
        traits: [
          {
            type: "RichText-Color-Trait",
            label: "Color",
          },
          {
            type: "RichText-FullWidth-Trait",
            label: false, // The label you will see in Settings

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
      },
      init() { },
      initData() { },
      handleTypeChangeData() { },
      // This function run when component created - we setup listen to change atri
    },
  });


}
