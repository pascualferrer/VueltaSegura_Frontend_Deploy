import React, { useState } from 'react';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import "./registro.css"

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
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [telefono, setTelefono] = useState('');

    const [view, setView] = useState(''); // 'cliente', 'chofer' o ''
    const [isUserImageHovered, setIsUserImageHovered] = useState(false);
    const [isChoferImageHovered, setIsChoferImageHovered] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar el POST a la API con Axios
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/clientes`, {
        nombre,
        correo,
        contrasena,
        telefono,
    });

      // Manejar la respuesta si es necesario
    console.log(response.data);
    } catch (error) {
      // Manejar errores en el envío del formulario
    console.error('Error al enviar el formulario:', error);
    }
};

return (
    <div className="RegistroContainer">
        <div className="navbar">
        <NavBar />
        </div>


        <div className="SelectionsContainer">
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
                    <h2>Soy Usuario</h2>
                </div>
                <div className="box" onClick={() => setView('chofer')}>
                    <img 
                        src={choferImage} 
                        alt="Chofer" 
                        onMouseEnter={() => setIsChoferImageHovered(true)}
                        onMouseLeave={() => setIsChoferImageHovered(false)} 
                        className={isChoferImageHovered ? 'enlarged' : ''}
                    />
                    <h2>Soy Chofer</h2>
                </div>
            </div>
        </div>
        
        <div className="infoContainer">
            <div className={view === 'cliente' ? 'info active' : 'info'}>
                <section className="step">
                    {/* !AQui escribir codigo */}
                
                    
                    <div id="contenedor_principal">
                        <div id = 'registro'>
                            <h1>Registro Usuario</h1>
                                <form onSubmit={handleSubmit}>
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
                                        Correo
                                    </div>
                                    <input
                                        type="email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
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
                                    <button type="submit">Registrarse</button>
                                </form>
                        </div>
                    </div>
                </section>
            </div>
            <div className={view === 'chofer' ? 'info active' : 'info'}>
            <section className="step">
                    {/* !AQui escribir codigo */}
                
                    
                    <div id="contenedor_principal">
                        <div id = 'registro'>
                            <h1>Registro Chofer</h1>
                            <div>
                                <form onSubmit={handleSubmit}>
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
                                        Correo
                                    </div>
                                    <input
                                        type="email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
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
                                    <button type="submit">Registrarse</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="step">
                    <h2>Paso 2: ¡Revisa si fuiste aceptado!</h2>
                    <p>Después de ser aceptado tendrás habilitada la inscripción semanal.</p>
                </section>
                <section className="step">
                    <h2>Paso 3: ¡Inscripcion Semanal!</h2>
                    <p>Podrás inscribir semanalmente tu horario de trabajo para ser asignado a un cliente.</p>
                </section>
                <section className="step">
                    <h2>Paso 4: ¡Atento al viaje que se te otorgue!</h2>
                    <p>Se te asignará un viaje en algún módulo que hayas puesto disponible en la inscripción semanal.</p>
                </section>
                <section className="step">
                    <h2>Paso 5: ¡Haz tu viaje!</h2>
                    <p>Una vez terminado el servicio tendrás la opción de recibir tu pago al instante.</p>
                </section>

            </div>
        </div>
    </div>
);
  
};

export default Registro;
