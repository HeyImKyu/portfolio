module.exports = function(eleventyConfig) {
  const passthroughs = [
    "src/assets",
    "src/js",
    "src/css"
  ]
  
  const config = {
    "copy_button_text": "Copy code",
  };

  // ------- adding the stuff
  
  for (const item in config) {
    eleventyConfig.addGlobalData(item, config[item]);
  }

  for (const item of passthroughs) {
    eleventyConfig.addPassthroughCopy(item);
  }

  // ------- plugins

  var nunjucksDate = require("nunjucks-date");
  // http://momentjs.com/docs/#/displaying/format/
  nunjucksDate.setDefaultFormat("DD.MM.YYYY");
  eleventyConfig.addFilter("date", nunjucksDate);

  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlight);

  const checkboxMD = require("markdown-it-task-checkbox");
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(checkboxMD,
    {
      disabled: false,
      divWrap: false,
      divClass: 'checkbox',
      idPrefix: 'cbx_',
      ulClass: 'task-list',
      liClass: 'task-list-item'
    }
  ));

  const anchorMD = require("markdown-it-anchor");
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(anchorMD,
    {
      html: false,
      slugify: (s) => {
        let slug = s
          .toLowerCase()
          .trim()
          .replace(/[:]/g, "")             // remove colons
          .replace(/\s+/g, "-")            // spaces to hyphens
          .replace(/[^\w-]/g, "");         // strip remaining non-word chars

        return slug;
      }
    }
  ));

  eleventyConfig.addPlugin(require("./_plugins/page_toc"));

  return {
    dir: {
      input: "src",   // read source files from "src"
      output: "_site" // output result into "_site"
    }
  }
}

