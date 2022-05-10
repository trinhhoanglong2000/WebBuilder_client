import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import loadTraitCarousel from "./traint"

const dataTemp = [
  {
    image: "https://dummyimage.com/1980x1080/55595c/ffffff",
    caption: "Image banner",
    description: "Give customers details about the banner image(s) or content on the template.",
    link: "/",
  },
  {
    image: "https://dummyimage.com/1980x1080/55595c/ffffff",
    caption: "Image banner",
    description: "Give customers details about the banner image(s) or content on the template.",
    link: "/",
  },
  {
    image: "https://dummyimage.com/1980x1080/55595c/ffffff",
    caption: "Image banner",
    description: "Give customers details about the banner image(s) or content on the template.",
    link: "/",
  }
]

export default function loadBlockCarousel(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  loadTraitCarousel(editor, c);
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  domc.addType("carousel", {
    model: {
      defaults: {
        droppable: false,
        traits: [
          {
            type: "carousel-collection",
            name: "data",
            label: "Banner Collection",
          },
          {
            type: "banner-text-color",
            label: "Contents Style"
          },
          {
            type: "banner-text-display",
            label: "Contents Display"
          },

        ],
        attributes: {
          "ez-mall-type": "carousel",
          textColor: 'white',
          displayType: "middle"
        }
      },

      init() {
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
    },
    view: {
      async insertCarouselData(data, carouselIndicators, carouselInner) {
        carouselIndicators.innerHTML = "";
        carouselInner.innerHTML = "";
        data.forEach((item, index) => {
          let htmlButtonInsert = `
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${index}" class = "${index == 0 ? "active" : ""}" aria-label="Slide ${index}"></button>
        `
          carouselIndicators.insertAdjacentHTML("beforeend", htmlButtonInsert);
          let htmlCarouselItemInsert = `
        <div class="carousel-item ${index == 0 ? "active" : ""}">
          <img src="${item.image}" class="d-block w-100" alt="${item.image}">
          <div class="carousel-caption d-none d-md-block">
            <div class = "ezMall-carousel-contents">
              <h2 class="bolder">${item.caption}</h2>
              <p>${item.description}</p>
              <a class="btn ezMall-btn bolder" href=${item.link} role="button">Shop Now</a>
            </div>
          </div>
        </div>
      `
          carouselInner.insertAdjacentHTML("beforeend", htmlCarouselItemInsert)
        })
      },
      async Update() {
        let carouselIndicators = $(this.el).find(`.carousel-indicators`)[0]
        let carouselInner = $(this.el).find(`.carousel-inner`)[0];
        let categoryId = this.model.attributes.attributes.data;
        
        if (typeof categoryId == "undefined") {
          await this.insertCarouselData(dataTemp, carouselIndicators, carouselInner)
        } else {
          await fetch(`http://localhost:5000/collections/category/${categoryId}`
            , {
              mode: 'cors',
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }).then(res => res.json()).then(myJson => myJson.data).then(
              data => {
                if (data.length == 0) {
                  data = [...dataTemp]
                } 
                this.insertCarouselData(data, carouselIndicators, carouselInner)
              }
            );
        }

      },
      init() {
        this.listenTo(this.model, 'change:attributes:data', this.Update)
        this.listenTo(this.model, 'change:attributes:placeholder', this.Update)
      },
      events: {
      },
      render: function () {
        defaultType.view.prototype.render.apply(this, arguments);
        return this;
      },
      onRender({ el }) {
        this.Update()
      },
    },
  });
  //THIS IS SETTING BLOCK
  bm.add("Carousel", {
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
        name: "Carousel",
        attributes: { name: "banners", class: "carousel-text-white carousel-display-middle" },
        draggable: ".main-content",
        type: "carousel",
        content: `
        <div id="myCarousel" class=" carousel slide ezMall-carousel" data-bs-ride="carousel" data-type="banners">
        <div class="carousel-indicators">
      
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"
            aria-label="Slide 0"></button>
      
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" class="" aria-label="Slide 1"></button>
      
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" class="" aria-label="Slide 2"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://dummyimage.com/1980x1080/55595c/ffffff" class="d-block w-100"
              alt="https://dummyimage.com/1980x1080/55595c/ffffff">
            <div class="carousel-caption d-none d-md-block">
              <div class="ezMall-carousel-contents">
                <h2 class="bolder">Image banner</h2>
                <p>Give customers details about the banner image(s) or content on the template.</p>
                <a class="btn ezMall-btn bolder" href="/" role="button">Shop Now</a>
              </div>
            </div>
          </div>
      
          <div class="carousel-item ">
            <img src="https://dummyimage.com/1980x1080/55595c/ffffff" class="d-block w-100"
              alt="https://dummyimage.com/1980x1080/55595c/ffffff">
            <div class="carousel-caption d-none d-md-block">
              <div class="ezMall-carousel-contents">
                <h2 class="bolder">Image banner</h2>
                <p>Give customers details about the banner image(s) or content on the template.</p>
                <a class="btn ezMall-btn bolder" href="/" role="button">Shop Now</a>
              </div>
            </div>
          </div>
      
          <div class="carousel-item ">
            <img src="https://dummyimage.com/1980x1080/55595c/ffffff" class="d-block w-100"
              alt="https://dummyimage.com/1980x1080/55595c/ffffff">
            <div class="carousel-caption d-none d-md-block">
              <div class="ezMall-carousel-contents">
                <h2 class="bolder">Image banner</h2>
                <p>Give customers details about the banner image(s) or content on the template.</p>
                <a class="btn ezMall-btn bolder" href="/" role="button">Shop Now</a>
              </div>
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
