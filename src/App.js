import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    rapName: 'Nate Dogg z"l',
    albumSales: 4200000,
  }

  done = ()=>{
    console.log('done', this.state);
  }

  setRapName = event => this.setState({ rapName: event.target.value })

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

          <div className="card">
            <input value={this.state.rapName} onChange={this.setRapName} />
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
