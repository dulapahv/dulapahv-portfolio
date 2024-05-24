const siteURL = "https://dulapahv.dev";

module.exports = {
  siteUrl: siteURL,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next", "/server-sitemap.xml"],
      },
    ],
    additionalSitemaps: [`${siteURL}/server-sitemap.xml`],
  },
};