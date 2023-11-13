import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HowItWorks from './how-it-works/HowItWorks.jsx'
import App from './app/App.jsx'
import PrincipalUsuario from './chofer-usuario/principal-usuario.jsx';
import PrincipalChofer from './chofer-usuario/principal-chofer.jsx';
import QuienesSomos from './quienes-somos/quienes-somos.jsx';
import Registro from './registro/registro.jsx';
import HomePage from './homepage/homepage.jsx';

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/HowItWorks'} element={<HowItWorks />} />
                <Route path={'/principal-cliente'} element={<PrincipalUsuario />} />
                <Route path={'/principal-chofer'} element={<PrincipalChofer />} />
                <Route path={'/quienes-somos'} element={<QuienesSomos />} />
                <Route path={'/registro'} element={<Registro />} />
                <Route path={'/'} element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;