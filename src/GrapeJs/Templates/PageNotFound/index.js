export default function loadBlockPageNotFound(editor, opt = {}) {
  const domc = editor.DomComponents;
  if (!opt.isDeloy) {
    editor.BlockManager.add("pageNotFound", {
      label: "Page Not Found",
      attributes: { class: "fa fa-picture-o" },
      category: "Other",
      content: {
        type: "page-not-found",
        attributes: { name: "pageNotFound" },
        content: `
              <div class="container">
                  <div class="row">
                      <div class="col-md-8 col-sm-12 order-2 order-sm-0 d-flex align-items-center justify-content-center">
                          <div class="text-md-end text-center">
                              <h1> ERROR 404! </h1>
                              <h2> Sorry, page couldn't found... </h2>
                              <a href="#"> Back home </a>
                          </div>
                      </div>
                      <div class="col-md-4 col-sm-12 error-img order-1 text-md-start text-center">
                      </div>
                  </div>
              </div>
            `
      },
    });
  }


  domc.addType("page-not-found", {
    model: {
      defaults: {
        name: "Page Not Found",
        removable: !opt.isDeloy,
        draggable: !opt.isDeloy,
        selectable: !opt.isDeloy,
        droppable: !opt.isDeloy,
        highlightable: !opt.isDeloy,
        copyable: !opt.isDeloy,
        hoverable: !opt.isDeloy,
        editable: !opt.isDeloy,
      },
      init() {
      },

      updated(property, value, prevValue) {
      },
      initData() { },

    },
  });
}