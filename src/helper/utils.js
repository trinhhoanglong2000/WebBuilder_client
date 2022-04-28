const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

const getCssHeaderTheme = (data) => {
  if (data=== "white") {
    return " [name='header-navigation'].navbar { background-color: white } "
         + " [name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover { color: black } ";
  } else if (data === "black") {
    return " [name='header-navigation'].navbar { background-color: #121212 } "
         + " [name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover { color: white } ";
  } else if (data === "lGreen") {
    return " [name='header-navigation'].navbar { background-color: #69c5a3 } "
         + " [name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover { color: black } ";
  } else if (data === "lBlue") {
    return " [name='header-navigation'].navbar { background-color: #c8e1e7 } "
         + " [name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover { color: black } ";
  } else if (data === "sand") {
    return " [name='header-navigation'].navbar { background-color: #f6d7b0 } "
         + " [name='header-navigation'].navbar a, [name='header-navigation'].navbar i, [name='header-navigation'].navbar a.navbar-brand:hover { color: black } ";
  }
}

const getCssHeaderlogoSize = (data) => {
  if (data === "small") {
    return " [name='header-navigation'].navbar .navbar-brand img { max-width: 50px } ";
  } else if (data === "medium") {
    return " [name='header-navigation'].navbar .navbar-brand img { max-width: 100px } ";
  } else if (data === "large") {
    return " [name='header-navigation'].navbar .navbar-brand img { max-width: 250px } ";
  }
}

const getTraitStoreEffect = (domWrapper, storeTraitData) => {
  let cssContent = "";
  for (let key in storeTraitData) {
    if (key === "header-theme")  {
      
      cssContent += getCssHeaderTheme(storeTraitData[key]);
    } else if (key === "header-logoSize") {
      cssContent += getCssHeaderlogoSize(storeTraitData[key]);
    }
  }

  return cssContent;
}

export { validURL, getTraitStoreEffect };