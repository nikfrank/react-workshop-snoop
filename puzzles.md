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

1. fix all the syntax errors
2. fix all the lexical scoping bugs, and any error that shows up on the console

here we need to read the values out of the state, and make sure we read our instance methods from `this`

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    username: '', password: '',
  }

  setUsername = username=> this.setState(username)
  setPassword = password=> this.setState(password)
  setEmail = email=> this.setState(email)
  
  render(){
    const { username, password, email } = this.state;
    
    return (
      <div className='App'>
        <label>
          Username
          <input value={username} onChange={this.setUsername} />
        </label>

        <label>
          Password
          <input value={password} onChange={this.setPassword} />
        </label>
        
        <label>
          Email
          <input value={email} onChange={this.setEmail} />
        </label>

        <button onClick={this.signup}>Sign Up!</button>
      </div>
    );
  }
};

export default App;

```


3. fix the inputs... I don't think they work right now!

here we had two bugs: first, we weren't reading the `.target.value` out of the `event`

to fix it, I've used parameter destructuring,

`setWhatever = ({ target: { value: whatever }})=> this.setState({ whatever })`

though it can be done the more familiar way

`setWhatever = e => this.setState({ whatever: e.target.value })`


second, we weren't writing to the `state` correctly!

we had `this.setState(username)` instead of `this.setState({ username })`

the difference is that in the buggy code, we aren't passing an object to `setState`...

if we only pass some value to `setState` it won't get saved to `state.anything`

`setState` only knows `state.where` to save a value because we pass in an object

eg in `this.setState({ username: 'nik' })` we're passing `{ username: 'nik' }` as a param

to solve this issue, I've taken advantage of the ES6 object literal shortcut

`{ username: username }` can be rewritten as `{ username }`


<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  }

  setUsername = ({ target: { value: username }})=> this.setState({ username })
  setPassword = ({ target: { value: password }})=> this.setState({ password })
  setEmail = ({ target: { value: email }})=> this.setState({ email })
  
  render(){
    const { username, password, email } = this.state;
    
    return (
      <div className='App'>
        <label>
          Username
          <input value={username} onChange={this.setUsername} />
        </label>

        <label>
          Password
          <input value={password} onChange={this.setPassword} />
        </label>
        
        <label>
          Email
          <input value={email} onChange={this.setEmail} />
        </label>

        <button onClick={this.signup}>Sign Up!</button>
      </div>
    );
  }
};

export default App;

```

lastly, we get an error on the console because we didn't initialize `email` in the `state`


4. Hide the password while the user is typing it!

<sub>./src/App.js</sub>
```js
//...
          <input value={password} onChange={this.setPassword} type='password'/>
//...
```

all we need to do here is put `type='password'` on our `<input/>`


5. when the user clicks sign up (and has put in a username email and password), navigate to a funny youtube video

<sub>./src/App.js</sub>
```js
//...

  signup = ()=> (
    this.state.username &&
    this.state.password &&
    this.state.email
  ) && ( window.location.href = 'https://www.youtube.com/watch?v=F3c_-dde-wo' )

//...
```

all we need to do here is wite our `this.signup` function


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
    const eyes = this.state.eyes;
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

3. put a character limit on the hat text (so it can't overflow the hat!) within an existing line of code

4. use an Object like `{ [hashColor]: 'color name', ...}` to render the names of the colors into the dropdowns

5. if the avatar is wearing a trump hat, turn the avatar's eyes `red` and skin `green`

6. learn about [SVG](https://www.w3schools.com/graphics/svg_intro.asp) [in react](https://css-tricks.com/creating-svg-icon-system-react/) and make the avatar less fuuuuuugly!



### solutions

<details>
<summary>Click here to view solutions for this section</summary>

1. `<label>` each of the form inputs (that includes the `<select/>`s!), arrange them in a column

<sub>./src/App.js</sub>
```js
          <label>
            <span>Hat Color</span>
            <select value={hat} onChange={this.setHat}>
              {colors.map((color, i)=>(
                <option key={i} style={{ backgroundColor: color }} value={color}>{color}</option>
              ))}
            </select>
          </label>
//...
```

to get the `<label/>`s to arrange in a column, all we have to do is make them `display: block`

<sub>./src/App.css</sub>
```css
label {
  display: block;
}
```

2. refactor the `// reading from state` section to use [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) into one line of code

<sub>./src/App.js</sub>
```js
  const { hat, eyes, skin, mouth, hatText, hatTextColor } = this.state;
```

3. put a character limit on the hat text (so it can't overflow the hat!) within an existing line of code

<sub>./src/App.js</sub>
```js
  setHatText = e => this.setState({ hatText: e.target.value.slice(0, 12) })
```


4. use an Object like `{ [hashColor]: 'color name', ...}` to render the names of the colors into the dropdowns

<sub>./src/App.js</sub>
```js
//...

const colorNames = {
  '#f00': 'Red',
  '#0f0': 'Green',
  '#00f': 'Blue',
  '#0ff': 'Cyan',
  '#f0f': 'Magenta',
  '#ff0': 'Yellow',
  '#000': 'Black',
  '#fff': 'White',
  '#fda': 'Beige',
};

//...

            <select value={hat} onChange={this.setHat}>
              {colors.map((color, i)=>(
                <option key={i} style={{ backgroundColor: color }} value={color}>{colorNames[color]}</option>
              ))}
            </select>

```

5. if the avatar is wearing a trump hat, turn the avatar's eyes `red` and skin `green`

<sub>./src/App.js</sub>
```js
//...

  setHat = e => this.setState({ hat: e.target.value }, this.checkMaga)
  setSkin = e => this.setState({ skin: e.target.value })
  setEyes = e => this.setState({ eyes: e.target.value })
  setMouth = e => this.setState({ mouth: e.target.value })
  setHatText = e => this.setState({ hatText: e.target.value.slice(0, 12) }, this.checkMaga)
  setHatTextColor = e => this.setState({ hatTextColor: e.target.value }, this.checkMaga)

  checkMaga = ()=>{
    if( this.state.hat === '#f00' &&
        this.state.hatText === 'MAGA' &&
        this.state.hatTextColor === '#fff' &&
        (this.state.eyes !== '#f00' || this.state.skin !== '#0f0')) {
      this.setState({ eyes: '#f00', skin: '#0f0' })
    }
  }
//...
```

I've used the callback parameter to the `setState` function here to reuse the `checkMaga` instance method


6. learn about [SVG](https://www.w3schools.com/graphics/svg_intro.asp) [in react](https://css-tricks.com/creating-svg-icon-system-react/) and make the avatar less fuuuuuugly!

No solution provided...

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

