import $ from "jquery";
import loadBlockFooterItem from "./items";
import { validURL, setAttribute } from "../../../../helper/utils";
import {
  URL_ICON,
  DELETE_BUTTON_ICON
} from "../../../../asset/icon/svg";


export default function loadBlockFooter(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;

  const Swal = require('sweetalert2')

  loadBlockFooterItem(editor, opt);

  const validLinkedInLink = (value) => {
    let regex = new RegExp("^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)");
    return !!regex.test(value);
  }

  const validInstagramLink = (value) => {
    let regex = new RegExp("(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)");
    return !!regex.test(value);
  }

  const validFacebookLink = (value) => {
    let regex = new RegExp("(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?");
    return !!regex.test(value);
  }

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
  if (!opt.isDeloy) {
    bm.add('footer', {
      label: "Footer",
      category: "Footer",
      attributes: { class: "fa fa-footer" },
      content: {
        type: "footer",
        components: [
          {
            tagName: "hr",
            type: "defaultCustom"
          },
          {
            type: "footer-navigation",
            components: [
              {
                type: "footer-quick-link",
                components: [
                  {
                    type: "defaultCustom",
                    tagName: "h5",
                    content: "Quick links"
                  }, {
                    type: "defaultCustom",
                    attributes: { class: "quicklinks-menu" },
                    tagName: "ul",
                    content: getFooterNavigationButton(c.footerNavigation)
                  }
                ],
              },
              {
                type: "footer-text",
                components: [
                  {
                    type: "defaultCustom",
                    tagName: "h5",
                    content: "Heading"
                  }, {
                    type: "defaultCustom",
                    tagName: "p",
                    content: c.footerHeading
                  }
                ],
              }
            ]
          },
          {
            tagName: "hr",
            type: "defaultCustom"
          },
          {
            type: 'footer-social-link',
            components: [{
              type: "defaultCustom",
              tagName: "a",
              attributes: { class: "linkedIn-fanpage" },
              content: `<i class="fa fa-linkedin-square"></i>`
            },
            {
              type: "defaultCustom",
              tagName: "a",
              attributes: { class: "instagram-fanpage" },
              content: `<i class="fa fa-instagram"></i>`
            },
            {
              type: "defaultCustom",
              tagName: "a",
              attributes: { class: "facebook-fanpage" },
              content: `<i class="fa fa-facebook-square"></i>`
            }
            ]
          },
        ],
      }
    });
  }


  dc.addType('footer', {
    model: {
      defaults: {
        name: "Footer",
        tagName: "footer",
        copyable: false,
        removable: false,
        droppable: false,
        draggable: false,
        attributes: { class: "footer-section", name: "footer", theme: 'white' },
        traits: [
          {
            type: 'CustomSelect',
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

  dc.addType('footer-navigation', {
    model: {
      defaults: {
        copyable: false,
        removable: false,
        draggable: false,
        name: "Footer Navigation",
        attributes: { class: "row footer-navigation" },
        highlightable: false,
        selectable: false,
        hoverable: false,
        droppable: (target, destination) => {
          const arr = ['footer-quick-link', 'footer-image', 'footer-text']
          if (target == undefined) return false
          if (arr.includes(target.get('type'))) {
            return true
          }
          return false

        },
        tagName: "div",
      },

      init() {

      },

      initData() {

      },
    },
  });

  editor.TraitManager.addType("footer-linkedIn-link", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes['linkedIn'];
      const linkedIn = trait.target.get("components").models[2];
      const href = linkedIn.attributes.link?.split(/;(.*)/s) || "";
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
          let value = $(this).val();
          
          if (validURL(value)) {
            value = value.match(/^https?:\/\//gm) ? value : `https://${value}`

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
              let previousValue = text;

              if (!validLinkedInLink(value)) {
                Swal.fire({
                  icon: 'error',
                  title: 'Link  Error',
                  text: 'This is not a Linked In link!',
                })

                previousValue = "";
              }

              $(el).find('input').val(previousValue);
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

      $(el).find('input.footer-linkedIn-link').on('focusout', function () {
        $(el).find('ul').addClass('combobox-hidden')
        
        const href = linkedIn   .attributes.link?.split(/;(.*)/s) || "";
        let value = href[1] || "";
        $(el).find('input.footer-linkedIn-link').val(value)
      });

      $(el).find('#delete_icon').on('click', function () {
        const text = "";
        $(el).find('input').val(text);
        $(el).find('ul').addClass('combobox-hidden');
        previousValue = text;
        $(el).find('input').css('padding-left', '');
        $(el).find('#icons').css("display", "none");

        $(el).find('input').css('padding-left', '');
        $(el).find('#delete_icon').css("display", "none");
        _this.onChange({ valueHref: "", traitValue: "" });
      })

      $(el).find("input.footer-linkedIn-check").change(function () {
        const isChecked = $(this).is(":checked");
        const linkedIn = trait.target.get("components").models[0];

        setAttribute(trait.target, { 'linkedIn': isChecked })

        if (isChecked) {
          $(el).find('#Link-combo').show();
          linkedIn.removeClass('d-none');
        } else {
          $(el).find('#Link-combo').hide();
          if (!linkedIn.getClasses()?.includes('d-none')) {
            linkedIn.addClass('d-none');
          }
        }
      });

      $(el).find("input.footer-linkedIn-check").prop('checked', initValue).trigger("change");

      return el;
    },

    onEvent({ elInput, component, event }) {
      if (event.type) { return; }
      const value = event.valueHref ? event.valueHref : '#';
      const linkedIn = component.get("components").models[0];

      setAttribute(linkedIn, { 'href': value })
      linkedIn.set('link', event.traitValue)
    },

    onUpdate({ elInput, component }) {
      const initValue = component.attributes.attributes['linkedIn'] || "";
      const linkedIn = component.get("components").models[0];
      const href = linkedIn.attributes.link?.split(/;(.*)/s) || "";
      let previousValue = href[1] || "";
      
      if (initValue) {
        $(elInput).find('#Link-combo').show();
      } else {
        $(elInput).find('#Link-combo').hide();
      }

      $(elInput).find("input.footer-linkedIn-check").prop("checked", initValue);
      $(elInput).find("input.footer-linkedIn-link").val(previousValue);

      if (previousValue || previousValue !== "") {  
        $(elInput).find('input').css('padding-left', '39px');
        $(elInput).find('#icons').css("display", "block");
        $(elInput).find('input').css('padding-right', '25px');
        $(elInput).find('#delete_icon').css("display", "block");
      } else {
        $(elInput).find('input').css('padding-left', '');
        $(elInput).find('#icons').css("display", "none");
        $(elInput).find('input').css('padding-left', '');
        $(elInput).find('#delete_icon').css("display", "none");
      }
    },
  });

  editor.TraitManager.addType("footer-instagram-link", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes['instagram'] || "";
      const instagram = trait.target.get("components").models[1];
      const href = instagram.attributes.link?.split(/;(.*)/s) || "";
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
          let value = $(this).val();

          if (validURL(value)) {
            value = value.match(/^https?:\/\//gm) ? value : `https://${value}`

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
              let previousValue = text;

              if (!validInstagramLink(value)) {
                Swal.fire({
                  icon: 'error',
                  title: 'Link  Error',
                  text: 'This is not a Instagram link!',
                })

                previousValue = "";
              }

              $(el).find('input').val(previousValue);
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

      $(el).find('input.footer-instagram-link').on('focusout', function () {
        $(el).find('ul').addClass('combobox-hidden')
        
        const href = instagram.attributes.link?.split(/;(.*)/s) || "";
        let value = href[1] || "";
        $(el).find('input.footer-instagram-link').val(value)
      });

      $(el).find('#delete_icon').on('click', function () {
        const text = "";
        $(el).find('input').val(text);
        $(el).find('ul').addClass('combobox-hidden');
        previousValue = text;
        $(el).find('input').css('padding-left', '');
        $(el).find('#icons').css("display", "none");

        $(el).find('input').css('padding-left', '');
        $(el).find('#delete_icon').css("display", "none");
        _this.onChange({ valueHref: "", traitValue: "" });
      })

      $(el).find("input.footer-instagram-check").change(function () {
        const isChecked = $(this).is(":checked");
        const instagram = editor.getSelected().get("components").models[1];

        setAttribute(trait.target, { 'instagram': instagram })

        if (isChecked) {
          $(el).find('#Link-combo').show();
          instagram.removeClass('d-none');
        } else {
          $(el).find('#Link-combo').hide();
          if (!instagram.getClasses()?.includes('d-none')) {
            instagram.addClass('d-none');
          }
        }
      });

      $(el).find("input.footer-instagram-check").prop('checked', initValue).trigger("change");

      return el;
    },

    onEvent({ elInput, component, event }) {
      if (event.type) { return; }
      const value = event.valueHref ? event.valueHref : '#';
      const instagram = component.get("components").models[1];

      setAttribute(instagram, { 'href': value })
      instagram.set('link', event.traitValue)
    },

    onUpdate({ elInput, component }) {
      const initValue = component.attributes.attributes['instagram'] || "";
      const instagram = component.get("components").models[1];
      const href = instagram.attributes.link?.split(/;(.*)/s) || "";
      let previousValue = href[1] || "";

      if (initValue) {
        $(elInput).find('#Link-combo').show();
      } else {
        $(elInput).find('#Link-combo').hide();
      }

      $(elInput).find("input.footer-instagram-check").prop("checked", initValue);
      $(elInput).find("input.footer-instagram-link").val(previousValue);

      if (previousValue || previousValue !== "") {
        $(elInput).find('input').css('padding-left', '39px');
        $(elInput).find('#icons').css("display", "block");
        $(elInput).find('input').css('padding-right', '25px');
        $(elInput).find('#delete_icon').css("display", "block");
      } else {
        $(elInput).find('input').css('padding-left', '');
        $(elInput).find('#icons').css("display", "none");
        $(elInput).find('input').css('padding-left', '');
        $(elInput).find('#delete_icon').css("display", "none");
      }
    },
  });

  editor.TraitManager.addType("footer-facebook-link", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes['facebook'] || "";
      const facebook = trait.target.get("components").models[2];
      const href = facebook.attributes.link?.split(/;(.*)/s) || "";
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
          let value = $(this).val();

          if (validURL(value)) {
            value = value.match(/^https?:\/\//gm) ? value : `https://${value}`

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
              let previousValue = text;

              if (!validFacebookLink(value)) {
                Swal.fire({
                  icon: 'error',
                  title: 'Link  Error',
                  text: 'This is not a facebook link!',
                })
                
                previousValue = "";
              }

              $(el).find('input').val(previousValue);
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
      
      $(el).find('input.footer-facebook-link').on('focusout', function () {
        $(el).find('ul').addClass('combobox-hidden')
        
        const href = facebook.attributes.link?.split(/;(.*)/s) || "";
        let value = href[1] || "";
        $(el).find('input.footer-facebook-link').val(value)
      });

      $(el).find('#delete_icon').on('click', function () {
        const text = "";
        $(el).find('input').val(text);
        $(el).find('ul').addClass('combobox-hidden');
        previousValue = text;
        $(el).find('input').css('padding-left', '');
        $(el).find('#icons').css("display", "none");

        $(el).find('input').css('padding-left', '');
        $(el).find('#delete_icon').css("display", "none");
        _this.onChange({ valueHref: "", traitValue: "" });
      })

      $(el).find("input.footer-facebook-check").change(function () {
        const isChecked = $(this).is(":checked");
        const facebook = editor.getSelected().get("components").models[2];

        setAttribute(trait.target, { 'facebook': isChecked })

        if (isChecked) {
          $(el).find('#Link-combo').show();
          facebook.removeClass('d-none');
        } else {
          $(el).find('#Link-combo').hide();
          if (!facebook.getClasses()?.includes('d-none')) {
            facebook.addClass('d-none');
          }
        }
      });

      $(el).find("input.footer-facebook-check").prop('checked', initValue).trigger("change");

      return el;
    },

    onEvent({ elInput, component, event }) {
      if (event.type) { return; }
      const value = event.valueHref ? event.valueHref : '#';
      const facebook = component.get("components").models[2];

      setAttribute(facebook, { 'href': value })
      facebook.set('link', event.traitValue)
    },

    onUpdate({ elInput, component }) {
      const initValue = component.attributes.attributes['facebook'] || "";
      const facebook = component.get("components").models[2];
      const href = facebook.attributes.link?.split(/;(.*)/s) || "";
      let previousValue = href[1] || "";

      if (initValue) {
        $(elInput).find('#Link-combo').show();
      } else {
        $(elInput).find('#Link-combo').hide();
      }

      $(elInput).find("input.footer-facebook-check").prop("checked", initValue);
      $(elInput).find("input.footer-facebook-link").val(previousValue);

      if (previousValue || previousValue !== "") {
        $(elInput).find('input').css('padding-left', '39px');
        $(elInput).find('#icons').css("display", "block");
        $(elInput).find('input').css('padding-right', '25px');
        $(elInput).find('#delete_icon').css("display", "block");
      } else {
        $(elInput).find('input').css('padding-left', '');
        $(elInput).find('#icons').css("display", "none");
        $(elInput).find('input').css('padding-left', '');
        $(elInput).find('#delete_icon').css("display", "none");
      }
    },
  });

  dc.addType("footer-social-link", {
    model: {
      defaults: {
        name: "Social Navigation",
        tagName: "div",
        droppable: false,
        copyable: false,
        removable: false,
        draggable: false,
        attributes: { class: "text-center text-md-start pb-2", linkedIn: 'true', instagram: 'true', facebook: 'true' },
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
      init() { },
      initData() { },
    },
  });

}