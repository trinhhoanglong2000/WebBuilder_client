export default function loadBlocks(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    let blocks = c.blocks;

    const toAdd = name => blocks.indexOf(name) >= 0;
  
    toAdd('video') &&
    bm.add('video', {
      label: c.labelVideo,
      category: c.labelVideo_category,
      attributes: { class: 'fa fa-youtube-play' },
      content: {
        type: 'video',
        src: 'img/video2.webm',
        style: {
          height: '350px',
          width: '615px'
        }
      }
    });

  toAdd('map') &&
    bm.add('map', {
      label: c.labelMap,
      category: c.labelMap_category,
      attributes: { class: 'fa fa-map-o' },
      content: {
        type: 'map',
        style: { height: '350px' }
      }
    });
    toAdd('link-block') && bm.add('link-block', {
        category: c.linkBlock_category,
        label: c.linkBlock,
        attributes: { class: 'fa fa-link' },
        content: {
          type:'link',
          editable: false,
          droppable: true,
          style:{
            display: 'inline-block',
            padding: '5px',
            'min-height': '50px',
            'min-width': '50px'
          }
        },
      });
    
      toAdd('quote') && bm.add('quote', {
        label: c.quote,
        category: c.quote_category,
        attributes: { class: 'fa fa-quote-right' },
        content: `<blockquote class="quote">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
          </blockquote>`
      });
    
      toAdd('text-basic') && bm.add('text-basic', {
        category: c.textBasic_category,
        label: c.textBasic,
        attributes: { class: 'gjs-fonts gjs-f-h1p' },
        content: `<section class="bdg-sect">
          <h1 class="heading">Insert title here</h1>
          <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
          </section>`
      });
  }