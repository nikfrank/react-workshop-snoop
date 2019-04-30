# exercises for React form elements

these exercises can be done in an off-the-shelf create-react-app

if you haven't already, follow out the [getting started instructions](https://github.com/nikfrank/react-workshop-snoop/#getting-started) to get that running


## one way data flow for <input/>s

where we left off the exercises from the xcoin workshop, we had just written our first `<input/>`

we'll cover in these exercises the most common patterns for single state value user input flows

[pseudoselectors]()


### exercises

in <sub>./src/App.js</sub> let's ...

1. render an `<input/>`, bind it to a `state` value, and style it in the `:hover` `:focus` and `:active` states

2. render a `<label/>` around our `<input/>`, style the `<label/>` when the `<input/>` is `:focus`

3. if the `<input/>` has something put in it, render the input next to the `<input/>` in a `<span/>`

4. when the value of the `<input/>` is "the word" render an `<img/>` of a bird

5. render another `<input/>` with `type='number'` and turn it `red` when it is less than `0` using `style` prop or `className`


### solutions

<details>
<summary>Click here to view solutions for this section</summary>


solutions go here

</details>








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


solutions go here

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

5. filter out items by setting `height: 0` and transition their height (smooth filtering!)




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