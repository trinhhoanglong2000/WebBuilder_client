import $ from "jquery";
import Quill from "quill";
export default function loadTraiPRoduct(editor, opt = {}) {
    let controller;
    var GetRequest = async (url) => {
        controller = new AbortController();
        const response = await fetch(url, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            signal: controller.signal,
            redirect: "follow",
        });
        return response.json();
    };

    editor.TraitManager.addType("Payment-Heading", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            const initValue = trait.target.get("components").models[0].get("content") || "";
            const placeholder = trait.get("placeholder") || "";
            const el = document.createElement("div");
            el.innerHTML = `
            <div class="gjs-field gjs-field-text">
              <input class="Product-Heading"placeholder="${placeholder} " value="${initValue}" />
            </div>
          `;
            $(el)
                .find("input")
                .on("input", (ev) => this.onChange(ev));
            return el;
        },
        onUpdate({ elInput, component }) {
            const val = component.get("components").models[0].get("content") || "";
            $(elInput).find(`.Product-Heading `).val(val);
        },
        onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector(".Product-Heading");
            let data = inputType.value;
            component.get("components").models[0].set({ content: data });
        },
    });
}