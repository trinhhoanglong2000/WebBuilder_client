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
      type: "RichText-Header",
      content: `Talk about your brand `,
    },
  });
  bm.add("RichText-Text", {
    label: `
      <div>${"Text"}</div> `,
    category: c.label_rich_text,

    attributes: { class: "gjs-fonts gjs-f-text" },
    content: {
      type: "RichText-Text",
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
      content: `Button Link`,
      type: "RichText-Button",
    },
  });
  //#endregion
}
