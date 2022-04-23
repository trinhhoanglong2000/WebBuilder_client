import loadTraitProductPage from "./trait";
import loadComponentsProductPage from "./components";
export default function loadBlockProductPage(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  //#region productList
  loadTraitProductPage(editor, c);
  loadComponentsProductPage(editor, c);

  bm.add("ProductPage", {
    label: `
      <div>${"ProductPage"}</div> `,
    category: c.catergory_product_list,

    attributes: { class: "fa fa-header " },
    content: {
      attributes: {
        class: "container",
        name: "products-section",
      },
      name: "ProductSection",
      draggable: ".main-content",
      type: "ProductPage",
      copyable: false,
      removable: true,
      droppable: false,
      components: [
        {
          tagName:'h2',
          name: "Text",
          attributes: {
            class: "section-header",
            name: "products-section-text",
          },
          content: `Products`,
          style: { "text-align": "center" },
          type: "product-text",
          highlightable: true,
          copyable: false,
          selectable: true,
          hoverable: true,
          removable: false,
          droppable: false,
          draggable: false,
        },
        {
          name: "ProductFilter",
          content: `
          <div class="Form-input form-outline d-flex w-100 border rounded  ml-1 mr-2 mt-1">

				<input type="search" id="form1" class="form-control pr-0" style="border:none" placeholder="Search" />
				<button type="button" class="btn disabled" aria-disabled="true" class="btn">
					<i class="fa fa-search" aria-hidden="true"></i>
				</button>

			</div>
			<div class="flex-column flex-sm-row d-flex align-items-center  mt-2 ">
				<div class="d-flex align-items-center flex-grow-1">
					<label><i>Filter:</i></label>
					<div class="dropdown">
						<button class="btn dropdown-toggle shadow-none" type="button" id="dropdownMenuButton1"
							data-bs-toggle="dropdown" aria-expanded="false">
							Availability
						</button>
						<div class="dropdown-menu dropdown-menu-end dropdown-menu-sm-start"
							style="width: 300px;left:-65px!important" aria-labelledby="dropdownMenuButton1">
							<div style="font-size: 14px;" class="border-bottom py-3">0 selected</div>
							<div class="my-3 mx-3">
								<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
								<label for="vehicle1">In stock</label><br>
								<input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
								<label for="vehicle2">Out of stock</label><br>

						
							</div>

						</div>
					</div>
					<div class="dropdown">
						<button class="btn dropdown-toggle shadow-none" type="button" id="dropdownMenuButton2"
							data-bs-toggle="dropdown" aria-expanded="false">
							Price
						</button>
						<div class="dropdown-menu dropdown-menu-end dropdown-menu-sm-start"
							style="width: 300px;left:-65px!important" aria-labelledby="dropdownMenuButton2">
							<div style="font-size: 14px;" class="border-bottom py-3">The highest price is $10.00 </div>
							<div class="d-flex my-3">
								<input type="text" class="form-control" style="margin-left: 10px;" placeholder="From"
									aria-label="Username" aria-describedby="basic-addon1">
								<div style="width: 30px;">

								</div>
								<input type="text" class="form-control" style="margin-right: 10px;" placeholder="To"
									aria-label="Username" aria-describedby="basic-addon1">
							</div>

						</div>

					</div>

				</div>
				<div class="d-flex align-items-center">
					<label><i>Sort by: </i></label>
					<select class="form-select" style="width: auto;" aria-label="Default select example">
						<option selected>Open this select menu</option>
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>
				</div>
			</div>
          `,
          highlightable: false,
          copyable: false,
          selectable: false,
          hoverable: false,
          removable: false,
          droppable: false,
          draggable: false,
          layerable: false,
        },

        {
          name: "ProductGrid",
          content: `
          <div class="row">
          <div class="col-md-3 col-sm-4">
              <div class="single-new-arrival">
                  <div class="single-new-arrival-bg">
                      <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                          alt="new-arrivals images">
                      <div class="single-new-arrival-bg-overlay"></div>

                      <div class="new-arrival-cart">
                          <p>
                              <span class="lnr lnr-cart"></span>
                              <a href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add <span>to
                                  </span> cart</a>
                          </p>

                      </div>
                  </div>
                  <h4><a href="#">wooden chair</a></h4>
                  <p class="arrival-product-price">$65.00</p>
              </div>
          </div>
          <div class="col-md-3 col-sm-4">
              <div class="single-new-arrival">
                  <div class="single-new-arrival-bg">
                      <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                          alt="new-arrivals images">
                      <div class="single-new-arrival-bg-overlay"></div>

                      <div class="new-arrival-cart">
                          <p>
                              <span class="lnr lnr-cart"></span>
                              <a href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add <span>to
                                  </span> cart</a>
                          </p>

                      </div>
                  </div>
                  <h4><a href="#">single armchair</a></h4>
                  <p class="arrival-product-price">$80.00</p>
              </div>
          </div>
          <div class="col-md-3 col-sm-4">
              <div class="single-new-arrival">
                  <div class="single-new-arrival-bg">
                      <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                          alt="new-arrivals images">
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="new-arrival-cart">
                          <p>
                              <span class="lnr lnr-cart"></span>
                              <a href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add <span>to
                                  </span> cart</a>
                          </p>

                      </div>
                  </div>
                  <h4><a href="#">wooden armchair</a></h4>
                  <p class="arrival-product-price">$40.00</p>
              </div>
          </div>
          <div class="col-md-3 col-sm-4">
              <div class="single-new-arrival">
                  <div class="single-new-arrival-bg">
                      <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                          alt="new-arrivals images">
                      <div class="single-new-arrival-bg-overlay"></div>

                      <div class="new-arrival-cart">
                          <p>
                              <span class="lnr lnr-cart"></span>
                              <a href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add <span>to
                                  </span> cart</a>
                          </p>

                      </div>
                  </div>
                  <h4><a href="#">stylish chair</a></h4>
                  <p class="arrival-product-price">$100.00</p>
              </div>
          </div>
          <div class="col-md-3 col-sm-4">
              <div class="single-new-arrival">
                  <div class="single-new-arrival-bg">
                      <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                          alt="new-arrivals images">
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="new-arrival-cart">
                          <p>
                              <span class="lnr lnr-cart"></span>
                              <a href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> add <span>to
                                  </span> cart</a>
                          </p>

                      </div>
                  </div>
                  <h4><a href="#">modern chair</a></h4>
                  <p class="arrival-product-price">$120.00</p>
              </div>
          </div>
          <div class="col-md-3 col-sm-4">
              <div class="single-new-arrival">
                  <div class="single-new-arrival-bg">
                      <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                          alt="new-arrivals images">
                      <div class="single-new-arrival-bg-overlay"></div>

                      <div class="new-arrival-cart">
                          <p>
                              <span class="lnr lnr-cart"></span>
                              <a href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add <span>to
                                  </span> cart</a>
                          </p>

                      </div>
                  </div>
                  <h4><a href="#">mapple wood dinning table</a></h4>
                  <p class="arrival-product-price">$140.00</p>
              </div>
          </div>
          <div class="col-md-3 col-sm-4">
              <div class="single-new-arrival">
                  <div class="single-new-arrival-bg">
                      <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                          alt="new-arrivals images">
                      <div class="single-new-arrival-bg-overlay"></div>

                      <div class="new-arrival-cart">
                          <p>
                              <span class="lnr lnr-cart"></span>
                              <a href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add <span>to
                                  </span> cart</a>
                          </p>

                      </div>
                  </div>
                  <h4><a href="#">arm chair</a></h4>
                  <p class="arrival-product-price">$90.00</p>
              </div>
          </div>
          <div class="col-md-3 col-sm-4">
              <div class="single-new-arrival">
                  <div class="single-new-arrival-bg">
                      <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                          alt="new-arrivals images">
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="new-arrival-cart">
                          <p>
                              <span class="lnr lnr-cart"></span>
                              <a href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add <span>to
                                  </span> cart</a>
                          </p>

                      </div>
                  </div>
                  <h4><a href="#">wooden bed</a></h4>
                  <p class="arrival-product-price">$140.00</p>
              </div>
          </div>
          <div class="col-md-3 col-sm-4">
              <div class="single-new-arrival">
                  <div class="single-new-arrival-bg">
                      <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                          alt="new-arrivals images">
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="new-arrival-cart">
                          <p>
                              <span class="lnr lnr-cart"></span>
                              <a href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add <span>to
                                  </span> cart</a>
                          </p>

                      </div>
                  </div>
                  <h4><a href="#">wooden bed</a></h4>
                  <p class="arrival-product-price">$140.00</p>
              </div>
          </div>


      </div>
          `,
          attributes: {
            class:"new-arrivals-content",
            name: "products-section-grid",
          },
          highlightable: false,
          copyable: false,
          selectable: false,
          hoverable: false,
          removable: false,
          droppable: false,
          draggable: false,
        },
      ],
    },
  });
  //#endregion
}
