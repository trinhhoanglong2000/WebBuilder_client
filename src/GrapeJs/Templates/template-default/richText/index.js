import loadTraitRichText from "./trait"
import loadComponentsRichText from "./components"
export default function loadBlockRichText(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  //#region productList
  loadTraitRichText(editor,c)
  loadComponentsRichText(editor,c)
  

  bm.add("RichText", {
    label: `
      <div>${c.label_rich_text}</div> `,
    category: c.label_rich_text,
    attributes: { class: "fa fa-file-text" },
    content: {
      // style: {
      //   "text-align": "center",
      //   width: "calc(100% - 15rem)",
      //   margin: "auto",
      // },
      attributes: {
        class: "Rich-Text",
        name: "rich-text",
      },
      name: "RichText",
      draggable: ".main-content",
      type: "RichText",
      components: [
        {
          name: "Header",
          draggable: ".Rich-Text",
          tagName: "h1",
          content: `Talk about your brand `,
          editable: true,
          droppable: false,

          type: "product-text",
        },
        {
          removable: false,
          name: "Text",
          type: "RichText-Text",
          attributes: {
            class: "rich-text-field",
          },
          style:{"font-size":"small"},
    
          editable: true,
          droppable: false,
          draggable: ".Rich-Text",
    
          content: `<p>Share information about your brand with your customers. Describe a product, make announcements, or
          welcome customers to your store.</p>`,
        },
        {
          name: "Button",
          draggable: ".Rich-Text",
          type: "RichText-Button",
          tagName: "a",
          content: `Button Link`,
          editable: true,
          droppable: false,
          attributes: {
            class:
              "btn btn-primary align-self-center d-inline-flex justify-content-center align-items-center",
          },
          style: { "min-width": "7rem", "min-height": "2.5rem" },
        },
      ],
    },
  });
  bm.add("RichText-Header", {
    label: `
      <div>${"Header"}</div> `,
    category: c.label_rich_text,

    attributes: { class: "fa fa-header " },
    content: {
      name: "Header",
      draggable: ".Rich-Text",
      tagName: "h1",
      content: `Talk about your brand `,
      editable: true,
      droppable: false,

      type: "product-text",
    },
  });
  bm.add("RichText-Text", {
    label: `
      <div>${"Text"}</div> `,
    category: c.label_rich_text,

    attributes: { class: "gjs-fonts gjs-f-text" },
    content:  {
      removable: false,
      name: "Text",
      type: "RichText-Text",
      attributes: {
        class: "rich-text-field",
      },
      style:{"font-size":"small"},

      editable: true,
      droppable: false,
      draggable: ".Rich-Text",

      content: `<p>Share information about your brand with your customers. Describe a product, make announcements, or
      welcome customers to your store.</p>`,
    },
  });
  bm.add("RichText-Btn", {
    label: `
      <div>${"Button"}</div> 
      `,
    category: c.label_rich_text,

    attributes: { class: "gjs-fonts gjs-f-button" },
    content:  {
      name: "Button",
      draggable: ".Rich-Text",
      type: "RichText-Button",
      tagName: "a",
      content: `Button Link`,
      editable: true,
      droppable: false,
      attributes: {
        class:
          "btn btn-primary align-self-center d-inline-flex justify-content-center align-items-center",
      },
      style: { "min-width": "7rem", "min-height": "2.5rem" },
    },
  });
  //#endregion
}
