import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Link } from 'react-router-dom';
import "./homepage.css"
import NavBar from '../navbar/navbar'
import logo from '../assets/logo.png'
import userImage from '../assets/userIllustration.png';
import choferImage from '../assets/choferIllustration.png';
import logobn1 from '../assets/logo1byn.png'
import logobn2 from '../assets/logo2byn.png'
import logobn3 from '../assets/logo3byn.png'
import logobn4 from '../assets/logo4byn.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const {token, setToken, id, setID, nombre, setNombre, tipo, setTipo } = useContext(AuthContext);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [userType, setUserType] = useState(null);
    const [userData, setUserData] = useState(null); // Nuevo estado local
    const navigate = useNavigate();

    const [view, setView] = useState(null); // 'cliente', 'chofer' o ''
    const [isUserImageHovered, setIsUserImageHovered] = useState(false);
    const [isChoferImageHovered, setIsChoferImageHovered] = useState(false);


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

    console.log(id, tipo);

    //* Hacer login
    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            if (view == 'cliente') {

                axios.post(`${import.meta.env.VITE_BACKEND_URL}/clientes/login`,
                    { 
                        email,
                        contrasena,
                    }).then((response) => {
                        const access_token = response.data.access_token;
                        setToken(access_token);
                        console.log('Datos enviados con éxito:', response);
                        const userData = {
                            id: response.data.id,
                            nombre: response.data.nombre,
                            tipo: response.data.tipo
                        };
                        console.log('userData:', userData);
                        setID(response.data.id);
                        setNombre(response.data.nombre);
                        setTipo(response.data.tipo)
                        navigate('/principal-cliente');
                    }).catch((error) => {
                        console.log(error);
                    })

                setError(null);

            } else if (view == 'chofer') {
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/choferes/login`,
                    { 
                        email,
                        contrasena,
                    }).then((response) => {
                        const access_token = response.data.access_token;
                        setToken(access_token);
                        console.log('Datos enviados con éxito:', response);
                        const userData = {
                            id: response.data.id,
                            nombre: response.data.nombre,
                            tipo: response.data.tipo
                        };
                        console.log('userData:', userData);
                        setID(response.data.id);
                        setNombre(response.data.nombre);
                        setTipo(response.data.tipo)
                        navigate('/principal-chofer');
                    }).catch((error) => {
                        console.log(error);
                    })

                setError(null);
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            setError('Error al enviar datos.');
        }
    };

    return (
        <div className="pag">
            <nav className="navbar">
                <NavBar />
            </nav>
            <img src={images[currentImageIndex]} alt="Logo" className="logo_main" />
            <h2> ¿Tienes un evento y quieres ir en tu auto? </h2>
            <h3> Somos el mejor servicio para que puedas beber alcohol sin preocuparte de conducir al regreso.</h3>

            {tipo === "cliente" ? (
                <Link to="/principal-cliente">
                    <button2 type="button">Ir a Interfaz de Cliente</button2>
                </Link>
            ) : tipo === "chofer" ? (
                <Link to="/principal-chofer">
                    <button2 type="button">Ir a Interfaz de Chofer</button2>
                </Link>
            ) : (
                <>
                <div id="log-in" className="main">
                    <header>
                        <h1>Inicia sesión para empezar </h1>
                    </header>
                    
                <div className="RegistroContainer">
                    <div className="selectionContainer">
                        <h1>¿Cómo quieres entrar?</h1>

                        <div className="boxContainer">
                            <div className="box" onClick={() => setView('cliente')}>
                                <img 
                                    src={userImage} 
                                    alt="Cliente"
                                    onMouseEnter={() => setIsUserImageHovered(true)}
                                    onMouseLeave={() => setIsUserImageHovered(false)} 
                                    className={isUserImageHovered ? 'enlarged' : ''}
                                />
                                <h2>Quiero ser cliente</h2>
                            </div>
                            <div className="box" onClick={() => setView('chofer')}>
                                <img 
                                    src={choferImage} 
                                    alt="Chofer" 
                                    onMouseEnter={() => setIsChoferImageHovered(true)}
                                    onMouseLeave={() => setIsChoferImageHovered(false)} 
                                    className={isChoferImageHovered ? 'enlarged' : ''}
                                />
                                <h2>Quiero ser chofer</h2>
                            </div>
                        </div>
                    </div>
                    
                    <div className="registroContainer">
                        <div className={view === 'cliente' ? 'info active' : 'info'}>
                            <section className="step">
                                <div id="contenedor_principal">
                                    <div id = 'registro'>
                                        <h1>Ingrese sus datos</h1>
                                            <form className="from-cliente" onSubmit={handleLogin}>
                                                <br />
                                                <label>
                                                <div>    
                                                    Email
                                                </div>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                </label >
                                                <br />
                                                <label>
                                                <div>    
                                                    Contraseña
                                                </div>
                                                <input
                                                    type="password"
                                                    value={contrasena}
                                                    onChange={(e) => setContrasena(e.target.value)}
                                                />
                                                </label>
                                                <br />
                                                <input type="hidden" name="userType" value="cliente" />
                                                <button type="submit">Iniciar Sesión</button>
                                            </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className={view === 'chofer' ? 'info active' : 'info'}>
                        <section className="step">
                                <div id="contenedor_principal">
                                    <div id = 'registro'>
                                        <h1>Ingrese sus datos</h1>
                                            <form className="form-chofer" onSubmit={handleLogin}>
                                                <br />
                                                <label>
                                                <div>    
                                                    Email
                                                </div>
                                                <input
                                                    type="email"
                                                    ame="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                </label >
                                                <br />
                                                <label>
                                                <div>    
                                                    Contraseña
                                                </div>
                                                <input
                                                    type="password"
                                                    ame="contrasena"
                                                    value={contrasena}
                                                    onChange={(e) => setContrasena(e.target.value)}
                                                />
                                                </label>
                                                <br />
                                                <br />
                                                <input type="hidden" name="userType" value="chofer" />
                                                <button type="submit">Iniciar Sesión</button>
                                            </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {error && <div>{error}</div>}
                    </div>
                    
                </div>
            </div>
        </>
        )}
    <footer>
        <p>Derechos de autor &copy; 2023 Vuelta Segura</p>
    </footer>
    </div>
    );
    };

export function login() {
    const login = document.getElementById("log-in");

    if (login) {
        login.scrollIntoView({ behavior: 'smooth' });
    }
}

export default HomePage;
