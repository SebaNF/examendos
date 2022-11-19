import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from './views/Main';
import CreatePet from './views/CreatePet';
import Details from './views/Details';
import EditPet from './views/EditPet';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/pets/new' element={<CreatePet/>}/>
        <Route path='/pets/:id' element={<Details/>}/>
        <Route path='/pets/:id/edit' element={<EditPet/>}/>
      </Routes>
    </div>
  );
}

export default App;
