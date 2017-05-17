import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Form } from "./components/Form";

class App extends Component {
  render() {
    return (
        <Form />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
