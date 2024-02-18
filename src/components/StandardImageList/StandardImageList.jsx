import React from 'react';
import PropTypes from 'prop-types';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Image } from 'antd';

/**
 * Componente para mostrar una lista de imágenes en un diseño estándar.
 * @param {Object[]} data - Los datos de las imágenes que se mostrarán.
 * @param {string} data[].img - La URL de la imagen.
 * @param {string} data[].title - El título de la imagen.
 * @param {number} width - El ancho de la lista de imágenes en píxeles.
 * @param {number} height - La altura de la lista de imágenes en píxeles.
 * @param {number} cols - El número de columnas de la lista de imágenes.
 * @param {number} rowHeight - La altura de fila de la lista de imágenes en píxeles.
 * @param {number} gap - El espacio entre las imágenes en píxeles.
 * @param {number} imageWidth - El ancho de las imágenes en píxeles.
 * @param {number} imageHeight - La altura de las imágenes en píxeles.
 * @returns {JSX.Element} Componente React para mostrar una lista de imágenes.
 */
export default function StandardImageList({ data, width, height, cols, rowHeight, gap, imageWidth, imageHeight }) {
  return (
    <ImageList sx={{ width: width || "100%", height: height || '100%' }} gap={gap || 20} cols={cols} rowHeight={rowHeight}>
      <Image.PreviewGroup>
        {data.map((item) => (
          <ImageListItem key={item.img} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              width={imageWidth || 'auto'}
              height={imageHeight || "auto"}
              srcSet={`${item.img}?w=${imageWidth}&h=${imageHeight}&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=${imageWidth}&h=${imageHeight}&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </Image.PreviewGroup>
    </ImageList>
  );
}

// Definir los tipos de las props
StandardImageList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
};
