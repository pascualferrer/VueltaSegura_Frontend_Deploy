import React, {useState} from "react";
import './HowItWorks.css';
import userImage from '../assets/userIllustration.png';
import choferImage from '../assets/choferIllustration.png';
import NavBar from '../navbar/navbar'



function HowItWorks() {
    const [view, setView] = useState(''); // 'cliente', 'chofer' o ''
    const [isUserImageHovered, setIsUserImageHovered] = useState(false);
    const [isChoferImageHovered, setIsChoferImageHovered] = useState(false);
    return (
        <div className="howItWorksContainer">
            <div className="navbar">
            <NavBar />
            </div>


            <div className="SelectionsContainer">
                <h1>¿Cómo funciona nuestra App?</h1>
                    <p>
                    ¡Bienvenido a nuestra aplicación!
                    <p>
                    </p> 
                    Aquí te explicaremos paso a paso cómo funciona nuestra plataforma.
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
                        <h2>Paso 1: ¡Registro!</h2>
                        <p>Regístrate en nuestra plataforma proporcionando tus datos básicos.</p>
                    </section>

                    <section className="step">
                        <h2>Paso 2: ¡Accede a nuestro servicio!</h2>
                        <p>Una vez registrado, podrás acceder a nuestro servicio de angelito.</p>
                    </section>

                    <section className="step">
                        <h2>Paso 3: ¡Selecciona tus necesidades y cotiza!</h2>
                        <p>Completa la información requerida para el servicio, y se desplegará el valor que este tendría.</p>
                    </section>

                    <section className="step">
                        <h2>Paso 4:¡Selecciona tus necesidades y cotiza!</h2>
                        <p>Con nuestro sistema de pago seguro, podrás pagar por el servicio seleccionado de manera rápida y sencilla.</p>
                    </section>

                    <section className="step">
                        <h2>Paso 5: ¡Realiza el pago!</h2>
                        <p>Una vez confirmado el pago, un chofer se pondrá en contacto contigo para coordinar el servicio.</p>
                    </section>

                    <section className="step">
                        <h2>Paso 6: ¡Deja tu Feedback!</h2>
                        <p>Después de recibir el servicio, puedes evaluar al chofer y dejar tus comentarios para ayudarnos a mejorar.</p>
                    </section>
                </div>
                <div className={view === 'chofer' ? 'info active' : 'info'}>
                    <section className="step">
                        <h2>Paso 1: ¡Regístrate y postula!</h2>
                        <p>Regístrate y postula proporcionando los datos requeridos.</p>
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
}

export default HowItWorks;
