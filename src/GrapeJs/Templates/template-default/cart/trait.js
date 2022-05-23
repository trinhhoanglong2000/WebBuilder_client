import $ from "jquery";
import Quill from "quill";
export default function loadTraitCart(editor, opt = {}) {
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
}