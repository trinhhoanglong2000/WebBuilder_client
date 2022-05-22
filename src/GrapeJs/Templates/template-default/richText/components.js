
export default function loadComponentsRichText(editor, opt = {}) {

  //#region productList
  const domc = editor.DomComponents;
  domc.addType("RichText-Header", {
    model: {
      defaults: {
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
      initData() {},
      handleTypeChangeData() {},
      // This function run when component created - we setup listen to change atri
    },
  });
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
      initData() {},
      handleTypeChangeData() {},
      // This function run when component created - we setup listen to change atri
    },
  });
  domc.addType("RichText-Button", {
    model: {
      defaults: {
        traits: [
          {
            type: "richtext-heading", // Type of the trait
            label: "Label", // The label you will see in Settings
            placeholder:"Label"
          },
          {
            type:"RichText-Button-Color",
            label:"Button color"
          }
        ],
      },
      init() {
      },
      initData() {},
      handleTypeChangeData() {},
      // This function run when component created - we setup listen to change atri
    },
  });
  domc.addType("RichText", {

    model: {
      defaults: {
        traits: [
          {
            type:"RichText-Color-Trait",
            label:"Color",
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
      init() {},
      initData() {},
      handleTypeChangeData() {},
      // This function run when component created - we setup listen to change atri
    },
  });


}
