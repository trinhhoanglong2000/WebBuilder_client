export default function loadBlocks(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  let blocks = c.blocks;
  let stylePrefix = c.stylePrefix;
  const flexGrid = c.flexGrid;
  const basicStyle = c.addBasicStyle;
  const rowHeight = c.rowHeight;
  const clsRow = `${stylePrefix}row`;
  const clsCell = `${stylePrefix}cell`;
  const styleRow = flexGrid
    ? `
      .${clsRow} {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex-wrap: nowrap;
        padding: 10px;
      }
      @media (max-width: 768px) {
        .${clsRow} {
          flex-wrap: wrap;
        }
      }`
    : `
      .${clsRow} {
        display: table;
        padding: 10px;
        width: 100%;
      }
      @media (max-width: 768px) {
        .${stylePrefix}cell, .${stylePrefix}cell30, .${stylePrefix}cell70 {
          width: 100%;
          display: block;
        }
      }`;
  const styleClm = flexGrid
    ? `
      .${clsCell} {
        min-height: ${rowHeight}px;
        flex-grow: 1;
        flex-basis: 100%;
      }`
    : `
      .${clsCell} {
        width: 8%;
        display: table-cell;
        height: ${rowHeight}px;
      }`;
  const styleClm30 = `
    .${stylePrefix}cell30 {
      width: 30%;
    }`;
  const styleClm70 = `
    .${stylePrefix}cell70 {
      width: 70%;
    }`;

  const step = 0.2;
  const minDim = 1;
  const currentUnit = 1;
  const resizerBtm = {
    tl: 0,
    tc: 0,
    tr: 0,
    cl: 0,
    cr: 0,
    bl: 0,
    br: 0,
    minDim,
  };
  const resizerRight = {
    ...resizerBtm,
    cr: 1,
    bc: 0,
    currentUnit,
    minDim,
    step,
  };

  // Flex elements do not react on width style change therefore I use
  // 'flex-basis' as keyWidth for the resizer on columns
  if (flexGrid) {
    resizerRight.keyWidth = "flex-basis";
  }

  const rowAttr = {
    class: clsRow,
    "data-gjs-droppable": `.${clsCell}`,
    "data-gjs-resizable": resizerBtm,
    "data-gjs-name": "Row",
  };

  const colAttr = {
    class: clsCell,
    "data-gjs-draggable": `.${clsRow}`,
    "data-gjs-resizable": resizerRight,
    "data-gjs-name": "Cell",
  };

  if (flexGrid) {
    colAttr["data-gjs-unstylable"] = ["width"];
    colAttr["data-gjs-stylable-require"] = ["flex-basis"];
  }

  // Make row and column classes private
  const privateCls = [`.${clsRow}`, `.${clsCell}`];
  editor.on(
    "selector:add",
    (selector) =>
      privateCls.indexOf(selector.getFullName()) >= 0 &&
      selector.set("private", 1)
  );

  const attrsToString = (attrs) => {
    const result = [];

    for (let key in attrs) {
      let value = attrs[key];
      const toParse = value instanceof Array || value instanceof Object;
      value = toParse ? JSON.stringify(value) : value;
      result.push(`${key}=${toParse ? `'${value}'` : `'${value}'`}`);
    }

    return result.length ? ` ${result.join(" ")}` : "";
  };

  const toAdd = (name) => blocks.indexOf(name) >= 0;
  const attrsRow = attrsToString(rowAttr);
  const attrsCell = attrsToString(colAttr);

  toAdd("column1") &&
    bm.add("column1", {
      label: c.labelColumn1,
      category: c.labelColumn1_category,
      attributes: { class: "gjs-fonts gjs-f-b1" },
      content: `<div ${attrsRow}>
          <div ${attrsCell}></div>
        </div>
        ${
          basicStyle
            ? `<style>
            ${styleRow}
            ${styleClm}
          </style>`
            : ""
        }`,
    });

  toAdd("column2") &&
    bm.add("column2", {
      label: c.labelColumn2,
      attributes: { class: "gjs-fonts gjs-f-b2" },
      category: c.labelColumn2_category,
      content: `<div ${attrsRow}>
          <div ${attrsCell}></div>
          <div ${attrsCell}></div>
        </div>
        ${
          basicStyle
            ? `<style>
            ${styleRow}
            ${styleClm}
          </style>`
            : ""
        }`,
    });

  toAdd("column3") &&
    bm.add("column3", {
      label: c.labelColumn3,
      category: c.labelColumn3_category,
      attributes: { class: "gjs-fonts gjs-f-b3" },
      content: `<div ${attrsRow}>
          <div ${attrsCell}></div>
          <div ${attrsCell}></div>
          <div ${attrsCell}></div>
        </div>
        ${
          basicStyle
            ? `<style>
            ${styleRow}
            ${styleClm}
          </style>`
            : ""
        }`,
    });

  toAdd("column3-7") &&
    bm.add("column3-7", {
      label: c.labelColumn37,
      category: c.labelColumn37_category,
      attributes: { class: "gjs-fonts gjs-f-b37" },
      content: `<div ${attrsRow}>
          <div ${attrsCell} style='${
        flexGrid ? "flex-basis" : "width"
      }: 30%;'></div>
          <div ${attrsCell} style='${
        flexGrid ? "flex-basis" : "width"
      }: 70%;'></div>
        </div>
        ${
          basicStyle
            ? `<style>
            ${styleRow}
            ${styleClm}
            ${styleClm30}
            ${styleClm70}
          </style>`
            : ""
        }`,
    });

  toAdd("text") &&
    bm.add("text", {
      label: c.labelText,
      category: c.labelText_category,

      attributes: { class: "fa fa-paragraph" },
      content: {
        type: "text",
        content: "Insert your text here",
        style: { padding: "10px" },
        activeOnRender: 1,
      },
    });

  toAdd("link") &&
    bm.add("link", {
      label: c.labelLink,
      category: c.labelLink_category,
      attributes: { class: "fa fa-link" },
      content: {
        type: "link",
        content: "Link",
        style: { color: "#d983a6" },
      },
    });

  toAdd("image") &&
    bm.add("image", {
      label: c.labelImage,
      category: c.labelImage_category,
      attributes: { class: "fa fa-image" },
      content: {
        style: { color: "black" },
        type: "image",
        activeOnRender: 1,
      },
    });
  toAdd("button") &&
    bm.add("button", {
      label: c.buttonBlkLabel,
      category: c.Button_category,
      content: '<a class="button">Button</a>',
      attributes: { class: "gjs-fonts gjs-f-button" },
    });
  toAdd("divider") &&
    bm.add("divider", {
      label: c.dividerBlkLabel,
      category: c.divider_category,
      content: `<table style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
          <tr>
            <td class="divider"></td>
          </tr>
        </table>
        <style>
        .divider {
          background-color: rgba(0, 0, 0, 0.1);
          height: 1px;
        }
        </style>`,
      attributes: { class: "gjs-fonts gjs-f-divider" },
    });
  bm.add("test", {
    label: "TEST",
    category: "ABC",
    
    content: {
      attributes: { class: "container" },

      content: `    
      <div class="container">
        <div class="row">
          <div class="col-md-12"> 
          dasdasdasdasdasdasdas
          </div>
        </div>
      </div>`,
      components: [
        {
          type: "Text",
          draggable: ".product-section",
          content: `<h2>Trending <b>Products</b></h2>`,
        },
        {
          type: "Products",
          content: ` <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
          <!-- Carousel indicators -->

          <!-- Wrapper for carousel items -->
          <div class="carousel-inner">
              <div class="item carousel-item active">
                  <div class="row">
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">

                              </div>
                              <div class="thumb-content">
                                  <h4>Apple iPad</h4>
                                  <p class="item-price"><strike>$400.00</strike> <span>$369.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Sony Headphone</h4>
                                  <p class="item-price"><strike>$25.00</strike> <span>$23.99</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Macbook Air</h4>
                                  <p class="item-price"><strike>$899.00</strike> <span>$649.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Nikon DSLR</h4>
                                  <p class="item-price"><strike>$315.00</strike> <span>$250.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="item carousel-item">
                  <div class="row">
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Sony Play Station</h4>
                                  <p class="item-price"><strike>$289.00</strike> <span>$269.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Macbook Pro</h4>
                                  <p class="item-price"><strike>$1099.00</strike> <span>$869.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Bose Speaker</h4>
                                  <p class="item-price"><strike>$109.00</strike> <span>$99.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Samsung Galaxy S8</h4>
                                  <p class="item-price"><strike>$599.00</strike> <span>$569.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="item carousel-item">
                  <div class="row">
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Apple iPhone</h4>
                                  <p class="item-price"><strike>$369.00</strike> <span>$349.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Canon DSLR</h4>
                                  <p class="item-price"><strike>$315.00</strike> <span>$250.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Google Pixel</h4>
                                  <p class="item-price"><strike>$450.00</strike> <span>$418.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-md-3">
                          <div class="thumb-wrapper">
                              <div class="img-box">
                                  <img src="https://dummyimage.com/600x400/55595c/fff"
                                      class="img-responsive img-fluid" alt="">
                              </div>
                              <div class="thumb-content">
                                  <h4>Apple Watch</h4>
                                  <p class="item-price"><strike>$350.00</strike> <span>$330.00</span></p>
                                  <div class="star-rating">
                                      <ul class="list-inline">
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                          <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                      </ul>
                                  </div>
                                  <a href="#" class="btn btn-primary">Add to Cart</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- Carousel controls -->
          <a class="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
              <i class="fa fa-angle-left"></i>
          </a>
          <a class="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
              <i class="fa fa-angle-right"></i>
          </a>
      </div>`,
      
        },
      ],
    },
  });
}
