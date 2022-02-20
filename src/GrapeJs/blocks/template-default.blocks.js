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
        content: `
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" style="padding:0px">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://dummyimage.com/1360x540/55595c/fff" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://dummyimage.com/1360x540/55595c/fff" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
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

    // Example Data
    const mFooterNavigation1= [{
    name: "Search",
    link: "https://www.youtube.com/"
    }, {
    name: "Tern of service",
    link: "https://www.youtube.com/"
    }, {
    name: "Refund policy",
    link: "https://www.youtube.com/"
    }];

    // Example Data
    const mFooterNavigation2= [{
    name: "Share your store detail, promotion or brand contents",
    link: "https://www.youtube.com/"
    }];

    // generate navigation button
    const getFooterNavigationButton = (mNavigation) => {
    let navbar = "";
    if (mNavigation){
        mNavigation.forEach((element) => {
            navbar += `<li><a href="${element.link}">${element.name}</a></li>`;
            })

            return navbar;
        };
        return navbar;
    }

    bm.add('footer', {
    label: "Footer",
    category: "Footer",
    // attributes
    content: {
        name: "Section",
        content: <div></div>,
        attributes: { class: "footer-section" },
        components: [
        {
            layerable : false,
            draggable: false,
            tagName: "hr",
        },
        {
            name: "Footer Navigation",
            draggable: ".footer-section",
            tagName: "div",
            attributes: { class: "row footer-navigation" },
            content: <div></div>,
            components: [{
            name: "Left Navtion",
            draggable: ".footer-navigation",
            tagName: "div",
            attributes: { class: "col-12 col-md-6" },
            content: `
            <ul>
                <h5>Quick link</h5> 
                ${getFooterNavigationButton(mFooterNavigation1)}
            </ul>
            `
            },
            {
            name: "Right Navigation",
            draggable: ".footer-navigation",
            tagName: "div",
            attributes: { class: "col-12 col-md-6" },
            content: `
                <ul>
                <h5>Heading</h5> 
                ${getFooterNavigationButton(mFooterNavigation2)}
                </ul>
            `
            },
        ]
        },     
        {
            layerable : false,
            draggable: false,
            tagName: "hr",
        },     
        {
            name: "Social Navigation",
            tagName: "div",
            draggable: false,
            attributes: { class: "icon-social-area" },
            content: `
            <i class="fa fa-linkedin-square icon-footer" aria-hidden="true"></i>
            <i class="fa fa-envelope-o icon-footer" aria-hidden="true"></i>
            <i class="fa fa-facebook-square icon-footer" aria-hidden="true"></i>
            `
        },
        ],
    }
    });

    // Example Data
    const mHeaderNavigation= [{
        name: "Product",
        link: "#"
    }, {
        name: "Contact",
        link: "#"
    }];
    const storeName = "Store name";
    // generate navigation button
    const getHeaderNavigationButton = (mNavigation) => {
        let navbar = [];

        if (mNavigation){
            mNavigation.forEach((element) => {
            navbar.push({
                layerable : false,  
                draggable: false,
                tagName: "li",
                attributes: { class: "nav-item" },
                content: `<a href="${element.link}" class="nav-link p-1"> ${element.name}</a>`,
            });
            })

            return navbar;

        };

        return navbar;
    }
    
    bm.add('header', {
    label: "Header",
    category: "Header",
    // attributes
    content: {
        name: "Header",
        tagName: "nav",
        attributes: { class: "navbar navbar-expand-md" },
        components: [
        {
            layerable : false,  
            draggable: false,
            tagName: "div",
            attributes: { class: "container" },
            components: [
            {
                tagName: "button",
                attributes: { class:"navbar-toggler", type:"button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                content: `<i class="fa fa-bars"></i>`,
            },
            {
                tagName: "a",
                attributes: { href: "#", class: "navbar-brand text-uppercase font-weight-bold" },
                content: `<h4>${storeName}</h4>`,
            },
            {
                tagName: "div",
                attributes: { class:"d-block d-md-none" },
                components: [
                {
                    tagName: "i",
                    attributes: { class: "fa fa-search icon-header" },
                },
                {
                    tagName: "i",
                    attributes: { class: "fa fa-shopping-bag icon-header" },
                },
                ],
            },
            {
                tagName: "div",
                attributes: { id: "navbarSupportedContent", class: "collapse navbar-collapse" },
                components: [
                {
                    tagName: "ul",
                    attributes: { class: "navbar-nav ml-1" },
                    components: getHeaderNavigationButton(mHeaderNavigation)
                },
                ],
            },
            {
                tagName: "div",
                attributes: { class:"d-none d-md-block" },
                components: [
                {
                    tagName: "i",
                    attributes: { class: "fa fa-search icon-header" },
                },
                {
                    tagName: "i",
                    attributes: { class: "fa fa-shopping-bag icon-header" },
                },
                ],
            },
            ]
        },
        ],
    }
    });

    bm.add('header2', {
        label: "Header2",
        category: "Header",
        // attributes
        content: {
            name: "Header2",
            tagName: "div",
            components: [
            {
                layerable : false,  
                draggable: false,
                tagName: "nav",
                attributes: { class: "navbar" },
                components: [
                {
                    tagName: "div",
                    attributes: { class: "container" },
                    components: [
                    {
                        tagName: "button",
                        attributes: { class:"d-block d-md-none navbar-toggler", "data-bs-toggle": "offcanvas", "data-bs-target": "#offcanvas", "role": "button"},
                        content: `<i class="fa fa-bars"></i>`,
                    },
                    {
                        tagName: "a",
                        attributes: { href: "#", class: "navbar-brand text-uppercase font-weight-bold" },
                        content: `<h4>${storeName}</h4>`,
                    },
                    {
                        tagName: "div",
                        attributes: { class:"d-block d-md-none" },
                        components: [
                        {
                            tagName: "i",
                            attributes: { class: "fa fa-search icon-header" },
                        },
                        {
                            tagName: "i",
                            attributes: { class: "fa fa-shopping-bag icon-header" },
                        },
                        ],
                    },
                    {
                        tagName: "div",
                        attributes: { class: "d-none d-md-block", style: "flex-grow: 1; align-items: center;" },
                        components: [
                        {
                            tagName: "ul",
                            attributes: { class: "navbar-nav ml-1;", style: "flex-direction: row;" },
                            components: getHeaderNavigationButton(mHeaderNavigation)
                        },
                        ],
                    },
                    {
                        tagName: "div",
                        attributes: { class:"d-none d-md-block" },
                        components: [
                        {
                            tagName: "i",
                            attributes: { class: "fa fa-search icon-header" },
                        },
                        {
                            tagName: "i",
                            attributes: { class: "fa fa-shopping-bag icon-header" },
                        },
                        ],
                    },
                    ]
                },
                ]
            },
            {
                layerable : false,  
                draggable: false,
                name: "Left Side Navigation",
                tagName: "div",
                attributes: { class:"offcanvas offcanvas-start w-75", id:"offcanvas", "data-bs-keyboard": "false", "data-bs-backdrop": "false" },
                components: [
                {
                    layerable : false,  
                    draggable: false,
                    tagName: "div",
                    attributes: { class: "offcanvas-header" },
                    content: `        
                        <h6 class="offcanvas-title" id="offcanvas">Menu</h6>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    `
                },
                {
                    layerable : false,  
                    draggable: false,
                    tagName: "div",
                    attributes: { class: "offcanvas-body py-0" },
                    components: [
                        {
                            layerable : false,  
                            draggable: false,
                            tagName: "ul",
                            attributes: { class: "nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" },
                            components: getHeaderNavigationButton(mHeaderNavigation)
                        }
                    ]
                },
                ],
            },
            ]
        },
    });
}
