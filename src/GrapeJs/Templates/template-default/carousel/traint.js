import $ from "jquery";
export default function loadTraitCarousel(editor, opt = {}) {
  //NODE SAVE HTML $(".gjs-frame").contentDocument.querySelector("html")
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

  editor.TraitManager.addType("banner-text-color", {
    noLabel: false,
    createLabel({ label }) {
      return `<div>
          ${label}
        </div>`;
    },

    createInput({ trait }) {
      let textOptionsData = [
        { id: "white", name: "White" },
        { id: "black", name: "Black" },
      ];

      // #3 Create HTML selected for trait option 
      const el = document.createElement('div');
      el.innerHTML = `
        
        <div data-input="">
        <select class="options-carousel-description-align" optionType="text-color">
              ${textOptionsData.map(opt => opt.id == trait.target.attributes.attributes.textColor ?
        `<option value="${opt.id}" selected>${opt.name}</option>`
        : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>

        </div>
        <div class="gjs-sel-arrow">
          <div class="gjs-d-s-arrow"></div>
        </div>
      `;
      // #4 Add  event => when selected change =


      const inputTypeTextColor = el.querySelector('.options-carousel-description-align');
      inputTypeTextColor.addEventListener('change', ev => {
      });

      return el
    },
    onUpdate({ elInput, component }) {
      $(elInput).find(".options-carousel-description-align").val(component.getAttributes().textColor);
      const inputTypeTextColor = elInput.querySelector(".options-carousel-description-align");
      inputTypeTextColor.dispatchEvent(new CustomEvent("change"));
    },
    onEvent({ elInput, component, event }) {
      let inputTextColor = elInput.querySelector(".options-carousel-description-align");
      let textColor = inputTextColor.value;
      if (component.getAttributes().textColor != textColor) {
        let oldType = component.getAttributes().textColor;
        const attr =
        {
          ...component.get('attributes'),
          'textColor': textColor
        }
  
        delete attr.class;
        
      component.set('attributes', attr)
        component.removeClass(`carousel-text-${oldType}`);
        component.addClass(`carousel-text-${textColor}`);
      }
    },
  });
  editor.TraitManager.addType("banner-text-display", {
    // Disbale label custom - set false for use createLabel below
    noLabel: false,
    // Label custom for trait
    createLabel({ label }) {
      return `<div>
          ${label}
        </div>`;
    },
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      // #1 Get data form api and pour to "data"
      const data = JSON.parse(localStorage.getItem('crouselOptions'));
      // #2 Convert data to trait option 
      let traitOptionsData = [];

      let displayOptionsData = [
        { id: "top-center", name: "Top Center" },
        { id: "top-left", name: "Top Left" },
        { id: "top-right", name: "Top Right" },
        { id: "middle-center", name: "Middle Center" },
        { id: "middle-left", name: "Middle Left" },
        { id: "middle-right", name: "Middle Right" },
        { id: "bottom-center", name: "Bottom Center" },
        { id: "bottom-left", name: "Bottom Left" },
        { id: "bottom-right", name: "Bottom Right" },
        { id: "off", name: "Off" },
      ];

      // #3 Create HTML selected for trait option 
      const el = document.createElement('div');
      el.innerHTML = `


        <div data-input="">
         <select class="options-carousel-display " optionType="display">
              ${displayOptionsData.map(opt => opt.id == trait.target.attributes.attributes.displayType ?
        `<option value="${opt.id}" selected>${opt.name}</option>`
        : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>

        </div>
        <div class="gjs-sel-arrow">
          <div class="gjs-d-s-arrow"></div>
        </div>
      `;
      // #4 Add  event => when selected change =

      const inputdisplayOptionsData = el.querySelector('.options-carousel-display');
      inputdisplayOptionsData.addEventListener('change', ev => {
      });
      return el
    },
    // THIS FUNCTION WORK WHEN USER CLICK TO TRAIT SETTING or NEXT OF onEvent function
    onUpdate({ elInput, component }) {
      //#1 Get attribute data for update something
      $(elInput).find(".options-carousel-display").val(component.getAttributes().displayType);

      const inputdisplayOptionsData = elInput.querySelector(".options-carousel-display");

      inputdisplayOptionsData.dispatchEvent(new CustomEvent("change"));
    },
    // IN MY OPINION THIS FUNCTION WORK WHEN USER CHANGE OPTION - IF U KNOW IT WORK PLS CMT HERE
    onEvent({ elInput, component, event }) {

      //#1 when option change we will get new option => change HTML following option
      let inputdisplayOptionsData = elInput.querySelector(".options-carousel-display");
      let displayType = inputdisplayOptionsData.value;

      //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
      let oldType = component.getAttributes().displayType;
      component.removeClass(`carousel-display-${oldType}`);
      component.addClass(`carousel-display-${displayType}`);

      const attr =
      {
        ...component.get('attributes'),
        'displayType': displayType
      }

      delete attr.class;

      component.set('attributes', attr)

    },
  });
  editor.TraitManager.addType("carousel-collection", {
    // Expects as return a simple HTML string or an HTML element

    createInput({ trait }) {
      const el = document.createElement("div");
      let initValue = trait.target.attributes.attributes.data;
      if (trait.target.attributes.attributes.data) {

      }
      el.innerHTML = `
            <div class="Modal-popup dnone" style="">
    
              <div class ="d-flex border-bottom mb-3 p-3">
                <h5 class="flex-grow-1">
                Select collection
                </h5> 
                <button type="button" class="btn close-btn">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="input-group" >
                <div class="form-outline d-flex w-100 border rounded  ml-1 mr-2 mt-1" >
                    <input type="search" id="form1" class="form-control pr-0" style="border:none" placeholder = "Search"/>
                    <button type="button " class="btn">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
              <div>
                <ul   style="list-style: none;padding:0" > 
                </ul>
              </div>
            </div>
            <div class="card">
              <div class= "card-body" >
                <div class="Collection-content d-lg-flex mb-3">
                <div style="font-size: 24px;margin-right: 20px;">
                  <i class="fa fa-tags" aria-hidden="true"></i>
                </div>
                <div class="name-collection" style = "overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2; /* number of lines to show */ line-clamp: 2;-webkit-box-orient: vertical;
              " > 
                </div>
                </div>
                <div class="type-collection" style="color:rgb(109, 113, 117)">
                  Collection
                </div>
              </div>         
              <div style = "border-top: 1px solid #0000004d"class= "card-body" >
              <a  style="width: 100%;font-size: 100%;" class="btn btn-primary banner-toggle text-white" role="button" id="dropdownMenuLink">
                Change
              </a>
              </div>         
            </div>
          `;
      el.style = "position:relative";
      $(el)
        .find(".Modal-popup .close-btn")
        .on("click", function () {
          $(el).find(".Modal-popup").toggle(200);
        });
      $($(el)
        .find(".banner-toggle").get(0)).on("click", function () {
          $(el).find(".Modal-popup").toggle(200);
        });
      const GetItem = (name = "", flag = false) => {
        GetRequest(
          `${process.env.REACT_APP_API_URL}collections/banner`
        ).then((myJson) => {

          let data = myJson.data.map((value) => { return { id: value.id, name: value.name } });
          let domdata = "";
          data.forEach((element) => {
            domdata += `<li data-value = "${element.id}" name="${element.name}" >
                <div style="width: 100%;display: flex;align-items: center;" class="btn border-bottom py-3">
                
                  <div class="Picture" >
                    <img style= "width: 32px;height: 32px;" src="${element.thumbnail
                ? element.thumbnai
                : "https://img.icons8.com/fluency-systems-regular/48/000000/image.png"
              }"/>
    
                  </div>
                  <div style ="text-align:left;flex-grow:1;font-size:12px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2; /* number of lines to show */ line-clamp: 2;-webkit-box-orient: vertical;
                  " >
                  ${element.name}
                  </div>
                  <div class="check-item mr-2">
                  <i class="far fa-check-circle"></i>
                  </div>
                </div>  
                
                </li>`;
          });
          //  Item section
          if (!flag)
            $(el).find(".Modal-popup ul").append(domdata);
          else
            $(el).find(".Modal-popup ul").empty().append(domdata);


          $(el).find(".Modal-popup ul li").find(".check-item").fadeOut(0);
          //init
          $(el).find(`.Modal-popup ul li[data-value="${initValue}"]`).addClass('active')
          $(el).find(`.Modal-popup ul li[data-value="${initValue}"] .check-item`).fadeIn(0)

          let name = $(el).find(`.Modal-popup ul li[data-value="${initValue}"]`).attr('name')
          $(el).find(`.card .name-collection`).text(name)

          $(el)
            .find(".Modal-popup ul li")
            .hover(
              function () {
                if ($(this).hasClass("active")) return;
                $(this).find(".check-item").fadeIn(100);
              },
              function () {
                if ($(this).hasClass("active")) return;
                $(this).find(".check-item").fadeOut(100);
              }
            );
          $(el)
            .find(".Modal-popup ul li")
            .on("click", function (ev) {
              $(".Modal-popup ul li").removeClass("active");
              $(this).addClass("active");
              $(".Modal-popup ul li").find(".check-item").fadeOut(0);
              $(".Modal-popup ul li.active").find(".check-item").fadeIn(0);

              let name = $(this).attr('name')
              $(el).find(`.card .name-collection`).text(name)
            });

          // 
          $(el)
            .find(".Modal-popup ul li")
            .on("click", (ev) => {
              this.onChange(ev)
            });

        }).catch(function (e) {
        });;
      };
      GetItem();
      //  INPUT
      $(el)
        .find(".Modal-popup input")
        .on("input", function () {
          controller.abort();
          GetItem($(this)[0].value, true)
        });

      // $(el)
      // .find("input")
      // .on("input", (ev) => this.onChange(ev));
      return el;
    },
    onUpdate({ elInput, component }) {
      //#1 Get attribute data for update something
      $(elInput).find(`.Modal-popup ul li.active`).removeClass("active").find(".check-item").fadeOut(0);;
      const name = $(elInput).find(`.Modal-popup ul li[data-value = "${component.getAttributes().data}"]`).attr('name');
      $(elInput).find(`.card .name-collection`).text(name)
      $(elInput).find(`.Modal-popup ul li[data-value = "${component.getAttributes().data}"]`).addClass('active').find(".check-item").fadeIn(0);;
    },
    onEvent({ elInput, component, event }) {

      if (event.type == 'change') return
      const data = $(elInput).find('.Modal-popup ul li.active').data('value') || ""
      if (component.getAttributes().data != data) {
        const attr =
        {
          ...component.get('attributes'),
          'data': data
        }

        delete attr.class;

        component.set('attributes', attr)
      }
      //#1 when option change we will get new option => change HTML following option
    },
  });

  editor.TraitManager.addType("banner-description-align", {
    noLabel: false,
    createLabel({ label }) {
      return `<div>
          ${label}
        </div>`;
    },

    createInput({ trait }) {
      let textOptionsData = [
        { id: "center", name: "Align Center" },
        { id: "left", name: "Align Left" },
        { id: "right", name: "Align Right" },
      ];

      // #3 Create HTML selected for trait option 
      const el = document.createElement('div');
      el.innerHTML = `
        
        <div data-input="">
        <select class="options-carousel-description-align" optionType="text-color">
              ${textOptionsData.map(opt => opt.id == trait.target.attributes.attributes.descriptionAlign ?
        `<option value="${opt.id}" selected>${opt.name}</option>`
        : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>

        </div>
        <div class="gjs-sel-arrow">
          <div class="gjs-d-s-arrow"></div>
        </div>
      `;
      // #4 Add  event => when selected change =


      const inputType = el.querySelector('.options-carousel-description-align');
      inputType.addEventListener('change', ev => {
      });

      return el
    },
    onUpdate({ elInput, component }) {
      $(elInput).find(".options-carousel-description-align").val(component.getAttributes().descriptionAlign);
      const inputType = elInput.querySelector(".options-carousel-description-align");
      inputType.dispatchEvent(new CustomEvent("change"));
    },
    onEvent({ elInput, component, event }) {
      let input = elInput.querySelector(".options-carousel-description-align");
      let descriptionAlign = input.value;
      let oldType = component.getAttributes().descriptionAlign;

      const attr =
      {
        ...component.get('attributes'),
        'descriptionAlign': descriptionAlign
      }

      delete attr.class;

      component.set('attributes', attr)
      component.removeClass(`carousel-description-align-${oldType}`);
      component.addClass(`carousel-description-align-${descriptionAlign}`);
    },
  });

  editor.TraitManager.addType("banner-height", {
    noLabel: false,
    createLabel({ label }) {
      return `<div>
          ${label}
        </div>`;
    },

    createInput({ trait }) {
      let textOptionsData = [
        { id: "small", name: "Small" },
        { id: "medium", name: "Medium" },
        { id: "lager", name: "Lager" },
      ];

      // #3 Create HTML selected for trait option 
      const el = document.createElement('div');
      el.innerHTML = `
        
        <div data-input="">
        <select class="options-carousel-height" optionType="text-color">
              ${textOptionsData.map(opt => opt.id == trait.target.attributes.attributes.bannerHeight ?
        `<option value="${opt.id}" selected>${opt.name}</option>`
        : `<option value="${opt.id}" >${opt.name}</option>`).join('')}
            </select>

        </div>
        <div class="gjs-sel-arrow">
          <div class="gjs-d-s-arrow"></div>
        </div>
      `;
      // #4 Add  event => when selected change =


      const inputType = el.querySelector('.options-carousel-height');
      inputType.addEventListener('change', ev => {
      });

      return el
    },
    onUpdate({ elInput, component }) {
      $(elInput).find(".options-carousel-height").val(component.getAttributes().bannerHeight);
      const inputType = elInput.querySelector(".options-carousel-height");
      inputType.dispatchEvent(new CustomEvent("change"));
    },
    onEvent({ elInput, component, event }) {
      let input = elInput.querySelector(".options-carousel-height");
      let bannerHeight = input.value;
      let oldType = component.getAttributes().bannerHeight;
      const attr =
      {
        ...component.get('attributes'),
        'bannerHeight': bannerHeight
      }

      delete attr.class;

      component.set('attributes', attr)
      component.removeClass(`carousel-height-${oldType}`);
      component.addClass(`carousel-height-${bannerHeight}`);
    },
  });


  editor.TraitManager.addType("banner-description-background", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const initValue = trait.target.attributes.attributes.descriptionBackground ? true : false;
      const el = document.createElement("div");
      el.innerHTML = `
          <div class="gjs-one-bg">
            <label class="checkbox-product gjs-label-wrp" for="border" >
              <input class ="checkbox-input" type="checkbox" id="border" name="border" ${initValue ? "checked" : ""} >
              <div class="checkbox_box"></div>
              Show
            <label/>
          </div>
          `;

      $(el).find(`input`).prop("checked", initValue);

      return el;
    },
    onUpdate({ elInput, component }) {
      $(elInput).find("input").val(component.getAttributes().descriptionBackground);
      $(elInput).find("input").prop("checked", component.getAttributes().descriptionBackground);
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector("input");
      let descriptionBackground = inputType.checked;
      
      const attr =
      {
        ...component.get('attributes'),
        'descriptionBackground': descriptionBackground
      }
      delete attr.class;
      component.set('attributes', attr)

      if (inputType.checked) {
        component.addClass(`carousel-description-background`);
      } else {
        component.removeClass(`carousel-description-background`);
      }
    },
  });
}