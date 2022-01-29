import { GrapesjsReact } from "grapesjs-react";
import "grapesjs/dist/css/grapes.min.css";
import './dist/Canvas.css'

import './blocks/basicBlocks/index'
import './blocks/intermediateBlocks/index'
import './blocks/AdvancedBlocks/index'
import './plugins/index'
import 'grapesjs-navbar';
import gjsForms from 'grapesjs-plugin-forms';
import pluginTooltip from 'grapesjs-tooltip';
import grapjesTab from 'grapesjs-tabs'

/////////======================================
//=======|Type 0 = Basic|=========
//=======|Type 1 = Intermediate|=========
//=======|Type 2 = Advanced|=========
function Canvas({ type }) {

  const getPlugins = () => {
    const plugins = ['gjs-blocks-basic', 'gjs-blocks-intermediate', 'gjs-blocks-advanced']
    let result = plugins.slice(0, type + 1);
    //Optional
    if (type => 1) {
      result = result.concat([gjsForms])
    }
    if (type >= 2) {
      result = result.concat([pluginTooltip, grapjesTab])
    }
    result = result.concat(['Plugins-defaults', 'gjs-navbar'])
    return result
  }


  return (
    <GrapesjsReact
      id="grapesjs-react"
      plugins={getPlugins()}

      pluginsOpts={{
        'gjs-navbar': { 'labelNavbarCategory': 'Navigation' },
        [pluginTooltip]: {
          blockTooltip: {
            category: 'Extras',
            attributes: { class: "tooltip" },
          }
        },
        [grapjesTab]: {
          tabsBlock: { category: 'Navigation' }
        }
      }}

      styleManager= {{
        // clearProperties: true,
      }}
      width="100%"
      height="100vh"
      storageManager={{
        autosave: true,
        autoload: true,
      }}
      blockManager={{
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
