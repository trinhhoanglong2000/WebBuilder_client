import loadBlockFooterItem from "./items";

export default function loadBlockFooter(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;

  loadBlockFooterItem(editor, opt);

  const getFooterNavigationButton = (mNavigation) => {
    let navbar = "";
    if (mNavigation){
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
    // attributes
    content: {
        name: "Footer",
        type: "footer",
        tagName: "footer",
        content: <div></div>,
        attributes: { class: "footer-section", name:  "footer" },
        droppable: false,
        components: [
        {
          layerable : false,
          draggable: false,
          selectable: false,
          droppable: false,
          tagName: "hr",
        },
        {
          name: "Footer Navigation",
          draggable: ".footer-section",
          tagName: "div",
          attributes: { class: "row footer-navigation" },
          components: [
            {
              name: "QuickLink",
              draggable: ".footer-navigation",
              tagName: "div",
              attributes: { class: "col-md" },
              type: "footer-quick-link",
              droppable: false,
              components: [
                {                                            
                  layerable: false,
                  draggable: false,
                  hoverable: false,
                  selectable: false,
                  droppable: false,
                  tagName: "h5",
                  content: "Quick links"
                }, {
                  layerable: false,
                  draggable: false,
                  hoverable: false,
                  selectable: false,
                  droppable: false,
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
              attributes: { class: "col-md" },
              type: "footer-text-menu",
              components: [
                {                                            
                  layerable: false,
                  draggable: false,
                  hoverable: false,
                  selectable: false,
                  droppable: false,
                  tagName: "h5",
                  content: "Heading"
                }, {
                  layerable: false,
                  draggable: false,
                  hoverable: false,
                  selectable: false,
                  droppable: false,
                  tagName: "ul",
                  content: c.footerHeading
                }
              ],
            }
          ]
        },     
        {
          layerable : false,
          draggable: false,
          selectable: false,
          droppable: false,
          tagName: "hr",
        },     
        {
          name: "Social Navigation",
          tagName: "div",
          draggable: false,
          selectable: false,
          droppable: false,
          attributes: { class: "text-center text-md-start pb-2" },
          content: `
          <i class="fa fa-linkedin-square" aria-hidden="true"></i>
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
          <i class="fa fa-facebook-square" aria-hidden="true"></i>
          `
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
                { id: 'white', name: 'White'},
                { id: 'black', name: 'Black'},
                { id: 'lGreen', name: 'Light green'},
                { id: 'lBlue', name: 'Light blue'},
                { id: 'sand', name: 'Sand'},
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
}