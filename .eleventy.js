const dir = require('./eleventy/constants/dir');

const faviconPlugin = require('eleventy-plugin-gen-favicons');
const htmlminTransform = require('./eleventy/transforms/htmlmin');
const imageShortcode = require('./eleventy/shortcodes/image');
const halfImages = require('./eleventy/shortcodes/halfImages');
const markdownShortcode = require('./eleventy/shortcodes/markdown');
const ogImageShortcode = require('./eleventy/shortcodes/ogimage');
const ogMetaShortcode = require('./eleventy/shortcodes/ogmeta');
const prettierTransform = require('./eleventy/transforms/prettier');
const sanitizeHtmlAttr = require('./eleventy/helpers/sanitizeHtmlAttr');
const toAbsoluteUrlFilter = require('./eleventy/filters/toAbsoluteUrl');
const objectHasFilter = require('./eleventy/filters/object-has');
const makeArrayFilter = require('./eleventy/filters/makeArray');
const jsminFilter = require('./eleventy/filters/jsmin');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./eleventy');

  // filters
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrlFilter);
  eleventyConfig.addFilter('sanitizeHtmlAttr', sanitizeHtmlAttr);
  eleventyConfig.addFilter('has', objectHasFilter);
  eleventyConfig.addFilter('makeArray', makeArrayFilter);
  eleventyConfig.addFilter('jsmin', jsminFilter);
  eleventyConfig.addFilter('markdown', markdownShortcode);

  // shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode('haflImages', halfImages);
  eleventyConfig.addNunjucksAsyncShortcode('ogimage', ogImageShortcode);
  eleventyConfig.addNunjucksShortcode('ogmeta', ogMetaShortcode);
  eleventyConfig.addPairedNunjucksShortcode('markdown', markdownShortcode);

  eleventyConfig.addPassthroughCopy('./src/images');

  // plugins
  eleventyConfig.addPlugin(faviconPlugin, {
    outputDir: dir.output,
    generateManifest: false,
  });

  // transforms, for prettifying and minifying
  eleventyConfig.addTransform('prettier', prettierTransform);
  eleventyConfig.addTransform('htmlmin', htmlminTransform);

  // This allows Eleventy to watch for file changes during local development.
  eleventyConfig.setUseGitIgnore(false);

  return {
    dir,
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passThroughFileCopy: true,
  };
};
