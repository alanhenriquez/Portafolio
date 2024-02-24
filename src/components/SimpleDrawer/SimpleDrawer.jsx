import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Divider } from '@mui/material';
import { ExpandMore, ViewArray } from '@mui/icons-material';
import './SimpleDrawer.css';




/**
 * Componente SimpleDrawer
 * 
 * Un menú desplagable estilo drawer.
 *
 * 
 * @component
 * @param {Object} props - Las props del componente.
 * @param {Function} props.renderActivator - Función que recibe las props del activador y devuelve el componente activador.
 * @param {Object[]} props.menuItems - Una matriz de elementos del menú.
 * @param {string} [props.anchorDirection] - Direccion de apertura del menú. opciones disponibles ['top', 'right', 'bottom', 'left']
 * @param {string} [props.defaultIcon] - Icono por default para los elementos de padres no anidados.
 * @returns {JSX.Element} Un componente de menú estilo drawer.
 * 
 * ________________________________________________________________________________________________
 * 
 * 
    @example 
    Ejemplo de uso:

    import React from 'react';
    import MinimalMenu from './SimpleDrawer';
   
      const Example = () => {
      
      const handleItemClick = (item) => {
          console.log(item);
      };
    
      const menuItems = [
          {
              icon: <Tu_Icono />,
              label: 'Idioma',
              onClick: () => handleItemClick('Starred'),
              children: [
                  {
                      iconText: '🇪🇸',
                      label: 'Español',
                      onClick: (value) => handleItemClick(value),
                  },
                  {
                      iconText: '🇺🇸',
                      label: 'Ingles',
                      onClick: (value) => handleItemClick(value),
                  }
              ]
          }
      ];
    
      return (
        
          <SimpleDrawer
              anchorDirection="right"
              menuItems={menuItems}
              renderActivator={(props) => (
                  <button {...props}>Abrir menú</button>
              )}
          />
      );
      
  
  export default Example;
 *
 * 
 * @note Las claves que se pueden usar en los datos de los elementos del menú (menuItems) son:
 * 
 * --- Elementos padres no anidados: 
 * 
 *       - icon: Ícono del elemento del menú.
 *       - label: Etiqueta del elemento del menú.
 *       - onClick: Función de devolución de llamada que se ejecuta cuando se hace clic en el elemento del menú.
 *       - children: Elementos anidados del menú.
 * 
 * --- Elementos anidados del menú: 
 * 
 *       - iconText: Ícono del elemento del menú en formato de texto, emogis, numero, entre otros
 * 
 * 
 * ________________________________________________________________________________________________
 * 
 * 
 * @version 1.0
 * 
 * 
 * @note No se aceptal actualmente elementos anidados superior a primera anidacion
 * 
 * 
 * @throws {Error} Si las props no cumplen con las validaciones requeridas:
 *   - Si 'anchorDirection' no es una de las opciones disponibles: 'top', 'right', 'bottom', 'left'
 *   - Si 'menuItems' no es un array.
 *   - Si algún elemento de 'menuItems' no es un objeto.
 *   - Si 'label' de algún elemento de 'menuItems' no es una cadena no vacía.
 *   - Si 'onClick' de algún elemento de 'menuItems' no es una función.
 *   - Si 'icon' de algún elemento de 'menuItems' no es un objeto React.
 *   - Si 'children' de algún elemento de 'menuItems' no es un array (si se proporciona).
 *   - Si algún elemento de 'menuItems.children' no es un objeto.
 *   - Si 'label' de algún elemento de 'menuItems.children' no es una cadena no vacía.
 *   - Si 'onClick' de algún elemento de 'menuItems.children' no es una función.
 *   - Si 'icon' de algún elemento de 'menuItems.children' no es un objeto React.
 *   - Si 'iconText' de algún elemento de 'menuItems.children' no es una cadena.
 *   - Si 'renderActivator' no es una función.
 * 
 * 
 * 
 */
const SimpleDrawer = ({
  anchorDirection = 'right',
  menuItems,
  renderActivator,
  defaultIcon
}) => {



  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  /* VALIDATION ---------------------------------------------------------------------------------*/
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/



  React.useEffect(() => {
    // Validación de anchorDirection
    if (!['top', 'right', 'bottom', 'left'].includes(anchorDirection)) {
      throw new Error("Error: 'anchorDirection' prop debe ser una de las siguientes opciones: 'top', 'right', 'bottom', 'left'");
    }
  
    // Validación de menuItems
    if (!Array.isArray(menuItems)) {
      throw new Error("Error: 'menuItems' prop debe ser un array.");
    } else {
      menuItems.forEach((item, index) => {
        if (!item || typeof item !== 'object') {
          throw new Error(`Error en 'menuItems[${index}]': el elemento debe ser un objeto.`);
        } else {
          if (!item.label || typeof item.label !== 'string') {
            throw new Error(`Error en 'menuItems[${index}]': la propiedad 'label' debe ser una cadena no vacía.`);
          }
          if (item.onClick && typeof item.onClick !== 'function') {
            throw new Error(`Error en 'menuItems[${index}]': la propiedad 'onClick' debe ser una función.`);
          }
          if (item.icon && typeof item.icon !== 'object') {
            throw new Error(`Error en 'menuItems[${index}]': la propiedad 'icon' debe ser un objeto React.`);
          }
          if (item.children && !Array.isArray(item.children)) {
            throw new Error(`Error en 'menuItems[${index}]': si se proporciona, 'children' debe ser un array.`);
          } else if (item.children) {
            item.children.forEach((child, childIndex) => {
              if (!child || typeof child !== 'object') {
                throw new Error(`Error en 'menuItems[${index}].children[${childIndex}]': el elemento debe ser un objeto.`);
              } else {
                if (!child.label || typeof child.label !== 'string') {
                  throw new Error(`Error en 'menuItems[${index}].children[${childIndex}]': la propiedad 'label' debe ser una cadena no vacía.`);
                }
                if (!child.onClick || typeof child.onClick !== 'function') {
                  throw new Error(`Error en 'menuItems[${index}].children[${childIndex}]': la propiedad 'onClick' debe ser una función.`);
                }
                if (child.icon && typeof child.icon !== 'object') {
                  throw new Error(`Error en 'menuItems[${index}].children[${childIndex}]': la propiedad 'icon' debe ser un objeto React.`);
                }
                if (child.iconText && typeof child.iconText !== 'string') {
                  throw new Error(`Error en 'menuItems[${index}].children[${childIndex}]': la propiedad 'iconText' debe ser una cadena.`);
                }
              }
            });
          }
        }
      });
    }
  
    // Validación de renderActivator
    if (typeof renderActivator !== 'function') {
      throw new Error("Error: 'renderActivator' prop debe ser una función.");
    }
  }, [anchorDirection, menuItems, renderActivator]);
  

  
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  /* STATES -------------------------------------------------------------------------------------*/
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/



  const [drawerWidth, setDrawerWidth] = React.useState(250); // Inicializar con el ancho mínimo deseado
  const [MenuItems, setMenuItems] = React.useState(menuItems); // Inicializar con el ancho mínimo deseado
  const [state, setState] = React.useState({
    [anchorDirection]: false,
  });


  
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  /* EFFECTS ------------------------------------------------------------------------------------*/
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/



  React.useEffect(() => {
    // Calcular el ancho máximo basado en el ancho de la ventana
    const maxWidth = window.innerWidth * 0.8; // Por ejemplo, el 80% del ancho de la ventana
    setDrawerWidth(Math.min(maxWidth, drawerWidth)); // Aplicar el ancho máximo
  }, []); // Ejecutar solo una vez al montar el componente

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchorDirection]: open });
  };


  React.useEffect(() => {
    setMenuItems(menuItems);
  }, [MenuItems]);
  

  
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/
  /* RETURNS ------------------------------------------------------------------------------------*/
  /*/////////////////////////////////////////////////////////////////////////////////////////////*/



  // SECUNDARIES ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••



  const list = (
    <Box
      sx={{ width: drawerWidth }} // Aplicar el ancho dinámico
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Grid container xs={12} rowSpacing={2}>
          {MenuItems.map((item, index) => (
            <>
              <Grid item xs={12}>
                <React.Fragment key={index}>
                  {item.children ? (
                    <Accordion elevation={0}>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls={`${item.label}-content`}
                        id={`${item.label}-header`}
                        onClick={(event) => event.stopPropagation()} // Detener la propagación del evento aquí
                      >
                        {
                          item.icon ? (
                            <ListItemIcon>{item.icon}</ListItemIcon>
                          ) : (
                            <ListItemIcon><ViewArray></ViewArray></ListItemIcon>
                          )
                        }
                        <Typography>{item.label}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {item.children.map((child,index) => (
                            <ListItem key={index} disablePadding>
                              <ListItemButton onClick={() => child.onClick(child)}>
                                <Grid container xs={12} columnSpacing={1}>
                                  <Grid item xs={3}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                      {
                                        child.icon ? (
                                           item.icon 
                                        ) : (
                                          child.iconText ? (
                                            <Typography>{child.iconText}</Typography>
                                          ) : (
                                            null
                                          )
                                        )
                                      }
                                    </div>
                                  </Grid>
                                  <Grid item xs={9}>
                                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                                      <Typography>{child.label}</Typography>
                                    </div>
                                  </Grid>
                                </Grid>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <ListItem key={index} disablePadding>
                      <ListItemButton onClick={() => item.onClick(item)}>
                        {
                          item.icon ? (
                            <ListItemIcon>{item.icon}</ListItemIcon>
                          ) : (
                            <ListItemIcon>{defaultIcon ? defaultIcon : <ViewArray />}</ListItemIcon>
                          )
                        }
                        <Typography>{item.label}</Typography>
                      </ListItemButton>
                    </ListItem>
                  )}
                </React.Fragment>
              </Grid>
              <Grid item xs={12}>
                {index !== menuItems.length - 1 && <Divider></Divider>}
              </Grid>
            </>
          ))}
        </Grid>
      </List>
    </Box>
  );



  // MAIN •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••



  return (
    <div>
      <div style={{ cursor: 'pointer' }}>
        {renderActivator && renderActivator({ onClick: toggleDrawer(true) })}
      </div>
      <Drawer className='simpple-drawer' anchor={anchorDirection} open={state[anchorDirection]} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </div>
  );



};

SimpleDrawer.propTypes = {
  anchorDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.element,
          label: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired,
        })
      ),
    })
  ).isRequired,
  renderActivator: PropTypes.func.isRequired,
};

export default SimpleDrawer;
