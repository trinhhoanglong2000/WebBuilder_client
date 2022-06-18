import $ from "jquery";

export default function loadSlideshowGallery(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;
  const am = editor.AssetManager;
  
  bm.add("SlideshowGallery", {
    label: "Slideshow Gallery",
    attributes: { class: "fa fa-picture-o" },
    category: "Media",
    content: {
      type: "slideshowGallery",
      attributes: { class: "container", name: "slideshowGallery" },
      components: [
        {
          type: "defaultCustom",
          tagName: "h2",
          content: `Slideshow Gallery`
        },
        {
          type: "defaultCustom",
          tagName: "h2",
          attributes: { class: "container-fluid" },
          content: `<div class="mySlides">
                    <div class="numbertext">1 / 6</div>
                    <img src="https://dummyimage.com/600x400/55595c/fff">
                  </div>
                  <div class="mySlides">
                    <div class="numbertext">1 / 6</div>
                    <img src="https://dummyimage.com/500x300/55595c/fff">
                  </div>
                  <div class="mySlides">
                    <div class="numbertext">1 / 6</div>
                    <img src="https://dummyimage.com/400x200/55595c/fff">
                  </div>
                  <a class="prev" onclick="plusSlides(-1)">❮</a>
                  <a class="next" onclick="plusSlides(1)">❯</a>
                  <div class="caption-container">
                    <p id="caption"></p>
                  </div>
                  <div class="row">
                    <div class="column">
                      <img class="option-image cursor" src="https://dummyimage.com/600x400/55595c/fff" style="width:100%" onclick="currentSlide(1)" alt="The Woods">
                    </div>
                    <div class="column">
                      <img class="option-image cursor" src="https://dummyimage.com/500x300/55595c/fff" style="width:100%" onclick="currentSlide(2)" alt="Cinque Terre">
                    </div>
                    <div class="column">
                    <img class="option-image cursor" src="https://dummyimage.com/400x200/55595c/fff" style="width:100%" onclick="currentSlide(3)" alt="Mountains and fjords">
                  </div>
                  </div>
                  `
        }
      ],
    },
  });

  editor.TraitManager.addType("slideshowGallery-heading", {
    createInput({ trait }) {
      const placeholder = trait.get("placeholder") || "";
      const el = document.createElement("div");
      el.innerHTML = `
                <div class="gjs-field gjs-field-text">
                    <input class="slideshowGallery-heading" placeholder="${placeholder}"/>
                </div>
            `;

      $(el).find("input").on("input", (ev) => this.onChange(ev));

      return el;
    },

    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector(".slideshowGallery-heading").value;
      const header = component.get("components").models[0];

      header.set({ content: inputType });
    },

    onUpdate({elInput, component}) {
      const initValue = component.view.el.querySelector("h2").innerHTML || "";

      $(elInput).find('input.slideshowGallery-heading').val(initValue);
    }
  });

  dc.addType("slideshowGallery", {
    model: {
      defaults: {
        name: "Slideshow Gallery",
        draggable: ".main-content",
        droppable: false,
        copyable: false,
        highlightable: false,
        traits: [
          {
            type: "slideshowGallery-heading",
            label: "Heading",
            placeholder: "Slideshow Gallery",
          },
        ],
      },

      init() {},
      initData() {},
    },
  });
}