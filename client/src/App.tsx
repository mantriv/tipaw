import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import {Route} from 'react-router-dom'
import Home from './components/Home';
import MemberForm from './components/MemberForm';
import {Provider} from 'react-redux';
import store from './redux/store';
import './App.css';


const App = () => {
  return (
    <Provider store={store}>
      <Container className="App">
        <NavBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/members' component={MemberForm} />
      </Container>    
    </Provider>
  );
}

export default App;
