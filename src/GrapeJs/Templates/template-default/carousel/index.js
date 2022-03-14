export default function loadBlockCarousel(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
  //#region carousel panel

  //NODE SAVE HTML $(".gjs-frame").contentDocument.querySelector("html")

  //LONG-TP 2022-02-22 TEST TRAITS - ADD START
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const textType = domc.getType('text');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textModel = textType.model;
  const textView = textType.view;
  const sfx = opt.socialClssfx;
  //THIS IS SETTING TRAIT
  editor.TraitManager.addType('carousel', {
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
      // #1 Get data form api and pour to "data"
      const data = ['option 1', 'option 2', 'option 3']
      // #2 Convert data to trait option 
      let traitOptionsData = [];
      data.forEach(item => {
        traitOptionsData.push({ id: item, name: item })
      })
      // #3 Create HTML selected for trait option 
      const el = document.createElement('div');
      el.innerHTML = `
        <select class="options-carousel">
          ${traitOptionsData.map(opt => `<option value="${opt.id}">${opt.name}</option>`).join('')}
        </select>
      `;
      // #4 Add  event => when selected change =
      const inputType = el.querySelector('.options-carousel');
      inputType.addEventListener('change', ev => {
      
      });
      return el;
    },
    // THIS FUNCTION WORK WHEN USER CLICK TO TRAIT SETTING or NEXT OF onEvent function  
    onUpdate({ elInput, component }) {
      //#1 Get attribute data for update something
      const dataAttributeValues = component.getAttributes().data || '';

      //#2 Update something here 
      const inputType = elInput.querySelector('.options-carousel');

      inputType.dispatchEvent(new CustomEvent('change'));
    },
    // IN MY OPINION THIS FUNCTION WORK WHEN USER CHANGE OPTION - IF U KNOW IT WORK PLS CMT HERE
    onEvent({ elInput, component, event }) {
      const attributes = this.model.attributes;
      const rootElementTrait = elInput;
      const propertiesOfFrontComponet = component;

      //#1 when option change we will get new option => change HTML following option 
      const inputType = elInput.querySelector('.options-carousel');
      let data = inputType.value;

      //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
      if(component.getAttributes().data != data){
        component.setAttributes({ data })
      } 
    },
  });
  //THIS IS SETTING COMPONENT
  domc.addType('carousel', {
    model: {
      defaults: {
        tagName: 'carousel',
        droppable: false,
        traits: [
          {
            name: 'data',
            type: "carousel",
          }
        ],
        // This is default attributes 
        attributes: {
          data: 'option 1'
        }
      },
      // This function run when component created - we setup listen to change atri
      init() {
        this.on('change:attributes:data', this.handleTypeChangeData);
        this.on('change:attributes:placeholder', this.handleTypeChangePlaceHold);
      },

      handleTypeChangeData() {
        console.log("Data")
        const atributeData = this.attributes.attributes;
        console.log(document.querySelector(".gjs-frame").contentDocument.querySelector("html"))
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this
        console.log(this.view)
        console.log(this.view.el.nextElementSibling)
        console.log(this.view.el.firstChild.nextElementSibling)
        
        //this.view.el.innerHTML = atributeData.data
      },
      handleTypeChangePlaceHold() {
        console.log("placeHold")
        const atributeData = this.attributes.attributes;
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this
        //this.view.el.innerHTML = atributeData.data
      },
    },
    view: {
      init() {
        const attributes = this.model.attributes;
        const rootElement = this.el
      },
      // Event on layout
      events: {
        click: 'handleClick',
        dblclick: function () {
          alert('Hi!');
        }
      },
      handleClick: function (e) {
        const attributes = this.model.attributes;
        const rootElement = this.el
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
    draggable: "[data-gjs-type=wrapper]",
    content: [
      {
        name: "Carousel",
        tagName: "carousel",
        //LONG-TP 2022-02-22 TEST TRAITS - ADD START 
        type: "carousel",
        //LONG-TP 2022-02-22 TEST TRAITS - ADD END 
        content: `
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="https://dummyimage.com/1360x540/55595c/fff " class="d-block w-100" alt="https://dummyimage.com/1360x540/55595c/fff ">
                <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="https://dummyimage.com/1360x540/55595c/fff " class="d-block w-100" alt="https://dummyimage.com/1360x540/55595c/fff ">
                <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="https://dummyimage.com/1360x540/55595c/fff " class="d-block w-100" alt="https://dummyimage.com/1360x540/55595c/fff ">
                <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
                </div>
            </div>
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