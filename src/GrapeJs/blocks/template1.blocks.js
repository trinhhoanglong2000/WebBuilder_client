export default function loadBlocks(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  //========| |============//  
  bm.add("productList", {
    label: c.label_product_list,
    category: c.catergory_product_list,

    attributes: { class: "fa fa-paragraph" },

    content: {
      attributes: { class: "container product-section" },
      name: "Section",
      content: <div class="container"></div>,
      components: [
        {
          name: "Text",
          draggable: ".product-section",
          tagName:'h2',
          content: `Trending Products`,
          editable : true,
          droppable :false,
          type:'text',
        },
        {
          removable:false, 
          name: "Products",
          content: `<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
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
                                  <div class="thumb-content">
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
              <a class="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
                  <i class="fa fa-angle-left"></i>
              </a>
              <a class="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
                  <i class="fa fa-angle-right"></i>
              </a>
          </div> `,
        },
      ],
    },
  });
}
