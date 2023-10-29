import React, { useEffect } from 'react';
import logo from '../assets/logo.png';
import "./navbar.css";
import { useUser } from '../UserContext';

function NavBar() {
    const { user, logout } = useUser();

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
                    {user ? (
                        // Si hay un usuario, mostrar el nombre y un enlace para cerrar sesión
                        <>
                            <li><a href="/">Perfil de {user.nombre}</a></li> 
                            <li><a href="/" onClick={logout}>Cerrar Sesión</a></li>
                        </>
                    ) : (
                        // Si no hay un usuario, mostrar los enlaces de inicio de sesión y registro
                        <>
                            <li><a href="/#log-in">Iniciar Sesión</a></li>
                            <li><a href="/clientes/registro">Crear Cuenta</a></li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    );
}

export default NavBar;