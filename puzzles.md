# puzzles for React form elements

these puzzles can be done in an off-the-shelf create-react-app

if you haven't already, follow out the [getting started instructions](https://github.com/nikfrank/react-workshop-snoop/#getting-started) to get that running



---

## logging in

we've taken over an app which lets people sign up with a username email and password, but the legacy code is full of bugs!

here's the code we have

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import 'App.css';

class App extends Component {
  state = {
    username: '', password: '',
  }

  setUsername = username=> this.setState(username)
  setPassword = password=> this.setState(password)
  setEmail = email=> this.setState(email)
  
  render(){
    return (
      <div className='App'>
        <label>
          Username
          <input value={username} onChange={setUsername} />
        </label>

        <label>
          Password
          <input value={password} onChange={password} />
        </label>
        
        <label>
          Email
          <input value={email} onChange={setEmail} />
        </label>

        <button onClick={signup}>Sign Up!</button>
      </div>
    );
  }
};

export default App;
```

to get paid, we're gonna need to

1. fix all the syntax errors

2. fix all the lexical scoping bugs, and any error that shows up on the console

3. fix the inputs... I don't think they work right now!

4. Hide the password while the user is typing it!

5. when the user clicks sign up (and has put in a username email and password), navigate to a funny youtube video


### solutions

<details>
<summary>Click here to view solutions for this section</summary>


solutions go here

</details>



---

## avatars

we've taken over an app which lets people design an avatar, but the legacy code is full of bugs!

Also the avatars are super ugly, but that's not our problem!

here's the code we have

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.css';

const colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0', '#000', '#fff', '#fda'];

class App extends Component {
  state = {
    hat: '#ff0', skin: '#fda', eyes: '#0f0', mouth: '#f00',
    hatText: 'Blah!', hatTextColor: '#000',
  }

  setHat = e => this.setState({ hat: e.target.value })
  setSkin = e => this.setState({ skin: e.target.value })
  setEyes = e => this.setState({ eyes: e.target.value })
  setMouth = e => this.setState({ mouth: e.target.value })
  setHatText = e => this.setState({ hatText: e.target.value })
  setHatTextColor = e => this.setState({ hatTextColor: e.target.value })
  
  render() {
    // reading from state
    const hat = this.state.hat;
    const skin = this.state.skin;
    const mouth = this.state.mouth;
    const hatText = this.state.hatText;
    const hatTextColor = this.state.hatTextColor;
    
    return (
      <div className="App">
        <div>
          <select value={hat} onChange={this.setHat}>
            {colors.map((color, i)=>(
              <option key={i} style={{ backgroundColor: color }} value={color}>{color}</option>
            ))}
          </select>
          
          <input value={hatText} onChange={this.setHatText}/>
          
          <select value={hatTextColor} onChange={this.setHatTextColor}>
            {colors.map((color, i)=>(
              <option key={i} style={{ backgroundColor: color }} value={color}>{color}</option>
            ))}
          </select>
          
          <select value={skin} onChange={this.setSkin}>
            {colors.map((color, i)=>(
              <option key={i} style={{ backgroundColor: color }} value={color}>{color}</option>
            ))}
          </select>
          
          <select value={eyes} onChange={this.setEyes}>
            {colors.map((color, i)=>(
              <option key={i} style={{ backgroundColor: color }} value={color}>{color}</option>
            ))}
          </select>
          
          <select value={mouth} onChange={this.setMouth}>
            {colors.map((color, i)=>(
              <option key={i} style={{ backgroundColor: color }} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <div>
          <svg viewBox='0 0 100 100'>
            <circle cx={50} cy={50} r={40} fill={skin}/>
            <rect x={25} y={7} height={12} width={50} fill={hat} />
            <text x={50} y={16} textAnchor='middle'
                  style={{ fill: hatTextColor, fontSize: 8 }}>{hatText}</text>

            <circle cx={30} cy={40} r={5} fill='white'/>
            <circle cx={30} cy={40} r={2} fill={eyes}/>
            <circle cx={30} cy={40} r={1} fill='black'/>

            <circle cx={70} cy={40} r={5} fill='white'/>
            <circle cx={70} cy={40} r={2} fill={eyes}/>
            <circle cx={70} cy={40} r={1} fill='black'/>

            <circle cx={50} cy={71} r={5} fill={mouth}/>
            <circle cx={50} cy={71} r={3} fill='black'/>
          </svg>
        </div>
      </div>
    );
  }
}

export default App;
```

to get paid, we're gonna need to

1. `<label>` each of the form inputs (that includes the `<select/>`s!), arrange them in a column

2. refactor the `// reading from state` section to use [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) into one line of code

3. put a character limit on the hat text (so it can't overflow the hat!)

4. use an Object like `{ [hashColor]: 'color name', ...}` to render the names of the colors into the dropdowns

5. if the avatar is wearing a trump hat, turn the avatar's eyes `red` and skin `green`

6. learn about [SVG](https://www.w3schools.com/graphics/svg_intro.asp) [in react](https://css-tricks.com/creating-svg-icon-system-react/) and make the avatar less fuuuuuugly!


### solutions

<details>
<summary>Click here to view solutions for this section</summary>


solutions go here

</details>


---

## map sort and filter

we've taken over an app for displaying top chess players, but the legacy code is full of bugs!

here's the code we have

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import 'App.css';

class App extends Component {
  state = {
    players: [
      { name: 'roofus', age: 18, rating: 980 },
      { name: 'doofus', age: 19, rating 1279 },
      { name: 'garry', age: 25, rating: 2886 },
      { name: 'jose', age: 92, rating: 2877 },
      { name: 'bobby', age: 47, rating: 2895 },
    ],

    minAge: 21,
  }

  render(){
    return (
      <div className='App'>
        <ul>
          {players
            .filter(player=> student.age < minAge)
            .map(player=> (
              <li key={player.name}>{player.name} - age {player.age}</li>
            )
          )}
        </ul>
      </div>
    );
  }
};

export default App;
```

to get paid, we're gonna need to

1. fix all the lexical scoping bugs

2. fix the feature bug

3. in one line of code, use `.sort` to rank the players by `age` or `rating`

4. in one line of code, filter out players with ratings less than 2000

5. remove all `.filter` calls; reimplement `age` and `rating` filters using CSS's `z-index`


### solutions

<details>
<summary>Click here to view solutions for this section</summary>


solutions go here

</details>





---

## logging in

we've taken over an app which , but the legacy code is full of bugs!

here's the code we have

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import 'App.css';

class App extends Component {
  state = {
  }

  render(){
    return (
      <div className='App'>
      </div>
    );
  }
};

export default App;
```

to get paid, we're gonna need to

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