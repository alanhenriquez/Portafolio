import React from 'react';

const Image = ({ src, alt, width, height, isBlurred, borderRadius }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          zIndex: 10, 
          borderRadius: `${borderRadius}px` 
        }} 
      />
      {isBlurred && 
        <img 
          src={src} 
          alt={alt} 
          width={width} 
          height={height} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            filter: 'blur(5px)', 
            borderRadius: `${borderRadius}px` 
          }} 
        />
      }
    </div>
  );
};

export default Image;
