export default function loadBlockFooter(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
//#region Footer

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
        content: <div></div>,
        attributes: { class: "footer-section" },
        components: [
        {
            layerable : false,
            draggable: false,
            tagName: "hr",
        },
        {
            name: "Footer Navigation",
            draggable: ".footer-section",
            tagName: "div",
            attributes: { class: "row footer-navigation" },
            content: <div></div>,
            components: [{
            name: "Left Navtion",
            draggable: ".footer-navigation",
            tagName: "div",
            attributes: { class: "col-12 col-md-6" },
            content: `
            <ul>
                <h5>Quick link</h5> 
                ${getFooterNavigationButton(c.footerNavigation1)}
            </ul>
            `
            },
            {
            name: "Right Navigation",
            draggable: ".footer-navigation",
            tagName: "div",
            attributes: { class: "col-12 col-md-6" },
            content: `
                <ul>
                <h5>Heading</h5> 
                ${getFooterNavigationButton(c.footerNavigation2)}
                </ul>
            `
            },
        ]
        },     
        {
            layerable : false,
            draggable: false,
            tagName: "hr",
        },     
        {
            name: "Social Navigation",
            tagName: "div",
            draggable: false,
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

    editor.DomComponents.addType('footer', {
        isComponent: el => el.tagName === 'FOOTER',
        model: {
          defaults: {
            traits: [
              {
                type: 'select',
                label: 'Theme', // The label you will see in Settings
                name: 'theme', // The name of the attribute/property to use on component
                options: [
                  { id: 'white', name: 'White (default)'},
                  { id: 'black', name: 'Black'},
                  { id: 'lGreen', name: 'Light green'},
                  { id: 'lBlue', name: 'Light blue'},
                  { id: 'sand', name: 'Sand'},
                ]
              },
            ],
          },

          init() {
            this.on('change:attributes:theme', this.handleThemeChange);
          },

          initData() {

          },
      
          handleThemeChange() {
            console.log('Input type changed to: ', this.getAttributes().theme);
            document.querySelector(".gjs-frame").contentDocument.querySelector(".footer-section").classList.add("bg-primary")
            console.log( document.querySelector(".gjs-frame").contentDocument.querySelector(".footer-section"))
           
            if (this.getAttributes().theme === "white") {
                editor.Css.setRule(
                    `.footer-section`, {
                         'background-color': 'white',
                         'color': 'black !important'
                    });
                    
                editor.Css.setRule(
                    `.footer-section a`, {
                        'color': 'black !important' 
                    });

            } else if (this.getAttributes().theme === "black") {
                editor.Css.setRule(
                    `.footer-section`, { 
                        'background-color': '#121212',
                        'color': 'white !important'
                    });

               editor.Css.setRule(
                    `.footer-section a`, {
                        'color': '#cccbe9 !important'
                    });
            } else if (this.getAttributes().theme === "lGreen") {
                editor.Css.setRule(
                    `.footer-section`, { 
                        'background-color': '#69c5a3',
                        'color': 'black !important'
                    });
                editor.Css.setRule(
                    `.footer-section a`, {
                        'color': 'black !important'
                    });

            } else if (this.getAttributes().theme === "lBlue") {
                editor.Css.setRule(
                    `.footer-section`, { 
                        'background-color': '#c8e1e7',
                        'color': 'back !important'
                    });
                editor.Css.setRule(
                    `.footer-section a`, {
                        'color': 'back !important'
                    });

            } else if (this.getAttributes().theme === "sand") {
                editor.Css.setRule(
                    `.footer-section`, { 
                        'background-color': '#f6d7b0',
                        'color': 'back !important'
                    });
                editor.Css.setRule(
                    `.footer-section a`, {
                        'color': 'back !important'
                    });

            }
          },
        },
    });
    //#endregion 
}