import { useEffect, useState } from 'react'
import './App.css'
import env from './config/env';
import funcs from './config/funcs';
import HOME from './pages/home/home';



function App() {



  ///////////////////////////////////////////////////////////////////////////////////////////////
  //ZONE: STATES --------------------------------------------------------------------------------
  ///////////////////////////////////////////////////////////////////////////////////////////////



  const [WindowTheme, setWindowTheme] = useState(null);



  ///////////////////////////////////////////////////////////////////////////////////////////////
  //ZONE: HANDLERS ------------------------------------------------------------------------------
  ///////////////////////////////////////////////////////////////////////////////////////////////



  const handleSetThemeApp = () => {
    if (WindowTheme) {
      if (WindowTheme === 'light') {
        return env.themes.a
      } else if (WindowTheme === 'dark') {
        return env.themes.b
      }
    }
  };



  ///////////////////////////////////////////////////////////////////////////////////////////////
  //ZONE: EFFECTS -------------------------------------------------------------------------------
  ///////////////////////////////////////////////////////////////////////////////////////////////

  
  
  useEffect(() => {
    setWindowTheme(funcs.global.detectTheme());
    funcs.clock.doEvery(() => { setWindowTheme(funcs.global.detectTheme()) }, 1000);
  }, []);

  useEffect(() => {
    const body = document.body;
    const themeClass = handleSetThemeApp();
    if (themeClass) {
      body.classList.remove(env.themes.a, env.themes.b);
      body.classList.add(themeClass);
    }
  }, [WindowTheme]);



  ///////////////////////////////////////////////////////////////////////////////////////////////
  //ZONE: RETURN --------------------------------------------------------------------------------
  ///////////////////////////////////////////////////////////////////////////////////////////////



  return (
    <div>
      <HOME></HOME>
    </div>
  );
}



export default App
