import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, Grid, ListItemIcon } from '@mui/material';
import { Tooltip } from 'antd';
import './MinimalMenu.css';

/**
 * Componente MinimalMenu
 * 
 * Un menú minimalista que se despliega al hacer clic en un activador proporcionado por el usuario.
 *
 * 
 * @component
 * @param {Object} props - Las props del componente
 * @param {Function} props.renderActivator - Función que recibe las props del activador y devuelve el componente activador
 * @param {Object[]} props.menuItems - Una matriz de elementos del menú
 * @param {string} [props.tooltip] - Mensaje de tooltip opcional para el activador del menú
 * @returns {JSX.Element} Un componente de menú minimalista
 * 
 * ________________________________________________________________________________________________
 * 
 * 
 * @example 
 *  Ejemplo de uso:
 *  import React from 'react';
 *  import MinimalMenu from './MinimalMenu';
 *  
 *  const Example = () => {
 *    const handleItemClick = (item) => {
 *      // Lógica para manejar el clic en el elemento del menú
 *      console.log(`Clic en ${item.label}`);
 *    };
 *  
 *    const menuItems = [
 *      { type: 'item', icon: <YourIconComponent />, label: 'Item 1', onClick: () => handleItemClick(item) },
 *      { 
 *        type: 'item', 
 *        icon: <YourIconComponent />, 
 *        label: 'Item 2', 
 *        onClick: () => handleItemClick(item),
 *        closeMenuOnClick: true, // Agregamos esta propiedad para cerrar el menú al hacer clic
 *        children: [
 *          { type: 'item', label: 'Subitem 1', onClick: () => handleItemClick(item) },
 *          { type: 'item', label: 'Subitem 2', onClick: () => handleItemClick(item) }
 *        ]
 *      },
 *      { type: 'divider' },
 *      { 
 *        type: 'avatar', 
 *        avatar: <YourAvatarComponent />, 
 *        label: 'Profile', 
 *        onClick: () => handleItemClick(item),
 *        closeMenuOnClick: false,  Agregamos esta propiedad para no cerrar el menú al hacer clic
 *        children: [
 *          { type: 'item', label: 'Settings', onClick: () => handleItemClick(item) },
 *          { type: 'item', label: 'Logout', onClick: () => handleItemClick(item) }
 *        ]
 *      }
 *    ];
 *  
 *    return (
 *      <MinimalMenu
 *        menuItems={menuItems}
 *        tooltip="Haz clic aquí para abrir el menú"
 *        renderActivator={(props) => (
 *          <button {...props}>Abrir menú</button>
 *        )}
 *      />
 *    );
 *  };
 *  
 *  export default Example;
 * 
 * 
 * @note Las claves que se pueden usar en los datos de los elementos del menú son:
 *       - type: Tipo del elemento ('item', 'avatar', 'divider').
 *       - icon: Ícono del elemento del menú.
 *       - label: Etiqueta del elemento del menú.
 *       - onClick: Función de devolución de llamada que se ejecuta cuando se hace clic en el elemento del menú.
 *       - closeMenuOnClick: Booleano que determina si se debe cerrar el menú al hacer clic en el elemento.
 *       - children: Elementos anidados del menú.
 * 
 * 
 * ________________________________________________________________________________________________
 * 
 * 
 * @version 1.0
 * 
 * 
 * 
 */
const MinimalMenu = ({ renderActivator, menuItems, tooltip }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (shouldClose) => {
    if (shouldClose) {
      setAnchorEl(null);
    }
  };

  const getOptimalPosition = (buttonRect, transformOrigin = true) => {
    const { left, right, top, bottom } = buttonRect;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let horizontal = right < windowWidth / 2 ? 'right' : 'left';
    let vertical = bottom < windowHeight / 2 ? 'bottom' : 'top';

    if (transformOrigin) {
      horizontal = horizontal === 'right' ? 'left' : 'right';
      vertical = vertical === 'top' ? 'bottom' : 'top';
      return { vertical, horizontal };
    } else {
      return { vertical, horizontal };
    }
  };

  const renderMenuItem = (item, index) => {
    switch (item.type) {
      case 'avatar':
        return (
          <MenuItem key={index} onClick={() => handleClose(item.closeMenuOnClick)}>
            <Grid container spacing={0} xs={12}>
              <Grid item xs={4}>
                {item.avatar}
              </Grid>
              <Grid item xs={8}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  {item.label}
                </div>
              </Grid>
            </Grid>
          </MenuItem>
        );
      case 'divider':
        return <Divider key={index} />;
      case 'item':
        return (
          <MenuItem key={index} onClick={() => { item.onClick && item.onClick(); handleClose(item.closeMenuOnClick); }}>
            {
              item.icon
                ?
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                : null
            }
            {item.label}
          </MenuItem>
        );
      default:
        return null;
    }
  };

  const renderMenuItems = (items) => {
    return items.map((item, index) => {
      return (
        <React.Fragment key={index}>
          {item.children ? (
            <div>
              {renderMenuItem(item, index)}
              {renderMenuItems(item.children)}
            </div>
          ) : (
            renderMenuItem(item, index)
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <Tooltip title={tooltip}>
        {renderActivator({
          style: { cursor: 'pointer' },
          onClick: handleClick,
          'aria-controls': open ? 'minimal-menu' : undefined,
          'aria-haspopup': 'true',
          'aria-expanded': open ? 'true' : undefined,
        })}
      </Tooltip>
      <Menu
        id="minimal-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(true)}
        anchorOrigin={anchorEl ? getOptimalPosition(anchorEl.getBoundingClientRect(), false) : undefined}
        transformOrigin={anchorEl ? getOptimalPosition(anchorEl.getBoundingClientRect(), true) : undefined}
      >
        {renderMenuItems(menuItems)}
      </Menu>
    </div>
  );
};

export default MinimalMenu;
