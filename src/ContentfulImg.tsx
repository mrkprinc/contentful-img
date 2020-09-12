import React from 'react';
import { Img } from 'react-image';
import { createContentfulSrcSet } from './contentful-responsive-srcset';
import { ContentfulImage } from './types';

interface IProps {
  image: ContentfulImage;
  maxWidth?: number;
  // A maximum width in pixels for the requested image.
  // Pass 'null' if the image has no max width - ex. a banner that always fills the viewport.
}

const ContentfulImg = ({ image, maxWidth }: IProps): JSX.Element => {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={createContentfulSrcSet(image, maxWidth, 'webp')?.srcSet}
      />
      <Img
        {...createContentfulSrcSet(image, maxWidth)}
        alt={image?.description}
      />
    </picture>
  );
};

export default ContentfulImg;
