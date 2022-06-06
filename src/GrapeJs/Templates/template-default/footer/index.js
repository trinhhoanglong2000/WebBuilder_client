import $ from "jquery";
import loadBlockFooterItem from "./items";
import Swal from 'sweetalert2';
import { validURL } from "../../../../helper/utils";
import { URL_ICON,
  DELETE_BUTTON_ICON } from "../../../../asset/icon/svg";


export default function loadBlockFooter(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;

  const Swal = require('sweetalert2')

  loadBlockFooterItem(editor, opt);

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

  bm.add('footer', {
    label: "Footer",
    category: "Footer",
    attributes: { class: "fa fa-footer" },
    // attributes
    content: {
      name: "Footer",
      type: "footer",
      tagName: "footer",
      copyable: false,
      removable: false,
      content: <div></div>,
      attributes: { class: "footer-section", name: "footer" },
      droppable: false,
      components: [
        {
          layerable: false,
          draggable: false,
          selectable: false,
          droppable: false,
          tagName: "hr",
        },
        {
          name: "Footer Navigation",
          draggable: ".footer-section",
          tagName: "div",
          copyable: false,
          attributes: { class: "row footer-navigation" },
          components: [
            {
              name: "QuickLink",
              draggable: ".footer-navigation",
              tagName: "div",
              attributes: { class: "col-md", name: "QuickLink" },
              type: "footer-quick-link",
              droppable: false,
              copyable: false,
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
            },
            {
              name: "TextMenu",
              draggable: ".footer-navigation",
              droppable: false,
              tagName: "div",
              copyable: false,
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
          ]
        },
        {
          layerable: false,
          draggable: false,
          selectable: false,
          copyable: false,
          droppable: false,
          tagName: "hr",
        },
        {
          name: "Social Navigation",
          tagName: "div",
          droppable: false,
          copyable: false,
          removable: false,
          draggable: false,
          type: 'footer-social-link',
          attributes: { class: "text-center text-md-start pb-2" },
          components: [{
            layerable: false,
            copyable: false,
            draggable: false,
            hoverable: false,
            selectable: false,
            droppable: false,
            removable: false,
            tagName: "a",
            attributes: { class: "linkedIn-fanpage" },
            content: `<i class="fa fa-linkedin-square"></i>`
          },
          {
            layerable: false,
            copyable: false,
            draggable: false,
            hoverable: false,
            selectable: false,
            droppable: false,
            removable: false,
            tagName: "a",
            attributes: { class: "instagram-fanpage" },
            content: `<i class="fa fa-instagram"></i>`
          },
          {
            layerable: false,
            copyable: false,
            draggable: false,
            hoverable: false,
            selectable: false,
            droppable: false,
            removable: false,
            tagName: "a",
            attributes: { class: "facebook-fanpage" },
            content: `<i class="fa fa-facebook-square"></i>`
          }
          ]
        },
      ],
    }
  });

  dc.addType('footer', {
    model: {
      defaults: {
        attributes: { 'theme': 'white' },
        traits: [
          {
            type: 'select',
            label: 'Theme',
            name: 'theme',
            options: [
              { id: 'white', name: 'White' },
              { id: 'black', name: 'Black' },
              { id: 'lGreen', name: 'Light green' },
              { id: 'lBlue', name: 'Light blue' },
              { id: 'sand', name: 'Sand' },
            ]
          },
        ],
      },

      init() {

      },

      initData() {

      },
    },
  });

  // editor.TraitManager.addType("footer-linkedIn-link", {
  //   createInput({ trait }) {
  //     const el = document.createElement("div");
  //     const initValue = trait.target.attributes.attributes['linkedIn'];
  //     const href = trait.target.view.el.querySelector('.linkedIn-fanpage').href || "";

  //     el.innerHTML = `
  //           <div class="gjs-one-bg">
  //               <label class="checkbox-product gjs-label-wrp">
  //                   <input class ="checkbox-input footer-linkedIn-check" type="checkbox" id="border">
  //                   <div class="checkbox_box"></div>
  //                   LinkedIn Fanpage
  //               <label/>
  //           </div>
  //           <div class="gjs-field gjs-field-text">
  //             <input class="footer-linkedIn-link" style="display: ${initValue ? "initial" : "none"}" placeholder="Link LinkedIn" value="${href}" />
  //           </div>
  //       `;

  //     const linkedIn = editor.getSelected().get("components").models[0];
  //     $(el).find("input.footer-linkedIn-link").on('input', function () {
  //       const value = $(this).val();
  //       linkedIn.setAttributes({ ...linkedIn.getAttributes(), 'href': value })
  //     });

  //     $(el).find("input.footer-linkedIn-check").prop('checked', initValue);

  //     return el;
  //   },

  //   onEvent({ elInput, component, event }) {
  //     const ischeck = elInput.querySelector('input.footer-linkedIn-check').checked;
  //     const input = elInput.querySelector('input.footer-linkedIn-link');
  //     const linkedIn = editor.getSelected().get("components").models[0];

  //     component.setAttributes({ ...component.getAttributes(), 'linkedIn': ischeck });

  //     if (ischeck) {
  //       input.style.display = 'initial';
  //       linkedIn.setAttributes({ ...linkedIn.getAttributes(), 'class': 'linkedIn-fanpage' })
  //     } else {
  //       input.style.display = 'none';
  //       linkedIn.setAttributes({ ...linkedIn.getAttributes(), 'class': 'linkedIn-fanpage d-none' })
  //     }
  //   },
  // });

  // editor.TraitManager.addType("footer-instagram-link", {
  //   createInput({ trait }) {
  //     const el = document.createElement("div");
  //     const initValue = trait.target.attributes.attributes['instagram'];
  //     const href = trait.target.view.el.querySelector('.instagram-fanpage').href || "";

  //     el.innerHTML = `
  //           <div class="gjs-one-bg">
  //               <label class="checkbox-product gjs-label-wrp">
  //                   <input class ="checkbox-input footer-instagram-check" type="checkbox" id="border">
  //                   <div class="checkbox_box"></div>
  //                   Instagram Fanpage
  //               <label/>
  //           </div>
  //           <div class="gjs-field gjs-field-text">
  //             <input class="footer-instagram-link" style="display: ${initValue ? "initial" : "none"}" placeholder="Link Instagram" value="${href}" />
  //           </div>
  //       `;

  //     const instagram = editor.getSelected().get("components").models[1];
  //     $(el).find("input.footer-instagram-link").on('input', function () {
  //       const value = $(this).val();
        
  //       let regex = new RegExp("((http|https)://)?(www[.])?instagram.com/.+");
  //       let isInstagramLink = !!regex.test(value);

  //       if (isInstagramLink) {
  //         instagram.setAttributes({ ...instagram.getAttributes(), 'href': value })
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Link  Error',
  //           text: 'This is not a instagram link!',
  //         })
  //       }
  //     });

  //     $(el).find("input.footer-instagram-check").prop('checked', initValue);

  //     return el;
  //   },

  //   onEvent({ elInput, component, event }) {
  //     const ischeck = elInput.querySelector('input.footer-instagram-check').checked;
  //     const input = elInput.querySelector('input.footer-instagram-link');
  //     const instagram = editor.getSelected().get("components").models[1];

  //     component.setAttributes({ ...component.getAttributes(), 'instagram': ischeck });

  //     if (ischeck) {
  //       input.style.display = 'initial';
  //       instagram.setAttributes({ ...instagram.getAttributes(), 'class': 'instagram-fanpage' })
  //     } else {
  //       input.style.display = 'none';
  //       instagram.setAttributes({ ...instagram.getAttributes(), 'class': 'instagram-fanpage d-none' })
  //     }
  //   },
  // });
  
  editor.TraitManager.addType("footer-linkedIn-link", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes['linkedIn'];
      const href = trait.target.view.el.querySelector('.linkedIn-fanpage')?.href || "";
      let previousValue = href || "";

      el.innerHTML = `
            <div class="gjs-one-bg">
              <label class="checkbox-product gjs-label-wrp">
                <input class ="checkbox-input footer-linkedIn-check" type="checkbox" id="border">
                <div class="checkbox_box"></div>
                LinkedIn Fanpage
              <label/>
            </div>
            <div id= "Link-combo" class="combo gjs-field gjs-field-text">
              <div style="width:100%;display:flex;align-items:center;position:relative;">
                <div id="icons" style = "position: absolute;z-index: 2;margin-left: 10px;${previousValue === '' ? 'display:none' : ''}">
                ${URL_ICON}
                </div>
                <input class="footer-linkedIn-link" style = "${previousValue === '' ? '' : 'padding-left: 39px;padding-right:25px'}" type="text" id="state" value="${previousValue}" size="10" placeholder="Paste a link or search" autocomplete="off">
                <div id="delete_icon" class="" style= " z-index: 2; position: absolute; right: 0;margin-right: 5px;${previousValue === '' ? 'display:none' : ''}" >
                ${DELETE_BUTTON_ICON}
                </div>
              </div>
              <ul class="combobox-hidden">
              <div id="Link-menu">
              
              </div>
              </ul>
            </div>       
        `;

      const _this = this;

      $(el).find("input.footer-linkedIn-link").on('input', function () {
        setTimeout(() => {
          const value = $(this).val();

          if (validURL(value)) {

            $(el).find('ul').removeClass('combobox-hidden');
            let domdata = "";
            domdata += `
              <li data-value ="${1}" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
              ${URL_ICON}
              <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
                  ${value}
              </span>
              </li>    
            `
            $(el).find('#result').text(`${1} results`)
            $(el).find("#Link-menu").empty().append(domdata);

            $(el).find('#Link-menu li').on('click', function () {
              const text = $(this).find('span').text().trim();
              let  previousValue = text;

              // let regex = new RegExp("(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)");
              // let isFacebookLink = !!regex.test(value);

              // if (!isFacebookLink) {
              //   Swal.fire({
              //     icon: 'error',
              //     title: 'Link  Error',
              //     text: 'This is not a facebook link!',
              //   })
              // }
              
              $(el).find('input').val(text);
              $(el).find('ul').addClass('combobox-hidden');
              
              if (previousValue !== "") {
                $(el).find('input').css('padding-left', '39px');
                $(el).find('#icons').css("display", "block");

                $(el).find('input').css('padding-right', '25px');
                $(el).find('#delete_icon').css("display", "block");

              }
              else {
                $(el).find('input').css('padding-left', '');
                $(el).find('#icons').css("display", "none");

                $(el).find('input').css('padding-left', '');
                $(el).find('#delete_icon').css("display", "none");
              }
              $(el).find('#icons').empty().append(URL_ICON);

              _this.onChange({ valueHref: value, traitValue: `${"_URL_LINK"};${previousValue}` });
            })
          }
        }, 200)
      
      });

      $(el).find('#delete_icon').on('click', function () {
        const text = ""
        $(el).find('input').val(text);
        $(el).find('ul').addClass('combobox-hidden');

        $(el).find('input').css('padding-left', '');
        $(el).find('#icons').css("display", "none");

        $(el).find('input').css('padding-left', '');
        $(el).find('#delete_icon').css("display", "none");
        _this.onChange({ valueHref: "", traitValue: "" });
      })

      $(el).find("input.footer-linkedIn-check").change(function () {
        const isChecked = $(this).is(":checked");
        const linkedIn = editor.getSelected().get("components").models[0];

        trait.target.setAttributes({ ...trait.target.getAttributes(), 'linkedIn': isChecked });

        if (isChecked)  {
          $(el).find('#Link-combo').show();
          linkedIn.setAttributes({ ...linkedIn.getAttributes(), 'class': 'linkedIn-fanpage' });
        } else {
          $(el).find('#Link-combo').hide();
          linkedIn.setAttributes({ ...linkedIn.getAttributes(), 'class': 'linkedIn-fanpage d-none' });
        }
      });

      $(el).find("input.footer-linkedIn-check").prop('checked', initValue).trigger("change");

      return el;
    },

    onEvent({ elInput, component, event }) {
      if (event.type) { return; }
      const value = event.valueHref ? event.valueHref : '#';
      const linkedIn = editor.getSelected().get("components").models[0];
      linkedIn.setAttributes({ ...linkedIn.getAttributes(), 'href': value });
    },
  });

  editor.TraitManager.addType("footer-instagram-link", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes['instagram'];
      const href = trait.target.view.el.querySelector('.instagram-fanpage')?.href || "";
      let previousValue = href || "";

      el.innerHTML = `
            <div class="gjs-one-bg">
              <label class="checkbox-product gjs-label-wrp">
                <input class ="checkbox-input footer-instagram-check" type="checkbox" id="border">
                <div class="checkbox_box"></div>
                Instagram Fanpage
              <label/>
            </div>
            <div id= "Link-combo" class="combo gjs-field gjs-field-text">
              <div style="width:100%;display:flex;align-items:center;position:relative;">
                <div id="icons" style = "position: absolute;z-index: 2;margin-left: 10px;${previousValue === '' ? 'display:none' : ''}">
                ${URL_ICON}
                </div>
                <input class="footer-instagram-link" style = "${previousValue === '' ? '' : 'padding-left: 39px;padding-right:25px'}" type="text" id="state" value="${previousValue}" size="10" placeholder="Paste a link or search" autocomplete="off">
                <div id="delete_icon" class="" style= " z-index: 2; position: absolute; right: 0;margin-right: 5px;${previousValue === '' ? 'display:none' : ''}" >
                ${DELETE_BUTTON_ICON}
                </div>
              </div>
              <ul class="combobox-hidden">
              <div id="Link-menu">
              
              </div>
              </ul>
            </div>       
        `;

      const _this = this;

      $(el).find("input.footer-instagram-link").on('input', function () {
        setTimeout(() => {
          const value = $(this).val();

          if (validURL(value)) {

            $(el).find('ul').removeClass('combobox-hidden');
            let domdata = "";
            domdata += `
              <li data-value ="${1}" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
              ${URL_ICON}
              <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
                  ${value}
              </span>
              </li>    
            `
            $(el).find('#result').text(`${1} results`)
            $(el).find("#Link-menu").empty().append(domdata);

            $(el).find('#Link-menu li').on('click', function () {
              const text = $(this).find('span').text().trim();
              let  previousValue = text;

              // let regex = new RegExp("(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)");
              // let isFacebookLink = !!regex.test(value);

              // if (!isFacebookLink) {
              //   Swal.fire({
              //     icon: 'error',
              //     title: 'Link  Error',
              //     text: 'This is not a facebook link!',
              //   })
              // }
              
              $(el).find('input').val(text);
              $(el).find('ul').addClass('combobox-hidden');
              
              if (previousValue !== "") {
                $(el).find('input').css('padding-left', '39px');
                $(el).find('#icons').css("display", "block");

                $(el).find('input').css('padding-right', '25px');
                $(el).find('#delete_icon').css("display", "block");

              }
              else {
                $(el).find('input').css('padding-left', '');
                $(el).find('#icons').css("display", "none");

                $(el).find('input').css('padding-left', '');
                $(el).find('#delete_icon').css("display", "none");
              }
              $(el).find('#icons').empty().append(URL_ICON);

              _this.onChange({ valueHref: value, traitValue: `${"_URL_LINK"};${previousValue}` });
            })
          }
        }, 200)
      
      });

      $(el).find('#delete_icon').on('click', function () {
        const text = ""
        $(el).find('input').val(text);
        $(el).find('ul').addClass('combobox-hidden');

        $(el).find('input').css('padding-left', '');
        $(el).find('#icons').css("display", "none");

        $(el).find('input').css('padding-left', '');
        $(el).find('#delete_icon').css("display", "none");
        _this.onChange({ valueHref: "", traitValue: "" });
      })

      $(el).find("input.footer-instagram-check").change(function () {
        const isChecked = $(this).is(":checked");
        const instagram = editor.getSelected().get("components").models[1];

        trait.target.setAttributes({ ...trait.target.getAttributes(), 'instagram': isChecked });

        if (isChecked)  {
          $(el).find('#Link-combo').show();
          instagram.setAttributes({ ...instagram.getAttributes(), 'class': 'instagram-fanpage' });
        } else {
          $(el).find('#Link-combo').hide();
          instagram.setAttributes({ ...instagram.getAttributes(), 'class': 'instagram-fanpage d-none' });
        }
      });

      $(el).find("input.footer-instagram-check").prop('checked', initValue).trigger("change");

      return el;
    },

    onEvent({ elInput, component, event }) {
      if (event.type) { return; }
      const value = event.valueHref ? event.valueHref : '#';
      const instagram = editor.getSelected().get("components").models[1];
      instagram.setAttributes({ ...instagram.getAttributes(), 'href': value });
    },
  });

  editor.TraitManager.addType("footer-facebook-link", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes['facebook'];
      const href = trait.target.view.el.querySelector('.facebook-fanpage')?.href || "";
      let previousValue = href || "";

      el.innerHTML = `
            <div class="gjs-one-bg">
              <label class="checkbox-product gjs-label-wrp">
                <input class ="checkbox-input footer-facebook-check" type="checkbox" id="border">
                <div class="checkbox_box"></div>
                Facebook Fanpage
              <label/>
            </div>
            <div id= "Link-combo" class="combo gjs-field gjs-field-text">
              <div style="width:100%;display:flex;align-items:center;position:relative;">
                <div id="icons" style = "position: absolute;z-index: 2;margin-left: 10px;${previousValue === '' ? 'display:none' : ''}">
                ${URL_ICON}
                </div>
                <input class="footer-facebook-link" style = "${previousValue === '' ? '' : 'padding-left: 39px;padding-right:25px'}" type="text" id="state" value="${previousValue}" size="10" placeholder="Paste a link or search" autocomplete="off">
                <div id="delete_icon" class="" style= " z-index: 2; position: absolute; right: 0;margin-right: 5px;${previousValue === '' ? 'display:none' : ''}" >
                ${DELETE_BUTTON_ICON}
                </div>
              </div>
              <ul class="combobox-hidden">
              <div id="Link-menu">
              
              </div>
              </ul>
            </div>       
        `;

      const _this = this;

      $(el).find("input.footer-facebook-link").on('input', function () {
        setTimeout(() => {
          const value = $(this).val();

          if (validURL(value)) {

            $(el).find('ul').removeClass('combobox-hidden');
            let domdata = "";
            domdata += `
              <li data-value ="${1}" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
              ${URL_ICON}
              <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
                  ${value}
              </span>
              </li>    
            `
            $(el).find('#result').text(`${1} results`)
            $(el).find("#Link-menu").empty().append(domdata);

            $(el).find('#Link-menu li').on('click', function () {
              const text = $(this).find('span').text().trim();
              let  previousValue = text;

              // let regex = new RegExp("(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)");
              // let isFacebookLink = !!regex.test(value);

              // if (!isFacebookLink) {
              //   Swal.fire({
              //     icon: 'error',
              //     title: 'Link  Error',
              //     text: 'This is not a facebook link!',
              //   })
              // }
              
              $(el).find('input').val(text);
              $(el).find('ul').addClass('combobox-hidden');
              
              if (previousValue !== "") {
                $(el).find('input').css('padding-left', '39px');
                $(el).find('#icons').css("display", "block");

                $(el).find('input').css('padding-right', '25px');
                $(el).find('#delete_icon').css("display", "block");

              }
              else {
                $(el).find('input').css('padding-left', '');
                $(el).find('#icons').css("display", "none");

                $(el).find('input').css('padding-left', '');
                $(el).find('#delete_icon').css("display", "none");
              }
              $(el).find('#icons').empty().append(URL_ICON);

              _this.onChange({ valueHref: value, traitValue: `${"_URL_LINK"};${previousValue}` });
            })
          }
        }, 200)
      
      });

      $(el).find('#delete_icon').on('click', function () {
        const text = ""
        $(el).find('input').val(text);
        $(el).find('ul').addClass('combobox-hidden');

        $(el).find('input').css('padding-left', '');
        $(el).find('#icons').css("display", "none");

        $(el).find('input').css('padding-left', '');
        $(el).find('#delete_icon').css("display", "none");
        _this.onChange({ valueHref: "", traitValue: "" });
      })

      $(el).find("input.footer-facebook-check").change(function () {
        const isChecked = $(this).is(":checked");
        const facebook = editor.getSelected().get("components").models[2];

        trait.target.setAttributes({ ...trait.target.getAttributes(), 'facebook': isChecked });

        if (isChecked)  {
          $(el).find('#Link-combo').show();
          facebook.setAttributes({ ...facebook.getAttributes(), 'class': 'facebook-fanpage' });
        } else {
          $(el).find('#Link-combo').hide();
          facebook.setAttributes({ ...facebook.getAttributes(), 'class': 'facebook-fanpage d-none' });
        }
      });

      $(el).find("input.footer-facebook-check").prop('checked', initValue).trigger("change");

      return el;
    },

    onEvent({ elInput, component, event }) {
      if (event.type) { return; }
      const value = event.valueHref ? event.valueHref : '#';
      const facebook = editor.getSelected().get("components").models[2];
      facebook.setAttributes({ ...facebook.getAttributes(), 'href': value });
    },
  });

  dc.addType("footer-social-link", {
    model: {
      defaults: {
        attributes: { 'linkedIn': 'true', 'instagram': 'true', 'facebook': 'true' },
        traits: [
          {
            type: "footer-linkedIn-link",
            label: "Linkedin Fanpage",
          },
          {
            type: "footer-instagram-link",
            label: "Instagram Fanpage",
          },
          {
            type: "footer-facebook-link",
            label: "Facebook Fanpage",
          },
        ],
      },
      init() {
      },
      initData() { },
    },
  });

}