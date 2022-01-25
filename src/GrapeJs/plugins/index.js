import grapesjs from "grapesjs";
import { default as LoadPanels } from "../panels/index";
import { default as LoadCommands } from "../commands/index";

export default grapesjs.plugins.add("Plugins-defaults", (editor, opts = {}) => {
  LoadCommands(editor, {
    textCleanCanvas: "Are you sure to clean the canvas?",
  });

  LoadPanels(editor, opts);
});