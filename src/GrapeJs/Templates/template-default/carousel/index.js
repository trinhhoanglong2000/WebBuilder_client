import loadScripts from  "../template-common";
import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
export default function loadBlockCarousel(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  //#region carousel panel
  
  const GetData = async (reloadFlag) => {
    if (localStorage.getItem('crouselOptions') == null || reloadFlag == true) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}collections/carousels?storeID=1`
        , {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        });
      let myJson = await response.json();
      let Data = myJson.data.map((value) => { return { id: value.categoryId, name: value.name } });
      localStorage.setItem('crouselOptions', JSON.stringify(Data))
    } 
  }
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
  editor.TraitManager.addType("carousel", {
    // Disbale label custom - set false for use createLabel below
    noLabel: true,
    // Label custom for trait
    createLabel({ label }) {
      return `<div>
          <div>Before</div>
          ${label}
          <div>After</div>
        </div>`;
    },
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      console.log( trait.target.attributes.attributes.data)
      // #1 Get data form api and pour to "data"
      const data = JSON.parse(localStorage.getItem('crouselOptions'));
      console.log(data)
      // #2 Convert data to trait option 
      let traitOptionsData = [];
  
      data.forEach(item => {
        traitOptionsData.push({ id: item.id, name: item.name })
      })
      // #3 Create HTML selected for trait option 
      const el = document.createElement('div');
      el.innerHTML = `
        <div>
          <div> 
            Category
          </div>
          <select class="options-carousel">
            ${traitOptionsData.map(opt => opt.id == trait.target.attributes.attributes.data ?  
               `<option value="${opt.id}" selected>${opt.name}</option>` 
               : `<option value="${opt.id}" >${opt.name}</option>` ).join('')}
          </select>
        </div>
      `;
      // #4 Add  event => when selected change =
      const inputType = el.querySelector('.options-carousel');
      inputType.addEventListener('change', ev => {
      });
      return el
    },
    // THIS FUNCTION WORK WHEN USER CLICK TO TRAIT SETTING or NEXT OF onEvent function
    onUpdate({ elInput, component }) {
      //#1 Get attribute data for update something
      const dataAttributeValues = component.getAttributes().data || "";

      //#2 Update something here
      const inputType = elInput.querySelector(".options-carousel");

      inputType.dispatchEvent(new CustomEvent("change"));
    },
    // IN MY OPINION THIS FUNCTION WORK WHEN USER CHANGE OPTION - IF U KNOW IT WORK PLS CMT HERE
    onEvent({ elInput, component, event }) {
      const attributes = this.model.attributes;
      const rootElementTrait = elInput;
      const propertiesOfFrontComponet = component;

      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector(".options-carousel");
      let data = inputType.value;

      //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
      if (component.getAttributes().data != data) {
        component.setAttributes({ data })
      }
    },
  });
  //THIS IS SETTING COMPONENT
  domc.addType("carousel", {
    model: {
      defaults: {
        tagName: 'div',
        droppable: false,
        traits: [
          {
            name: "data",
            type: "carousel",
          },
        ],
        // This is default attributes
        attributes: {
          data: '1',
          "ez-mall-type": "carousel"
        }
      },
      // This function run when component created - we setup listen to change atri
      
      init() {
        
        GetData(true);
        this.on('change:attributes:data', this.handleTypeChangeData);
        this.on('change:attributes:placeholder', this.handleTypeChangePlaceHold);
        
        loadScripts(
          ["http://localhost:5000/files/dist/js/template-default/carousel/carousel.js"]
        , function () {
          console.log('carousel.js is loaded');
        });
      },

      handleTypeChangeData() {
        //console.log("Data")
        const atributeData = this.attributes.attributes;
        //console.log(document.querySelector(".gjs-frame").contentDocument.querySelector("html"))
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this
       // console.log(this.view)
       // console.log(this.view.el.nextElementSibling)
        //console.log(this.view.el.firstChild.nextElementSibling)


        //this.view.el.innerHTML = atributeData.data
      },
      initData() {
        //change uuid
        this.set({
          content: this.attributes.content.replace(
            /myCarousel/g,
            `A${uuidv4()}`
          ),
        });
        
      },
      handleTypeChangePlaceHold() {
        console.log("placeHold");
        const atributeData = this.attributes.attributes;
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this
        //this.view.el.innerHTML = atributeData.data
      },
    },
    view: {
      init() {
        const attributes = this.model.attributes;
        const rootElement = this.el;
      },
      // Event on layout
      events: {
        // click: "handleClick",
        // dblclick: function () {
        //   alert("Hi!");
        // },
      },
      handleClick: function (e) {
        const attributes = this.model.attributes;
        const rootElement = this.el;
      },
      render: function () {
        // Extend the original render method
        defaultType.view.prototype.render.apply(this, arguments);
        return this;
      },
    },
  });
  //THIS IS SETTING BLOCK
  bm.add("carousel", {
    // THIS IS HTML DISPLAY ON THE LEFT (BLOCK BAR)
    label: `
    <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 38h20V8H14v30zM4 34h8V12H4v22zm32-22v22h8V12h-8z"/><path d="M0 0h48v48H0z" fill="none"/>
    </svg>
    <div>${c.carouselBlkLabel}</div> `,
    // THIS PROPERTY IS CATEGORY GROUP OF BLOCK
    category: c.carousel_category,
    content: [
      {
        name: "carousel",
        attributes: { name: "banners" },
        draggable: ".main-content",
        //LONG-TP 2022-02-22 TEST TRAITS - ADD START
        type: "carousel",
        //LONG-TP 2022-02-22 TEST TRAITS - ADD END
        content: `
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" data-type = "banners" >
            <div class="carousel-indicators">
                
            </div>
            <div class="carousel-inner">
            
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>
        `,
      },
    ],
  });
  //#endregion
  //LONG-TP 2022-02-22 TEST TRAITS - ADD END 
}
