import $ from "jquery";
export default function loadTraitProductPage(editor, opt = {}) {
    editor.TraitManager.addType("ProductPage-numProducts", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
          const el = document.createElement("div");
          el.innerHTML = `
          <div class="d-flex align-items-center gjs-one-bg">
            <input type="range" id="cowbell" style = "appearance:auto;" class="p-0" name="numPRoduct" 
                 min="8" max="24" value="8" step="4">
             <label class="m-0" for="numPRoduct">Cowbell</label>
            </div>
            `;

            $(el)
            .find("input")
            .on("input", function(){
                $(el).find('label').text($(this)[0].value)
            } );

          return el;
        },
        onEvent({ elInput, component, event }) {
          //#1 when option change we will get new option => change HTML following option
    
        },
      });
}
