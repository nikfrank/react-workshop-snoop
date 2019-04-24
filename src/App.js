import React, { Component } from 'react';
import './App.css';

import emailRegex from './emailRegex';

class App extends Component {
  state = {
    rapName: 'Nate Dogg z"l',
    albumSales: 4200000,
    email: '',
    isEmailInvalid: false,
  }

  done = ()=>{
    console.log('done', this.state);
  }

  setRapName = event => this.setState({ rapName: event.target.value })
  setEmail = event => this.setState({
    email: event.target.value,
    isEmailInvalid: !emailRegex.test( event.target.value ),
  })

  render(){
    return (
      <div className="App">
        <div className="form">
          <div className="card swanky-input-container">
            <label>
              <input value={this.state.rapName} onChange={this.setRapName} />
              <span>Rap Name</span>
            </label>
          </div>

          <div className="card swanky-input-container">
            <input value={this.state.email} onChange={this.setEmail} />
            <span>Email</span>
            {this.state.isEmailInvalid ? (
               <span className="invalid">
                 Please enter a valid email address
               </span>
             ) : null}
          </div>
          
          <div className="card">
            <input value={this.state.rapName} onChange={this.setRapName} />
          </div>

        </div>
        <button onClick={this.done}> Done </button>
      </div>
    );
  }
};

export default App;
