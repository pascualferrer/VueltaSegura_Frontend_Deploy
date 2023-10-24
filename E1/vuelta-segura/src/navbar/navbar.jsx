import React, { useEffect } from 'react';
import logo from '../assets/logo.png'
import "./navbar.css"

import { login } from '../homepage/homepage';

function NavBar( { login }) {

    return (
        <nav>
            <ul className='contenedor'>
                <div className="izquierda">
                    <li className="logo">
                    <img src={logo} alt="Logo" className="logo" />
                    </li>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/HowItWorks">Instrucciones</a></li>
                    <li><a href="/quienes-somos">Quiénes somos</a></li>
                </div>
                <div className="derecha">
                    <li><a href="/#log-in" onClick={login}> Iniciar Sesión</a></li>
                    <li><a href="/clientes/registro">Crear Cuenta</a></li>
                </div>
            </ul>
        </nav>

    );
}
    
export default NavBar;
