export default function loadPages(editor, opt = {}) {
  const c = opt;
  let p = editor.Pages;
  //========| |============//

    p.add({
        id: 'home',
    });

    p.add({
        id: 'contact',
    });
    
    // console.log(pageManager.getAll());
    // console.log(pageManager.getSelected());
    // console.log(editor.getComponents());
    // console.log(currentPage.style)
}
