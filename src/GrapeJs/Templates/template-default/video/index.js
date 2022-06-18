import $ from "jquery";
import { setAttribute } from "../../../../helper/utils";

export default function loadVideo(editor, opt = {}) {
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;

    bm.add('video', {
        label: "Video",
        category: "Media",
        attributes: {class: "fa fa-youtube-play" },
        content: {
            type: 'videoCustomType',
            attributes: { class: "container text-center", name: 'video' },
            components: [
                {
                    tagName: 'iframe',
                    type: "defaultCustom",
                    attributes: { width: "100%", height: "600", src:"https://www.youtube.com/embed/?", title: "YouTube video player", frameborder: "0", allow:"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture", "allowfullscreen":"" },
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
            const youtubeId = (match&&match[7].length === 11)? match[7] : false;
            if (youtubeId) {
                const embedLink = `https://www.youtube.com/embed/${youtubeId}?`;

                if (attributes.src !== embedLink) {
                    setAttribute(video, { 'src': embedLink });
                }
            }
        },

        onUpdate({ elInput, component}) {
            const initValue = component.get('components').models[0].get('attributes');
            const videoInput = $(elInput).find('.video-src');

            videoInput.val(initValue.src)
        }
    });

    editor.TraitManager.addType("video-advance-setting", {
        createInput({ trait }) {
            const el = document.createElement("div");
            el.innerHTML = `
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input video-fullwidth" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Full width
                    <label/>
                </div>

                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class="checkbox-input video-auto-play" type="checkbox" id="border"> 
                        <div class="checkbox_box"></div>
                        Auto play
                    </label>
                </div>
            
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class="checkbox-input video-loop" type="checkbox" id="border"> 
                        <div class="checkbox_box"></div>
                        Loop
                    </label>
                </div>
            
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class="checkbox-input video-control" type="checkbox" id="border">  
                        <div class="checkbox_box"></div>
                        Show Control
                    </label>
                </div>
            `;

            return el;
        },

        onEvent({ elInput, component, event }) {
            // autoplay loop control
            const autoplay = elInput.querySelector('.video-auto-play').checked;
            const loop = elInput.querySelector('.video-loop').checked;
            const control = elInput.querySelector('.video-control').checked;

            const video = component.get('components').models[0];
            const attributes = video.get('attributes');

            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = attributes.src.match(regExp);
            const youtubeId = (match&&match[7].length === 11)? match[7] : false;
            let embedLink = `https://www.youtube.com/embed/${youtubeId}?`

            embedLink += `&autoplay=${(autoplay)? '1' : '0'}`;
            embedLink += `&loop=${(loop)? '1' : '0'}&playlist=${youtubeId}`;
            embedLink += `&controls=${(control)? '1' : '0'}`;
             
            if (attributes.src !== embedLink) {
                setAttribute(video, { 'src': embedLink });
            }

            const fullwidth = elInput.querySelector('.video-fullwidth').checked;
            if (fullwidth) {
                component.removeClass('container')
                if (!component.getClasses()?.includes('container-fluid')) {
                  component.addClass('container-fluid')
                }
            } else {
                component.removeClass('container-fluid')
                if (!component.getClasses()?.includes('container')) {
                  component.addClass('container')
                }
            }
        },

        onUpdate({ elInput, component}) {
            const initValue = component.view.el.querySelector("iframe").src || "";
            const isAuto = (initValue && initValue.includes("autoplay=1"))
            const isLoop = (initValue && initValue.includes("loop=1"))
            const isControls = (initValue && initValue.includes("controls=1"))
            const isFullWidth = component.getAttributes().class?.includes("fluid");

            $(elInput).find("input.video-auto-play").prop('checked', isAuto?? false)
            $(elInput).find("input.video-loop").prop('checked', isLoop?? false)
            $(elInput).find("input.video-control").prop('checked', isControls?? false)
            $(elInput).find("input.video-fullwidth").prop('checked', isFullWidth)
        }
    });

    dc.addType('videoCustomType', {
        model: {
            defaults: {
                name: 'video',
                draggable: ".main-content",
                droppable: false,
                copyable: false,
                traits: [
                    {
                        type: 'video-src',
                        label: 'Youtube Link',
                        placeholder: 'https://www.youtube.com/...',
                    },
                    {
                        type: 'video-advance-setting',
                        label: 'Advance Setting',
                        fullwidth: false,
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