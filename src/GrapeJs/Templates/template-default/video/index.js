import $ from "jquery";

export default function loadVideo(editor, opt = {}) {
    const c = opt;
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;

    bm.add('video2', {
        label: "Video2",
        category: "Media",
        // attributes
        content: {
            name: 'video',
            type: 'videoCustomType',
            draggable: ".main-content",
            attributes: { class: "container text-center", name: 'video' },
            components: [
                {
                    tagName: 'iframe',
                    layerable: false,
                    hoverable: false,
                    selectable: false,
                    attributes: { width: "560", height: "315", src:"https://www.youtube.com/embed/?", title: "YouTube video player", frameborder: "0", allow:"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture", "allowfullscreen":"" },
                    content: `<iframe ></iframe>`
                }
            ]

        }
    });

    editor.TraitManager.addType("video-src", {
        createInput({ trait }) {
            const initValue = trait.target.view.el.querySelector("iframe").src || "";
            const placeholder = trait.get('placeholder') || "";
            const el = document.createElement("div");
            el.innerHTML = `
                <div class="gjs-field gjs-field-text">
                    <input class="video-src" placeholder="${placeholder}" value="${initValue}" />
                </div>
            `;

            $(el)
                .find("input")
                .on("input", (ev) => this.onChange(ev));

            return el;
        },

        onEvent({ elInput, component, event }) {
            const inputSrc = elInput.querySelector('.video-src').value;
            const video = component.get('components').models[0];
            const attributes = video.get('attributes');

            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = inputSrc.match(regExp);
            const youtubeId = (match&&match[7].length==11)? match[7] : false;
            const embedLink = `https://www.youtube.com/embed/${youtubeId}`

            if (attributes.src != embedLink) {
                attributes.src = embedLink
                component.get('components').models[0].view.el.src = embedLink;
            }
        },
    });

    editor.TraitManager.addType("video-auto-play", {
        createInput({ trait }) {
            const initValue = trait.target.view.el.querySelector("iframe").src || "";
            const regExp = /(\?|\&)([^=]+)\=([^&]+)/;
            const param = initValue.match(regExp);
            const isAuto = param && param.includes("autoplay=1")
            console.log(isAuto)
            const el = document.createElement("div");
            el.innerHTML = `
                <div class="gjs-field-wrp gjs-field-wrp--checkbox">
                    <label class="gjs-field gjs-field-checkbox">
                        <input type="checkbox" class= "auto-play" value="0">
                        <i class="gjs-chk-icon"></i>
                    </label>
                </div>
            `;

            // $(el)
            //     .find("input")
            //     .on("input", (ev) => this.onChange(ev));

            return el;
        },

        onEvent({ elInput, component, event }) {
            // const inputSrc = elInput.querySelector('.video-src').value;
            // const video = component.get('components').models[0];
            // const attributes = video.get('attributes');

            // var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            // var match = inputSrc.match(regExp);
            // var youtubeId = (match&&match[7].length==11)? match[7] : false;
            // var embedLink = `https://www.youtube.com/embed/${youtubeId}`

            // if (attributes.src != embedLink) {
            //     attributes.src = embedLink
            //     component.get('components').models[0].view.el.src = embedLink;
            // }
        },
    });

    dc.addType('videoCustomType', {
        model: {
            defaults: {
                attributes: { 'theme': 'white' },
                traits: [
                    {
                        type: 'video-src',
                        label: 'Youtube Link',
                        placeholder: 'https://www.youtube.com/...',
                    },
                    {
                        type: 'video-auto-play',
                        label: 'Autoplay',
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