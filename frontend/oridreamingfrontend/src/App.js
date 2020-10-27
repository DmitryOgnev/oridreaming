import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NaviBar from './Components/Navigator'
import Footer from './Components/Footer'

import Home from './Pages/Home';
import { Users } from './Pages/Users';
import { About } from './Pages/About';
import { Modelpage } from './Pages/Modelpage';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';





function App() {
  return (
    <>
    <Router >
      <NaviBar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/about" component={About} />
          <Route path="/modelpage" render={(props) => <Modelpage {...props} />} />
        </Switch>
      </Router>
  {/* <Footer /> */}
    </>
  );
}

export default App;
