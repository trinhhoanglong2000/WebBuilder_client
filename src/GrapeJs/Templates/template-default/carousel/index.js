import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import loadTraitCarousel from "./traint"

const defaultData = [
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
function insertCarouselData(data, carouselIndicators, carouselInner, carousel) {
  carouselIndicators.innerHTML = "";
  carouselInner.innerHTML = "";
  data.forEach((item, index) => {
    let htmlButtonInsert = `
  <button type="button" data-bs-target="${$(carousel).attr("id")}" data-bs-slide-to="${index}" class = "${index == 0 ? "active" : ""}" aria-label="Slide ${index}" ${index == 0 ? `aria-current="true"` : ""} ></button>
  `
    carouselIndicators.insertAdjacentHTML("beforeend", htmlButtonInsert);
    let htmlCarouselItemInsert = `
  <div class="carousel-item ${index == 0 ? "active" : ""}">
    <div  class="d-block w-100 image-container">
      <img src="${item.image}"  alt="${item.image}">
    </div>
    <div class="carousel-caption">
      <div class = "ezMall-carousel-contents">
        <div class="ezMall-carousel-text-container d-block">
          <h2 class="bolder">${item.caption}</h2>
          <p>${item.description}</p>
          <a class="btn ezMall-btn bolder" href=${item.link} role="button">Shop Now</a>
        </div>
      </div>
    </div>
  </div>
`
    carouselInner.insertAdjacentHTML("beforeend", htmlCarouselItemInsert);

  })
}
export default function loadBlockCarousel(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  loadTraitCarousel(editor, c);
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  domc.addType("carousel", {
    model: {
      defaults: {
        name: "Carousel",
        droppable: false,
        draggable: ".main-content",
        copyable: false,
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
          {
            type: "banner-description-align",
            label: "Align Description"
          },
          {
            type: "banner-height",
            label: "Banner Height"
          },
          {
            type: "banner-description-background",
            label: "Description background"
          },

        ],
        attributes: {
          "ez-mall-type": "carousel",
          textColor: 'white',
          displayType: "bottom-center",
          descriptionAlign: "center",
          bannerHeight: "medium",
          descriptionBackground: "true",
          name: "banners",
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

      async Update() {
        let carousel = $(this.el).find(`.carousel`)[0];
        let carouselIndicators = $(this.el).find(`.carousel-indicators`)[0]
        let carouselInner = $(this.el).find(`.carousel-inner`)[0];
        let categoryId = this.model.attributes.attributes.data;

        if (typeof categoryId == "undefined") {
          insertCarouselData(defaultData, carouselIndicators, carouselInner, carousel)
        } else {
          await fetch(`${process.env.REACT_APP_API_URL}collections/banner/${categoryId}`
            , {
              mode: 'cors',
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }).then(res => res.json()).then(myJson => myJson.data).then(
              data => {
                let listBanners = [...defaultData]
                try {
                  listBanners = data.banners;
                  if (listBanners.length == 0) {
                    listBanners = [...defaultData]
                  }
                } catch (e) {
                  listBanners = [...defaultData]
                }
                insertCarouselData(listBanners, carouselIndicators, carouselInner, carousel)
              }
            ).catch(error => {
              console.log(error)
              insertCarouselData(defaultData, carouselIndicators, carouselInner, carousel)
            });
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
      onRender() {
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
        type: "carousel",
        attributes: {class: "carousel-text-white carousel-display-bottom-center carousel-description-align-center carousel-height-medium carousel-description-background"},
        content: `
        <div id="myCarousel" class=" carousel slide ezMall-carousel" data-bs-ride="carousel" data-type="banners">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-label="Slide 0"
            aria-current="true"></button>
      
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" class="" aria-label="Slide 1"></button>
      
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" class="" aria-label="Slide 2"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="d-block w-100 image-container">
              <img src="https://dummyimage.com/1980x1080/55595c/ffffff" alt="https://dummyimage.com/1980x1080/55595c/ffffff">
            </div>
            <div class="carousel-caption">
              <div class="ezMall-carousel-contents">
                <div class="ezMall-carousel-text-container d-block">
                  <h2 class="bolder">Image banner</h2>
                  <p>Give customers details about the banner image(s) or content on the template.</p>
                  <a class="btn ezMall-btn bolder" href="/" role="button">Shop Now</a>
                </div>
              </div>
            </div>
          </div>
      
          <div class="carousel-item">
            <div class="d-block w-100 image-container">
              <img src="https://dummyimage.com/1980x1080/55595c/ffffff" alt="https://dummyimage.com/1980x1080/55595c/ffffff">
            </div>
            <div class="carousel-caption">
              <div class="ezMall-carousel-contents">
                <div class="ezMall-carousel-text-container d-block">
                  <h2 class="bolder">Image banner</h2>
                  <p>Give customers details about the banner image(s) or content on the template.</p>
                  <a class="btn ezMall-btn bolder" href="/" role="button">Shop Now</a>
                </div>
              </div>
            </div>
          </div>
      
          <div class="carousel-item">
            <div class="d-block w-100 image-container">
              <img src="https://dummyimage.com/1980x1080/55595c/ffffff" alt="https://dummyimage.com/1980x1080/55595c/ffffff">
            </div>
            <div class="carousel-caption">
              <div class="ezMall-carousel-contents">
                <div class="ezMall-carousel-text-container d-block">
                  <h2 class="bolder">Image banner</h2>
                  <p>Give customers details about the banner image(s) or content on the template.</p>
                  <a class="btn ezMall-btn bolder" href="/" role="button">Shop Now</a>
                </div>
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
