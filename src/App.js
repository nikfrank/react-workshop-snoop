import React, { Component } from 'react';
import './App.css';


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import emailRegex from './emailRegex';
import goldRecord from './goldRecord.png';

import snoopAlbums from './snoopAlbums';
import rappers from './rappers';
import countries from './countries';

const score = (query, option)=>
  [...Array(query.length)].reduce((p, c, i)=>
    p + (option.toLowerCase().includes( query.slice(0, query.length -i).toLowerCase() ) ?
         query.length - i : 0
    ), -Math.min(10, option.length));

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
    rapperSpinning: false,
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
  clickOut = ()=> this.setState({
    topAlbumOpen: false,
    selectableCountries: [],
    countryQuery: this.state.country,
  })

  setTopRapper = topRapper => this.setState({ topRapper })

  setCountryQuery = event => this.setState({
    countryQuery: event.target.value,
    selectableCountries: countries
      .map(country => [country, score(event.target.value, country)])
      .sort((ca, cb)=> ca[1] > cb[1] ? -1 : 1)
      .map(c=> c[0])
      .slice(0,3),
    country: countries
      .find(country => country.toLowerCase() === event.target.value.toLowerCase()) || this.state.country,
  })

  selectCountry = country => this.setState({ country, selectableCountries: [], countryQuery: country })

  setStartDate = startDate => this.setState({ startDate })

  spinRapper = ()=> this.setState({ rapperSpinning: true }, ()=>{
    setTimeout(()=> this.setState({ rapperSpinning: false }), 2000)
  })
  
  render(){
    return (
      <div className='App'>
        <div className='header'>
          <img src={this.state.topRapper.imgSrc}
               className={this.state.rapperSpinning ? 'spinning' : ''}
               onClick={this.spinRapper}
               alt={this.state.topRapper.name}/>
          
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

          <div className='card swanky-input-container'>
            <div className='country-dropdown-base'>
              <input value={this.state.countryQuery} onChange={this.setCountryQuery}/>
              <span className='title'>Country</span>
              {this.state.selectableCountries.length ? (
                 <>
                   <div className='click-out' onClick={this.clickOut}/>
                   <ul className='selectable-countries'>
                     {this.state.selectableCountries.map(country=> (
                       <li key={country} onClick={()=> this.selectCountry(country)}>
                         {country}
                       </li>
                     ))}
                   </ul>
                 </>
              ): null}
            </div>
          </div>

          <div className='card date-input-container swanky-input-container'>
            <DatePicker selected={this.state.startDate} onChange={this.setStartDate}/>
            <span className='title'>Start Date</span>
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
