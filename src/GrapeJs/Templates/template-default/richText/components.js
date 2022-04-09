
export default function loadComponentsRichText(editor, opt = {}) {

  //#region productList
  const domc = editor.DomComponents;
  domc.addType("RichText-Text", {
    model: {
      defaults: {
        traits: [
          {
            type: "RichText-Text-Trait", // Type of the trait
            label: "Description", // The label you will see in Settings
          },
          {
            type : "RichText-TextFontSize-Trait",
            label:"Font size",
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
            type: "select",
            label: "Collection", // The label you will see in Settings
            name: "data", // The name of the attribute/property to use on component
            options: [
              { id: "white", name: "White (default)" },
              { id: "black", name: "Black" },
              { id: "lGreen", name: "Light green" },
              { id: "lBlue", name: "Light blue" },
              { id: "sand", name: "Sand" },
            ],
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
