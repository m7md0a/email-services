'use client'

import Image from 'next/image';
import React from 'react';

type PropsType = {
  className: string,
  src: string,
  alt: string,
  width?: number,
  height?: number,
}

function CustomImage(props : PropsType) {
  
    const {className, width = 24, height = 24, alt} = props;
    const [src, setSrc] = React.useState(props.src);
    return (
      <Image
        alt={alt}
        width={width}
        height={height}
        className={className}
        key={alt}
        src={src}
        onError={() => setSrc('/next.svg')}
        placeholder="blur"
        blurDataURL='/next.svg'
      />
    );
  }

  export default CustomImage