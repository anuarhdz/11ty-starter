const Image = require('@11ty/eleventy-img');

module.exports = async function imageShortcode(src, alt, caption, sizes = '100vw') {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let figcaption = caption !== undefined ? `<figcaption>${caption}</figcaption>` : '';

  let metadata = await Image(src, {
    widths: [300, 650, 990],
    formats: ['webp', 'jpg'],
    outputDir: '_site/images',
    urlPath: '/images/',
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<figure><picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(', ')}" sizes="${sizes}">`;
      })
      .join('\n')}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>
		${figcaption}
		</figure>`;
};
