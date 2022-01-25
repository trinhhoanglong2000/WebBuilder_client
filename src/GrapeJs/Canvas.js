import { GrapesjsReact } from "grapesjs-react";
import "grapesjs/dist/css/grapes.min.css";
import './dist/Canvas.css'

import './blocks/basicBlocks/index'
import './blocks/intermediateBlocks/index'
import './blocks/AdvancedBlocks/index'
import './plugins/index'
import 'grapesjs-navbar';
/////////======================================
//=======|Type 0 = Basic|=========
//=======|Type 1 = Intermediate|=========
//=======|Type 2 = Advanced|=========
function Canvas({type}) {
  
  const getPlugins = () =>{
    const plugins=['gjs-blocks-basic','gjs-blocks-intermediate','gjs-blocks-advanced']
    let result = plugins.slice(0,type+1);
    //Optional

    result = result.concat(['Plugins-defaults','gjs-navbar'])
    return result
  }

  
  return (
    <GrapesjsReact
      id="grapesjs-react"
      plugins={getPlugins()}
      
      pluginsOpts= {{
        'gjs-navbar': {'labelNavbarCategory':'Navigation'}
      }}
      
      width="100%"
      height="100vh"
      storageManager={{
        autosave: true,
        autoload: true,
      }}
      blockManager= {{
        appendTo: '.gjs-pn-block-container'
      }}
      //===============|Editor is here |============
      //===============|Do the event listen here|===============
      onInit={(e) => {
        //CustomeCode(e);
      }}
    />
  );
}

export default Canvas;
