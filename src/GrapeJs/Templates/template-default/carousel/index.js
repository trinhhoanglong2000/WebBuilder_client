import loadScripts from "../template-common";
import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import loadTraitCarousel from "./traint"

export default function loadBlockCarousel(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  //#region carousel panel
  loadTraitCarousel(editor,c);

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
  //THIS IS SETTING COMPONENT
  domc.addType("carousel", {
    model: {
      defaults: {
        tagName: 'div',
        droppable: false,
        traits: [
          {
            label:"Collections",
            name: "data",
            type: "banner-data",
          },
          {
            type:"banner-text-color",
            label:"Button color"
          },
          {
            type:"banner-text-display",
            label:"Text Display"
          }
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

        // loadScripts(
        //   ["http://localhost:5000/files/dist/js/template-default/carousel/carousel.js"]
        //   , function () {
        //     //console.log('carousel.js is loaded');
        //   });
      },
      async Update(){
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
      async handleTypeChangeData() {
        //console.log("Data")
        const atributeData = this.attributes.attributes;
        //console.log(document.querySelector(".gjs-frame").contentDocument.querySelector("html"))
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this
        this.Update()

       
      },
      initData() {
        //change uuid
        this.set({
          content: this.attributes.content.replace(
            /myCarousel/g,
            `A${uuidv4()}`
          ),
        });
        this.Update()
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
