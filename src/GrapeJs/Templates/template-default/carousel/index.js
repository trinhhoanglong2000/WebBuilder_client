import loadScripts from "../template-common";
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
        <div>
          <div>
            <div> 
            Category
            </div>
            <select class="options-carousel-data" optionType="data">
              ${traitOptionsData.map(opt => opt.id == trait.target.attributes.attributes.data ?
        `<option value="${opt.id}" selected>${opt.name}</option>`
        : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>
          </div>
          
          <div>
            <div> 
            Text Color
            </div>
            <select class="options-carousel-text-color" optionType="text-color">
              ${textOptionsData.map(opt => opt.id == trait.target.attributes.attributes.textColor ?
          `<option value="${opt.id}" selected>${opt.name}</option>`
          : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>
          </div>

          <div>
            <div> 
            Display Caption
            </div>
            <select class="options-carousel-display" optionType="display">
              ${displayOptionsData.map(opt => opt.id == trait.target.attributes.attributes.displayType ?
          `<option value="${opt.id}" selected>${opt.name}</option>`
          : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>
          </div>
        </div>
      `;
      // #4 Add  event => when selected change =
      const inputTypeData = el.querySelector('.options-carousel-data');
      inputTypeData.addEventListener('change', ev => {
      });

      const inputTypeTextColor = el.querySelector('.options-carousel-text-color');
      inputTypeTextColor.addEventListener('change', ev => {
      });

      const inputdisplayOptionsData = el.querySelector('.options-carousel-display');
      inputdisplayOptionsData.addEventListener('change', ev => {
      });
      return el
    },
    // THIS FUNCTION WORK WHEN USER CLICK TO TRAIT SETTING or NEXT OF onEvent function
    onUpdate({ elInput, component }) {
      //#1 Get attribute data for update something
      const dataAttributeValues = component.getAttributes().data || "";

      //#2 Update something here
      const inputTypeData = elInput.querySelector(".options-carousel-data");

      inputTypeData.dispatchEvent(new CustomEvent("change"));

      const inputTypeTextColor = elInput.querySelector(".options-carousel-text-color");

      inputTypeTextColor.dispatchEvent(new CustomEvent("change"));

      const inputdisplayOptionsData = elInput.querySelector(".options-carousel-display");

      inputdisplayOptionsData.dispatchEvent(new CustomEvent("change"));
    },
    // IN MY OPINION THIS FUNCTION WORK WHEN USER CHANGE OPTION - IF U KNOW IT WORK PLS CMT HERE
    onEvent({ elInput, component, event }) {      
      const attributes = this.model.attributes;
      const rootElementTrait = elInput;
      const propertiesOfFrontComponet = component;
      let optionType = event.target.getAttribute("optionType");
      switch (optionType) {
        case "data":
          //#1 when option change we will get new option => change HTML following option
          let inputTypeData = elInput.querySelector(".options-carousel-data");
          let data = inputTypeData.value;

          //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
          if (component.getAttributes().data != data) {
            component.addAttributes({ data })
          }
          break;
        case "text-color":
          //#1 when option change we will get new option => change HTML following option
          let inputTextColor = elInput.querySelector(".options-carousel-text-color");
          let textColor = inputTextColor.value;

          //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
          if (component.getAttributes().textColor != textColor) {
            component.setClass( `carousel-text-${inputTextColor.value}` );
            component.addAttributes({ textColor })
          }

          break;
        case "display":
          //#1 when option change we will get new option => change HTML following option
          let inputdisplayOptionsData = elInput.querySelector(".options-carousel-display");
          let displayType = inputdisplayOptionsData.value;

          //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
          if (component.getAttributes().displayType != displayType) {
            if(inputdisplayOptionsData.value == "off"){
              component.addClass( `carousel-display-off` );
            } else{
              component.removeClass( `carousel-display-off` );
            }
            component.addAttributes({ displayType })
          }

          break;
        default:
          break;
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
            //console.log('carousel.js is loaded');
          });
      },

      async handleTypeChangeData() {
        //console.log("Data")
        const atributeData = this.attributes.attributes;
        //console.log(document.querySelector(".gjs-frame").contentDocument.querySelector("html"))
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this

        let carouselIndicators = $(this.view.el).find(`.carousel-indicators`)[0]
        let carouselInner = $(this.view.el).find(`.carousel-inner`)[0];
        carouselIndicators.innerHTML = "";
        carouselInner.innerHTML = "";
        let categoryId = this.attributes.attributes.data
        const response = await fetch(`http://localhost:5000/collections/category/${categoryId}`
          , {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          });
        let myJson = await response.json();
        let data = myJson.data;
        data.forEach((item, index) => {
          let htmlButtonInsert = `
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${index}" class = "${index == 0 ? "active" : ""}" aria-label="Slide ${index}"></button>
      `
          carouselIndicators.insertAdjacentHTML("beforeend", htmlButtonInsert);

          let htmlCarouselItemInsert = `
      <div class="carousel-item ${index == 0 ? "active" : ""}">
        <img src="${item.image}" class="d-block w-100" alt="${item.image}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${item.caption}</h5>
          <p>${item.description}</p>
        </div>
      </div>
    `
          carouselInner.insertAdjacentHTML("beforeend", htmlCarouselItemInsert)
        })
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
        <div id="myCarousel" class="container carousel slide" data-bs-ride="carousel" data-type = "banners" >
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
