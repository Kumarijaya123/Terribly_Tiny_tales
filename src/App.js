import logo from './logo.svg';
import './App.css';
import Home from './Components/Home'
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App" style={{overflowX:'hidden'}}>
      <NavBar/>
      <Home/>
    </div>
  );
}

export default App;
