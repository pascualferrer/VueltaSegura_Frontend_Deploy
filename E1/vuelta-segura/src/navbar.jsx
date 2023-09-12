import React from 'react';
import logo from './assets/logo.png'
import "./navbar.css"

function NavBar() {
    return (
        <nav>
            <ul className='contenedor'>
                <div className="izquierda">
                    <li className="logo">
                    <img src={logo} alt="Logo" className="logo" />
                    </li>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/HowItWorks">Instrucciones</a></li>
                    <li><a href="/contacto">Quiénes somos</a></li>
                </div>
                <div className="derecha">
                    <li><a href="/">Iniciar Sesión</a></li>
                    <li><a href="/acerca">Crear Cuenta</a></li>
                </div>
            </ul>
        </nav>

      );
}
    
export default NavBar;
