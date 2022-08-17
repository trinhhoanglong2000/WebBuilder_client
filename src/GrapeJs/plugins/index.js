import grapesjs from "grapesjs";
import { default as LoadPanels } from "../panels/index";
import { default as LoadCommands } from "../commands/index";
import { default as loadStyles } from "../styles/index"
import { default as LoadDevice } from "../device/index"

export default grapesjs.plugins.add("Plugins-defaults", (editor, opts = {}) => {
  LoadCommands(editor,
    {
      textCleanCanvas: "Are you sure to clean the canvas?",
    },
    opts
  );
  LoadDevice(editor, opts);
  LoadPanels(editor, opts);
  loadStyles(editor, opts);
  // Common section
  editor.TraitManager.addType("section-common", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {

      const el = document.createElement("div");
      el.innerHTML = `
        <div style="width:100%;height:1px;border:1px solid gray;  }">
        </div>
      `;

      return el;
    },

  });
  // 
});
