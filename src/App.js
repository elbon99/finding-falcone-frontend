import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GreekTrust from './Components/GreekTrust'
import Success from './Components/Success';

export const backendAPI = {
  "endpoint" : "https://findfalcone.herokuapp.com"
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<GreekTrust />} />
          <Route exact path='/success' element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
