import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('gjs-blocks-basic', (editor, opts = {}) => {
  const config = {
    blocks: [
      'column1',
      'column2',
      'column3',
      'column3-7',
      'text',
      'link',
      'image',
      'button',
      'divider',
      'test'

    ],
    flexGrid: 0,
    stylePrefix: 'gjs-',
    addBasicStyle: true,
    //=======================|Category name|=======================
    labelColumn1_category: 'Layout',
    labelColumn2_category: 'Layout',
    labelColumn3_category: 'Layout',
    labelColumn37_category: 'Layout',
    labelText_category: 'Typography',
    labelLink_category: 'Navigation',
    labelImage_category: 'Media',
    Button_category: "Extras",
    divider_category: "Layout",

    // labelVideo_category: 'Media',
    // labelMap_category: 'Extras',
    //=======================|Block name|=======================

    labelColumn1: '1 Column',
    labelColumn2: '2 Columns',
    labelColumn3: '3 Columns',
    labelColumn37: '2 Columns 3/7',
    labelText: 'Text',
    labelLink: 'Link',
    labelImage: 'Image',
    buttonBlkLabel :'Button',
    dividerBlkLabel: "Divider",


    // labelVideo: 'Video',
    // labelMap: 'Map',
    rowHeight: 75,
    ...opts
  };

  // Add blocks
  const loadBlocks = require('./blocks');
  loadBlocks.default(editor, config);
});