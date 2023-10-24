import React, { useState, useEffect } from "react";
import NavBar from '../navbar/navbar';
// CSS
import './quienes-somos.css';

// Assets
import userImage from '../assets/userIllustration.png';
import choferImage from '../assets/choferIllustration.png';
import chipImage from '../assets/chip.png';
import seguroImage from '../assets/escudo-seguro.png';
import techSupportImage from '../assets/soporte-tecnico.png'; 
import nosotros1 from '../assets/nosotros1.jpg';
import nosotros2 from '../assets/nosotros2.jpg';
import nosotros3 from '../assets/nosotros3.jpg';




function QuienesSomos() {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [nosotros1, nosotros2, nosotros3];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextImage();
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentImageIndex]);

    return (
        <div>
            <div className="navbar">
            <NavBar />
            </div>
            <div className="titulo1">
                <h1>Nosotros</h1>
                    <p>
                    Somos una empresa que entrega servicios de transporte, especialmente de choferes de reemplazo. Buscamos solucionar la problemática que presenta nuestro cliente respecto al poder movilizarse en su propio auto a un evento, disfrutar en este sin ninguna preocupación y regresar sin tener que conducir de vuelta.
                    </p>
                    <p>
                    Como empresa nos destacamos por la puntualidad en cada servicio, responsabilidad y comunicación con el cliente. Contamos con experiencia en más de 60 centros de eventos, lo que nos ha permitido llegar a realizar más de 1000 servicios desde que estamos presentes en el rubro.
                    </p>
                    <p>
                    Contamos con un equipo de más de 100 chóferes responsables y con experiencia al volante para poder entregarles una cómoda y agradable vuelta a casa
                    </p>                     
                
            
            </div>


            <div className="boxContainer">
                <div className="box1">
                    <img src={images[currentImageIndex]} alt="Imagen" />
                </div>
            </div>




            <div className="titulo2">
                <h1>Principios</h1>
                
            </div>
            <div className="grilla">
                <div className="fila">
                    <div className="columna">
                        <h2>1. Seguridad y Responsabilidad</h2>
                        <p>
                            Comprometidos con la seguridad vial y la responsabilidad social.
                            Nuestra prioridad es tu bienestar y el de la comunidad.
                        </p>
                        <div className="principiosImage">
                            <img src={seguroImage}/>
                        </div>
                    </div>
                    <div className="columna">
                        <h2>2. Comodidad a tu Puerta</h2>
                        <p>
                            Facilitamos tu vida. Revisión técnica de vehículos y choferes de
                            remplazo, todo a tu puerta. Sin preocupaciones, sin estrés.
                        </p>
                        <div className="principiosImage">
                            <img src={techSupportImage}/>
                        </div>
                    </div>
                    <div className="columna">
                        <h2>3. Tecnología para Simplificar</h2>
                        <p>
                            La tecnología al servicio de la tranquilidad. Una aplicación 
                            web moderna y eficiente para una experiencia sin complicaciones.
                        </p>
                        <div className="principiosImage">
                            <img src={chipImage}/>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    );
}

export default QuienesSomos;
