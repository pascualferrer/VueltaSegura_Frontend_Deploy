import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import "./registro.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

// Assets
import userImage from '../assets/userIllustration.png';
import choferImage from '../assets/choferIllustration.png';
import chipImage from '../assets/chip.png';
import seguroImage from '../assets/escudo-seguro.png';
import techSupportImage from '../assets/soporte-tecnico.png'; 
import nosotros1 from '../assets/nosotros1.jpg';
import nosotros2 from '../assets/nosotros2.jpg';
import nosotros3 from '../assets/nosotros3.jpg';

const RegistroAdmin = () => {
    const {token, setToken, id, setID, nombre, setNombre, tipo, setTipo } = useContext(AuthContext);

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

        if (!email || !contrasena) {
            // Mostrar mensaje de error o realizar otras acciones
            console.error('Todos los campos son obligatorios');
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/login`,
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
                    };
                    console.log('userData:', userData);
                    setID(response.data.id);
                    setNombre(response.data.nombre);
                    setTipo(response.data.tipo)
                }).catch((error) => {
                    console.log(error);
                })

            setError(null);

            //* Redirigir  después de un registro exitoso y sin errores
            if (setError != null) {
                navigate('/principal-admin');
                }

        } catch (error) {
            console.error('Error al enviar datos:', error);
            setError('Error al enviar datos. Por favor, verifica la información. El teléfono e email deben no haber sido registrados');
        }
    };
    

return (
    <div className="RegistroContainer">
        <div className="navbar">
            <NavBar />
        </div>
        <div className="registroContainer">
            <section className="step">
                <div id="contenedor_principal">
                    <div id = 'registro'>
                        <h1>Registro de Administrador</h1>
                            <form className="from-cliente" onSubmit={handleSubmit}>
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
                                <button type="submit">Iniciar Sesión</button>
                            </form>
                    </div>
                </div>
            </section>
        </div>
        {error && <div>{error}</div>}
    </div>
);
};

export default RegistroAdmin;
