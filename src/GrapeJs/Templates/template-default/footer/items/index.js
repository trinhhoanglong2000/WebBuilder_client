import $ from "jquery";
import Quill from "quill";
import { readCookie } from "../../../../../helper/cookie";

export default function loadBlockFooterItem(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;
  const am = editor.AssetManager;

  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;

  let controller;
  var GetRequest = async (url) => {
    controller = new AbortController();
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${readCookie('token')}`,
      },
      signal: controller.signal,
      redirect: "follow",
    });
    return response.json();
  };

  const getFooterNavigationButton = (mNavigation) => {
    let navbar = "";
    if (mNavigation) {
      mNavigation.forEach((element) => {
        navbar += `<li><a href="${element.link}">${element.name}</a></li>`;
      })

      return navbar;
    };
    return navbar;
  }

  bm.add('footerQuickLink', {
    label: "Quick Links",
    category: "Footer",
    attributes: { class: "fa fa-link" },
    // attributes
    content: {
      name: "QuickLink",
      draggable: ".footer-navigation",
      tagName: "div",
      copyable: false,
      attributes: { class: "col-md", name: "QuickLink" },
      type: "footer-quick-link",
      components: [
        {
          layerable: false,
          copyable: false,
          draggable: false,
          hoverable: false,
          selectable: false,
          droppable: false,
          tagName: "h5",
          content: "Quick links"
        }, {
          layerable: false,
          copyable: false,
          draggable: false,
          hoverable: false,
          selectable: false,
          droppable: false,
          attributes: { class: "quicklinks-menu" },
          tagName: "ul",
          content: getFooterNavigationButton(c.footerNavigation)
        }
      ],
    }
  });

  bm.add('footerText', {
    label: "Text",
    category: "Footer",
    attributes: { class: "fa fa-file-text" },
    // attributes
    content: {
      name: "Text",
      draggable: ".footer-navigation",
      droppable: false,
      copyable: false,
      tagName: "div",
      attributes: { class: "col-md" },
      type: "footer-text",
      components: [
        {
          layerable: false,
          copyable: false,
          draggable: false,
          hoverable: false,
          selectable: false,
          droppable: false,
          tagName: "h5",
          content: "Heading"
        }, {
          layerable: false,
          copyable: false,
          draggable: false,
          hoverable: false,
          selectable: false,
          droppable: false,
          tagName: "p",
          content: c.footerHeading
        }
      ],
    }
  });

  bm.add('footerImage', {
    label: "Image",
    attributes: { class: "fa fa-picture-o" },
    category: "Footer",
    content: {
      name: "Image",
      draggable: ".footer-navigation",
      droppable: false,
      copyable: false,
      tagName: "div",
      attributes: { class: "col-md text-center d-flex align-items-center justify-content-center" },
      type: "footer-image",
      components: [
        {
          tagName: 'img',
          layerable: false,
          copyable: false,
          hoverable: false,
          selectable: false,
          draggable: false,
          attributes: { class: "img-thumbnail", src: "https://dummyimage.com/600x400/55595c/fff" },
        }
      ]
    }
  });

  editor.TraitManager.addType("footer-heading", {
    createInput({ trait }) {
      const initValue = trait.target.view.el.querySelector("h5").innerHTML || "";
      const placeholder = trait.get('placeholder') || "";
      const el = document.createElement("div");
      el.innerHTML = `
              <div class="gjs-field gjs-field-text">
                  <input class="footer-heading" placeholder="${placeholder}" value="${initValue}" />
              </div>
          `;

      $(el)
        .find("input")
        .on("input", (ev) => this.onChange(ev));

      return el;
    },

    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector(".footer-heading").value;
      const header = component.get("components").models[0];

      header.set({ content: inputType });
    },
  });

  editor.TraitManager.addType("footer-content", {
    createInput({ trait }) {
      const initValue = trait.target.view.el.querySelector("p").innerHTML || "";
      const placeholder = trait.get('placeholder') || "";
      const el = document.createElement("div");

      el.innerHTML = `
          <div class="imageWithText-content" style="font-size:12px;">
              ${(initValue === "") ? placeholder : initValue}
          </div>
      `;

      const container = $(el).find(".imageWithText-content").get(0);

      let quill = new Quill(container, {
        modules: {
          toolbar: [
            "bold",
            "italic",
            "underline",
            "link",

            { script: "sub" },
            { script: "super" },
            { size: "small" },
          ],
        },
        theme: "snow",
      });
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "api") {
          console.log("An API call triggered this change.");
        } else if (source === "user") {
          this.onChange();
        }
      });

      return el;
    },
    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector(".footer-heading").value;
      const content = component.get("components").models[0];

      content.set({ content: inputType });
    },
  });

  editor.TraitManager.addType("footer-menu-collection", {
    createInput({ trait }) {
      const el = document.createElement("div");
      let initValue = trait.target.attributes.attributes['menu-collection'] || "";

      el.innerHTML = `
        <div class="Modal-popup dnone" style="">
          <div class ="d-flex border-bottom mb-3 p-3">
            <h5 class="flex-grow-1">
            Select menu
            </h5> 
            <button type="button" class="btn close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="input-group" >
            <div class="form-outline d-flex w-100 border rounded ml-1 mr-2 mt-1" >
                <input type="search" id="form1" class="form-control pr-0" style="border:none" placeholder="Search"/>
                <button type="button " class="btn">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div>
            <ul style="list-style: none;padding:0" > 
            </ul>
          </div>
        </div>
        <div class="card">
          <div class= "card-body" >
            <div class="Collection-content d-lg-flex mb-3">
            <div style="font-size: 24px;margin-right: 20px;">
              <i class="fa fa-tags" aria-hidden="true"></i>
            </div>
            <div class="name-collection" style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2; line-clamp: 2;-webkit-box-orient: vertical;">              
            </div>
            </div>
            <div class="type-collection" style="color:rgb(109, 113, 117)">
               Menu
            </div>
          </div>
          <div style = "border-top: 1px solid #0000004d"class= "card-body">
          <a style="width: 100%;font-size: 100%;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Change
          </a>
          <div style="width: 100%;font-size: 120%; margin-top:10px" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" href="#"><span style="font-size:16px"><i style ="width:20px"class="fa fa-pencil-square-o" aria-hidden="true"></i></span> Change 
          </a>
          <a class="dropdown-item" href="#"> <span style ="font-size:16px"><i style ="width:20px" class="fa fa-trash-o" aria-hidden="true"></i></span> Delete 
          </a>
          </div>
          </div>
        </div>
      `;
      el.style = "position:relative";
      $(el)
        .find(".Modal-popup .close-btn")
        .on("click", function () {
          $(el).find(".Modal-popup").toggle(200);
        });
      $(el)
        .find(".dropdown-item")
        .each((i) => {
          let func;
          if (i === 0) {
            func = function () {
              $(el).find(".Modal-popup").toggle(200);
            };
          } else {
            func = (ev) => {
              trait.target.setAttributes({ ...trait.target.getAttributes(), ['menu-collection'] : "" })
              $(".Modal-popup ul li").removeClass("active");
              $(el).find(".Modal-popup ul li").find(".check-item").fadeOut(0);
              $(el).find(".name-collection").text("")
              this.onChange(ev)
            };
          }

          $($(el)
            .find(".dropdown-item").get(i)).on("click", func);
        });
      const GetItem = (name = "", flag = false) => {
        GetRequest(
          `${process.env.REACT_APP_API_URL}stores/${opt.storeId}/menu?name=${name.trim()}`
        ).then((response) => {
          initValue = trait.target.attributes.attributes['menu-collection'] || "";
          let domdata = "";

          response.data.forEach((element) => {
            domdata += `<li data-value = "${element.id}" name="${element.name}" >
            <div style="width: 100%;display: flex;align-items: center;" class="btn border-bottom py-3">
              <div class="Picture" >
                <img style= "width: 32px;height: 32px;" src="${element.thumbnail
                ? element.thumbnai
                : "https://img.icons8.com/fluency-systems-regular/48/000000/image.png"
              }"/>
              </div>
              <div style ="text-align:left;flex-grow:1;font-size:12px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2; line-clamp: 2;-webkit-box-orient: vertical;">
              ${element.name}
              </div>
              <div class="check-item mr-2">
              <i class="far fa-check-circle"></i>
              </div>
            </div>  
            </li>`;
          });

          //  Item section
          if (!flag)
            $(el).find(".Modal-popup ul").append(domdata);
          else
            $(el).find(".Modal-popup ul").empty().append(domdata);

          $(el).find(".Modal-popup ul li").find(".check-item").fadeOut(0);
          //init
          $(el).find(`.Modal-popup ul li[data-value="${initValue}"]`).addClass('active')
          $(el).find(`.Modal-popup ul li[data-value="${initValue}"] .check-item`).fadeIn(0)

          let name = $(el).find(`.Modal-popup ul li[data-value="${initValue}"]`).attr('name')
          $(el).find(`.card .name-collection`).text(name)

          $(el)
            .find(".Modal-popup ul li")
            .hover(
              function () {
                if ($(this).hasClass("active")) return;
                $(this).find(".check-item").fadeIn(100);
              },
              function () {
                if ($(this).hasClass("active")) return;
                $(this).find(".check-item").fadeOut(100);
              }
            );
          $(el)
            .find(".Modal-popup ul li")
            .on("click", function (ev) {
              $(".Modal-popup ul li").removeClass("active");
              $(this).addClass("active");
              $(".Modal-popup ul li").find(".check-item").fadeOut(0);
              $(".Modal-popup ul li.active").find(".check-item").fadeIn(0);

              let name = $(this).attr('name')
              $(el).find(`.card .name-collection`).text(name)
            });

          // 
          $(el)
            .find(".Modal-popup ul li")
            .on("click", (ev) => {
              this.onChange(ev)
            });

        }).catch(function (e) {
        });;
      };
      GetItem();
      $(el)
        .find(".Modal-popup input")
        .on("input", function () {
          controller.abort();

          GetItem($(this)[0].value, true)
        });

      return el;
    },
    onEvent({ elInput, component, event }) {
      if (event.type === 'change') return
      const data = $(elInput).find('.Modal-popup ul li.active').data('value') || "";
      component.setAttributes({ ...component.getAttributes(), 'menu-collection': data });
    },
  })

  editor.TraitManager.addType("footer-menu-advance-setting", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const isOneRow = trait.target
        .getAttributes()
        .class.includes('one-row');

      el.innerHTML = `
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input footer-menu-one-row" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Display this menu  in one row
                    <label/>
                </div>
            `;

      $(el).find("input.footer-menu-one-row").prop("checked", isOneRow);

      return el;
    },

    onEvent({ elInput, component, event }) {
      const isOneRow = elInput.querySelector("input.footer-menu-one-row").checked;

      if (isOneRow) {
        component.setAttributes({
          ...component.getAttributes(),
          class: "one-row",
        });
      } else {
        component.setAttributes({
          ...component.getAttributes(),
          class: "col-md",
        });
      }
    },
  });

  editor.TraitManager.addType('footer-upload-image', {
    createInput({ trait }) {
      const initValue = trait.target.view.el.querySelector("img").src;
      const el = document.createElement('div');
      el.innerHTML = `
        <div class="card upload-image-area">
            <div class="card-body">
                <div class="target-img">
                    <img src=${initValue ?? trait.get('src')} class="card-img-top"/>
                </div>
                <button type="button" class="change-btn">Change</button>
                <button type="button" class="remove-btn">Remove</button>
            </div>
        </div>
        `;

      const changeBtn = el.querySelector('.upload-image-area .card-body button.change-btn');
      const removeBtn = el.querySelector('.upload-image-area .card-body button.remove-btn');
      const inputImage = el.querySelector('.upload-image-area .card-body img');
      const target = editor.getSelected().get("components").models[0];

      changeBtn.onclick = () => {
        am.open({
          select(asset, complete) {
            inputImage.src = asset.getSrc();
            target.setAttributes({ ...target.getAttributes(), 'src': asset.getSrc() })

            if (!c.validURL(asset.getSrc())) {
              c.addTarget64Image({ id: asset.cid, target: target })
            }

            am.close();
          },

        });
      };

      removeBtn.onclick = () => {
        target.setAttributes({ ...target.getAttributes(), 'src': trait.get('src') })
        inputImage.src = trait.get('src');
      };

      return el;
    },
  });

  dc.addType("footer-quick-link", {
    model: {
      defaults: {
        attributes: { oneRow: false },
        traits: [
          {
            type: "footer-menu-collection",
            label: "Menu"
          },
          {
            type: "footer-heading",
            label: "Quick link heading",
            placeholder: "Heading"
          },
          {
            type: "footer-menu-advance-setting",
            label: "Advance setting",
          }
        ],
      },
      init() {
      },
      initData() { },
    },
    view: defaultView.extend({
      init() {
        this.listenTo(this.model, "change:attributes:menu-collection", this.Update);
      },
      onRender() {
        this.Update();
      },
      async Update() {
        let menu_data = [
          {
            name: "Search",
            link: "a",
          },
          {
            name: "Terms of service",
            link: "a",
          },
          {
            name: "Refund policy",
            link: "a",
          },
        ];
        const id = this.model.attributes.attributes["menu-collection"];
        id && fetch(`${process.env.REACT_APP_API_URL}menu/${id}`)
          .then((response) => response.json())
          .then((response) => {
            if (response.data?.listMenuItem) {
              menu_data = response.data.listMenuItem;
            }

            let data = "";
            menu_data.forEach(element => data += `<li><a href="${element.link}">${element.name}</a></li>`);

            $(this.el).find(".quicklinks-menu").html(data);
          });
      },
    })
  });

  dc.addType("footer-text", {
    model: {
      defaults: {
        traits: [
          {
            type: "footer-heading",
            label: "Heading",
            placeholder: "Heading"
          },
          {
            type: "footer-content",
            label: "Content",
            placeholder: "Content",
          },
        ],
      },
      init() {
      },
      initData() { },
    },
  });


  dc.addType("footer-image", {
    model: {
      defaults: {
        traits: [
          {
            type: "footer-upload-image", // Type of the trait
            label: "Image",
            src: "https://dummyimage.com/230x150/55595c/fff",
          },
        ],
      },
      init() {
      },
      initData() { },
    },
  });
}