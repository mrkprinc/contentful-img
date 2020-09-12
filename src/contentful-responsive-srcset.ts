/**
 * This utility is a simplified adaptation of the resolveFluid method at
 * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-contentful/src/extend-node-type.js.
 */
import { ContentfulImage } from './types';

interface IImageParams {
  fm?: string;
  w?: number;
  fit?: string;
  f?: string;
}

function createContentfulImageUrl(
  baseUrl: string,
  params: IImageParams
): string {
  const qs = new URLSearchParams(params as any).toString();

  return `${baseUrl}?${qs}`;
}

const CONTENTFUL_MAX_SIZE = 4000;

interface IReturn {
  srcSet?: string;
  src: string;
  sizes?: string;
}

function createContentfulSrcSet(
  image: ContentfulImage,
  maxWidth?: number,
  format: 'webp' | '' = ''
): IReturn {
  const baseUrl = image?.file.url;
  const intrinsicWidth = image?.file.details.image.width;
  const intrinsicHeight = image?.file.details.image.height;

  if (!(image && baseUrl && intrinsicWidth && intrinsicHeight))
    return { src: '' };

  const aspectRatio = intrinsicWidth / intrinsicHeight;

  const baseWidth = maxWidth || 800;

  const responsiveWidths = new Set(
    [
      Math.min(intrinsicWidth, maxWidth || Infinity),
      baseWidth / 4,
      baseWidth / 2,
      baseWidth,
      baseWidth * 1.5,
      baseWidth * 2,
    ]
      .map(Math.round)
      .filter(
        requestedWidth =>
          requestedWidth <= CONTENTFUL_MAX_SIZE &&
          Math.round(requestedWidth / aspectRatio) <= CONTENTFUL_MAX_SIZE &&
          requestedWidth <= intrinsicWidth
      )
  );

  const srcSet = Array.from(responsiveWidths)
    .map(
      w =>
        `${createContentfulImageUrl(baseUrl, { w, fm: format })} ${Math.round(
          w
        )}w`
    )
    .join(',\n');

  return {
    srcSet,
    src: createContentfulImageUrl(baseUrl, { w: baseWidth }),
    sizes: maxWidth
      ? `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`
      : `100vw`,
  };
}

export { createContentfulSrcSet, createContentfulImageUrl };
