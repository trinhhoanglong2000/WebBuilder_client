import loadTraitRichText from "./trait";
import loadComponentsRichText from "./components";
import { RICH_TEXT_LABEL, RICH_TEXT_BUTTON_LABEL, TEXT_LABEL } from "../../../../asset/icon/svg";

export default function loadBlockRichText(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  //#region productList
  loadTraitRichText(editor, c)
  loadComponentsRichText(editor, c)


  bm.add("RichText", {
    label: `
      ${RICH_TEXT_LABEL}
      <div>${c.label_rich_text}</div> `,
    category: c.label_rich_text,
    content: {
      type: "Rich-Text",
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
      <div>Heading</div> `,
    category: c.label_rich_text,

    attributes: { class: "fa fa-header " },
    content: {
      type: "RichText-Header",
      content: `Talk about your brand `,
    },
  });
  bm.add("RichText-Text", {
    label: `
      ${TEXT_LABEL}
      <div>Text</div> `,
    category: c.label_rich_text,
    content: {
      type: "RichText-Text",
      content: `<p>Share information about your brand with your customers. Describe a product, make announcements, or
      welcome customers to your store.</p>`,
    },
  });
  bm.add("RichText-Btn", {
    label: `
      ${RICH_TEXT_BUTTON_LABEL}
      <div>Button</div> 
      `,
    category: c.label_rich_text,
    content: {
      content: `Button Link`,
      type: "RichText-Button",
    },
  });
  //#endregion
}
