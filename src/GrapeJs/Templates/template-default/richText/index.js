import loadTraitRichText from "./trait"
import loadComponentsRichText from "./components"
export default function loadBlockRichText(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  //#region productList
  loadTraitRichText(editor, c)
  loadComponentsRichText(editor, c)


  bm.add("RichText", {
    label: `
      <div>${c.label_rich_text}</div> `,
    category: c.label_rich_text,
    attributes: { class: "fa fa-file-text" },
    content: {
      type: "RichText",
      components: [
        {
          type: "RichText-Header",
          content: `Talk about your brand `,
        },
        {
          type: "RichText-Text",
          content: `<p>Share information about your brand with your customers. Describe a product, make announcements, or
          welcome customers to your store.</p>`,
        },
        {
          content: `Button Link`,
          type: "RichText-Button",
          
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
      tagName: "h1",
      content: `Talk about your brand `,
      editable: true,
      droppable: false,
      copyable: false,

      draggable: ".Rich-Text",

      type: "RichText-Header",
    },
  });
  bm.add("RichText-Text", {
    label: `
      <div>${"Text"}</div> `,
    category: c.label_rich_text,

    attributes: { class: "gjs-fonts gjs-f-text" },
    content: {
      name: "Text",
      type: "RichText-Text",
      attributes: {
        class: "rich-text-field",
      },
      style: { "font-size": "small" },

      editable: true,
      droppable: false,
      copyable: false,

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
    content: {
      name: "Button",
      type: "RichText-Button",
      tagName: "a",
      content: `Button Link`,
      editable: true,
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

    },
  });
  //#endregion
}
