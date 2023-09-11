import React from 'react';
import "./homepage.css"
import NavBar from './navbar'

function HomePage() {
  return (
    <div className="pag">
      <nav className="navbar">
        <NavBar />
      </nav>
        <div className="home-page">
            <header>
                <h1>Bienvenido a Vuelta Segura</h1>
            </header>
            <div className="registro">
                <div className='conductor'>
                    <h2>Chofer</h2>
                    <label htmlFor='user_chofer'>Usuario:</label>
                    <li><input id="user_chofer" type="text" placeholder="Ingrese su nombre"></input></li>
                    <br />
                    <label htmlFor='password_chofer'>Contraseña:</label>
                    <li><input id="password_chofer" type="password"placeholder="Ingrese su contraseña"></input></li>
                    <br />
                    <button className='boton_chofer'>
                        Ingresar
                    </button>
                </div>
                <div className='usuario'>
                    <h2>Usuario</h2>
                    <label htmlFor='user_usuario'>Usuario:</label>
                    <li><input id="user_usuario" type="text" placeholder="Ingrese su nombre"></input></li>
                    <br />
                    <label htmlFor='password_usuario'>Contraseña:</label>
                    <li><input id="password_usuario" type="password"placeholder="Ingrese su contraseña"></input></li>
                    <br />
                    <button className='boton_usuario'>
                        Ingresar
                    </button>
                </div>
            </div>
            <footer>
                <p>Derechos de autor &copy; 2023 Mi Aplicación</p>
            </footer>
        </div>
    </div>
  );
}

export default HomePage;
