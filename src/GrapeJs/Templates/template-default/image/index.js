import $ from "jquery";

export default function loadImage(editor, opt = {}) {
    const c = opt;
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;
    const am = editor.AssetManager;

    bm.add('image', {
        label: "Image",
        attributes: { class: "fa fa-picture-o" },
        category: "Media",
        content: {
            name: 'image',
            type: 'imageCustomType',
            draggable: ".main-content",
            droppable: false,
            attributes: { class: "text-center container", name: 'image' },
            components: [
                {
                    tagName: 'img',
                    layerable: false,
                    hoverable: false,
                    selectable: false,
                    draggable:  false,
                    attributes: { class: "img-thumbnail", src: "https://dummyimage.com/600x400/55595c/fff" },
                }
            ]
        }
    });

    editor.TraitManager.addType('image-upload-image', {
        createInput({ trait }) {
            const initValue = trait.target.view.el.querySelector("img").src;
            const el = document.createElement('div');
            el.innerHTML = `
            <div class="card upload-image-area">
                <div class="card-body">
                    <div class="target-img">
                        <img src=${initValue?? trait.get('src')} class="card-img-top"/>
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

                        target.setAttributes({...target.getAttributes(), 'src': asset.getSrc()  })
                        
                        if (!c.validURL(asset.getSrc())) {
                            c.addTarget64Image({id: asset.cid, target: target})
                        }

                        am.close();
                    },

                });
            };

            removeBtn.onclick = () => {
                target.setAttributes({...target.getAttributes(), 'src': trait.get('src') });
                inputImage.src = trait.get('src');
            };

            return el;
        },
    });

    editor.TraitManager.addType("image-witdh", {
        createInput({ trait }) {
        const el = document.createElement("div");
        const initValue = trait.target.get("components").models[0].getStyle()["width"]?.replace("px", "") ?? 0;
        
        el.innerHTML = `
            <div class="d-flex align-items-center gjs-one-bg">
                <input type="range" id="image-width" style = "outline: none; background-color: #aaa; height: 3px; width: 100%; margin: 10px auto;" class="image-width p-0" 
                    min="560" max="1200" value="${initValue}" step="5">
                <label class="image-width-value m-0" for="image-width"> 0px </label>
            </div>
            `;
        $(el).find("label.image-width-value").text(initValue + "px");
    
        return el;
        },

        onEvent({ elInput, component, event }) {
            const value = $(elInput).find("input.image-width")[0].value;
            $(elInput).find("label.image-width-value").text(value + "px");
            component.get("components").models[0].setStyle({ ...component.get("components").models[0].getStyle(), "width": value + "px" });
        },
    });

    editor.TraitManager.addType("image-radius", {
        createInput({ trait }) {
        const el = document.createElement("div");
        const initValue = trait.target.get("components").models[0].getStyle()["border-radius"]?.replace("%", "") ?? 0;

        el.innerHTML = `
            <div class="d-flex align-items-center gjs-one-bg">
                <input type="range" id="image-radius" style = "outline: none; background-color: #aaa; height: 3px; width: 100%; margin: 10px auto;" class="image-radius p-0" 
                    min="0" max="50" value="${initValue}" step="5">
                <label class="image-radius-value m-0" for="image-radius"> 0 </label>
            </div>
            `;
        $(el).find("label.image-radius-value").text(initValue + "%");
    
        return el;
        },
        onEvent({ elInput, component, event }) {
            const value = $(elInput).find("input.image-radius")[0].value;

            $(elInput).find("label.image-radius-value").text(value + "%");
            component.get("components").models[0].setStyle({ ...component.get("components").models[0].getStyle(), "border-radius": value + "%" });
        },
    });

    editor.TraitManager.addType("image-advance-setting", {
        createInput({ trait }) {
            const el = document.createElement("div");  
            const initValue = trait.target.getAttributes().class.includes("fluid");

            el.innerHTML = `
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input image-fullwidth" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Full width
                    <label/>
                </div>
            `;

            $(el)
                .find("input.image-fullwidth")
                .prop('checked', initValue)

            return el;
        },

        onEvent({ elInput, component, event }) {
            const isFullWidth = elInput.querySelector('input.image-fullwidth').checked;

            if (isFullWidth) {
                component.setAttributes({...component.getAttributes(), 'class': 'text-center container-fluid' })
            } else {
                component.setAttributes({...component.getAttributes(), 'class': 'text-center container' })
            }
        },
    });

    dc.addType('imageCustomType', {
        model: {
            defaults: {
                traits: [
                    {
                        type: 'image-upload-image',
                        label: 'Image',
                        src: "https://dummyimage.com/230x150/55595c/fff",
                    },
                    {
                        name: 'width',
                        type: 'image-witdh',
                        label: 'Image Width',
                    },
                    {
                        name: 'radius',
                        type: 'image-radius',
                        label: 'Image Radius',
                    },
                    {
                        name: 'setting',
                        label: 'Advance-setting',
                        type: 'image-advance-setting',
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