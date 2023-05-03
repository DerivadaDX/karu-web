import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/administracion_grupo_2/pages/Home';
import MasOrdenes from './components/administracion_grupo_2/pages/MasOrdenes';


function App() {
  return (
    <div className="App" >

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/masordenes" element={<MasOrdenes />} />
      </Routes>
    </div>
  );
}

export default App;