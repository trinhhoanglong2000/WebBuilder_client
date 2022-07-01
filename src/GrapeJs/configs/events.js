import $ from "jquery";
const Swal = require('sweetalert2')

export const getEvents = (editor,config) => {
    editor.on('run:preview', () => {
        $("#navigationPanelPages").addClass("dnone-important");
    })
    editor.on('stop:preview', () => {
        $("#navigationPanelPages").removeClass("dnone-important");
    })
    editor.on('stop:open-tm stop:open-layers', () => {
        if (!editor.Commands.isActive('open-tm') && !editor.Commands.isActive('open-layers')) {
            $('.gjs-pn-panel.gjs-pn-views-container >div:first-child > div:nth-child(2)').css('display', 'block')
        }
    })
    editor.on('run:open-layers', () => {
        $('.gjs-pn-panel.gjs-pn-views-container >div:first-child > div').css('display', 'none')
    })
    editor.on('undo', (some, argument) => {
        // do something
        if (editor.getSelected()) {
            editor.getSelected().getTraits().forEach(ele => {
                ele.view.onUpdate({ elInput: ele.el, component: editor.getSelected() })
            })
        }
    })
    editor.on('redo', (some, argument) => {
        // do something
        if (editor.getSelected()) {
            editor.getSelected().getTraits().forEach(ele => {
                ele.view.onUpdate({ elInput: ele.el, component: editor.getSelected() })
            })
        }
    })

    //==========================| Block Drag|===================
    editor.on("block:drag:stop", function (dropped_Component) {
        let droppedComponent = dropped_Component;

        if (Array.isArray(droppedComponent)) {
          droppedComponent = droppedComponent[0];
        }

        if (!droppedComponent) return;

        if (typeof droppedComponent.initData === "function") {
          droppedComponent.initData();
        }

        let header = editor.Canvas.getDocument().head;
        let componentCss = header.querySelector(`#${droppedComponent.attributes.name}`)

        if (!componentCss) {
            config.addComponentCssNJs(editor, [droppedComponent.attributes.name]);
        }
      });
      
    //==========================| asset |===================
    editor.on("asset:add", (asset) => {
      let isImage = asset.get('src').includes('data:image');
      if (!isImage) {
        editor.AssetManager.close()
        editor.AssetManager.remove(asset.get('src'))
        Swal.fire({
          icon: 'error',
          title: 'File  Error',
          text: 'This file is not image!',
        }).then((result) => {
          editor.AssetManager.open()
        })
      }
    });
}


