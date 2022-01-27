export default function loadBlocks(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  let blocks = c.blocks;

  const toAdd = (name) => blocks.indexOf(name) >= 0;

  toAdd("col-card") &&
    bm.add("col-card", {
      label: c.labelcolcard,
      category: c.labelcolcard_category,
      attributes: { class: "fa fa-th" },

      content: `
      <style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 2px 16px;
}
</style>
      <div class="card">
      <img src="img_avatar.png" alt="Avatar" style="width:100%">
      <div class="container">
      <h1>Title</h1>
      <p>Description</p>
      </div>
    </div>`,
    });
  toAdd("flip-card") &&
    bm.add("flip-card", {
      label: c.labelproductcard,
      category: c.labelproductcard_category,
      attributes: { class: "fa fa-th" },

      content: `
      <style>
      .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        max-width: 300px;
        margin: auto;
        text-align: center;
        font-family: arial;
      }
      
      .price {
        color: grey;
        font-size: 22px;
      }
      
      .card button {
        border: none;
        outline: 0;
        padding: 12px;
        color: white;
        background-color: #000;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 18px;
      }
      
      .card button:hover {
        opacity: 0.7;
      }
      </style>
      <div class="card">
      <img src="https://www.w3schools.com/w3images/jeans3.jpg" alt="Denim Jeans" style="width:100%">
      <h1>Tailored Jeans</h1>
      <p class="price">$19.99</p>
      <p>Some text about the jeans..</p>
      <p><button>Add to Cart</button></p>
    </div>
    `,
    });
}
