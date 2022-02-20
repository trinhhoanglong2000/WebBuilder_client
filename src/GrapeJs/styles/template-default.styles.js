export default function loadStyles(editor, config) {
  const style = ` h2 {
        color: #000;
        font-size: 26px;
        font-weight: 300;
        text-align: center;
        text-transform: uppercase;
        position: relative;
        margin: 30px 0 80px;
    }

    h2 b {
        color: #ffc000;
    }

    h2::after {
        content: "";
        width: 100px;
        position: absolute;
        margin: 0 auto;
        height: 4px;
        background: rgba(0, 0, 0, 0.2);
        left: 0;
        right: 0;
        bottom: -20px;
    }

    .carousel {
        margin: 50px auto;
        padding: 0 70px;
    }

    .carousel .item {
        min-height: 330px;
        text-align: center;
        overflow: hidden;
    }

    .carousel .item .img-box {
        height: 160px;
        width: 100%;
        position: relative;
    }

    .carousel .item img {
        max-width: 100%;
        max-height: 100%;
        display: inline-block;
        position: absolute;
        bottom: 0;
        margin: 0 auto;
        left: 0;
        right: 0;
    }

    .carousel .item h4 {
      font-size: 18px;
      margin: 10px 0;
      height: 40px!important;
  }

    .carousel .item .btn {
        color: #333;
        border-radius: 0;
        font-size: 11px;
        text-transform: uppercase;
        font-weight: bold;
        background: none;
        border: 1px solid #ccc;
        padding: 5px 10px;
        margin-top: 5px;
        line-height: 16px;
    }

    .carousel .item .btn:hover,
    .carousel .item .btn:focus {
        color: #fff;
        background: #000;
        border-color: #000;
        box-shadow: none;
    }

    .carousel .item .btn i {
        font-size: 14px;
        font-weight: bold;
        margin-left: 5px;
    }

    .carousel .thumb-wrapper {
      text-align: center;
      height: 100%;
  }

    .carousel .thumb-content {
        padding: 15px;
    }

    .carousel .carousel-control {
        height: 100px;
        width: 40px;
        background: none;
        margin: auto 0;
        background: rgba(0, 0, 0, 0.2);
    }

    .carousel .carousel-control i {
        font-size: 30px;
        position: absolute;
        top: 50%;
        display: inline-block;
        margin: -16px 0 0 0;
        z-index: 5;
        left: 0;
        right: 0;
        color: rgba(0, 0, 0, 0.8);
        text-shadow: none;
        font-weight: bold;
    }

    .carousel .item-price {
        font-size: 13px;
        padding: 2px 0;
        margin: auto;
        width: 50px;
    }

    .carousel .item-price strike {
        color: #999;
        margin-right: 5px;
    }

    .carousel .item-price span {
        color: #86bd57;
        font-size: 110%;
    }

    .carousel .carousel-control.left i {
        margin-left: -3px;
    }

    .carousel .carousel-control.left i {
        margin-right: -3px;
    }

    .carousel .carousel-indicators {
        bottom: -50px;
    }

    .carousel-indicators li,
    .carousel-indicators li.active {
        width: 10px;
        height: 10px;
        margin: 4px;
        border-radius: 50%;
        border-color: transparent;
    }

    .carousel-indicators li {
        background: rgba(0, 0, 0, 0.2);
    }

    .carousel-indicators li.active {
        background: rgba(0, 0, 0, 0.6);
    }

    .star-rating li {
        padding: 0;
    }

    .star-rating i {
        font-size: 14px;
        color: #ffc000;
    }
    /*header and footer */ 
  
    
    .navbar .container {
        min-width: 100%;
        margin: 5px;
        padding: 1vh 4vw;
    }
    .footer-section {
        padding: 1vh 3vw;
    }
    
    .icon-header {
        font-size: 25px;
        padding-left: 3vw;
        padding-right: 1vw;
    }
    
    .icon-footer {
        font-size: 35px;
        padding: 0vh 1vw;
    }
    ul {
        list-style-type: none;
    }
    a {
        color: black !important;
    }
    
    a:link {
        text-decoration: none !important;
    }
    a:hover {
        color: black !important;
    }
    
    .icon-social-area {
        padding-left: 3vw;
    }
    @media only screen and (max-width: 767px) {
        a:hover {
            background-color: grey !important;
        }
    }

    `;

  editor.setStyle(style);
}
