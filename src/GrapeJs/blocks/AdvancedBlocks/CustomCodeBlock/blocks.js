import {
  typeCustomCode,
} from './config';

export default function loadBlocks (editor, opts = {}) {
  const bm = editor.BlockManager;
  const { blockCustomCode, blockLabel } = opts;

  blockCustomCode && bm.add(typeCustomCode, {
    label: `${blockLabel}`,
    attributes: { class: 'fa fa-code' },

    category: 'Extra',
    activate: true,
    select: true,
    content: { type: typeCustomCode },
    ...blockCustomCode
  });
}
