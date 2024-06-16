(function initTheme() {
  var theme = localStorage.getItem("theme") || "light";
  const html = document.querySelector("html");
  if (html) {
    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      html.setAttribute("style", "color-scheme: dark;");
    } else {
      html.setAttribute("data-theme", "light");
      html.setAttribute("style", "color-scheme: light;");
    }
  }
})();
