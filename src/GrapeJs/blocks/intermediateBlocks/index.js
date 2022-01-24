import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('gjs-blocks-intermediate', (editor, opts = {}) => {
  const config = {
    blocks: [
        'video',
        'map',
        'link-block',
        'quote',
        'text-basic',
    ],

    //=======================|Category name|=======================

    labelVideo_category: 'Media',
    labelMap_category: 'Extras',
    linkBlock_category: 'Navigation',
    quote_category: 'Typography',
    textBasic_category : 'Typography',
    //=======================|Block name|=======================


    labelVideo: 'Video',
    labelMap: 'Map',
    linkBlock : 'Link Block',
    quote: "Quote",
    textBasic: "Text Section",
    ...opts
  };

  // Add blocks
  const loadBlocks = require('./blocks');
  loadBlocks.default(editor, config);
});