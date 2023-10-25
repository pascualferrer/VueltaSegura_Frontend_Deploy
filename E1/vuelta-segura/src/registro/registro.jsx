import React, { useState } from 'react';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import "./registro.css";
import { useNavigate } from 'react-router-dom';


// Assets
import userImage from '../assets/userIllustration.png';
import choferImage from '../assets/choferIllustration.png';
import chipImage from '../assets/chip.png';
import seguroImage from '../assets/escudo-seguro.png';
import techSupportImage from '../assets/soporte-tecnico.png'; 
import nosotros1 from '../assets/nosotros1.jpg';
import nosotros2 from '../assets/nosotros2.jpg';
import nosotros3 from '../assets/nosotros3.jpg';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [telefono, setTelefono] = useState('');

    const [view, setView] = useState(null); // 'cliente', 'chofer' o ''
    const [isUserImageHovered, setIsUserImageHovered] = useState(false);
    const [isChoferImageHovered, setIsChoferImageHovered] = useState(false);

    const [error, setError] = useState('');

    const navigate = useNavigate();  // Inicializa useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !email || !contrasena || !telefono) {
            // Mostrar mensaje de error o realizar otras acciones
            console.error('Todos los campos son obligatorios');
            setError('Todos los campos son obligatorios');
            setRedirectTo(null);
            return;
        }

        //* Obtener el valor del campo oculto
        const userType = view;

        try {
            const endpoint = userType === 'cliente' ? 'clientes/registro' : 'choferes/registro';
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, {
            nombre,
            email,
            contrasena,
            telefono
            }
            );

            console.log('Datos enviados con éxito:', response.data);
            setError(null);
            // Redirigir aquí después de un registro exitoso y sin errores
            if (setError != null) {
                if (userType === 'cliente') {
                    navigate('/principal-cliente');
                } else if (userType === 'chofer') {
                    navigate('/principal-chofer');
                }
            }

        } catch (error) {
            console.error('Error al enviar datos:', error);
            setError('Error al enviar datos. Por favor, verifica la información. El teléfono e email deben no haber sido registrados');
            setRedirectTo(null); // Limpiar la redirección en caso de error
        }
    };
    

return (
    <div className="RegistroContainer">
        <div className="navbar">
        <NavBar />
        </div>
        <div className="selectionContainer">
            <h1>¡REGÍSTRATE!</h1>
                <p>
                ¡Bienvenido a nuestra aplicación!
                </p> 
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
                            <h1>Registro Usuario</h1>
                                <form className="from-cliente" onSubmit={handleSubmit}>
                                    <label>
                                    <div>    
                                        Nombre
                                    </div>
                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                    </label>
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
                                    <label>
                                    <div>    
                                        Teléfono
                                    </div>
                                    <input
                                        type="tel"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                    </label>
                                    <br />
                                    <input type="hidden" name="userType" value="cliente" />
                                    <button type="submit">Registrarse</button>
                                </form>
                        </div>
                    </div>
                </section>
            </div>
            <div className={view === 'chofer' ? 'info active' : 'info'}>
            <section className="step">
                    <div id="contenedor_principal">
                        <div id = 'registro'>
                            <h1>Registro Chofer</h1>
                                <form className="form-chofer" onSubmit={handleSubmit}>
                                    <label>
                                    <div>    
                                        Nombre
                                    </div>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                    </label>
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
                                    <label>
                                    <div>    
                                        Teléfono
                                    </div>
                                    <input
                                        type="tel"
                                        value={telefono}
                                        ame="telefono"
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                    </label>
                                    <br />
                                    <input type="hidden" name="userType" value="chofer" />
                                    <button type="submit">Registrarse</button>
                                </form>
                        </div>
                    </div>
                </section>
            </div>
            {error && <div>{error}</div>}
        </div>
    </div>
);
};

export default Registro;
