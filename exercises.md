# exercises for React form elements

these exercises can be done in an off-the-shelf create-react-app

if you haven't already, follow out the [getting started instructions](https://github.com/nikfrank/react-workshop-snoop/#getting-started) to get that running


## one way data flow for <input/>s

where we left off the exercises from the xcoin workshop, we had just written our first `<input/>`

we'll cover in these exercises the most common patterns for single state value user input flows

[pseudoselectors](https://www.google.com/search?q=css+pseudoselectors)


## binding inputs

in <sub>./src/App.js</sub> let's ...

1. render an `<input/>`, bind it to a `state` value, and style it in the `:hover` and `:focus` states

  render also a button styled in the `:hover` and `:active` states

2. render a `<label/>` around our `<input/>`, style the `<label/>` when the `<input/>` is `:focus`

3. if the `<input/>` has something put in it, render the input next to the `<input/>` in a `<span/>`

4. when the value of the `<input/>` is "the word" render an `<img/>` of a bird

5. render another `<input/>` with `type='number'` and turn it `red` when it is less than `0` using `style` prop or `className`


### solutions

<details>
<summary>Click here to view solutions for this section</summary>

1.  render an `<input/>`, bind it to a `state` value, and style it in the `:hover` and `:focus` states

  render also a button styled in the `:hover` and `:active` states


<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = { word: '' }

  setWord = e => this.setState({ word: e.target.value })

  render() {    
    return (
      <div className="App">
        <input className="word-input" value={this.state.word} onChange={this.setWord} />
        <button className='heard-button'
                onClick={()=> this.state.word && alert(this.state.word+' is the word')}>
          have you heard?
        </button>
      </div>
    );
  }
}

export default App;
```

I wrote my solution in SCSS (to get SCSS in `create-react-app` run `$ yarn add node-sass` and resuffix your file)

but I will provide a CSS translation below

<sub>./src/App.scss</sub>
```scss
input.word-input {
  &:hover {
    font-size: 1.25 rem;
  }

  &:focus {
    font-size: 1.25 rem;
    color: #040;
  }
}

button.heard-button {
  background-color: #00f;
  color: #fff;
  
  &:hover {
    background-color: #38f;
    color: #000;
  }

  &:active {
    background-color: #00a;
    color: #fff;
  }
}
```

OR

<sub>./src/App.scss</sub>
```css
input.word-input:hover {
  font-size: 1.25 rem;
}

input.word-input:focus {
  font-size: 1.25 rem;
  color: #040;
}

button.heard-button {
  background-color: #00f;
  color: #fff;
}

button.heard-button:hover {
  background-color: #38f;
  color: #000;
}

button.heard-button:active {
  background-color: #00a;
  color: #fff;
}
```

</details>



2. render a `<label/>` around our `<input/>`, style the `<label/>` when the `<input/>` is `:focus`

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = { word: '' }

  setWord = e => this.setState({ word: e.target.value })

  render() {    
    return (
      <div className="App">
        <label className='word-label'>
          what's the word?
          <input className="word-input" value={this.state.word} onChange={this.setWord} />
        </label>
        <button className='heard-button'
                onClick={()=> this.state.word && alert(this.state.word+' is the word')}>
          have you heard?
        </button>
      </div>
    );
  }
}

export default App;
```

<sub>./src/App.css</sub>
```css
label.word-label:focus-within {
  background-color: #eee;
}
```


3. if the `<input/>` has something put in it, render the input next to the `<input/>` in a `<span/>`

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = { word: '' }

  setWord = e => this.setState({ word: e.target.value })

  render() {    
    return (
      <div className="App">
        <label className='word-label'>
          what's the word?
          <input className="word-input" value={this.state.word} onChange={this.setWord} />
        </label>
        {this.state.word && (
           <span>{this.state.word}</span>
        )}
      </div>
    );
  }
}

export default App;
```


4. when the value of the `<input/>` is "bird" render an `<img/>` of a bird

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = { word: '' }

  setWord = e => this.setState({ word: e.target.value })

  render() {    
    return (
      <div className="App">
        <label className='word-label'>
          what's the word?
          <input className="word-input" value={this.state.word} onChange={this.setWord} />
        </label>

        {this.state.word === 'bird' && (
           <img src='https://files.cults3d.com/uploaders/13338795/illustration-file/34f3e8d2-6ff0-4fd5-adc1-e67936f5defd/CASACOMUNISTAS_large.png'/>
        )}
      </div>
    );
  }
}

export default App;
```


5. render another `<input/>` with `type='number'` and turn it `red` when it is less than `0` using `style` prop or `className`


<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = { money: 0 }
  
  setMoney = e => this.setState({ money: 1*e.target.value })
  
  render() {    
    return (
      <div className="App">
        <label className='money-label'>
          $
          <input className={this.state.money < 0 ? 'in-the-red' : 'in-the-black'}
                 type='number'
                 value={this.state.money} onChange={this.setMoney}/>
        </label>
      </div>
    );
  }
}

export default App;
```

<sub>./src/App.css</sub>
```css
input.in-the-red {
  color: red;
}

input.in-the-black {
  color: black;
}

label.money-label {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```



---

## validating input

during our user input flow, we have an opportunity to validate the input before it gets into our `state`

this is one of the primary advantages of the "single direction" input model that React advises.

Before saving the value to `state` we can edit the input value however we want, and compute other values (like validation Booleans)


### exercises

in <sub>./src/App.js</sub> let's practice using `setState` in our input flow to...

1. make an `<input/>` which only allows a-z, A-Z, 0-9 and " " the space character

2. make an `<input/>` which renders an `<img/>` of a bird when the value is "the word" with a `state` boolean

3. make two `<input/>`s, one is always CAPSLOCK, the other is lowercase, and both set eachother's value (keep in sync)

4. make an `<input/>` with a reset `<button/>` (clicking the button clears the value)... bonus: style the button to be an icon sitting inside the input only when needed

5. make three numerical `<input/>`s, A x B = C... whenever A or B change, change C to the product; when C changes, change A or B to keep equality


### solutions

<details>
<summary>Click here to view solutions for this section</summary>



1. make an `<input/>` which only allows a-z, A-Z, 0-9 and "_" the underscore character

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = { username: '' }

  setUsername = e => this.setState({
    username: e.target.value.replace(/[^0-9a-zA-Z_]/g, '')
  })
  
  render() {    
    return (
      <div className="App">
        <label>
          Username
          <input value={this.state.username} onChange={this.setUsername} />
        </label>
      </div>
    );
  }
}

export default App;
```


2. make an `<input/>` which renders an `<img/>` of a bird when the value is "the word" with a `state` boolean

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = { word: '', isBirdTheWord: false }

  setWord = e => this.setState({
    word: e.target.value,
    isBirdTheWord: e.target.value === 'bird',
  })
  
  render() {    
    return (
      <div className="App">
        <label>
          The Word
          <input value={this.state.word} onChange={this.setWord} />
        </label>
        {this.state.isBirdTheWord && (
           <img src='https://files.cults3d.com/uploaders/13338795/illustration-file/34f3e8d2-6ff0-4fd5-adc1-e67936f5defd/CASACOMUNISTAS_large.png'/>
        )}

      </div>
    );
  }
}

export default App;
```

3. make two `<input/>`s, one is always CAPSLOCK, the other is lowercase, and both set eachother's value (keep in sync)

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    yell: '',
    whisper: '',
  }

  setText = e => this.setState({
    yell: e.target.value.toUpperCase(),
    whisper: e.target.value.toLowerCase(),
  })
  
  render() {    
    return (
      <div className="App">
        <label>
          YELLING
          <input value={this.state.yell} onChange={this.setText} />
        </label>
        
        <label>
          whispering
          <input value={this.state.whisper} onChange={this.setText} />
        </label>
        
      </div>
    );
  }
}

export default App;
```

4. make an `<input/>` with a reset `<button/>` (clicking the button clears the value)... bonus: style the button to be an icon sitting inside the input only when needed


<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = { username: '' }

  setUsername = e => this.setState({ username: e.target.value })

  reset = ()=> this.setState({ username: '' })
  
  render() {    
    return (
      <div className="App">
        <label className='reset-container'>
          Username
          <input value={this.state.username} onChange={this.setUsername} />
          {this.state.username && (
             <span onClick={this.reset} className='reset-button'>X</span>
          )}
        </label>

      </div>
    );
  }
}

export default App;
```

<sub>./src/App.scss</sub>
```scss
.reset-container {
  position: relative;

  min-height: 60px;
  min-width: 100px;

  & input {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 20px;
    width: calc( 100% - 4px );
  }
  
  & span {
    position: absolute;
    right: 5px;
    bottom: 5px;

    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: #777;
    color: white;
  }
}
```

or in CSS

<sub>./src/App.css</sub>
```css
.reset-container {
  position: relative;

  min-height: 60px;
  min-width: 100px;
}

.reset-container input {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 20px;
  width: calc( 100% - 4px );
}

.reset-container span {
  position: absolute;
  right: 5px;
  bottom: 5px;

  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: #777;
  color: white;
}
```

5. make three numerical `<input/>`s, A x B = C... whenever A or B change, change C to the product; when C changes, change A or B to keep equality


<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = { A: 0, B: 0, C: 0 }

  setA = e => this.setState({
    A: 1*e.target.value,
    C: this.state.B * e.target.value,
  })

  setB = e => this.setState({
    B: 1*e.target.value,
    C: this.state.A * e.target.value,
  })

  setC = e => this.setState({
    C: e.target.value,
    B: !(1*e.target.value) ? 0:
       this.state.A ? (e.target.value / this.state.A):
       1,
    A: 1*e.target.value && !this.state.A ? e.target.value : this.state.A,
  })
  
  render() {
    return (
      <div className="App">
        <label>
          A
          <input value={this.state.A} onChange={this.setA} type='number'/>
        </label>

        <label>
          * B
          <input value={this.state.B} onChange={this.setB} type='number'/>
        </label>

        <label>
          = C
          <input value={this.state.C} onChange={this.setC} type='number'/>
        </label>
      </div>
    );
  }
}

export default App;
```

sometimes, when dividing by zero, we have to force the logic to work!

that'll teach you to make up examples with edge cases...

</details>




---

## size transitions

elements in our app sometimes change their size. By default, if we change the CSS of an element to have a different size, it will immediately change (on the next render)

sometimes though, we want a smoother transition (especially when the size change moves other elements... aka JANKS THE PAGE)

let use the [CSS transition rule]() to achieve the smooth effects we want in our app


### exercises

in <sub>./src/App.js</sub> let's ...

1. make a `<button>grow</button>` when clicked, doubles in size smoothly and changes its text to 'shrink' (then halves, and changes back to 'grow', etc)

2. make an `<input/>` for a number between 10-100 with a step of 10, which renders a circle next to it with that size in pixels, smoothly `transition`ing

3. make a `<select/>` with `<option/>`s for 5 different colors. The color determines the circle's `backgroundColor`, which `transition`s smoothly

4. make a `<button/>` which when clicked, rotates around once

5. make a `<ul>` of `<li>` names. When the user clicks one, it should expand smoothly and display another line of data (if they like dogs or cats)


### solutions

<details>
<summary>Click here to view solutions for this section</summary>


solutions go here

</details>








---

## containers and flex

mostly, we won't render input elements willy nilly around our page. Usually, we'll give our `<input/>`s a container `<div/>` which allows us to
easily style the `<input/>` along with elements which need to be positioned nearby (like context icons)

We can then wrap those containers with a `.form-container` which will allow us to use CSS flex-box to choose the layout we want for our form inputs

let's practice these skillz!


### exercises

in <sub>./src/App.js</sub> let's ...

1. make a `<select/>` within a container `<div/>` which determines the `border-color` of its container `<div/>`

2. wrap three other examples from above in container `<div/>`s

3. wrap our four containers in a `.form-container` which is `display: flex`

4. make a `<button/>` which toggles our `.form-container` between `flex-direction: column` and `column-reverse`

5. use `display: flex` on our containers to center the `<input/>`s vertically AND horizontally


### solutions

<details>
<summary>Click here to view solutions for this section</summary>


solutions go here

</details>








## lists: map and filter

1. make an `[]` array of `'names'` in `state` and use `.map  => <li>` to render them

2. make an `[]` array of `{}` objects with `{ name: ... }` in `state` and use `.map` to render them

3. in your `render` function, chain a `.filter` before the `.map` to render only names with an 'n' in them

4. make a toggler `<button/>` which turns the `.filter` behaviour on / off

5. filter out items without `.filter` by setting `height: 0` and transition their height (smooth filtering!)




---

## exercise topic

spiel on topic for a bit, put some links to learn about the topic


### exercises

in <sub>./src/App.js</sub> let's ...

1. 

2. 

3. 

4. 

5. 


### solutions

<details>
<summary>Click here to view solutions for this section</summary>


solutions go here

</details>