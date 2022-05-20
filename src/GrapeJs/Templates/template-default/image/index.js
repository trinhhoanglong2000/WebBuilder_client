import $ from "jquery";

export default function loadImage(editor, opt = {}) {
    const c = opt;
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;
    const am = editor.AssetManager;

    bm.add('image', {
        label: "Image",
        category: "Media",
        // attributes
        content: {
            name: 'image',
            type: 'imageCustomType',
            draggable: ".main-content",
            attributes: { class: "container text-center", name: 'image' },
            content: `<img src="https://dummyimage.com/600x400/55595c/fff" class="img-thumbnail"></img>`
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
            const target = editor.getSelected();

            changeBtn.onclick = () => {
                am.open({
                    select(asset, complete) {
                        inputImage.src = asset.getSrc();

                        target.set('content', `<img src="${asset.getSrc()}" class="img-thumbnail">`);
                        
                        if (!c.validURL(asset.getSrc())) {
                            c.addTarget64Image({id: asset.cid, target: target})
                        }

                        am.close();
                    },

                });
            };

            removeBtn.onclick = () => {
                target.set('content', `<img src="${trait.get('src')}" class="img-thumbnail">`);
                inputImage.src = trait.get('src');
            };

            return el;
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
                    }
                ],
            },

            init() {

            },
            initData() {
                
            },

        },
    });
}