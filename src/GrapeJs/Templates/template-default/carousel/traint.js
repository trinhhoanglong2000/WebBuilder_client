import $ from "jquery";
import Quill from "quill";
export default function loadTraitCarousel(editor, opt = {}) {
    //NODE SAVE HTML $(".gjs-frame").contentDocument.querySelector("html")

    //LONG-TP 2022-02-22 TEST TRAITS - ADD START
    const domc = editor.DomComponents;
    const defaultType = domc.getType("default");
    const textType = domc.getType("text");
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    const textModel = textType.model;
    const textView = textType.view;
    const sfx = opt.socialClssfx;
    //THIS IS SETTING TRAIT
    editor.TraitManager.addType("banner-data", {
        // Disbale label custom - set false for use createLabel below
        noLabel: false,
        // Label custom for trait
        createLabel({ label }) {
            return `
            <div>
                ${label}
            </div>`;
        },
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            console.log(trait.target.attributes.attributes.data)
            // #1 Get data form api and pour to "data"
            const data = JSON.parse(localStorage.getItem('crouselOptions'));
            console.log(data)
            // #2 Convert data to trait option 
            let traitOptionsData = [];

            data.forEach(item => {
                traitOptionsData.push({ id: item.id, name: item.name })
            })

            const el = document.createElement('div');
            el.innerHTML = `
          
            <div data-input="">
            <select class="options-carousel-data" optionType="data" >
            ${traitOptionsData.map(opt => opt.id == trait.target.attributes.attributes.data ?
                `<option value="${opt.id}" selected>${opt.name}</option>`
                : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>
  
            </div>
            <div class="gjs-sel-arrow">
              <div class="gjs-d-s-arrow"></div>
            </div>
      `;
            // #4 Add  event => when selected change =
            const inputTypeData = el.querySelector('.options-carousel-data');
            inputTypeData.addEventListener('change', ev => {
            });
            return el
        },
        onEvent({ elInput, component, event }) {
            debugger
            let inputTypeData = elInput.querySelector(".options-carousel-data");
            let data = inputTypeData.value;
            //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
            if (component.getAttributes().data != data) {
                component.addAttributes({ data })
            }
        },
    });
    editor.TraitManager.addType("banner-text-color", {
        // Disbale label custom - set false for use createLabel below
        noLabel: false,
        // Label custom for trait
        createLabel({ label }) {
            return `<div>
          ${label}
        </div>`;
        },
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            console.log(trait.target.attributes.attributes.data)
            // #1 Get data form api and pour to "data"
            const data = JSON.parse(localStorage.getItem('crouselOptions'));
            console.log(data)
            // #2 Convert data to trait option 
            let traitOptionsData = [];

            data.forEach(item => {
                traitOptionsData.push({ id: item.id, name: item.name })
            })
            let textOptionsData = [
                { id: "white", name: "white" },
                { id: "black", name: "black" },
            ];

            let displayOptionsData = [
                { id: "on", name: "on" },
                { id: "off", name: "off" },
            ];

            // #3 Create HTML selected for trait option 
            const el = document.createElement('div');
            el.innerHTML = `
        
        <div data-input="">
        <select class="options-carousel-text-color" optionType="text-color">
              ${textOptionsData.map(opt => opt.id == trait.target.attributes.attributes.textColor ?
                `<option value="${opt.id}" selected>${opt.name}</option>`
                : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>

        </div>
        <div class="gjs-sel-arrow">
          <div class="gjs-d-s-arrow"></div>
        </div>
      `;
            // #4 Add  event => when selected change =


            const inputTypeTextColor = el.querySelector('.options-carousel-text-color');
            inputTypeTextColor.addEventListener('change', ev => {
            });

            return el
        },
        // THIS FUNCTION WORK WHEN USER CLICK TO TRAIT SETTING or NEXT OF onEvent function
        onUpdate({ elInput, component }) {
            //#1 Get attribute data for update something
            const dataAttributeValues = component.getAttributes().data || "";

            //#2 Update something here

            const inputTypeTextColor = elInput.querySelector(".options-carousel-text-color");

            inputTypeTextColor.dispatchEvent(new CustomEvent("change"));
        },
        // IN MY OPINION THIS FUNCTION WORK WHEN USER CHANGE OPTION - IF U KNOW IT WORK PLS CMT HERE
        onEvent({ elInput, component, event }) {
            const attributes = this.model.attributes;
            const rootElementTrait = elInput;
            const propertiesOfFrontComponet = component;


            //#1 when option change we will get new option => change HTML following option
            let inputTextColor = elInput.querySelector(".options-carousel-text-color");
            let textColor = inputTextColor.value;

            //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
            if (component.getAttributes().textColor != textColor) {
                component.setClass(`carousel-text-${inputTextColor.value}`);
                component.addAttributes({ textColor })
            }
        },
    });
    editor.TraitManager.addType("banner-text-display", {
        // Disbale label custom - set false for use createLabel below
        noLabel: false,
        // Label custom for trait
        createLabel({ label }) {
            return `<div>
          ${label}
        </div>`;
        },
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            console.log(trait.target.attributes.attributes.data)
            // #1 Get data form api and pour to "data"
            const data = JSON.parse(localStorage.getItem('crouselOptions'));
            console.log(data)
            // #2 Convert data to trait option 
            let traitOptionsData = [];

            let displayOptionsData = [
                { id: "on", name: "on" },
                { id: "off", name: "off" },
            ];

            // #3 Create HTML selected for trait option 
            const el = document.createElement('div');
            el.innerHTML = `


        <div data-input="">
         <select class="options-carousel-display " optionType="display">
              ${displayOptionsData.map(opt => opt.id == trait.target.attributes.attributes.displayType ?
                `<option value="${opt.id}" selected>${opt.name}</option>`
                : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>

        </div>
        <div class="gjs-sel-arrow">
          <div class="gjs-d-s-arrow"></div>
        </div>
      `;
            // #4 Add  event => when selected change =

            const inputdisplayOptionsData = el.querySelector('.options-carousel-display');
            inputdisplayOptionsData.addEventListener('change', ev => {
            });
            return el
        },
        // THIS FUNCTION WORK WHEN USER CLICK TO TRAIT SETTING or NEXT OF onEvent function
        onUpdate({ elInput, component }) {
            //#1 Get attribute data for update something
            const dataAttributeValues = component.getAttributes().data || "";

            const inputdisplayOptionsData = elInput.querySelector(".options-carousel-display");

            inputdisplayOptionsData.dispatchEvent(new CustomEvent("change"));
        },
        // IN MY OPINION THIS FUNCTION WORK WHEN USER CHANGE OPTION - IF U KNOW IT WORK PLS CMT HERE
        onEvent({ elInput, component, event }) {
            const attributes = this.model.attributes;
            const rootElementTrait = elInput;
            const propertiesOfFrontComponet = component;
            let optionType = event.target.getAttribute("optionType");

            //#1 when option change we will get new option => change HTML following option
            let inputdisplayOptionsData = elInput.querySelector(".options-carousel-display");
            let displayType = inputdisplayOptionsData.value;

            //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
            if (component.getAttributes().displayType != displayType) {
                if (inputdisplayOptionsData.value == "off") {
                    component.addClass(`carousel-display-off`);
                } else {
                    component.removeClass(`carousel-display-off`);
                }
                component.addAttributes({ displayType })
            }


        },
    });

}