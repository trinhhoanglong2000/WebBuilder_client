export default function loadBlockHeader(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    const am = editor.AssetManager;
    const dc = editor.DomComponents;

    const getHeaderLogo = () => {
        return c.logoURL ? `<img src=${c.logoURL}>` : `<h4>${c.storeName}</h4>`;
    }

    const getHeaderNavigationButton = () => {
        let navbar = [];

        if (c.headerNavigation) {
            c.headerNavigation.forEach((element) => {
                if (element.id !== c.pageId) {
                    navbar.push({
                        layerable: false,
                        draggable: false,
                        hoverable: false,
                        selectable: false,
                        dropable: false,
                        tagName: "li",
                        attributes: { class: "nav-item" },
                        content: `<a href="#" class="nav-link p-1"> ${element.name}</a>`,
                    });
                }
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
            attributes: { class: "navbar navbar-expand-md border-bottom border-dark", name: "header-navigation" },
            components: [
                {
                    layerable: false,
                    draggable: false,
                    hoverable: false,
                    selectable: false,
                    dropable: false,
                    tagName: "div",
                    attributes: { class: "container align-items-baseline" },
                    components: [
                        {
                            layerable: false,
                            draggable: false,
                            highlightable: false,
                            hoverable: false,
                            dropable: false,
                            tagName: "button",
                            attributes: { class: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                            content: `<i class="fa fa-bars"></i>`,
                        },
                        {
                            layerable: false,
                            draggable: false,
                            dropable: false,
                            hoverable: false,
                            tagName: "a",
                            attributes: { href: "#", class: "navbar-brand text-uppercase font-weight-bold" },
                            selectable: false,
                            content: getHeaderLogo(),
                        },
                        {
                            layerable: false,
                            draggable: false,
                            dropable: false,
                            hoverable: false,
                            highlightable: false,
                            selectable: false,
                            tagName: "div",
                            attributes: { class: "d-block d-md-none" },
                            components: [
                                {
                                    layerable: false,
                                    draggable: false,
                                    dropable: false,
                                    hoverable: false,
                                    selectable: false,
                                    tagName: "i",
                                    attributes: { class: "fa fa-search" },
                                },
                                {
                                    layerable: false,
                                    dropable: false,
                                    draggable: false,
                                    hoverable: false,
                                    selectable: false,
                                    tagName: "i",
                                    attributes: { class: "fa fa-shopping-bag" },
                                },
                            ],
                        },
                        {
                            layerable: false,
                            draggable: false,
                            dropable: false,
                            highlightable: false,
                            hoverable: false,
                            selectable: false,
                            tagName: "div",
                            attributes: { id: "navbarSupportedContent", class: "collapse navbar-collapse" },
                            components: [
                                {
                                    layerable: false,
                                    draggable: false,
                                    hoverable: false,
                                    dropable: false,
                                    highlightable: false,
                                    selectable: false,
                                    tagName: "ul",
                                    attributes: { class: "navbar-nav" },
                                    components: getHeaderNavigationButton()
                                },
                            ],
                        },
                        {
                            layerable: false,
                            draggable: false,
                            hoverable: false,
                            dropable: false,
                            highlightable: false,
                            selectable: false,
                            tagName: "div",
                            attributes: { class: "d-none d-md-block" },
                            components: [
                                {
                                    layerable: false,
                                    draggable: false,
                                    hoverable: false,
                                    dropable: false,
                                    selectable: false,
                                    tagName: "i",
                                    attributes: { class: "fa fa-search icon-header" },
                                },
                                {
                                    layerable: false,
                                    draggable: false,
                                    hoverable: false,
                                    selectable: false,
                                    dropable: false,
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

    editor.TraitManager.addType('header-upload-image', {
        createInput({ trait }) {
            const el = document.createElement('div');
            el.innerHTML = `
            <div class="card upload-image-area">
                <div class="card-body">
                    <img src=${trait.get('src') ?? "https://dummyimage.com/230x150/55595c/fff"} class="card-img-top"/>
                    <button type="button" class="change-btn">Change</button>
                    <button type="button" class="remove-btn">Remove</button>
                </div>
            </div>
            `;

            const changeBtn = el.querySelector('.upload-image-area .card-body button.change-btn');
            const removeBtn = el.querySelector('.upload-image-area .card-body button.remove-btn');
            const inputImage = el.querySelector('.upload-image-area .card-body img');
            changeBtn.onclick = () => {
                am.open({
                    select(asset, complete) {
                        const selected = editor.getSelected().view.el;
                        const navBrandImg = selected.querySelector('.navbar-brand img');

                        inputImage.src = asset.getSrc();

                        if (navBrandImg) {
                            navBrandImg.src = asset.getSrc();
                        } else {
                            const navBrand = selected.querySelector('.navbar-brand');
                            navBrand.innerHTML = `<img src="${asset.getSrc()}"/>`
                        }

                        am.close();
                    },

                });


            };
            
            removeBtn.onClick = () => {

            }

            return el;
        },
    });

    dc.addType('navbar', {
        isComponent: el => el.tagName === 'NAVBAR',
        model: {
            defaults: {
                attributes: { 'theme': 'white' },
                traits: [
                    {
                        type: 'select',
                        label: 'Theme color',
                        name: 'theme',
                        options: [
                            { id: 'white', name: 'White' },
                            { id: 'black', name: 'Black' },
                            { id: 'lGreen', name: 'Light Green' },
                            { id: 'lBlue', name: 'Light Blue' },
                            { id: 'sand', name: 'Sand' },
                        ]
                    },
                    {
                        type: 'header-upload-image',
                        changeProp: 1,
                        label: 'Logo image',
                        name: 'logoImage',
                        src: c.logoURL?? 'https://dummyimage.com/600x400/55595c/fff',
                    },
                    {
                        type: 'select',
                        label: 'Logo size', 
                        name: 'logoSize', 
                        options: [
                            { id: 'small', name: 'Small' },
                            { id: 'medium', name: 'Medium' },
                            { id: 'large', name: 'Large' },
                        ]
                    },
                ],
            },

            init() {
                this.on('change:attributes:theme', this.handleThemeChange);
                this.on('change:attributes:logoSize', this.handleLogoSizechange);
            },
            initData() {
                
            },


            handleThemeChange() {

                // if (this.getAttributes().theme === "white") {
                //     storeCssData["[name='header-navigation'].navbar"] = "{ background-color: white}";
                //     storeCssData["[name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover"] = "{ color: black }";
                // } else if (this.getAttributes().theme === "black") {
                //     storeCssData["[name='header-navigation'].navbar"] = "{ background-color: #121212}";
                //     storeCssData["[name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover"] = "{ color: white }";

                // } else if (this.getAttributes().theme === "lGreen") {
                //     storeCssData["[name='header-navigation'].navbar"] = "{ background-color: #69c5a3 }";
                //     storeCssData["[name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover"] = "{ color: black }";

                // } else if (this.getAttributes().theme === "lBlue") {
                //     storeCssData["[name='header-navigation'].navbar"] = "{ background-color: #c8e1e7 }";
                //     storeCssData["[name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover"] = "{ color: black }";
                // } else if (this.getAttributes().theme === "sand") {
                //     storeCssData["[name='header-navigation'].navbar"] = "{ background-color: #f6d7b0 }";
                //     storeCssData["[name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover"] = "{ color: black }";
                // }

                c.addCssStore({ "header-theme": this.getAttributes().theme });

            },

            handleLogoSizechange() {
                c.addCssStore({ "header-logoSize": this.getAttributes().logoSize });
            }
        },
    });
}


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