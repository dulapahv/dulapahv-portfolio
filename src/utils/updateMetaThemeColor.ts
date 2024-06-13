const updateMetaThemeColor = (theme: "dark" | "light" | "system") => {
  const darkMetaScheme = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
  );
  const lightMetaScheme = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
  );
  const darkMeta = document.querySelectorAll(
    'meta[name="theme-color"][content="#000"]',
  );
  const lightMeta = document.querySelectorAll(
    'meta[name="theme-color"][content="#fff"]',
  );
  const allMeta = document.querySelectorAll('meta[name="theme-color"]');

  switch (theme) {
    case "dark":
      if (darkMetaScheme) {
        darkMetaScheme.removeAttribute("media");
      }
      if (lightMetaScheme) {
        lightMetaScheme.removeAttribute("media");
        lightMetaScheme.setAttribute("content", "#000");
      }
      if (lightMeta) {
        for (let i = 0; i < lightMeta.length; i++) {
          lightMeta[i].setAttribute("content", "#000");
        }
      }
      break;

    case "light":
      if (darkMetaScheme) {
        darkMetaScheme.removeAttribute("media");
        darkMetaScheme.setAttribute("content", "#fff");
      }
      if (lightMetaScheme) {
        lightMetaScheme.removeAttribute("media");
      }
      if (darkMeta) {
        for (let i = 0; i < darkMeta.length; i++) {
          darkMeta[i].setAttribute("content", "#fff");
        }
      }
      break;

    case "system":
      if (allMeta.length >= 2) {
        allMeta[0].setAttribute("content", "#fff");
        allMeta[0].setAttribute("media", "(prefers-color-scheme: light)");
        allMeta[1].setAttribute("content", "#000");
        allMeta[1].setAttribute("media", "(prefers-color-scheme: dark)");
      }
      break;

    default:
      break;
  }
};

export default updateMetaThemeColor;
