import $ from "jquery";
import { v4 as uuidv4 } from "uuid";
export default function loadBlockProducts(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  var GetRequest = async (url)=>{
    const response = await fetch(url, {
      method: 'GET', 

    
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
    });
    return response.json()
  }
  //#region productList
  const domc = editor.DomComponents;
  editor.TraitManager.addType("product-collection", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const el = document.createElement("div");
      el.innerHTML = `
        <div class="Modal-popup dnone" style="">

          <div class ="d-flex border-bottom mb-3 p-3">
            <h5 class="flex-grow-1">
            Select collection
            </h5> 
            <button type="button" class="btn close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="input-group" style="overflow-y: scroll;">
            <div class="form-outline d-flex w-100 border rounded  mx-1 mt-1" >
               
                <input type="search" id="form1" class="form-control pr-0" style="border:none" placeholder = "Search"/>
                <button type="button " class="btn">
                <i class="fas fa-search"></i>
              </button>
            </div>
           
          </div>

          <div>
            <ul   style="list-style: none;padding:0" > 
            
            </ul>
          </div>
        </div>


        <div class="card">
          <div class= "card-body" >
            <div class="Collection-content d-lg-flex mb-3">
            <div style="font-size: 24px;margin-right: 20px;">
              <i class="fa fa-tags" aria-hidden="true"></i>
            </div>
            <div style = "overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2; /* number of lines to show */ line-clamp: 2;-webkit-box-orient: vertical;
          " >
              SUMMER COLLECTION
            </div>
            </div>
            <div class="type-collection" style="color:rgb(109, 113, 117)">
              Collection
            </div>
          </div>         
          <div style = "border-top: 1px solid #0000004d"class= "card-body" >
          <a  style="width: 100%;font-size: 100%;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Change
          </a>
          <div  style="width: 100%;font-size: 120%; margin-top:10px" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" href="#"><span style ="font-size:16px"><i style ="width:20px"class="fa fa-pencil-square-o" aria-hidden="true"></i></span> Change 
          </a>
          <a class="dropdown-item" href="#"> <span style ="font-size:16px"><i style ="width:20px" class="fa fa-trash-o" aria-hidden="true"></i></span>  Delete 
          </a>
          </div>

          </div>         
        </div>


      `;
      el.style = "position:relative";
      $(el).find(".Modal-popup .close-btn").on('click',function(){
        $(el).find(".Modal-popup").toggle(200);

      })
      $(el)
        .find(".dropdown-item")
        .each(function (i) {
          let func;
          if (i == 0) {
            func = function () {
              $(el).find(".Modal-popup").toggle(200);
            };
          } else {
            func = function () {
              console.log("HOHO");
            };
          }
          $(this).on("click", func);
        });

        GetRequest(`${process.env.REACT_APP_API_URL}stores/621b5a807ea079a0f7351fb8/collections/product?name=`).then(data => {
          data.data.forEach(element => {
            $(el).find('.Modal-popup ul').append(`<li>
            <div style="width: 100%;display: flex;align-items: center;" class="btn border-bottom py-3">
            
              <div class="Picture" >
                <img style= "width: 32px;height: 32px;" src="${element.thumbnail ? element.thumbnai: 'https://img.icons8.com/fluency-systems-regular/48/000000/image.png'}"/>


              </div>
              <div style ="font-size:12px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2; /* number of lines to show */ line-clamp: 2;-webkit-box-orient: vertical;
              " >
              ${element.name}

              </div>
            </div>  
            
            </li>`)
          });
          
          
        });
        // $(el)
        // .find("input")
        // .on("input", (ev) => this.onChange(ev));
      return el;
    },
    onEvent({ elInput, component, event }) {
      console.log("ONEVENT")
      //#1 when option change we will get new option => change HTML following option
    },
  });
  editor.TraitManager.addType("product-heading", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const initValue = trait.target.get("content") || "";
      const placeholder = trait.get("placeholder") || "";
      const el = document.createElement("div");
      el.innerHTML = `

        <div class="gjs-field gjs-field-text">
          <input class="Product-Heading"placeholder="${placeholder} " value="${initValue}" />
         
        </div>
      `;

      $(el)
        .find("input")
        .on("input", (ev) => this.onChange(ev));

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector(".Product-Heading");

      let data = inputType.value;
      //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
      if (component.get("content") !== data) {
        component.set({ content: data });
      }
    },
  });
  editor.TraitManager.addType("product-heading-align", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      //.Radio-Group CSS in CAnvas CSS

      const initValue = trait.target.getStyle()["text-align"] || "center";
      const el = document.createElement("div");
      el.innerHTML = `

        <div class="Radio-Group gjs-one-bg">
            <input id="left" type="radio" name="alignment" value="left" style="display:none" />

            <label for="left"class="label-radio" style="border-right: none;border-top-left-radius: 5px;border-bottom-left-radius: 5px;" >
                <i class="fa fa-align-left" aria-hidden="true"></i>
            </label>

            <input id="center" type="radio" name="alignment" value="center" style="display:none" />
            <label for="center"class="label-radio">
                <i class="fa fa-align-center" aria-hidden="true"></i>
            </label>

            <input id="right" type="radio" name="alignment" value="right" style="display:none" />
            <label for="right"class="label-radio" style="border-left: none;border-top-right-radius: 5px;border-bottom-right-radius: 5px;" >
                <i class="fa fa-align-right" aria-hidden="true"></i>

            </label>
        </div>
      `;
      $(el).find(`#${initValue}`).prop("checked", true);

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector(
        'input[name="alignment"]:checked'
      );

      let data = inputType.value;
      // editor.Selectors.setState('after');
      // console.log(editor.Selectors.getState())
      component.setStyle({ ...component.getStyle(), "text-align": data });
    },
  });
  editor.TraitManager.addType("product-heading-border", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      // const initValue = trait.target.getStyle()["text-align"] || "center";
      const el = document.createElement("div");
      el.innerHTML = `
      <div class="gjs-one-bg">
        <label class="checkbox-product gjs-label-wrp" for="border" >
          <input class ="checkbox-input" type="checkbox" id="border" name="border" value="Bike">
          <div class="checkbox_box"></div>
          I have a bike
        <label/>
      </div>
      `;

      // $(el).find(`#${initValue}`).prop('checked', true);

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
    },
  });
  domc.addType("product-text", {
    model: {
      defaults: {
        traits: [
          {
            type: "product-heading", // Type of the trait
            label: "Heading", // The label you will see in Settings
            placeholder: "Header",
          },
          {
            type: "product-heading-align",
            label: "Alignment",
          },
          {
            type: "product-heading-border",
            label: false,
          },
        ],
      },
    },
  });
  domc.addType("product-list", {
    model: {
      defaults: {
        traits: [
          {
            type: "product-collection",
            label: "Collection", // The label you will see in Settings
          },
        ],
      },
      init() {
        this.on("change:attributes:data", this.handleTypeChangeData);
      },
      initData() {
        this.attributes.components.models.forEach(function (item) {
          //check product//
          if (item.attributes.name === "Products") {
            item.set({
              content: item.attributes.content.replace(
                /myCarousel/g,
                `A${uuidv4()}`
              ),
            });
          }
        });

        const products = [
          {
            name: "LONGEM",
            price: "$100.00",
            img: "HEHE",
          },
          {
            name: "LONG ANH",
            price: "$200.00",
            img: "HEHE",
          },
          {
            name: "TEST3",
            price: "$300.00",
            img: "HEHE",
          },
          {
            name: "TEST4",
            price: "$400.00",
            img: "HEHE",
          },
        ];
        $(this.view.el)
          .find(".thumb-wrapper")
          .each(function (index) {
            $(this)
              .find("h4")
              .text(products[index % products.length].name);
            $(this)
              .find(".item-price strike")
              .text(products[index % products.length].price);
            $(this)
              .find(".item-price span")
              .text(products[index % products.length].price);
          });
      },
      handleTypeChangeData() {
        console.log("CHANGED");
      },
      // This function run when component created - we setup listen to change atri
    },
  });
  bm.add("productList", {
    label: `
      <div>${c.label_product_list}</div> `,
    category: c.catergory_product_list,
    attributes: { class: "fa fa-cube" },
    content: {
      attributes: {
        class: "container product-section",
        name: "products-collections",
      },
      name: "ProductList",
      draggable: ".main-content",
      type: "product-list",
      components: [
        {
          name: "Text",
          draggable: ".product-section",
          tagName: "h2",
          content: `Trending Products`,
          editable: true,
          droppable: false,
          style: { "text-align": "center" },
          type: "product-text",
        },
        {
          removable: false,
          name: "Products",
          draggable: false,
          droppable: false,
          highlightable: false,
          copyable: false,
          selectable: false,
          hoverable: false,
          content: `                <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" data-type = "products-collections" >
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
}
