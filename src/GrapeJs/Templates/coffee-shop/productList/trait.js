import $ from "jquery";
import AbortController from "abort-controller";
import { readCookie } from "../../../../helper/cookie";
import {  setAttribute } from "../../../../helper/utils";

export default function loadTraitProduct(editor, opt = {}) {
  let controller;
  var GetRequest = async (url) => {
    controller = new AbortController();
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${readCookie('token')}`,
      },
      signal: controller.signal,
      redirect: "follow",
    });
    return response.json();
  };
  //#region productList
  editor.TraitManager.addType("product-collection", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const el = document.createElement("div");
      let initValue = trait.target.attributes.attributes['data-ez-mall-collection'] || "";
      
      el.innerHTML = `
          <div class="Modal-popup dnone" style="">
  
            <div class ="d-flex border-bottom mb-3 p-3">
              <h5 class="flex-grow-1" style="margin-bottom:0;display:flex;align-items:center">
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
            <a  style="width: 100%;font-size: 100%;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Change
            </a>
            <div  style="width: 100%;font-size: 120%; margin-top:10px" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#"><span style ="font-size:16px"><i style ="width:20px"class="fa fa-pencil-square-o" aria-hidden="true"></i></span> Change 
            </a>
            <a class="dropdown-item" href="#"> <span style ="font-size:16px"><i style ="width:20px" class="fa fa-trash-o" aria-hidden="true"></i></span>  Delete 
            </a>
            </div>
  
            </div>         
          </div>
  
  
        `;
      el.style = "position:relative";
      $(el)
        .find(".Modal-popup .close-btn")
        .on("click", function () {
          $(el).find(".Modal-popup").toggle(200);
        });
      $(el)
        .find(".dropdown-item")
        .each((i) => {
          let func;
          if (i == 0) {
            func = function () {
              $(el).find(".Modal-popup").toggle(200);
            };
          } else {
            func = (ev) => {
              // trait.target.setAttributes({...trait.target.getAttributes(),['data-ez-mall-collection']:""})
              $(".Modal-popup ul li").removeClass("active");
              $(el).find(".Modal-popup ul li").find(".check-item").fadeOut(0);
              $(el).find(".name-collection").text("")
              this.onChange(ev)
            };
          }

          $($(el)
            .find(".dropdown-item").get(i)).on("click", func);
        });
      const GetItem = (name = "", flag = false) => {
        if ($(el).find('#loadingDiv').length === 0) {
          $(el).find(".Modal-popup ul").empty().append(`<div id="loadingDiv">
          <div ></div>
        </div>`);
        }
        GetRequest(
          `${process.env.REACT_APP_API_URL}stores/${opt.storeId}/collections/product?name=${name.trim()}`
        ).then((data) => {
          let domdata = "";
          initValue = trait.target.attributes.attributes['data-ez-mall-collection'] || "";
          data.data.forEach((element) => {
            domdata += `<li data-value = "${element.id}" name="${element.name}" >
              <div style="width: 100%;display: flex;align-items: center;" class="btn border-bottom py-3">
              
                <div class="Picture" >
                  <img style= "width: 32px;height: 32px;" src="${element.thumbnail
                ? element.thumbnail
                : "https://img.icons8.com/fluency-systems-regular/48/000000/image.png"
              }"/>
  
  
                </div>
                <div style ="text-align:left;flex-grow:1;font-size:12px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2; line-clamp: 2;-webkit-box-orient: vertical; padding: 5px;
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
          if (!flag) {
            $(el).find(".Modal-popup ul").find('#loadingDiv').remove();
            $(el).find(".Modal-popup ul").append(domdata);
          }
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
      GetItem()
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
    onEvent({ elInput, component, event }) {
      if (event.type == 'change') return
      const data = $(elInput).find('.Modal-popup ul li.active').data('value') || ""
      setAttribute(component,{
        'data-ez-mall-collection': data
      })
      //#1 when option change we will get new option => change HTML following option
    },
    onUpdate({ elInput, component }) {
      let initValue = component.attributes.attributes['data-ez-mall-collection'] || "";
      const onClickButton = $(elInput).find(`[data-value="${initValue}"]`)
      // console.log($(elInput).find(`[data-value="${initValue}"]`))
      $(".Modal-popup ul li").removeClass("active");
      $(onClickButton).addClass("active");
      $(".Modal-popup ul li").find(".check-item").fadeOut(0);
      $(".Modal-popup ul li.active").find(".check-item").fadeIn(0);

      let name = $(onClickButton).attr('name')
      $(elInput).find(`.card .name-collection`).text(name)
    },
  });
  editor.TraitManager.addType("product-heading", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const placeholder = trait.get("placeholder") || "";
      const el = document.createElement("div");
      el.innerHTML = `
  
          <div class="gjs-field gjs-field-text">
            <input class="Product-Heading"placeholder="${placeholder} "  />
           
          </div>
        `;

      $(el)
        .find("input")
        .on("input", (ev) => this.onChange(ev));

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector(".Product-Heading");

      let data = inputType.value;
      //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
      if (component.get('components').where({ name: "Text" })[0].get("content") !== data) {
        component.get('components').where({ name: "Text" })[0].set({ content: data });
      }
    },
    onUpdate({ elInput, component }) {
      const initValue = component.get('components').where({ name: "Text" })[0].get("content") || "";
      $(elInput).find(`input`).val(initValue);

    },
  });
  editor.TraitManager.addType("product-heading-align", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      //.Radio-Group CSS in CAnvas CSS

      const el = document.createElement("div");
      el.innerHTML = `
  
          <div class="Radio-Group gjs-one-bg">
              <input id="left" type="radio" name="alignment" value="left" style="display:none" />
  
              <label for="left"class="label-radio" style="border-right: none;border-top-left-radius: 5px;border-bottom-left-radius: 5px;" >
                  <i class="fa fa-align-left" aria-hidden="true"></i>
              </label>
  
              <input id="center" type="radio" name="alignment" value="center" style="display:none" />
              <label for="center"class="label-radio">
                  <i class="fa fa-align-center" aria-hidden="true"></i>
              </label>
  
              <input id="right" type="radio" name="alignment" value="right" style="display:none" />
              <label for="right"class="label-radio" style="border-left: none;border-top-right-radius: 5px;border-bottom-right-radius: 5px;" >
                  <i class="fa fa-align-right" aria-hidden="true"></i>
  
              </label>
          </div>
        `;

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector(
        'input[name="alignment"]:checked'
      );

      let data = inputType.value;
      // editor.Selectors.setState('after');
      // console.log(editor.Selectors.getState())
      component.get('components').where({ name: "Text" })[0].setStyle({ ...component.get('components').where({ name: "Text" })[0].getStyle(), "text-align": data });
    },
    onUpdate({ elInput, component }) {
      const initValue = component.get('components').where({ name: "Text" })[0].getStyle()["text-align"] || "center";
      $(elInput).find(`#${initValue}`).prop("checked", true);

    },
  });


}
