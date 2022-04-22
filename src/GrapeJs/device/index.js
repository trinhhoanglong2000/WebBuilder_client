  export default function LoadDevice(editor, config) {
    const deviceManager = editor.Devices;

    const device1 = deviceManager.add({
        // Without an explicit ID, the `name` will be taken. In case of missing `name`, a random ID will be created.
        id: 'Desktop',
        name: 'Desktop',
        width: '', // This width will be applied on the canvas frame and for the CSS media
        widthMedia: ''
       });
       const device2 = deviceManager.add({
        id: 'Tablet',
        name: 'Tablet',
        width: '800px', // This width will be applied on the canvas frame
        widthMedia: '', // This width that will be used for the CSS media
       });
       const device3 = deviceManager.add({
        id: 'Mobile portrait',
        name: 'Mobile portrait',
        width: '320px', // This width will be applied on the canvas frame
        widthMedia: '', // This width that will be used for the CSS media
       });
  }
  