import {
    cmdTogglePreview,
    save
  } from "../const";
export const getKeyMaps = () => (
    {
        defaults: {
          'core:undo': {
            keys: '⌘+z, ctrl+z',
            handler: 'core:undo',
          },
          'core:redo': {
            keys: '⌘+y, ctrl+y',
            handler: 'core:redo',
          },
          'core:copy': {
            keys: '⌘+c, ctrl+c',
            handler: 'core:copy',
          },
          'core:paste': {
            keys: '⌘+v, ctrl+v',
            handler: 'core:paste',
          },
          'core:save': {
            keys: '⌘+s, ctrl+s',
            handler: save,
          },
          'core:preview': {
            keys: '⌘+p, ctrl+p',
            handler: cmdTogglePreview,
          },
          'core:component-next': {
            keys: 's',
            handler: 'core:component-next',
          },
          'core:component-prev': {
            keys: 'w',
            handler: 'core:component-prev',
          },
          'core:component-enter': {
            keys: 'd',
            handler: 'core:component-enter',
          },
          'core:component-exit': {
            keys: 'a',
            handler: 'core:component-exit',
          },
          'core:component-delete': {
            keys: 'backspace, delete',
            handler: 'core:component-delete',
            opts: { prevent: 1 },
          },
        },
      }
)
