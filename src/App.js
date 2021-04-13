import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom'
import Nav from './components/Nav'
import HomeContainer from './containers/HomeContainer'

function App() {
  return (
    <div className="App">
      <Nav/>
      <Route exact path="/home" component={HomeContainer}></Route>
    </div>
  );
}

export default App;
