module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");
  return {
    dir: {
      input: "src",   // read source files from "src"
      output: "_site" // output result into "_site"
    }
  }
}

