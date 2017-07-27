import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';
import MainFrame from './components/frames/MainFrame';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <MainFrame />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
