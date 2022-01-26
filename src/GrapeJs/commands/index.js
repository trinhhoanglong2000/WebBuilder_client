import {
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
  openBlock,
} from "../const";

export default function LoadCommands(editor, config) {
  const cm = editor.Commands;
  const txtConfirm = config.textCleanCanvas;

  cm.add(cmdDeviceDesktop, (e) => e.setDevice("Desktop"));
  cm.add(cmdDeviceTablet, (e) => e.setDevice("Tablet"));
  cm.add(cmdDeviceMobile, (e) => e.setDevice("Mobile portrait"));
  cm.add(
    cmdClear,
    (e) => window.confirm(txtConfirm) && e.runCommand("core:canvas-clear")
  );
  cm.add(openBlock, (e) => {
    var element = document.getElementsByClassName("gjs-pn-block-container");
    var elementCanvas = document.getElementsByClassName("gjs-cv-canvas");
    // var elementCanvas = document.getElementsByClassName("gjs-frame-wrapper");

    // Iterate through the retrieved elements and add the necessary class names.
    for (var i = 0; i < element.length; i++) {
      element[i].classList.toggle("active-block");
    }

    for (i = 0; i < elementCanvas.length; i++) {
      elementCanvas[i].classList.toggle("active-canvas");
      elementCanvas[i].addEventListener('transitionend', function () {
        editor.refresh()
      });
    }

    //load agian
    //Transition 1s so we wait a little bit longer then refresh the editor

    // setTimeout(()=>{
    //   editor.refresh()
    // },1100)

  });
}
