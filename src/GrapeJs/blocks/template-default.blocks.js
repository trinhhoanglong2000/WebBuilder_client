import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
export default function loadBlocks(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  //========| |============//
  bm.add("productList", {
   
    label: `
      <div>${c.label_product_list}</div> `,
    category: c.catergory_product_list,
    attributes : {class :"fa fa-cube"},
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


  //LONG-TP 2022-02-22 TEST TRAITS - ADD START
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const textType = domc.getType('text');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textModel = textType.model;
  const textView = textType.view;
  const sfx = opt.socialClssfx;
  editor.TraitManager.addType('href-next', {
      
    noLabel: true,
    createLabel({ label }) {
        return `<div>
          <div>Before</div>
          ${label}
          <div>After</div>
        </div>`;
      },
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      // Here we can decide to use properties from the trait
      const traitOpts = trait.get('options') || [];
      const options = traitOpts.length ? traitOpts : [
        { id: 'url', name: 'URL' },
        { id: 'email', name: 'Email' },
      ];
  
      // Create a new element container and add some content
      const el = document.createElement('div');
      el.innerHTML = `
        <select class="href-next__type">
          ${options.map(opt => `<option value="${opt.id}">${opt.name}</option>`).join('')}
        </select>
        <div class="href-next__url-inputs" >
          <input class="href-next__url" placeholder="Insert URL" />
        </div>
        <div class="href-next__email-inputs">
          <input class="href-next__email" placeholder="Insert email" />
          <input class="href-next__email-subject" placeholder="Insert subject" />
        </div>
      `;
  
      // Let's make our content interactive
      const inputsUrl = el.querySelector('.href-next__url-inputs');
      const inputsEmail = el.querySelector('.href-next__email-inputs');
      const inputType = el.querySelector('.href-next__type');
      debugger
      inputType.addEventListener('change', ev => {
        debugger
        switch (ev.target.value) {
          case 'url':
            inputsUrl.style.display = '';
            inputsEmail.style.display = 'none';
            break;
          case 'email':
            inputsUrl.style.display = 'none';
            inputsEmail.style.display = '';
            break;
        }
      });
  
      return el;
    },
    // Get 
    onEvent({ elInput, component, event }) {
        const attributes = this.model.attributes;
        const rootElementTrait = elInput;
        const propertiesOfFrontComponet = component;
        console.log(rootElementTrait)
        console.log(propertiesOfFrontComponet)


        const inputType = elInput.querySelector('.href-next__type');
        let href = '';
    
        switch (inputType.value) {
          case 'url':
            const valUrl = elInput.querySelector('.href-next__url').value;
            href = valUrl;
            break;
          case 'email':
            const valEmail = elInput.querySelector('.href-next__email').value;
            const valSubj = elInput.querySelector('.href-next__email-subject').value;
            href = `mailto:${valEmail}${valSubj ? `?subject=${valSubj}` : ''}`;
            break;
        }
        attributes.value = {elInput}
        component.addAttributes({ href })
        component.attributes.carouselproperty= href
      },

      onUpdate({ elInput, component }) {
        const href = component.getAttributes().href || '';
        console.log("UPDATE")
        console.log(elInput)
        console.log(component)
        const inputType = elInput.querySelector('.href-next__type');
        let type = 'url';
    
        if (href.indexOf('mailto:') === 0) {
          const inputEmail = elInput.querySelector('.href-next__email');
          const inputSubject = elInput.querySelector('.href-next__email-subject');
          const mailTo = href.replace('mailto:', '').split('?');
          const email = mailTo[0];
          const params = (mailTo[1] || '').split('&').reduce((acc, item) => {
            const items = item.split('=');
            acc[items[0]] = items[1];
            return acc;
          }, {});
          type = 'email';
    
          inputEmail.value = email || '';
          inputSubject.value = params.subject || '';
        } else {
          elInput.querySelector('.href-next__url').value = href;
        }
    
        inputType.value = type;
        inputType.dispatchEvent(new CustomEvent('change'));
      },
  });



  domc.addType('carousel', {
    model: {
      defaults: {
        droppable: false,
        traits: [
        {
            type: "href-next",
            name: "carouselproperty",
            changeProp:true,
            placeholder: 'Insert text'
        },
        {
            name: 'placeholder',
            changeProp:true,
            placeholder: 'Insert text'
        }
        ],
        placeholder: 'Initial placeholder',
        carouselproperty: 'Heeee'
      },
      
      init() {
        this.on('change:placeholder', this.handleTypeChange);
        this.on('change:carouselproperty', this.handleTypeChange);
        this.on('change:url', this.handleTypeChange);
        this.on('change:email', this.handleTypeChange);
        this.listenTo(this, 'change:content', this.handleTypeChange)
      },
  
      handleTypeChange() {
        console.log('Input type changed to: ');
        console.log(this.attributes)
      },
  },
  view:{ 
      init: function() {
        const attributes = this.model.attributes;
        const rootElement = this.el
        console.log(rootElement)
        // Parent div of block
      },
      // Event on layout
      events: {
        click: 'handleClick',
        dblclick: function(){
          alert('Hi!');
        }
      },

      handleClick: function(e) {
        const attributes = this.model.attributes;
        const rootElement = this.el
        console.log(attributes);
        console.log(rootElement)
      },
      render: function () {
        // Extend the original render method
        defaultType.view.prototype.render.apply(this, arguments);
        return this;
      },  
  },

});

//LONG-TP 2022-02-22 TEST TRAITS - ADD END 
  bm.add("carousel", {
    label: `
    <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 38h20V8H14v30zM4 34h8V12H4v22zm32-22v22h8V12h-8z"/><path d="M0 0h48v48H0z" fill="none"/>
    </svg>
    <div>${c.carouselBlkLabel}</div> `,
    category: c.carousel_category,
    draggable: "[data-gjs-type=wrapper]",

    content: [
      {
        name: "Carousel",
        tagName: "carousel",
        //LONG-TP 2022-02-22 TEST TRAITS - ADD START 
        'type': "carousel",
        //LONG-TP 2022-02-22 TEST TRAITS - ADD END 
        content: `
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" style="padding:0px">
          <div class="carousel-      <div class="carousel-inner">
            <div class="carousel-item active">
              <img data-js= "carousel" src="https://dummyimage.com/1360x540/55595c/fff" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://dummyimage.com/1360x540/55595c/fff" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slideindicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
     label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://dummyimage.com/1360x540/55595c/fff" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <div class="carousel-control-prev-icon" aria-hidden="true"></div>
            <div class="visually-hidden">Previous</div>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <div class="carousel-control-next-icon" aria-hidden="true"></div>
            <div class="visually-hidden">Next</div>
          </button>
      </div>
        `,
      },
    ],
  });
}
