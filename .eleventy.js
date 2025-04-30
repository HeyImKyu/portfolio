module.exports = function(eleventyConfig) {
  const passthroughs = [
    "src/assets",
    "src/js",
    "src/css"
  ]
  
  const config = {
    "testglobal": "meowmeow",
  };

  // ------- adding the stuff
  
  for (const item in config) {
    eleventyConfig.addGlobalData(item, config[item]);
  }

  for (const item of passthroughs) {
    eleventyConfig.addPassthroughCopy(item);
  }

  var nunjucksDate = require("nunjucks-date");
  // http://momentjs.com/docs/#/displaying/format/
  nunjucksDate.setDefaultFormat("DD.MM.YYYY");
  eleventyConfig.addFilter("date", nunjucksDate);

  return {
    dir: {
      input: "src",   // read source files from "src"
      output: "_site" // output result into "_site"
    }
  }
}

