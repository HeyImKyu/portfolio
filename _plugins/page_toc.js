const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { JSDOM } = require("jsdom");

module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("page_toc", function(pagePath) {
    let content = fs.readFileSync(pagePath, "utf8");

    content = content.replace(/^---[\s\S]*?---/, ""); // Strip frontmatter
    content = content.replace(/{% api %}\n([^\n]*)/, "### $1"); // Custom tag

    const slugMap = {};
    const md = markdownIt({
      html: true
    }).use(markdownItAnchor, {
      slugify: s => {
        let slug = s
          .toLowerCase()
          .trim()
          .replace(/[:]/g, "")             // remove colons
          .replace(/\s+/g, "-")            // spaces to hyphens
          .replace(/[^\w-]/g, "");         // strip remaining non-word chars

        let orig = slug;
        let i = 1;
        while (slugMap[slug]) {
          slug = orig + i++;
        }
        slugMap[slug] = true;
        return slug;
      }
    });

    const rendered = md.render(content);
    const dom = new JSDOM(rendered);
    const document = dom.window.document;
    const tocItems = [...document.querySelectorAll("h1, h2, h3")].map(h => {
      const level = h.tagName.toLowerCase();
      return `<li class="${level}"><a href="#${h.id}">${h.textContent}</a></li>`;
    });

    return `<ul class="toc">${tocItems.join("\n")}</ul>`;
  });
};
