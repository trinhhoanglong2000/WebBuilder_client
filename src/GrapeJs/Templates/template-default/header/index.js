export default function loadBlockHeader(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;

    const getHeaderNavigationButton = (mNavigation) => {
        let navbar = [];

        if (mNavigation){
            mNavigation.forEach((element) => {
            navbar.push({
                layerable : false,  
                draggable: false,
                hoverable: false,
                tagName: "li",
                attributes: { class: "nav-item" },
                content: `<a href="${element.link}" class="nav-link p-1"> ${element.name}</a>`,
            });
            })

            return navbar;

        };

        return navbar;
    }

    bm.add('header', {
    label: "Header",
    category: "Header",
    attributes: { class: "fa fa-header" },
    content: {
        name: "Header",
        tagName: "nav",
        type: "navbar",
        attributes: { class: "navbar navbar-expand-md border-bottom border-dark" },
        components: [
        {
            layerable : false,  
            draggable: false,
            hoverable: false,
            tagName: "div",
            attributes: { class: "container align-items-baseline" },
            components: [
            {
                layerable : false,  
                draggable: false,
                hoverable: false,
                tagName: "button",
                attributes: { class:"navbar-toggler", type:"button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                content: `<i class="fa fa-bars"></i>`,
            },
            {
                layerable : false,  
                draggable: false,
                hoverable: false,
                tagName: "a",
                attributes: { href: "#", class: "navbar-brand text-uppercase font-weight-bold" },
                content: `<h4>${c.storeName}</h4>`,
            },
            {
                layerable : false,  
                draggable: false,
                hoverable: false,
                tagName: "div",
                attributes: { class:"d-block d-md-none" },
                components: [
                {
                    layerable : false,  
                    draggable: false,
                    hoverable: false,
                    tagName: "i",
                    attributes: { class: "fa fa-search" },
                },
                {
                    layerable : false,  
                    draggable: false,
                    hoverable: false,
                    tagName: "i",
                    attributes: { class: "fa fa-shopping-bag" },
                },
                ],
            },
            {
                layerable : false,  
                draggable: false,
                hoverable: false,
                tagName: "div",
                attributes: { id: "navbarSupportedContent", class: "collapse navbar-collapse" },
                components: [
                {
                    layerable : false,  
                    draggable: false,
                    hoverable: false,
                    tagName: "ul",
                    attributes: { class: "navbar-nav" },
                    components: getHeaderNavigationButton(c.headerNavigation)
                },
                ],
            },
            {
                layerable : false,  
                draggable: false,
                hoverable: false,
                tagName: "div",
                attributes: { class:"d-none d-md-block" },
                components: [
                {
                    layerable : false,  
                    draggable: false,
                    hoverable: false,
                    tagName: "i",
                    attributes: { class: "fa fa-search icon-header" },
                },
                {
                    layerable : false,  
                    draggable: false,
                    hoverable: false,
                    tagName: "i",
                    attributes: { class: "fa fa-shopping-bag icon-header" },
                },
                ],
            },
            ]
        },
        ],
    }
    });

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
    //             type: "navbar",
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

    editor.DomComponents.addType('navbar', {
        isComponent: el => el.tagName === 'NAVBAR',
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
    
        handleThemeChange() {
            let storeCssData = {};
            
            if (this.getAttributes().theme === "white") {
                
                storeCssData[".navbar"] = "{ background-color: white !important}";
                storeCssData[".navbar a, .navbar i, .navbar a.navbar-brand:hover"] = "{ color: black !important }";
                
                // storeCssData[".offcanvas"] = "{ background-color: white, color: black !important }";
                // storeCssData[".offcanvas .btn-close"] = "{ background-color: none }";
                // storeCssData[".offcanvas a"] = "{ color: black !important }";

            } else if (this.getAttributes().theme === "black") {
                storeCssData[".navbar"] = "{ background-color: #121212 !important}";
                storeCssData[".navbar a, .navbar i, .navbar a.navbar-brand:hover"] = "{ color: white !important }";

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

            } else if (this.getAttributes().theme === "lGreen") {
                storeCssData[".navbar"] = "{ background-color: #69c5a3 !important}";
                storeCssData[".navbar a, .navbar i, .navbar a.navbar-brand:hover"] = "{ color: black !important }";

                // editor.Css.setRule(
                //     `.offcanvas`, { 
                //         'background-color': '#69c5a3',
                //         'color': 'black !important'
                //     });

                // editor.Css.setRule(
                //     `.offcanvas a`, { 
                //         'color': 'black !important'
                //     });

            } else if (this.getAttributes().theme === "lBlue") {
                storeCssData[".navbar"] = "{ background-color: #c8e1e7 !important}";
                storeCssData[".navbar a, .navbar i, .navbar a.navbar-brand:hover"] = "{ color: black !important }";

                // editor.Css.setRule(
                //     `.offcanvas`, { 
                //         'background-color': '#c8e1e7',
                //         'color': 'back !important'
                //     });

                // editor.Css.setRule(
                //     `.offcanvas a`, { 
                //         'color': 'back !important'
                //     });

            } else if (this.getAttributes().theme === "sand") {
                storeCssData[".navbar"] = "{ background-color: #f6d7b0 !important}";
                storeCssData[".navbar a, .navbar i, .navbar a.navbar-brand:hover"] = "{ color: black !important }";
                
                // editor.Css.setRule(
                //     `.offcanvas`, { 
                //         'background-color': '#f6d7b0',
                //         'color': 'back !important'
                //     });

                // editor.Css.setRule(
                //     `.offcanvas a`, { 
                //         'color': 'back !important'
                //     });
            }

            let domWrapper = editor.getWrapper().view.el;
            let domStoreStyle = domWrapper.getElementsByClassName('storeCss header')[0];
            let cssContent = "";

            for (let key in storeCssData) {
                cssContent += key + " " + storeCssData[key] + " ";
            }

            if (domStoreStyle) {
                domStoreStyle.innerHTML = cssContent;
            } else {
                domWrapper.insertAdjacentHTML('afterbegin', `<style class="storeCss header"> ${cssContent} </style>`);
            }
        },
        },
    });
}