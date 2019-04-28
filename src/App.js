import React, { Component } from 'react';
import './App.css';

import emailRegex from './emailRegex';
import goldRecord from './goldRecord.png';

import snoopAlbums from './snoopAlbums';

class App extends Component {
  state = {
    rapName: 'Nate Dogg z"l',
    albumSales: 4200000,
    email: '',
    isEmailInvalid: false,
    job: '',
    country: '',
    topAlbum: null,
    topAlbumOpen: false,
    topRapper: '',
    startDate: null,
  }

  done = ()=>{
    console.log('done', this.state);
  }

  toggleTopAlbumOpen = ()=> this.setState(state => ({ topAlbumOpen: !state.topAlbumOpen }))
  
  setAlbumSales = event => this.setState({ albumSales: event.target.value })
  setRapName = event => this.setState({ rapName: event.target.value })
  setEmail = event => this.setState({
    email: event.target.value,
    isEmailInvalid: !emailRegex.test( event.target.value ),
  })

  setJob = event => this.setState({ job: event.target.value })

  selectAlbum = topAlbum=> this.setState({ topAlbum, topAlbumOpen: false })
  clickOut = ()=> this.setState({ topAlbumOpen: false })
  
  render(){
    return (
      <div className="App">
        <div className="form">
          <div className="card swanky-input-container">
            <label>
              <input value={this.state.rapName} onChange={this.setRapName} />
              <span className='title'>Rap Name</span>
            </label>
          </div>

          <div className="card swanky-input-container">
            <label>
              <input value={this.state.email} onChange={this.setEmail} />
              <span className='title'>Email</span>
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
              <span className='title'>Album Sales</span>
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
              <span className='title'>Job</span>
            </label>
          </div>

          <div className="card swanky-input-container">
            <span className='title'>Top Album</span>
            <div className="album-dropdown-base" onClick={this.toggleTopAlbumOpen}>
              {this.state.topAlbum === null ? (
                 <span>Select Top Album</span>
              ):(
                 <>
                   <img src={this.state.topAlbum.cover} alt={this.state.topAlbum.name}/>
                   <span>{this.state.topAlbum.year}</span>
                   <span>{this.state.topAlbum.name}</span>
                 </>
              )}
              <span className='drop-arrow'>{this.state.topAlbumOpen ? '▲' : '▼'}</span>
            </div>
            {!this.state.topAlbumOpen ? null : (
               <>
                 <div className='click-out' onClick={this.clickOut}/>
                 <ul className='selectable-albums'>
                   {snoopAlbums.map(({ name, year, cover })=> (
                     <li key={name} onClick={()=> this.selectAlbum({ name, year, cover })}>
                       <img src={cover} alt={name}/>
                       <span>{year}</span>
                       <span>{name}</span>                       
                     </li>
                   ))}
                 </ul>
               </>
            )}
          </div>

          
        </div>
        <button onClick={this.done}> Done </button>
      </div>
    );
  }
};

export default App;
