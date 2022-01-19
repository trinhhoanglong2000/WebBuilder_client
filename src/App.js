import "grapesjs-preset-webpage";
import { GrapesjsReact } from "grapesjs-react";
import "grapesjs/dist/css/grapes.min.css";
function App() {
  return (
    <GrapesjsReact
      id="grapesjs-react"
      plugins={["gjs-preset-webpage", "gjs-blocks-basic"]}
      width="100%"
      height="100vh"
      storageManager={{
        autosave: true,
        autoload: true,
      }}
      //===============|Editor is here |============
      //===============|Do the event listen here|===============
      onInit={(e) => {
        console.log(e);
      }}
    />
  );
}

export default App;
