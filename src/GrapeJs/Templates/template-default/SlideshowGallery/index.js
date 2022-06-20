import $ from "jquery";
import { 
  DELETE_BUTTON_ICON
 } from "../../../../asset/icon/svg";
import { setAttribute } from "../../../../helper/utils";
import Swal from 'sweetalert2';

export default function loadSlideshowGallery(editor, opt = {}) {
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;
  const am = editor.AssetManager;

  bm.add("SlideshowGallery", {
    label: "Slideshow Gallery",
    attributes: { class: "fa fa-picture-o" },
    category: "Media",
    content: {
      type: "slideshowGallery",
      components: [
        {
          type: "defaultCustom",
          tagName: "h2",
          content: `Slideshow Gallery`
        },
        {
          type: "defaultCustom",
          tagName: "div",
          attributes: { class: "container-fluid" },
          components: [
            {
              type: "defaultCustom",
              tagName: "div",
              attributes: { class: "mySlides" },
              components: [
                {
                  type: "defaultCustom",
                  tagName: "img",
                  attributes: { src: "https://dummyimage.com/600x400/55595c/fff" },
                },
              ]
            },
            {
              type: "defaultCustom",
              tagName: "a",
              attributes: { class: "prev" },
              content:`❮`
            },
            {
              type: "defaultCustom",
              tagName: "a",
              attributes: { class: "next" },
              content:`❯`
            },
            {
              type: "defaultCustom",
              tagName: "div",
              attributes: { class: "row" },
              components: [
                {
                  type: "defaultCustom",
                  tagName: "div",
                  attributes: { class: "column" },
                  components: [
                    {
                      type: "defaultCustom",
                      tagName: "img",
                      attributes: { class: "option-image cursor active",
                        src: "https://dummyimage.com/600x400/55595c/fff",
                       },
                    },
                  ]
                },
                {
                  type: "defaultCustom",
                  tagName: "div",
                  attributes: { class: "column" },
                  components: [
                    {
                      type: "defaultCustom",
                      tagName: "img",
                      attributes: { class: "option-image cursor",
                        src: "https://dummyimage.com/601x400/55595c/fff",
                       },
                    },
                  ]
                },
                {
                  type: "defaultCustom",
                  tagName: "div",
                  attributes: { class: "column" },
                  components: [
                    {
                      type: "defaultCustom",
                      tagName: "img",
                      attributes: { class: "option-image cursor",
                        src: "https://dummyimage.com/602x400/55595c/fff",
                       },
                    },
                  ]
                },
                {
                  type: "defaultCustom",
                  tagName: "div",
                  attributes: { class: "column" },
                  components: [
                    {
                      type: "defaultCustom",
                      tagName: "img",
                      attributes: { class: "option-image cursor",
                        src: "https://dummyimage.com/603x400/55595c/fff",
                       },
                    },
                  ]
                },
                {
                  type: "defaultCustom",
                  tagName: "div",
                  attributes: { class: "column" },
                  components: [
                    {
                      type: "defaultCustom",
                      tagName: "img",
                      attributes: { class: "option-image cursor",
                        src: "https://dummyimage.com/604x400/55595c/fff",
                       },
                    },
                  ]
                },
                {
                  type: "defaultCustom",
                  tagName: "div",
                  attributes: { class: "column" },
                  components: [
                    {
                      type: "defaultCustom",
                      tagName: "img",
                      attributes: { class: "option-image cursor",
                        src: "https://dummyimage.com/605x400/55595c/fff",
                       },
                    },
                  ]
                },
              ]
            },
          ]
        },
        {
          type: "default",
          tagName: "script",
          content: `
          $(document).find('[name="slideshowGallery"]').each(function() {
            const curSlide = $(this).find('.mySlides img');
            const optionImage = $(this).find('img.option-image');
            const prevBtn= $(this).find('a.prev');
            const nextBtn = $(this).find('a.next');
    
            optionImage.on("click", function() {
                optionImage.each(function() { $(this).removeClass('active'); })
                $(this).addClass('active');
                $(curSlide).attr('src', $(this).attr('src'))
            })
    
            prevBtn.on("click", () => {
                const active = $(this).find('img.option-image.active')
                const index = $(active).parent().closest('div').index() - 1;
                if (index > -1 && index < optionImage.length) { 
                    $(active).removeClass('active');
                    $(optionImage[index]).addClass('active');
    
                    $(curSlide).attr('src', $(optionImage[index]).attr('src'))
                }
            })
    
            nextBtn.on("click", () => {
                const active = $(this).find('img.option-image.active')
                const index = $(active).parent().closest('div').index() + 1;
                
                if (index > -1 && index < optionImage.length) { 
                    $(active).removeClass('active');
                    $(optionImage[index]).addClass('active');
    
                    $(curSlide).attr('src', $(optionImage[index]).attr('src'))
                }
            })
    
            nextBtn.on("click", function() {
    
            })
        });`
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

  editor.TraitManager.addType("slideshowGallery-gallery", {
    createInput({ trait }) {
      const el = document.createElement("div");
      el.innerHTML = `
                <div class="card">
                  <div class= "card-body image-gallery" >
                    
                  </div>         
                  <div style = "border-top: 1px solid #0000004d"class= "card-body" >
                  <button id="addImage"style="width: 100%;font-size: 100%;" class="btn btn-primary text-white">
                    Add Image
                  </button>
                  </div>         
                </div>
            `;

      el.querySelector("#addImage").onclick = () => {
        const traitGallery = $(el).find('.image-gallery');

        if (traitGallery.children().length >= 6) {
          Swal.fire({
            icon: 'info',
            title: 'Maximun Image',
            text: 'Your gallery has maximum image!',
          })
        } else {
          am.open({
            select(asset, complete) {
              // setAttribute(logoImage, { 'src': asset.getSrc() })
              const rowImageComponent = trait.target.get("components").models[1].get("components").models[3].get("components");
              
              let isDone = false;
              rowImageComponent.forEach((element, index) => {
                if (!isDone && element.getClasses()?.includes('d-none')){
                  isDone = true;
                  element.removeClass('d-none');
                  setAttribute(element.get("components").models[0], { 'src': asset.getSrc() });
                }
              });

              if (isDone) {
                const traitGallery = $(el).find('.image-gallery');
                traitGallery.append(`<div class='trait-gallery-image'>
                    <img src="${asset.getSrc()}"/>
                    <div class="btn-delete-image" style="cursor:pointer">${DELETE_BUTTON_ICON}</div>
                  </div>`)

                $(el).find('.btn-delete-image').last().on('click', function() {
                  const index = $(this).parent().closest('div').index();
                  const rowImage = trait.target.get("components").models[1].get("components").models[3]

                  $(el).find('.image-gallery').children().eq(index).remove();
                  for (let i = index; i < 6; i++)  {
                    const cur = rowImage.get("components").models[i];
                    if (i !== 5) {
                      const next = rowImage.get("components").models[i + 1];
          
                      const isHidden = next.getClasses()?.includes('d-none');
                      if (!isHidden) {
                        setAttribute(cur.get("components").models[0], {'src' : next.get("components").models[0].get('attributes').src}) 
                        continue;
                      }
                    }
                    
                    if (!cur.getClasses()?.includes('d-none')) {
                      cur.addClass('d-none');
                    }
                    return;
                  }
                });
              }
              // logoImage.removeClass('d-none')

              // if (!logoBrand.getClasses()?.includes('d-none')) {
              //   logoBrand.addClass('d-none')
              // }

              // if (!c.validURL(asset.getSrc())) {
              //   c.addTarget64Image({ id: asset.cid, target: logoImage });
              // }

              am.close();
            },
          });
        }
      };

      return el;
    },

    onEvent({ elInput, component, event }) {
      // const inputType = elInput.querySelector(".slideshowGallery-heading").value;
      // const header = component.get("components").models[0];

      // header.set({ content: inputType });
    },

    onUpdate({elInput, component}) {
      const componentGallery = $(component.get("components").models[1].view.el).find('div.column:not(.d-none) img.option-image');
      const traitGallery = $(elInput).find('.image-gallery');

      traitGallery.empty();
      componentGallery.map((index, element) => { 
        traitGallery.append(`<div class='trait-gallery-image'>
          <img src="${element.src}"/>
          <div class="btn-delete-image" style="cursor:pointer">${DELETE_BUTTON_ICON}</div>
        </div>`) 
      }) 

      $(elInput).find('.btn-delete-image').on('click', function() {
        const index = $(this).parent().closest('div').index();
        const rowImage = component.get("components").models[1].get("components").models[3]

        $(elInput).find('.image-gallery').children().eq(index).remove();
        for (let i = index; i < 6; i++)  {
          const cur = rowImage.get("components").models[i];
          if (i !== 5) {
            const next = rowImage.get("components").models[i + 1];

            const isHidden = next.getClasses()?.includes('d-none');
            if (!isHidden) {
              setAttribute(cur.get("components").models[0], {'src' : next.get("components").models[0].get('attributes').src}) 
              continue;
            }
          }
          
          if (!cur.getClasses()?.includes('d-none')) {
            cur.addClass('d-none');
          }
          return;
        }
      });
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
        attributes: { class: "container", name: "slideshowGallery", slideIndex: 1 },
        traits: [
          {
            type: "slideshowGallery-heading",
            label: "Heading",
            placeholder: "Slideshow Gallery",
          },
          {
            type: "slideshowGallery-gallery",
            label: "Image Gallery",
          },
        ],
      },

      init() {},
      initData() {},
    },
  });
}