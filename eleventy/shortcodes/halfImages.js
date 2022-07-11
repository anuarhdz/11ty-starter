const Image = require('@11ty/eleventy-img');

module.exports = async function halfWidthImageShortcode(src, alt) {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [250, 500],
    formats: ['webp', 'jpg', 'jpeg'],
    outputDir: '_site/images',
    urlPath: '/images/',
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture class="inline-block sm:max-half w-full">
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(', ')}">`;
      })
      .join('\n')}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async" class="w-full my-1 md:m-0">
    </picture>`;
};
