const updateMetaThemeColor = (theme: "dark" | "light" | "system") => {
  const themeColors = document.querySelectorAll('meta[name="theme-color"]');
  themeColors.forEach((el) => el.remove());

  if (theme === "dark" || theme === "light") {
    const newThemeColor = document.createElement("meta");
    newThemeColor.setAttribute("name", "theme-color");
    newThemeColor.setAttribute("content", theme === "dark" ? "#000" : "#fff");
    document.head.appendChild(newThemeColor);
  } else if (theme === "system") {
    const darkMeta = document.createElement("meta");
    darkMeta.setAttribute("name", "theme-color");
    darkMeta.setAttribute("media", "(prefers-color-scheme: dark)");
    darkMeta.setAttribute("content", "#000");
    document.head.appendChild(darkMeta);

    const lightMeta = document.createElement("meta");
    lightMeta.setAttribute("name", "theme-color");
    lightMeta.setAttribute("media", "(prefers-color-scheme: light)");
    lightMeta.setAttribute("content", "#fff");
    document.head.appendChild(lightMeta);
  }
};

export default updateMetaThemeColor;
