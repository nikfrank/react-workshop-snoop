<a name="thatop"></a>
# forms & user input in react: snoop jobs

Snoop wants us to build him a job application form, and he wants it to be **fresh**

Agenda:

- [step 1: on the button](#step1)
- [step 2: give'm what they want - text input](#step2)
- [step 3: break'm off somethin - drop downs](#step3)
- [step 4: and it's gotta be bumpin - refactor to components](#step4)
- [step 5: menu layout](#step5)


## getting started

`$ create-react-app snoop-jobs`

`$ cd snoop-jobs`

`$ npm start`

you now have the default create-react-app starter running in your browser and can edit the `src` files live

you are now also ready to work through the [exercises](/exercises.md)!

you should be fairly comfortable with `setState` `onClick` and `onChange` before starting. If you aren't yet, go do the exercises first!



<a name="step1"></a>
## step 1: on the button

<img src='http://3.bp.blogspot.com/-wojpCbgYsz8/UB9hbJnCo_I/AAAAAAAABlk/GHXo4H9vFck/s1600/Snoop-Doggy-Dogg-24.jpg' height=250 width=325/>

Uncle Snoop wants to make sure we can get events from the user. First thing's first - we need a `<button>` for them to press. You might say it's a bit backwards to start with a done button, but you know how Snoop likes to flip the script.


<sub>./src/App.js</sub>
```js
//...

class App extends Component {
  render(){
    return (
      <div className='App'>
        <button> Done </button>
      </div>
    );
  }
}
```

and let's give it an instance method to call

<sub>./src/App.js</sub>
```js
//...

class App extends Component {

  done = ()=> console.log('done')

  render(){
    return (
      <div className='App'>
        <button onClick={this.done}> Done </button>
      </div>
    );
  }
}
```

notice that when we bind the instance method to the button with `onClick={this.done}` we need to say `this.done` but when we defined it it was just `done = ()=> ...`

what we'll be doing in this workshop is learning to get user values into `state`, so let's init a state and log it out in `this.done`

<sub>./src/App.js</sub>
```js
//...

class App extends Component {

  state = {
    rapName: 'Nate Dogg z"l',
    albumSales: 4200000
  }

  done = ()=> console.log('done', this.state)

  render(){
    return (
      <div className='App'>
        <button onClick={this.done}> Done </button>
      </div>
    );
  }
}
```

---

[back to the top](#thatop)

---


<a name="step2"></a>
## step 2: give'm what they want - text input

### rap name
### floating label animation

### email, validation
### animating on validation state

### albums sales, number format
### gold and platinum albums


<a name="step3"></a>
## break'm off somethin - drop downs

### pick a job
### country & state
### dropdown with an image (album selection)
### menu hover dropdown
### autocomplete / filter dropdown
### picking a date


<a name="step4"></a>
## and it's gotta be bumpin - refactor to components

### snoop SVG, album SVG
### floating label input
### image dropdown
### autocomplete dropdown


<a name="step5"></a>
## city of compton - notifications and animations

### toastr on submit
### transition on cards entry
### transition on floating labels
### transition on validation colors
### transition on dropdowns
### tupac ak-47!!!!


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

