import $ from "jquery";
export default function loadTraitProductPage(editor, opt = {}) {
  editor.TraitManager.addType("ProductPage-numProducts", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const el = document.createElement("div");
      
      el.innerHTML = `
          <div class="d-flex align-items-center gjs-one-bg">
            <input type="range" id="cowbell" style = "outline: none; background-color: #aaa; height: 3px; width: 100%; margin: 10px auto;" class="p-0" name="numPRoduct" 
                 min="8" max="24"  step="4">
             <label class="m-0" for="numPRoduct">Cowbell</label>
            </div>
            `;
      $(el)
        .find("input")
        .on("input", () => {
          this.onChange();
        });

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const value = $(elInput).find("input")[0].value;
      $(elInput).find("label").text(value);
      // component.setAttributes({...component.getAttributes(),'data-ez-mall-numProducts':value});
      component.set('attributes', {
        ...component.get('attributes'),
        'data-ez-mall-numProducts':value
      })
    },
    onUpdate({ elInput, component }) {
      const initValue =
      component.attributes.attributes["data-ez-mall-numProducts"] || 8;
      $(elInput).find('input').val(initValue)
      $(elInput).find("label").text(initValue);

    },
  });
}
