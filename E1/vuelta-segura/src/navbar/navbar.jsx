import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.png';
import "./navbar.css";
import { AuthContext } from "../auth/AuthContext";

function NavBar() {
    const { user , logout} = useContext(AuthContext);
    console.log(user.id);
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
                    {user.id === undefined ? (
                        // Si hay un usuario, mostrar el nombre y un enlace para cerrar sesión
                        <>
                            <li><a href="/#log-in">Iniciar Sesión</a></li>
                            <li><a href="/registro">Crear Cuenta</a></li>
                        </>
                    ) : (
                        // Si no hay un usuario, mostrar los enlaces de inicio de sesión y registro
                        <>
                            <li><a href="/">Perfil de {user.nombre}</a></li> 
                            <li><a href="/" onClick={logout}>Cerrar Sesión</a></li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    );
}

export default NavBar;