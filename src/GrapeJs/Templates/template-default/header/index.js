import $ from "jquery";

export default function loadBlockHeader(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  const am = editor.AssetManager;
  const dc = editor.DomComponents;

  const isHaveLogo = c.logoURL ? true : false;
  const getHeaderNavigationButton = () => {
    let navbar = [];

    if (c.headerNavigation) {
      c.headerNavigation.forEach((element) => {
        if (element.id !== c.pageId) {
          navbar.push({
            layerable: false,
            copyable: false,
            draggable: false,
            hoverable: false,
            selectable: false,
            droppable: false,
            tagName: "li",
            attributes: { class: "nav-item" },
            content: `<a href="#" class="nav-link p-1"> ${element.name}</a>`,
          });
        }
      });

      return navbar;
    }

    return navbar;
  };

  bm.add("header", {
    label: "Header",
    category: "Header",
    attributes: { class: "fa fa-header" },
    content: {
      droppable: false,
      copyable: false,
      removable:false,
      name: "Header",
      tagName: "nav",
      type: "navbar",
      attributes: {
        class: "navbar navbar-expand-md border-bottom border-dark",
        name: "header",
        "store-id": c.storeId,
      },
      components: [
        {
          layerable: false,
          copyable: false,
          draggable: false,
          copyable: false,
          hoverable: false,
          selectable: false,
          droppable: false,
          tagName: "div",
          attributes: { class: "container-fluid align-items-center" },
          components: [
            {
              layerable: false,
              copyable: false,
              draggable: false,
              highlightable: false,
              hoverable: false,
              droppable: false,
              tagName: "button",
              attributes: {
                class: "navbar-toggler order-0",
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": "#navbarSupportedContent",
                "aria-controls": "navbarSupportedContent",
                "aria-expanded": "false",
                "aria-label": "Toggle navigation",
              },
              content: `<i class="fa fa-bars"></i>`,
            },
            {
              layerable: false,
              copyable: false,
              draggable: false,
              droppable: false,
              hoverable: false,
              tagName: "a",
              attributes: {
                href: "#",
                class: "navbar-brand text-uppercase font-weight-bold order-1",
              },
              selectable: false,
              components: [
                {
                  tagName: "img",
                  layerable: false,
                  copyable: false,
                  hoverable: false,
                  selectable: false,
                  draggable: false,
                  attributes: {
                    class: `img-thumbnail ${isHaveLogo ? "" : "d-none"}`,
                    src:
                      c.logoURL ?? "https://dummyimage.com/600x400/55595c/fff",
                  },
                },
                {
                  tagName: "h4",
                  layerable: false,
                  copyable: false,
                  hoverable: false,
                  selectable: false,
                  draggable: false,
                  attributes: { class: `${isHaveLogo ? "d-none" : ""}` },
                  content: c.storeName,
                },
              ],
            },
            {
              layerable: false,
              copyable: false,
              draggable: false,
              droppable: false,
              highlightable: false,
              hoverable: false,
              selectable: false,
              tagName: "div",
              attributes: {
                id: "navbarSupportedContent",
                class: "collapse navbar-collapse order-3 order-sm-2",
              },
              components: [
                {
                  layerable: false,
                  copyable: false,
                  draggable: false,
                  hoverable: false,
                  droppable: false,
                  highlightable: false,
                  selectable: false,
                  tagName: "ul",
                  attributes: { class: "navbar-nav" },
                  components: getHeaderNavigationButton(),
                },
              ],
            },
            {
              layerable: false,
              copyable: false,
              draggable: false,
              hoverable: false,
              droppable: false,
              highlightable: false,
              selectable: false,
              tagName: "div",
              attributes: { class: "order-2" },
              components: [
                {
                  layerable: false,
                  copyable: false,
                  draggable: false,
                  hoverable: false,
                  selectable: false,
                  droppable: false,
                  tagName: "i",
                  attributes: { class: "fa fa-shopping-bag icon-header" },
                  content: `<span class="position-absolute translate-middle badge rounded-pill bg-danger">
                                        <span id="numberSelectedProduct">2</span>
                                    </span>`,
                },
                {
                  layerable: false,
                  copyable: false,
                  draggable: false,
                  hoverable: false,
                  droppable: false,
                  selectable: false,
                  tagName: "i",
                  attributes: { class: "fa fa-search icon-header" },
                },
              ],
            },
          ],
        },
      ],
    },
  });

  editor.TraitManager.addType("header-upload-image", {
    createInput({ trait }) {
      const el = document.createElement("div");
      el.innerHTML = `
            <div class="card upload-image-area">
                <div class="card-body">
                    <div class="target-img">
                        <img src=${
                          c.logoURL ?? trait.get("srcDefault")
                        } class="card-img-top"/>
                    </div>
                    <button type="button" class="change-btn">Change</button>
                    <button type="button" class="remove-btn">Remove</button>
                </div>
            </div>
            `;

      const changeBtn = el.querySelector(
        ".upload-image-area .card-body button.change-btn"
      );
      const removeBtn = el.querySelector(
        ".upload-image-area .card-body button.remove-btn"
      );
      const inputImage = el.querySelector(".upload-image-area .card-body img");
      const logoImage = editor
        .getSelected()
        .get("components")
        .models[0].get("components")
        .models[1].get("components").models[0];
      const logoBrand = editor
        .getSelected()
        .get("components")
        .models[0].get("components")
        .models[1].get("components").models[1];

      changeBtn.onclick = () => {
        am.open({
          select(asset, complete) {
            inputImage.src = asset.getSrc();
            logoImage.setAttributes({
              ...logoImage.getAttributes(),
              src: asset.getSrc(),
              class: "img-thumbnail",
            });
            logoBrand.setAttributes({
              ...logoBrand.getAttributes(),
              class: "d-none",
            });

            if (!c.validURL(asset.getSrc())) {
              c.addTarget64Image({ id: asset.cid, target: logoImage });
            }

            am.close();
          },
        });
      };

      removeBtn.onclick = () => {
        logoImage.setAttributes({
          ...logoImage.getAttributes(),
          src: "data:,",
          class: "img-thumbnail d-none",
        });
        logoBrand.setAttributes({ ...logoBrand.getAttributes(), class: " " });

        inputImage.src = trait.get("srcDefault");
      };

      return el;
    },
  });

  editor.TraitManager.addType("header-advance-setting", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const isFullWidth = trait.target
        .getAttributes()
        .class.includes("sticky-top");

      el.innerHTML = `
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input header-sticky-top" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Enable sticky header
                    <label/>
                </div>
            `;

      $(el).find("input.header-sticky-top").prop("checked", isFullWidth);

      return el;
    },

    onEvent({ elInput, component, event }) {
      const isSticky = elInput.querySelector("input.header-sticky-top").checked;

      if (isSticky) {
        component.setAttributes({
          ...component.getAttributes(),
          class: "navbar navbar-expand-md border-bottom border-dark sticky-top",
        });
      } else {
        component.setAttributes({
          ...component.getAttributes(),
          class: "navbar navbar-expand-md border-bottom border-dark",
        });
      }
    },
  });

  dc.addType("navbar", {
    model: {
      defaults: {
        attributes: { theme: "white", logoSize: "medium" },
        traits: [
          {
            type: "select",
            label: "Theme color",
            name: "theme",
            options: [
              { id: "white", name: "White" },
              { id: "black", name: "Black" },
              { id: "lGreen", name: "Light Green" },
              { id: "lBlue", name: "Light Blue" },
              { id: "sand", name: "Sand" },
            ],
          },
          {
            type: "header-upload-image",
            changeProp: 1,
            label: "Logo image",
            name: "logoImage",
            srcDefault: "https://dummyimage.com/600x400/55595c/fff",
          },
          {
            type: "select",
            label: "Logo size",
            name: "logoSize",
            options: [
              { id: "small", name: "Small" },
              { id: "medium", name: "Medium" },
              { id: "large", name: "Large" },
            ],
          },
          {
            type: "header-advance-setting",
            label: "Advance setting",
            isSticky: false,
          },
        ],
      },

      init() {},
      initData() {},
    },
  });
}

// bm.add('header2', {
//     label: "Header2",
//     category: "Header",
//     attributes: { class: "fa fa-header" },
//     content: {
//         tagName: "div",
//         hoverable: false,
//         components: [
//         {
//             tagName: "nav",
//             attributes: { class: "navbar border-bottom border-dark" },
//             type: "header",
//             components: [
//             {
//                 layerable : false,
//                 draggable: false,
//                 hoverable: false,
//                 tagName: "div",
//                 attributes: { class: "container align-items-baseline" },
//                 components: [
//                 {
//                     layerable : false,
//                     draggable: false,
//                     hoverable: false,
//                     tagName: "button",
//                     attributes: { class:"d-block d-md-none navbar-toggler", id: "togglerBtn", "data-bs-toggle": "offcanvas", "data-bs-target": "#offcanvas", "role": "button"},
//                     content: `<i class="fa fa-bars"></i>`,
//                 },
//                 {
//                     layerable : false,
//                     draggable: false,
//                     hoverable: false,
//                     tagName: "a",
//                     attributes: { href: "#", class: "navbar-brand text-uppercase font-weight-bold" },
//                     content: `<h4>${c.storeName}</h4>`,
//                 },
//                 {
//                     layerable : false,
//                     draggable: false,
//                     hoverable: false,
//                     tagName: "div",
//                     attributes: { class:"d-block d-md-none" },
//                     components: [
//                     {
//                         layerable : false,
//                         draggable: false,
//                         hoverable: false,
//                         tagName: "i",
//                         attributes: { class: "fa fa-search icon-header" },
//                     },
//                     {
//                         layerable : false,
//                         draggable: false,
//                         hoverable: false,
//                         tagName: "i",
//                         attributes: { class: "fa fa-shopping-bag icon-header" },
//                     },
//                     ],
//                 },
//                 {
//                     layerable : false,
//                     draggable: false,
//                     hoverable: false,
//                     tagName: "div",
//                     attributes: { class: "d-none d-md-block", style: "flex-grow: 1; align-items: center;" },
//                     components: [
//                     {
//                         layerable : false,
//                         draggable: false,
//                         hoverable: false,
//                         tagName: "ul",
//                         attributes: { class: "navbar-nav ml-1;", style: "flex-direction: row;" },
//                         components: getHeaderNavigationButton(c.headerNavigation)
//                     },
//                     ],
//                 },
//                 {
//                     layerable : false,
//                     draggable: false,
//                     hoverable: false,
//                     tagName: "div",
//                     attributes: { class:"d-none d-md-block" },
//                     components: [
//                     {
//                         layerable : false,
//                         draggable: false,
//                         hoverable: false,
//                         tagName: "i",
//                         attributes: { class: "fa fa-search" },
//                     },
//                     {
//                         layerable : false,
//                         draggable: false,
//                         hoverable: false,
//                         tagName: "i",
//                         attributes: { class: "fa fa-shopping-bag" },
//                     },
//                     ],
//                 },
//                 ]
//             },
//             ]
//         },
//         {
//             layerable : false,
//             draggable: false,
//             hoverable: false,
//             tagName: "div",
//             attributes: { class:"d-block d-md-none offcanvas offcanvas-start w-75", id:"offcanvas", "data-bs-keyboard": "false", "data-bs-backdrop": "false" },
//             components: [
//             {
//                 layerable : false,
//                 draggable: false,
//                 hoverable: false,
//                 tagName: "div",
//                 attributes: { class: "offcanvas-header border-bottom border-dark" },
//                 content: `
//                     <h6 class="offcanvas-title" id="offcanvas">Menu</h6>
//                     <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                 `
//             },
//             {
//                 layerable : false,
//                 draggable: false,
//                 hoverable: false,
//                 tagName: "div",
//                 attributes: { class: "offcanvas-body p-0" },
//                 components: [
//                     {
//                         layerable : false,
//                         draggable: false,
//                         hoverable: false,
//                         tagName: "ul",
//                         attributes: { class: "nav nav-pills flex-column m-0 p-0 align-items-start" },
//                         components: getHeaderNavigationButton(c.headerNavigation)
//                     }
//                 ]
//             },
//             {
//                 layerable : false,
//                 draggable: false,
//                 hoverable: false,
//                 tagName: "script",
//                 content: `
//                 const mediaQuery = window.matchMedia('(min-width: 768px)')

//                 function handleTabletChange(e) {
//                     if (e.matches) {
//                         let leftSidebar = document.getElementById("offcanvas");

//                         if (leftSidebar.className.includes("show")) {
//                             document.getElementById("togglerBtn").click();
//                         }
//                     }
//                 }
//                 mediaQuery.addListener(handleTabletChange)
//                 handleTabletChange(mediaQuery)
//                 `
//             },
//             ],
//         },
//         ]
//     },
// });

// storeCssData[".offcanvas"] = "{ background-color: white, color: black !important }";
// storeCssData[".offcanvas .btn-close"] = "{ background-color: none }";
// storeCssData[".offcanvas a"] = "{ color: black !important }";

// editor.Css.setRule(
//     `.offcanvas`, {
//         'background-color': '#121212',
//         'color': 'white !important'
//     });
// editor.Css.setRule(
//     `.offcanvas .btn-close`, {
//         'background-color': 'white',
//     });
// editor.Css.setRule(
//     `.offcanvas a`, {
//         'color': 'white !important'
//     });

// editor.Css.setRule(
//     `.offcanvas`, {
//         'background-color': '#69c5a3',
//         'color': 'black !important'
//     });
// editor.Css.setRule(
//     `.offcanvas a`, {
//         'color': 'black !important'
//     });

// editor.Css.setRule(
//     `.offcanvas`, {
//         'background-color': '#c8e1e7',
//         'color': 'back !important'
//     });
// editor.Css.setRule(
//     `.offcanvas a`, {
//         'color': 'back !important'
//     });

// editor.Css.setRule(
//     `.offcanvas`, {
//         'background-color': '#f6d7b0',
//         'color': 'back !important'
//     });
// editor.Css.setRule(
//     `.offcanvas a`, {
//         'color': 'back !important'
//     });
