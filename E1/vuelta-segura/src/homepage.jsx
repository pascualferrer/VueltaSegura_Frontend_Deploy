import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./homepage.css"
import NavBar from './navbar'
import logo from './assets/logo.png'
import logobn1 from './assets/logo1byn.png'
import logobn2 from './assets/logo2byn.png'
import logobn3 from './assets/logo3byn.png'
import logobn4 from './assets/logo4byn.png'


function HomePage() {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [logobn1, logobn2, logobn3, logobn4];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextImage();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentImageIndex]);

  return (
    <div className="pag">
      <nav className="navbar">
        <NavBar />
      </nav>
        <img src={images[currentImageIndex]} alt="Logo" className="logo_main" />
        <h2> ¿Tienes un evento y quieres ir en tu auto? </h2>
        <h3> Somos el mejor servicio para que puedas beber alcohol sin preocuparte de conducir al regreso.</h3>
        
        <div className="main">
            <header>
                <h1>Inicia sesión para empezar </h1>
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
                    <Link to="/principal-chofer">
                        <button className='boton_chofer'>
                            Ingresar
                        </button>
                    </Link>
                </div>
                <div className='usuario'>
                    <h2>Cliente</h2>
                    <label htmlFor='user_usuario'>Usuario:</label>
                    <li><input id="user_usuario" type="text" placeholder="Ingrese su nombre"></input></li>
                    <br />
                    <label htmlFor='password_usuario'>Contraseña:</label>
                    <li><input id="password_usuario" type="password"placeholder="Ingrese su contraseña"></input></li>
                    <br />
                    <Link to="/principal-usuario">
                        <button className='boton_usuario'>
                            Ingresar
                        </button>
                    </Link>
                </div>
            </div>
            <footer>
                <p>Derechos de autor &copy; 2023 Vuelta Segura</p>
            </footer>
        </div>
    </div>
  );
}

export default HomePage;
