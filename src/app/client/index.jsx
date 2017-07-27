import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
