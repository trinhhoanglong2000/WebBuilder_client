import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
export default function loadBlocks(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  //========| |============//
  //#region productList
  bm.add("productList", {

    label: `
      <div>${c.label_product_list}</div> `,
    category: c.catergory_product_list,
    attributes: { class: "fa fa-cube" },
    content: {
      attributes: { class: "container product-section" },
      name: "Section",
      draggable: "[data-gjs-type=wrapper]",
      components: [
        {
          name: "Text",
          draggable: ".product-section",
          tagName: "h2",
          content: `Trending Products`,
          editable: true,
          droppable: false,
          type: "text",
        },
        {
          removable: false,
          name: "Products",

          content: `                <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                    <!-- Carousel indicators -->

                    <!-- Wrapper for carousel items -->
                    <div class="carousel-inner">
                        <div class="item carousel-item active">
                            <div class="row">
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>

                                        </div>
                                        <div class="thumb-content flex-column">
                                            <h4>Apple iPad</h4>
                                            <p class="item-price"><strike>$400.00</strike> <span>$369.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Sony Headphone</h4>
                                            <p class="item-price"><strike>$25.00</strike> <span>$23.99</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Macbook Air</h4>
                                            <p class="item-price"><strike>$899.00</strike> <span>$649.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Nikon DSLR</h4>
                                            <p class="item-price"><strike>$315.00</strike> <span>$250.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item carousel-item">
                            <div class="row">
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Sony Play Station</h4>
                                            <p class="item-price"><strike>$289.00</strike> <span>$269.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Macbook Pro</h4>
                                            <p class="item-price"><strike>$1099.00</strike> <span>$869.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Bose Speaker</h4>
                                            <p class="item-price"><strike>$109.00</strike> <span>$99.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Samsung Galaxy S8</h4>
                                            <p class="item-price"><strike>$599.00</strike> <span>$569.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item carousel-item">
                            <div class="row">
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Apple iPhone</h4>
                                            <p class="item-price"><strike>$369.00</strike> <span>$349.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Canon DSLR</h4>
                                            <p class="item-price"><strike>$315.00</strike> <span>$250.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Google Pixel</h4>
                                            <p class="item-price"><strike>$450.00</strike> <span>$418.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/600x400/55595c/fff"
                                                class="img-responsive img-fluid" alt=""/>
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Apple Watch</h4>
                                            <p class="item-price"><strike>$350.00</strike> <span>$330.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Carousel controls -->

                    <button class="carousel-control-prev carousel-control left" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <i class="fa fa-angle-left"></i>
                      </button>
                      <button class="carousel-control-next carousel-control right" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <i class="fa fa-angle-right"></i>
                      </button>
                </div>`,
        },
      ],
    },
  });
  //#endregion

  //#region carousel panel
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
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this
        this.view.el.innerHTML = atributeData.data
      },
      handleTypeChangePlaceHold() {
        console.log("placeHold")
        const atributeData = this.attributes.attributes;
        // IMPORTAINT - this.view.el is root node => form 1 atribute change we can change front end by this
        this.view.el.innerHTML = atributeData.data
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

  //LONG-TP 2022-02-22 TEST TRAITS - ADD END 
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
}
//#endregion