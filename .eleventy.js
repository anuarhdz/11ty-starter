const dir = require('./11ty/constants/dir');

const faviconPlugin = require('eleventy-plugin-gen-favicons');
const htmlminTransform = require('./11ty/transforms/htmlmin');
const imageShortcode = require('./11ty/shortcodes/image');
const halfImages = require('./11ty/shortcodes/halfImages');
const markdownShortcode = require('./11ty/shortcodes/markdown');
const ogImageShortcode = require('./11ty/shortcodes/ogimage');
const ogMetaShortcode = require('./11ty/shortcodes/ogmeta');
const prettierTransform = require('./11ty/transforms/prettier');
const sanitizeHtmlAttr = require('./11ty/helpers/sanitizeHtmlAttr');
const toAbsoluteUrlFilter = require('./11ty/filters/toAbsoluteUrl');
const objectHasFilter = require('./11ty/filters/object-has');
const makeArrayFilter = require('./11ty/filters/makeArray');
const jsminFilter = require('./11ty/filters/jsmin');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./11ty');

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
