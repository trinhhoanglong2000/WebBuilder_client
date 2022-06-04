import $ from "jquery";
import loadBlockFooterItem from "./items";
import Swal from 'sweetalert2'

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

  editor.TraitManager.addType("footer-linkedIn-link", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes['linkedIn'];
      const href = trait.target.view.el.querySelector('.linkedIn-fanpage').href || "";

      el.innerHTML = `
            <div class="gjs-one-bg">
                <label class="checkbox-product gjs-label-wrp">
                    <input class ="checkbox-input footer-linkedIn-check" type="checkbox" id="border">
                    <div class="checkbox_box"></div>
                    LinkedIn Fanpage
                <label/>
            </div>
            <div class="gjs-field gjs-field-text">
              <input class="footer-linkedIn-link" style="display: ${initValue ? "initial" : "none"}" placeholder="Link LinkedIn" value="${href}" />
            </div>
        `;

      const linkedIn = editor.getSelected().get("components").models[0];
      $(el).find("input.footer-linkedIn-link").on('input', function () {
        const value = $(this).val();
        linkedIn.setAttributes({ ...linkedIn.getAttributes(), 'href': value })
      });

      $(el).find("input.footer-linkedIn-check").prop('checked', initValue);

      return el;
    },

    onEvent({ elInput, component, event }) {
      const ischeck = elInput.querySelector('input.footer-linkedIn-check').checked;
      const input = elInput.querySelector('input.footer-linkedIn-link');
      const linkedIn = editor.getSelected().get("components").models[0];

      component.setAttributes({ ...component.getAttributes(), 'linkedIn': ischeck });

      if (ischeck) {
        input.style.display = 'initial';
        linkedIn.setAttributes({ ...linkedIn.getAttributes(), 'class': 'linkedIn-fanpage' })
      } else {
        input.style.display = 'none';
        linkedIn.setAttributes({ ...linkedIn.getAttributes(), 'class': 'linkedIn-fanpage d-none' })
      }
    },
  });

  editor.TraitManager.addType("footer-instagram-link", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes['instagram'];
      const href = trait.target.view.el.querySelector('.instagram-fanpage').href || "";

      el.innerHTML = `
            <div class="gjs-one-bg">
                <label class="checkbox-product gjs-label-wrp">
                    <input class ="checkbox-input footer-instagram-check" type="checkbox" id="border">
                    <div class="checkbox_box"></div>
                    Instagram Fanpage
                <label/>
            </div>
            <div class="gjs-field gjs-field-text">
              <input class="footer-instagram-link" style="display: ${initValue ? "initial" : "none"}" placeholder="Link Instagram" value="${href}" />
            </div>
        `;

      const instagram = editor.getSelected().get("components").models[1];
      $(el).find("input.footer-instagram-link").on('input', function () {
        const value = $(this).val();
        
        let regex = new RegExp("((http|https)://)?(www[.])?instagram.com/.+");
        let isInstagramLink = !!regex.test(value);

        if (isInstagramLink) {
          instagram.setAttributes({ ...instagram.getAttributes(), 'href': value })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Link  Error',
            text: 'This is not a instagram link!',
          })
        }
      });

      $(el).find("input.footer-instagram-check").prop('checked', initValue);

      return el;
    },

    onEvent({ elInput, component, event }) {
      const ischeck = elInput.querySelector('input.footer-instagram-check').checked;
      const input = elInput.querySelector('input.footer-instagram-link');
      const instagram = editor.getSelected().get("components").models[1];

      component.setAttributes({ ...component.getAttributes(), 'instagram': ischeck });

      if (ischeck) {
        input.style.display = 'initial';
        instagram.setAttributes({ ...instagram.getAttributes(), 'class': 'instagram-fanpage' })
      } else {
        input.style.display = 'none';
        instagram.setAttributes({ ...instagram.getAttributes(), 'class': 'instagram-fanpage d-none' })
      }
    },
  });

  editor.TraitManager.addType("footer-facebook-link", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes['facebook'];
      const href = trait.target.view.el.querySelector('.facebook-fanpage').href || "";

      el.innerHTML = `
            <div class="gjs-one-bg">
                <label class="checkbox-product gjs-label-wrp">
                    <input class ="checkbox-input footer-facebook-check" type="checkbox" id="border">
                    <div class="checkbox_box"></div>
                    Facebook Fanpage
                <label/>
            </div>
            <div class="gjs-field gjs-field-text">
              <input class="footer-facebook-link" style="display: ${initValue ? "initial" : "none"}" placeholder="Link Facebook" value="${href}" />
            </div>
        `;

      const facebook = editor.getSelected().get("components").models[2];
      $(el).find("input.footer-facebook-link").on('input', function () {
        const value = $(this).val();

        let regex = new RegExp("((http|https)://)?(www[.])?facebook.com/.+");
        let isFacebookLink = !!regex.test(value);

        if (isFacebookLink) {
          facebook.setAttributes({ ...facebook.getAttributes(), 'href': value })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Link  Error',
            text: 'This is not a facebook link!',
          })
        }
      });

      $(el).find("input.footer-facebook-check").prop('checked', initValue);

      return el;
    },

    onEvent({ elInput, component, event }) {
      const ischeck = elInput.querySelector('input.footer-facebook-check').checked;
      const input = elInput.querySelector('input.footer-facebook-link');
      const facebook = editor.getSelected().get("components").models[2];

      component.setAttributes({ ...component.getAttributes(), 'facebook': ischeck });

      if (ischeck) {
        input.style.display = 'initial';
        facebook.setAttributes({ ...facebook.getAttributes(), 'class': 'instagram-fanpage' })
      } else {
        input.style.display = 'none';
        facebook.setAttributes({ ...facebook.getAttributes(), 'class': 'instagram-fanpage d-none' })
      }
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