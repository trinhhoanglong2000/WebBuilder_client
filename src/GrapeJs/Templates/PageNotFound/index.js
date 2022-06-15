const domc = editor.DomComponents;
export default function loadBlockPageNotFound(editor, opt = {}) {
    editor.BlockManager.add("pageNotFound", {
        label: "Page Not Found",
        attributes: { class: "fa fa-picture-o" },
        category: "Other",
        content: {
          type: "pageNotFound",
          content: `
            <div class="container">
                <div class="row">
                    <div class="col-8 d-flex align-items-center justify-content-center">
                        <div>
                            <h1> ERROR 404! </h1>
                            <h2> Sorry, page couldn't found... </h2>
                            <a href="#"> Back home </a>
                        </div>
                    </div>
                    <div class="col error-img"  style="background: url('../FNP.png'); background-repeat: no-repeat; background-position: center">
                    </div>
                </div>
            </div>
          `
        },
    });

    domc.addType("pageNotFound", {
        model: {
          defaults: {
            name: "pageNotFound",
            attributes: { class: "", name: "pageNotFound" },
            removable: false,
            draggable: ".main-content",
            droppable: false,
            highlightable: false,
            copyable: false,
            selectable: false,
            hoverable: false,
            editable : false,
          },
          init() {
          },
    
          updated(property, value, prevValue) {
          },
          initData() {},
    
        },
      });
}