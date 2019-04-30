import React, { Component } from 'react';
import './App.css';

import emailRegex from './emailRegex';
import goldRecord from './goldRecord.png';

import snoopAlbums from './snoopAlbums';
import rappers from './rappers';
import countries from './countries';

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
    topRapper: rappers[3],
    startDate: null,
    countryQuery: '',
    selectableCountries: [],
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

  setTopRapper = topRapper => this.setState({ topRapper })

  setCountryQuery = event => this.setState({
    countryQuery: event.target.value,
    selectableCountries: countries.slice(0,3),
  })

  selectCountry = country => this.setState({ country, selectableCountries: [], countryQuery: country })
  
  render(){
    return (
      <div className='App'>
        <div className='header'>
          <img src={this.state.topRapper.imgSrc} alt={this.state.topRapper.name}/>
          <ul className='hover-dropdown'>
            <li key='top item'>{this.state.topRapper.name}</li>
            {rappers.map(rapper=>(
              <li key={rapper.name} onClick={()=> this.setTopRapper(rapper)}>{rapper.name}</li>
            ))}
          </ul>
        </div>
        
        <div className='form'>
          <div className='card swanky-input-container'>
            <label>
              <input value={this.state.rapName} onChange={this.setRapName} />
              <span className='title'>Rap Name</span>
            </label>
          </div>

          <div className='card swanky-input-container'>
            <label>
              <input value={this.state.email} onChange={this.setEmail} />
              <span className='title'>Email</span>
              {this.state.isEmailInvalid ? (
                 <span className='invalid'>
                   Please enter a valid email address
                 </span>
              ) : null}
            </label>
          </div>
          
          <div className='card swanky-input-container'>
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

          
          <div className='card swanky-input-container'>
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

          <div className='card swanky-input-container'>
            <span className='title'>Top Album</span>
            <div className='album-dropdown-base' onClick={this.toggleTopAlbumOpen}>
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

          <div className="card swanky-input-container">
            <span className='title'>Country</span>
            <div className="country-dropdown-base">
              <input value={this.state.countryQuery} onChange={this.setCountryQuery}/>
              {this.state.selectableCountries.length ? (
                 <ul className='selectable-countries'>
                   {this.state.selectableCountries.map(country=> (
                     <li key={country} onClick={()=> this.selectCountry(country)}>
                       {country}
                     </li>
                   ))}
                 </ul>
              ): null}
            </div>
          </div>

          
          <div className='done-container'>
            <button onClick={this.done} className='done-button'> Done </button>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
