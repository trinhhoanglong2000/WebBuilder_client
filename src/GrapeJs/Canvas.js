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
//2022/08/02 LONG-TP ADD START 
import './blocks/basicBlocks/basicBlocks.css';
 //2022/08/02 LONG-TP ADD END 
/////////======================================
//=======|Type 0 = Basic|=========
//=======|Type 1 = Intermediate|=========
//=======|Type 2 = Advanced|=========
function Canvas({ type }) {

   const getPlugins = () => {
  //   const plugins = ['gjs-blocks-basic', 'gjs-blocks-intermediate', 'gjs-blocks-advanced']
  //   let result = plugins.slice(0, type + 1);
  //   //Optional
  //   if (type => 1) {
  //     result = result.concat([gjsForms])
  //   }
  //   if (type >= 2) {
  //     result = result.concat([pluginTooltip, grapjesTab])
  //   }
  //   result = result.concat(['Plugins-defaults', 'gjs-navbar'])
  //   return result
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
    return result;
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
        type: 'remote',
        stepsBeforeSave: 1,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        headers: {
          'Content-Type': 'application/json',
        },
        id: '',
        urlStore: `${process.env.REACT_APP_API_URL}pages/${1}/content`,
        urlLoad: `${process.env.REACT_APP_API_URL}pages/${1}/content`,
      }}
      blockManager={{
        appendTo: '.gjs-pn-block-container',
        blocks: [{
          id: 'section', // id is mandatory
          label: '<b>Section</b>', // You can use HTML/SVG inside labels
          attributes: { class:'gjs-block-section' },
          content: `<section>
            <h1>This is a simple title</h1>
            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
          </section>`,
        },]
      }}
      canvas = {{
        styles: [
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
        ],
        scripts: [
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
        ],
      }
      }
      
      //===============|Editor is here |============
      //===============|Do the event listen here|===============
      onInit={(e) => {
        //CustomeCode(e);
      }}
    />
  );
}

export default Canvas;
