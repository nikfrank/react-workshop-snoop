import React, { Component } from 'react';
import './App.css';

import emailRegex from './emailRegex';
import goldRecord from './goldRecord.png';

class App extends Component {
  state = {
    rapName: 'Nate Dogg z"l',
    albumSales: 4200000,
    email: '',
    isEmailInvalid: false,
    job: '',
    country: '',
    topAlbum: '',
    topRapper: '',
    startDate: null,

  }

  done = ()=>{
    console.log('done', this.state);
  }

  setAlbumSales = event => this.setState({ albumSales: event.target.value })
  setRapName = event => this.setState({ rapName: event.target.value })
  setEmail = event => this.setState({
    email: event.target.value,
    isEmailInvalid: !emailRegex.test( event.target.value ),
  })

  setJob = event => this.setState({ job: event.target.value })
  
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
            <label>
              <input value={this.state.email} onChange={this.setEmail} />
              <span>Email</span>
              {this.state.isEmailInvalid ? (
                 <span className="invalid">
                   Please enter a valid email address
                 </span>
               ) : null}
            </label>
          </div>
          
          <div className="card swanky-input-container">
            <label>
              <input value={this.state.albumSales}
                     type='number'
                     step={1000}
                     onChange={this.setAlbumSales} />
              <span>Album Sales</span>
              <div className='goldRecords'>
                {
                  [1,2,3,4]
                    .filter(n => n*1000000 <= this.state.albumSales)
                    .map(n => (
                      <div className='goldRecord' key={n} >
                        <img src={goldRecord} alt='solid gold'/>
                      </div>
                    ))
                }
              </div>
            </label>
          </div>

          
          <div className="card swanky-input-container">
            <label>
              <select onChange={this.setJob} value={this.state.job}>
                <option value=''>Select Job</option>
                <option value='rapper'>rapper</option>
                <option value='sales'>sales</option>
                <option value='distribution'>distribution</option>
              </select>
              <span>Job</span>
            </label>
          </div>
        </div>
        <button onClick={this.done}> Done </button>
      </div>
    );
  }
};

export default App;
