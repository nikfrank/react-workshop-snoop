<a name="thatop"></a>
# формы & поля ввода на react: snoop jobs

Snoop хочет, чтобы мы построили форму для наема на работу, и он хочет чтоб она была **свежей**

План:

- [step 1: on the button - создание кнопки](#step1)
- [step 2: give'm what they want - поле ввода(input)](#step2)
- [step 3: break'm off somethin - выпадающий список(drop downs)](#step3)
- [step 4: and it's gotta be bumpin - рефакторинг, к компонентам](#step4)
- [step 5: city of compton - уведомления и анимации](#step5)


## с чего начнем

`$ npx create-react-app snoop-jobs`

`$ cd snoop-jobs`

`$ npm start`

теперь у вас есть стандартное create-react-app стратовое приложение, запущенное в браущере, изменения из `src` будут применятся автоматически

также вы теперь готовы работать с упражнениями [exercises](/exercises.md)!

 вы должны быть на 100% процентов чувствовать себя комфортно с использованием `setState` `onClick` и `onChange` перед началом. Если нет, начните с упражнений!



<a name="step1"></a>
## step 1: on the button

<img src='http://3.bp.blogspot.com/-wojpCbgYsz8/UB9hbJnCo_I/AAAAAAAABlk/GHXo4H9vFck/s1600/Snoop-Doggy-Dogg-24.jpg' height=250 width=325/>

Дядя Snoop хочет быть уверенным, что мы получаем события от пользователя. Первым делом - нам нужна кнопка - `<button>` чтобы пользователю было что нажимать. вы межете подумать, что это задом наперед начинать с кнопки готово, но вы же знаете как Snoop любит делать все наоборот.


<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className='App'>
        <button> Done </button>
      </div>
    );
  }
}

export default App;
```

и давайте присвоим этому выражение для вызова, используя толстую стрелку для вывода сообщения в консоль `'done'` (просто чтобы протестировать работу нашей кнопки)

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.css';

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

export default App;
```

`done = ()=> console.log('done')` определяет `this.done` как функцию (мы используем [толстую стрелку](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) в одну линию чтобы вызвать `console.log` со строкой `'done'`

обратите внимание, что нам нужно вызвать выражение при нажатии на кнопку с помощью `onClick={this.done}` нужно вставить `this.done`, но когда мы определили было только `done = ()=> ...`

что мы будем делать в этом воркшопе, узнаем как сохранить данные пользователя в `state`, так что давайте опрделим состояние и выведем его в консоль `this.done`

запомните `state = {}` должен быть в начале нашего класса `class` (в таком случае мы всегда знаем где его найти)

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    rapName: 'Nate Dogg z"l',
    albumSales: 4200000,
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

export default App;
```

теперь мы можем добавить немного "соуса" CSS и этого будет достаточно чтобы начать

```html
        <button onClick={this.done} className='done-button'> Done </button>
```

<sub>./src/App.css</sub>
```css
//...

.done-button {
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  font-size: 24px;
  border-radius: 5px;
  user-select: none;
}
```

мы также (обычно) хотим избавится от надоедливого контура (мой оранжевый) после нажатия на кнопку `<button/>`

сделаем мы это с помощью стилизации на `:focus` [pseudoselector](https://www.w3schools.com/css/css_pseudo_classes.asp) (нажатие на `<button/>` применяет к ней состояние `:focus`)

```css
.done-button:focus {
  outline: none;
}
```


---

[к началу](#thatop)

---


<a name="step2"></a>
## step 2: give'm what they want - text input

### editing the rap name

у нас есть `rapName` определенное в нашем `state`, теперь время дать пользователью возможность менять его

сперва вы выведем `<input />` элемент со значением в нем

<sub>./src/App.js</sub>
```js
//...

  render(){
    return (
      <div className='App'>
        <input value={this.state.rapName}/>
        <button onClick={this.done}> Done </button>
      </div>
    );
  }

//...
```

удобно если значение никогда не нужно менять, но Snoop хочет чтобы то что ввел польхователь было определено в `.state`, и таким образом это будет выведено обратно пользователю!

мы уже знаем что все что изменяется что видит пользователь должно быть определено в состоянии.

Таким образом каждый раз когда пользователь вписывает даже один символ, мы должны определить его в состоянии - только тогда он может быть выведен пользователю.


Чтобы получить, что вводит пользователь мы будем использовать обрабтчик события `onChange` в нашем поле ввода `<input />` который определяет значение в `state` используя `setState`

Этот паттерн является стандартом в Реакте и называется: [паттерн контролированного ввода](https://reactjs.org/docs/forms.html)

<sub>./src/App.js</sub>
```js
//...

  setRapName = event => this.setState({ rapName: event.target.value })

  render(){
    return (
      <div className='App'>
        <input value={this.state.rapName} onChange={this.setRapName}/>
        <button onClick={this.done}> Done </button>
      </div>
    );
  }

//...
```

### контейнер карточки для полей ввода

Snoop хочет, чтобы его элемнты формы были так же хорошо стилизованы, как и функциональны

Давайте сделаем карточку (как в [material design](https://material-ui.com/demos/cards/))

first we'll wrap our `<input />` with a container (.card) `<div>...</div>`

<sub>./src/App.js</sub>
```html
//...
  render(){
    return (
      <div className='App'>
        <div className='form'>
          <div className="card">
            <input value={this.state.rapName} onChange={this.setRapName}/>
          </div>
          <button onClick={this.done}> Done </button>
        </div>
      </div>
    );
  }

//...
```

и стилизуем `.card` чтобы она была нужного размера (использовать min-* и max-* height/width это лучшая практка для отзывчивого дизайна)


<sub>./src/App.css</sub>
```css
//...

.card {
  min-width: 300px;
  min-height: 80px;

  margin: 10px;
}

.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

```

и мы можем добавить немного теней, используя `box-shadow`

<sub>./src/App.css</sub>
```css
//...

.card {
  min-width: 300px;
  min-height: 80px;

  margin: 10px;

  box-shadow:
  0px 1px 3px 0px rgba(0,0,0,0.2),
  0px 1px 1px 0px rgba(0,0,0,0.14),
  0px 2px 1px -1px rgba(0,0,0,0.12);
}
```

мы будем исользовать снова и снова этот `.card` контейнер для остальных элементов нашей формы!

мы также можем сместить `.done-button` на свою собственную строку

```css
.done-container {
  flex-basis: 100%;
  display: flex;
  justify-content: center;
}
```

```html
          <div className='done-container'>
            <button onClick={this.done} className='done-button'> Done </button>
          </div>
```


и сделать ее вид как у карточек, используя `box-shadow` в стандартном состоянии

<sub>./src/App.css</sub>
```css
.done-button {
  //...

  border: none;
  box-shadow:
    0px 1px 3px 0px rgba(0,0,0,0.2),
    0px 1px 1px 0px rgba(0,0,0,0.14),
    0px 2px 1px -1px rgba(0,0,0,0.12);

}
```

и конечно же, нам нужно оперделить стили для актовного состояния кнопки

```css
.done-button:active {
  box-shadow: none;
  border: 2px inset lightgray;
}

```


все зависит от мелких деталей которые могут сдалеть ваш дизайн отличным или отвратительным. Так что будте внимательны к деталям!




### плавающий лейбл

Теперь нам нужно сделать понятнты для пользователя, для чего это поле ввода `<input/>`!

давайте добавим `<label>...</label>` вокруг (оборачивание в `<label/>` значит что когда пользователь нажимает на лейбл это фокусирует его на поле ввода `<input/>`)


<sub>./src/App.js</sub>
```html
//...
  render(){
    return (
      <div className='App'>
        <div className='form'>
          <div className="card">
            <label>
              Rap Name
              <input value={this.state.rapName} onChange={this.setRapName}/>
            </label>
          </div>

          <div className='done-container'>
            <button onClick={this.done} className='done-button'> Done </button>
          </div>
        </div>
      </div>
    );
  }

//...
```

Snoop хочет чтобы это выглядело [шикарно](https://material-ui.com/demos/text-fields/)


#### position: absolute;

чтобы добиться этого нам нужно использовать [position: relative](https://www.google.com/search?q=position+relative) контейнер `<div/>` и [position: absolute](https://www.google.com/search?q=position+absolute) ребенок

<sub>./src/App.js</sub>
```html
//...
  render(){
    return (
      <div className='App'>
        <div className='form'>
          <div className="card swanky-input-container">
            <label>
              <input value={this.state.rapName} onChange={this.setRapName}/>
              <span className='title'>Rap Name</span>
            </label>
          </div>

          <div className='done-container'>
            <button onClick={this.done} className='done-button'> Done </button>
          </div>
        </div>
      </div>
    );
  }

//...
```

мы увидим позже почему лейбл переместился в `<span>` и почему он теперь находится после `<input/>`

[или вы можете прочесть наперед о родственных селекторах и возможно разобраться с этим самостоятельно](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator)


#### поле ввода

в первую очередь мы стилизуем поле ввода `<input/>`, после перейдем к лейблу

<sub>./src/App.css</sub>
```css
//...

.swanky-input-container {
  position: relative;
}

.swanky-input-container input {
  position: absolute;

  bottom: 2px;
  left: 2px;
}

```

теперь мы можем избавиться от границ и определить размер

<sub>./src/App.css</sub>
```css
//...

.swanky-input-container {
  position: relative;
}

.swanky-input-container input {
  position: absolute;
  border: none;

  bottom: 2px;
  left: 2px;
  width: 100%;
  height: 60px;

  font-size: 22px;
  padding-left: 10px;

}

```

!!! о нет, наше поле ввода такое широкое... почемуу?

откройте панель стилей (клик правой клавишей по полю ввода -> Инспектировать... Computed панель для обзора

мы можем увидеть что у нас есть 2px слева, 10px паддинга слева (мы сделали так чтобы наш текст выглядел хорошо, но это добавляет размер в общую ширину элемента)

так что мы хотим чтобы `<input />` был на 14px (2px слева + 2px справа + 10px паддинг) меньше чем 100%

к счастью, в CSS3 добавили [функцию calc](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) как раз для ткаих случаев

раньше было

```css
  width: 100%;
```

теперь будет (будте осторожны, нужно поставить пробелы вокруг `-`)

```css
  width: calc(100% - 14px);
```

теперь давайте добавим подчеркивание как в примере

<sub>./src/App.css</sub>
```css
//...

.swanky-input-container input {
  position: absolute;
  border: none;
  border-bottom: 1px solid black;
  //...

```

#### :focus, transition

когда поле ввода в фокусе `:focus` (пользователь пишет в нем), мы хотим чтобы подчеркивание было зеленого цвета и избивится от "оutline".

мы будем использовать [:focus псевдоселектор](https://www.google.com/search?q=focus+pseudoselector) чтобы стилизовать поле ввода пока оно в фокусе `:focus`

<sub>./src/App.css</sub>
```css
//...

.swanky-input-container input:focus {
  outline: none;
  font-size: 26px;
  border-bottom: 2px solid green;
}
```

Я также увеличил размер текста.

последнее, что мы хотим применить это [css transition](https://www.w3schools.com/css/css3_transitions.asp) к размеру текста

<sub>./src/App.css</sub>
```css
//...

.swanky-input-container input {
  position: absolute;
  border: none;
  border-bottom: 1px solid black;
  background-color: white;

  bottom: 2px;
  left: 2px;
  width: calc(100% - 14px);
  height: 60px;

  font-size: 22px;
  padding-left: 10px;

  transition: font-size 0.25s;
}

//...
```

отлично, теперь давайте стилизуем label



#### absolute label

теперь мы можем спозиционировать label (в левый верхний угол контейнера)

<sub>./src/App.css</sub>
```css
//...

.swanky-input-container span.title {
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;

  font-weight: 300;
  font-size: 16px;
}
```

Также я обновил `cursor` теперь он выглядит кликабельно для пользователя

и изменил шрифт на тот который как мне кажется выглядит хорошо.


### label transitions на input:focus

и вот теперь мы увидим почемы мы переместили лейбл в `<span>` после `<input/>`

мы хотим изменить размер шрифта и цвет лейбла когда `<input/>` в фокусе `:focus`

мы сделаем это с помощью селектора:

```
выберем ребенка класса .swanky-input-container
которым является спан с className title
который находися ПОСЛЕ сфокусированного поля ввода
```

селектор выглядит так

<sub>./src/App.css</sub>
```css
.swanky-input-container input:focus + span.title {
  color: green;
  font-size: 12px;
}
```

как только больше нет `ПРЕДЫДУЩЕГО родственного тега` селектор в CSS, нам нужно было поставить `<span>` после `<input/>` чтобы у нас ыла возможность выбрать его на основании фокуса `:focus`

[для практики с сложными css селекторами, можете сыграть в эту игру](https://flukeout.github.io/)


теперь мы можем использовать transition на оба стиля

<sub>./src/App.css</sub>
```css
//...

.swanky-input-container span.title {
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;

  z-index: 15;

  font-weight: 300;
  font-size: 16px;

  transition: font-size 0.25s, color 1s;
}

//...
```

это выглядит довольно хорошо


### email, validation

Snoop хочет иметь возможность связаться со своими пользователями если они проделают много работы, прям как только что проделали мы над этим полем ввода.

Давайте сделаем еще одну карточку для ввода email адресса

<sub>./src/App.js</sub>
```html
//...
  <div className="card swanky-input-container">
    <input value={this.state.email} onChange={this.setEmail} />
    <span className='title'>Email</span>
  </div>
//...
```

мы также хотим инициализировать `state.email` и создать функцию для изменения состояния

```js
//...

  state = {
    rapName: 'Nate Dogg z"l',
    albumSales: 4200000,
    email: '',
  }

  //...

  setEmail = event => this.setState({ email: event.target.value })

  //...
```

бам! на данный момент выглядит хорошо.

Минуточку - Дядя Snoop видил невалидные email адреса - он попросит нас запретить вводить невалидные адреса.


#### контролированный input validation

Паттерн контролируемого ввода дает нам возможность создать валидатор адресов.

при каждом изменении значения, мы вызываем функцию обновления состояния.. для того чтобы определить валиден ли адрес нам нужно создать переменную булевого типа `isEmailInvalid` в той же функции, сохранить в состояние `state` и использовать в `render` сообщение о провале ввалидации если понадобится

давайте посмотри как это будет выглядетьlet's see what that looks like


<sub>./src/App.js</sub>
```js
//...
  state = {
    rapName: 'Nate Dogg z"l',
    albumSales: 4200000,
    email: '',
    isEmailInvalid: false,
  }

  //...

  setEmail = event => this.setState({
    email: event.target.value,
    isEmailInvalid: !event.target.value.includes('@gmail.com'),
  })

  //...
```

мы только что добавили еще одно значение в состояние `state`

изначально значение будет `false` (в том случае если пользователь не вписал ничего в поле, адрес не будет валидным)

как только пользователь введет адрес, мы проверие его на наличие строки `@gmail.com`, чтобы определить валиден ли адрес

если вы все еще используете hotmail, работать это не будет!



#### рендеринг из состояния с валидацией

если имейл введен неверно, мы хотим выводить дополнительный `<span>` с сообщении о неверном имейле


```html
//...
  <div className="card swanky-input-container">
    <label>
      <input value={this.state.email} onChange={this.setEmail} />
      <span className='title'>Email</span>
      {this.state.isEmailInvalid ? (
        <span className="invalid">Please enter a valid email address</span>
      ) : null}
    </label>
  </div>
//...
```

сейчас этого достаточно, теперь мы можем стилизовать так чтобы определить сообщение в верхний правый угол нашей карточки


<sub>./src/App.css</sub>
```css
//...

.swanky-input-container span.invalid {
  position: absolute;
  top: 5px;
  right: 5px;

  font-size: 12px;
  color: red;
  text-align: right;
}

```

выглядит хорошо, но возможно мы не хотели бы чтобы сообщение не отображалось пока польхователь вписывает

давайте используем трюк, который мы использовали в прошлый раз, но теперь с использованием [соседнего селектора](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator) используем `display: none;` для НЕ отображения пока поле ввода находится в фокусе `:focus`

а также [:not() псевдоселектор](https://developer.mozilla.org/en-US/docs/Web/CSS/:not) для стилизации в остальных случаях

<sub>./src/App.css</sub>
```css
//...

.swanky-input-container input:focus ~ span.invalid {
  display: none;
}

.swanky-input-container input:not(:focus) ~ span.invalid {
  position: absolute;
  top: 5px;
  right: 5px;

  font-size: 12px;
  color: red;
  text-align: right;
}
```

Свежо!


### проверка имейля с помощью regex

Наше правило "gmail только" слегка жесткое! Snoop хочет чтобы мы использовали RFC 5322 официальный стандартный [email regex](https://emailregex.com/) валидатор.

Чтобы достичь этой цели, нам нужно узнать как [проверить строку используя regex в javascript](https://www.google.com/search?q=check+string+regex+js)

теперь, когда мы с этим справились, давайте сохраним этот regex в отдельный файл, экспортируем, и импортируем в App.js и проверим как это работает


`$ touch ./src/emailRegex.js`

<sub>./src/emailRegex.js</sub>
```js
// eslint-disable-next-line
export default /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
```

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.css';

import emailRegex from './emailRegex';

class App extends Component {
  //...

  setEmail = event => this.setState({
    email: event.target.value,
    isEmailInvalid: !emailRegex.test( event.target.value ),
  })

  //...

```

теперь работает как должно.


### продажи альбомов, в формате чисел

Так. Snoop'у будет нужно знать какие продажи у твоих альбомов


<sub>./src/App.js</sub>
```js
  setAlbumSales = event => this.setState({ albumSales: event.target.value })
```

используем JSX `<input />` тег со значением `value` и `onChange`, так же с нашими`<label>...<span>` которые мы использовали и в прошлый раз

```html
          <div className="card swanky-input-container">
            <label>
              <input value={this.state.albumSales}
                     type='number'
                     step={1000}
                     onChange={this.setAlbumSales} />
              <span className='title'>Album Sales</span>
            </label>
          </div>

```

тут, я определил `type='number'` и `step={1000}` чтобы поле ввода было удобно для использования с числами


### золотые и платиновые альбомы

Snoop очень воодушевлен тем как мы сделали поле ввода для чисел. Он хочет чтобы за каждый миллион продаж отображалась одна золотая пластинка(до 4 вкулючительно)

[вот картинка которую мы будем использовать в качестве золотой пластинки](https://github.com/nikfrank/react-course-workbook-2/blob/step7/src/goldRecord.png?raw=true)


в перввую очередь, давайте выведим все четыре пластинки, а после будем выводить только нужное количество

<sub>./src/App.js</sub>
```js
//... make sure to download the file to the same directory!

import goldRecord from './goldRecord.png';

//...
```

```html
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
                    .map(n => (
                      <div className='goldRecord' key={n} >
                        <img src={goldRecord} alt='solid gold'/>
                      </div>
                    ))
                }
              </div>
            </label>
          </div>

```

мы будем использовать `<div>` как флекс контейнер(направление справа на лево) начиная с 50px отсупа справа от swanky-input-container

<sub>./src/App.css</sub>
```css
//...

.goldRecords {
  position: absolute;
  right: 50px;
  height: 100%;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
```

и мы будем использовать дополнительный `<div>` обернув им `<img/>` чтобы иметь воможность нахлестнуть картинки одну на другую

```css
//...

.goldRecord {
  width: 20px;
  z-index: 20;
}

.goldRecord img {
  width: 50px;
  height: 50px;
}
```

теперь давайте используемм [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) чтобы отображать нужное количество пластинок

<sub>./src/App.js</sub>
```html
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
```

готово!

Мы используем обыкновенный паттерн в React расчета множество элементов из одного значения в `state`.

Тут мы просчитаем количесво продаж в функции `setAlbumsSales` (в некоторых случаях мы будем делать именно так, например: для эффективности), в данном случае удобно использовать `state.albumSales` для рассчета списка из `<img/>`s

если вычесление более сложное (сортировка, арифметические расчеты, и т.д.), не стоит проводить эти вычисления внутри render функции, т.к. это может замедлить наше приложение.


---

[наверх](#thatop)

---

<a name="step3"></a>
## step 3: break'm off somethin - выпадающий список

Snoop хотел бы знать больше чем просто название и количество продаж!

<img src='http://hiphopgoldenage.com/wp-content/uploads/2015/07/42-27797293.jpg' height=250 width=325/>

У него также есть список позиций на которые он мог бы принять кого-то, так что ему понадобится информация о том где вы живете(страна / штат)

в первую очередь давайте определим значение в `state`

<sub>./src/App.js</sub>
```js
//...

  state = {
    rapName: 'Nate Dogg z"l',
    albumSales: 4200000,
    email: '',
    isEmailInvalid: false,
    job: '',
    country: '',
    topAlbum: null,
    topRapper: '',
    startDate: null,
  }
```


### выбрать работу

<sub>./src/App.js</sub>
```js
  setJob = event => this.setState({ job: event.target.value })
```

```html
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

```

тут мы также хотим добавить селекторы чтобы выбрать их, и исправить `font-size` для `<option>` тегов

<sub>./src/App.css</sub>
```css
//...

.swanky-input-container select,
.swanky-input-container input {

//...

.swanky-input-container select:focus,
.swanky-input-container input:focus{

//...

.swanky-input-container select:focus + span.title,
.swanky-input-container input:focus + span.title {


//...

option {
  font-size: 22px;
}
```

### выпадающий список с картинкой (выбор альбома)

Snoop живет музыкой. Так что когда кто-то принимает предложение работы, он хочет знать какой любимый альбом у человека

Мы могли бы создать отдельный выпадающий список, но давайте удивим Snoop'а созданием выпадающего списка который содержит в себе картинку `<img/>`!

к сожалению если мы попробудем выввести картинку в `<option/>` мы получим ошибку `Только строки и числа поддерживаются в <option>.`

Так что мы создадим выпадающий список самостоятельно используя `<div/>`ы

#### загрузка доплнений

в первую очередь, давайте определим что будет в списке

|название|год|картинка|
|---|---|---|
|Doggystyle|1993|<img src="https://upload.wikimedia.org/wikipedia/en/6/63/SnoopDoggyDoggDoggystyle.jpg" height=200 width=200/>|
|Tha Doggfather|1996|<img src="https://upload.wikimedia.org/wikipedia/en/a/a3/Tha-doggfather.jpg" height=200 width=200/>|
|Da Game Is to Be Sold, Not to Be Told|1998|<img src="https://upload.wikimedia.org/wikipedia/en/c/c5/Gameistobesold.jpg" height=200 width=200/>|
|No Limit Top Dogg|1999|<img src="https://upload.wikimedia.org/wikipedia/en/d/d1/Snoop_front.JPG" height=200 width=200/>|
|Tha Last Meal|2000|<img src="https://upload.wikimedia.org/wikipedia/en/d/dc/The_Last_Meal_-_Front.jpeg" height=200 width=200/>|


Вы можете пойти вперед и загрузить все необходимые картинки


#### импорт дополнений

давайте создадим файл для всех альбомов, чтобы все оставалось организованным

`$ touch ./src/snoopAlbums.js`

<sub>./src/snoopAlbums.js</sub>
```js
import doggystyle from './doggystle.jpg';

export default [
  { name: 'Doggystyle', year: 1993, cover: 'https://upload.wikimedia.org/wikipedia/en/6/63/SnoopDoggyDoggDoggystyle.jpg' },
];
```

мы `экспортируем` массив альбомов, каждый содержит объект внутри себя

каждый объект будет сожержать в себе `название`, `год` и `картинку`

(Я оставлю упражнение для создания массива альбомов)


#### вывод выбранного


давайте выведем два возможных состояния (гичего не выбрано, выбор уже сделан)

<sub>./src/App.js</sub>
```html
//...

          <div className="card swanky-input-container">
            <span className='title'>Top Album</span>
            <div className="album-dropdown-base">
              {this.state.topAlbum === null ? (
                 <span>Select Top Album</span>
              ):(
                 <>
                   <img src={this.state.topAlbum.cover} alt={this.state.topAlbum.name}/>
                   <span>{this.state.topAlbum.year}</span>
                   <span>{this.state.topAlbum.name}</span>
                 </>
              )}
              <span className='drop-arrow'>▼</span>
            </div>
          </div>
//...
```

<sub>./src/App.css</sub>
```css
//...


.album-dropdown-base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  padding: 30px 15px 10px 10px;
}

.album-dropdown-base img {
  height: 45px;
  margin-top: -5px;
  width: 45px;
}

.album-dropdown-base .drop-arrow {
  position: absolute;
  right: 5px;
  user-select: none;
}
```

теперь если задать `topAlbum: snoopAlbums[0]` в нашем `state = {...}`, мы увидим "doggystyle" будет выведен


#### переключение выпадающего списка в открытое состояние

теперь когда закрытое состояние выводится корректно, нам нужно добавить возможность открывания

<sub>./src/App.js</sub>
```js
  state = {
    //...
    topAlbumOpen: false,
  }

  toggleTopAlbumOpen = ()=> this.setState(state => ({ topAlbumOpen: !state.topAlbumOpen }))

  //...
```


теперь когда мы можем изменять состояние, у нас есть три вещи для вывода

1. изменить стрелочку указывающую вниз
2. выбранные вещи
3. невидимый div для зыкрытия выпадающего списка




#### изменение направления стрелочки

```html
  <span className='drop-arrow'>{this.state.topAlbumOpen ? '▲' : '▼'}</span>
```

это было просто!



#### выбранные вещи

мы собираемся выводить `<ul>` в том случае если `topAlbumOpen` является `true`

<sub>./src/App.js</sub>
```html
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
               <ul className='selectable-albums'>
               </ul>
            )}
          </div>
```

также, тут выведем список альбомов

```html
       <ul className='selectable-albums'>
         {snoopAlbums.map(({ name, year, cover })=> (
           <li key={name} onClick={()=> this.selectAlbum({ name, year, cover })}>
             <img src={cover} alt={name}/>
             <span>{year}</span>
             <span>{name}</span>
           </li>
         ))}
       </ul>
```

и конечно, функция для выбора альбома

```js
  selectAlbum = topAlbum => this.setState({ topAlbum, topAlbumOpen: false })
```

который также закрывает выпадающий список!


теперь давайте стилизуем все это

в первую очередь мы добавим базовые стили для `<ul/>`

<sub>./src/App.css</sub>
```css
ul.selectable-albums {
  list-style: none;
  padding: 0;
```

и спозоционируем его сразу под `.album-dropdown-base`

```css
  position: absolute;
  top: 100%;
```

тепероь мы можем ограничить высоту и добавить возможность скроллинга

```css
  max-height: 25vh;
  overflow-y: auto;
```

и в конце концов добавим тень box-shadow и используем z-index для корректного вида

```css
  margin: 2px 0 0 0;

  z-index: 30;

  background-color: white;
  box-shadow:
    0px 1px 3px 0px rgba(0,0,0,0.2),
    0px 1px 1px 0px rgba(0,0,0,0.14),
    0px 2px 1px -1px rgba(0,0,0,0.12);

}
```


теперь когда наш `<ul/>` стилизован, мы можем стилизовать `<li/>` теги внутри

в основном, мы хотим реиспользовать стили, которые мы использовали ранее


<sub>./src/App.css</sub>
```css
.album-dropdown-base,
ul.selectable-albums li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  position: relative;
  z-index: 30;
  background-color: white;
}


.album-dropdown-base {
  padding-top: 30px;
  padding-right: 15px;
}

.album-dropdown-base img,
ul.selectable-albums img {
  height: 45px;
  margin-top: -5px;
  width: 45px;
}

.album-dropdown-base .drop-arrow {
  position: absolute;
  right: 5px;
  user-select: none;
}
```

теперь мы можем стилизовать состояние наведения для элемента и сделать их более приятными на вид


```css
ul.selectable-albums li:hover {
  background-color: #eee;
}
```

и мы можем ограничить размер и задать overflow как `ellipsis`

```css
.album-dropdown-base span:not(.drop-arrow),
ul.selectable-albums li span {
  display: inline-block;
  width: 180px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.album-dropdown-base span:not(.drop-arrow):nth-child(2),
ul.selectable-albums li span:nth-child(2) {
  width: 38px;
  padding: 0 3px 0 9px;
}
```

выглядит хорошо, как для 50 строк CSS


#### the click out(отключение выпадающего списка)

и наконец, пользователь будеть ожидать, что делая клик вне выпадающего списка, это закроет его и вызовет собитие клика

чтобы добится этого, мы выведем `<div/>` под выпадающим списком `<ul/>` но над всем остальным

далее это вызывать событие клика, и вызывать функцию из `onClick`

<sub>./src/App.js</sub>
```html
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
```

тут мы использем новейший синтакс для `React.Fragment` то есть `<> ... </>`, который является пустым тегов, который используется только для оборачивания всех тегов, таким образом он является корневым единственным тегом возвращенным из выражения(в данном случае нам жто необходимо потому что условный оператор принимает в себя только один элемент)

и присвоение

```js
  clickOut = ()=> this.setState({ topAlbumOpen: false })
```

также нам нужно применить стили для того чтобы отследить клики вне выпадающего списка

<sub>./src/App.cs</sub>
```css
//...

.click-out {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```


#### бонус: стилизация скроллбара

Snoop скорей всего подумает что наш сккроллбар из 1992, и не выглядит нормально

Давайте проявим инициативу и изменим это

[стилизация скроллбаров новая функция в CSS, так что далее ссылка, по которойso можно узнать больше об этом](https://css-tricks.com/almanac/properties/s/scrollbar/)

```css
.album-dropdown-base {
  padding-top: 30px;
  padding-right: 15px;
  z-index: 10;
}

ul.selectable-albums::-webkit-scrollbar {
  width: 5px;
}

ul.selectable-albums::-webkit-scrollbar-track {
  background-color: #0000;
}

ul.selectable-albums::-webkit-scrollbar-thumb {
  background-color: #7d79;
  border-radius: 2.5px;
}


```


### всплывающий по наведению выпадающий список -> в заголовке

Наше приложение это всего лишь набор элементов формы. Снуп хочет добавить заголовок сверху страницы, который позволит нам выбрать любимого репера

Мы сделаем navbar с `position: fixed`, картинкой `<img/>` по центру (`src` значение которого будет выводится из `state`) и выпадающий список по наведению чтобы выбрать репера


#### ипорт добавлений

мы используем отдельный файл снова что сохранить все отдельно друг от друга

`$ touch ./src/rappers.js`

<sub>./src/rappers.js</sub>
```js
export default [
  { name: 'Snoop Dogg', imgSrc: 'http://i.imgur.com/8wjnDvw.png' },
  { name: 'Tupac Shakur', imgSrc: 'https://stickeroid.com/uploads/pic/full-pngimg/thumb/stickeroid_5bf57ed20be69.png' },
  { name: 'Dr Dre', imgSrc: 'https://i.imgur.com/QYo0aPI.png' },
  { name: 'Eminem', imgSrc: 'http://4.bp.blogspot.com/_wevkEt-i9rw/R0YBWvL9WuI/AAAAAAAAABs/G6TjBC3BuXY/s320/eminem-5.png' },
];
```


#### зафиксированный navbar

мы уже видели `position: relative` и `position: absolute` в использовании для объявления рамки для элементов (relative) и позиционирования элементов внутри(absolute)

в данном же случае мы используем значение `position: fixed` который делает то же что и `absolute`, но всегда использует размер окна как образец

<sub>./src/App.js</sub>
```html
  <div className='App'>
    <div className='header'></div>
    //...
```

<sub>./src/App.css</sub>
```css
.header {
  position: fixed;
  height: 100px;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 2px solid black;
  background-color: #3338;
  color: white;
}

.form {
  padding-top: 120px;
  //...

```

мы также добавили padding на форму чтобы она не была накрыта `.header`

а скрыта она из-за `position: fixed` (на подобии `position: absolute`) убирает элемент ИЗ ПОТОКА ДОКУМЕНТА

что это значит?

ПОТОК ДОКУМЕНТА это направление(вверх слева вниз направо) так выводятся элемнты в обычном HTML. `display: block` или `display: flex` элементы выводятся сверху вниз, `display: inline` или `display: inline-block` или `display: inline-flex` выводится славе направо. Обычно это когда вы выводите что-то по типу:

```html
<div>blah</div>
<p>hmm</p>
```

`div` и `p` оба `display: block` по стандарту, так что `blah` выводится над `hmm`

если мы стилизуем `div` как `position: fixed` на самом верху окна, он будет отображен над всем остальным, потому что `div` больше не отодвигает `p` вниз (т.к. это происходит только елси он находится В ПОТОКЕ)

обычно, мы хотим хранить элементы В ПОТОКЕ - мы делаем исключения в двух случаях:

1. элементы точно должны остаться зафиксированными на экране(например navbar или статический footer)
2. элементы должны быть спозиционарованны внутри контейнера(как мы уже видели в `swanky-input-container`, который сам по себе оставался В ПОТОКЕ)


#### вывод изображения

нам понадобится имортировать массив реперов `rappers` (рядом с другими строками импортирования)

<sub>./src/App.js</sub>
```js
import React, { Component } from 'react';
import './App.css';

import emailRegex from './emailRegex';
import goldRecord from './goldRecord.png';

import snoopAlbums from './snoopAlbums';
import rappers from './rappers';

class App extends Component {
  //...
```

теперь мы можем определить значение в `state`

```js
//...

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
    topRapper: rappers[0],
    startDate: null,
  }

  //...
```

и вывести изображение из `state.topRapper.imgSrc`

```html
  <div className='header'>
    <img src={this.state.topRapper.imgSrc} alt={this.state.topRapper.name} />
  </div>
```

также стилизовать для лучшего вида

<sub>./src/App.css</sub>
```css
.header {
  //...

  display: flex;
  justify-content: center;
}

.header img {
  width: auto;
  height: 100%;
}

//...
```

#### выбор выпадающего списка наведением

это отличное решение использовать чистые CSS и HTML чтобы добиться требуемого поведения

мы создадим `<ul/>` а нашем `.header` который в обычном состоянии закрыт, но открывается когда мы наведем на него

так выпадающий список пропадет если сдвинуть с него мышку `<ul/>`

(credit for teaching me this to Julien)

```html
        <div className='header'>
          <img src={this.state.topRapper.imgSrc} alt={this.state.topRapper.name}/>
          <ul className='hover-dropdown'>
            <li key='top item'>{this.state.topRapper.name}</li>
            {rappers.map(rapper=>(
              <li key={rapper.name} onClick={()=> this.setTopRapper(rapper)}>{rapper.name}</li>
            ))}
          </ul>
        </div>

```

и конечно же функция для изменения любимого репера в `state`

```js
  setTopRapper = topRapper => this.setState({ topRapper })
```


на данный момент мы выбрали репера на место лучшего, и добавили опции в список

а теперь немного CSS

<sub>./src/App.css</sub>
```css
//...

ul.hover-dropdown {
  list-style: none;
  padding: 0;

  position: absolute;
  right: 10px;
  top: 20px;

  height: 30px;
  overflow: hidden;
}

ul.hover-dropdown li {
  height: 30px;
  font-size: 24px;
  padding: 3px 10px;

  background-color: #000c;
}

ul.hover-dropdown:hover {
  height: initial;
  z-index: 50;
}

//...
```

`height: initial` говорит CSS игнорировать `height: 30px;`

`height: 30px` на `<ul/>` и `height: 30px` на `<li/>` значит что мы будем видеть только первый `<li/>` потом с `overflow: hidden`, все остальное!


как только пользователь наведет `:hover`, мы добавим измененние высоты и `z-index: 30` чтобы убедится что `<ul/>` выодится поверх всего на странице.


#### стайлинг меню

давайте скруглим углы и разделим элементы списка

<sub>./src/App.css</sub>
```css
ul.hover-dropdown {
  //...

  border-radius: 5px;
}

ul.hover-dropdown li {
  //...

  cursor: pointer;
  user-select: none;
}

ul.hover-dropdown li:first-child {
  cursor: default;
  background-color: #0003;
  text-align: center;
}

ul.hover-dropdown li:not(:first-child):not(:last-child) {
  border-bottom: 1px dashed #8888;
}

//...
```

это  `:not(:first-child):not(:last-child)` выглядит не очень...

[если мы посмотрим в этот список CSS псевдоселекторов](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), мы найдем что нет лучшей возможности выбырать НЕ крайние элементы, так что будем использовать то что есть


#### стилизация для мобильных устройств

на мобильных устройствах, `:hover` выполняется когда пользователь нажимает на `<ul/>`! Раньше так это не работало.

однако, первый элемент списка иногда выводится поверх фото репера, так что давайте зададим `z-index: 25` на `<img/>`, таким образом когда меню закрыто, оно выводится под картинкой Snoop'а

<sub>./src/App.css</sub>
```css
//...

.header img {
  width: auto;
  height: 100%;

  z-index: 25;
}

//...
```

В настоящем проекте мы скроей всего использовали бы этот паттерн чтобы сделать меню навигации, а не какой-то `<img/>` селектор.

Так что это отличный способ, который может работать и в других примерах!


### автозаполнение / фильтрация выпадающего списка (страна)

Любой, кто использует google, знает что google имеет автозаполние

так что Snoop решил что он хочет чтоб на его сайте бзыло автозаполнение, и откровенно говоря это отличная идея. Автозаполнение это удобная штука.

Что сделать это, мы скопируем внешний вид с наших `<input/>`, которые мы сделали ранее, также добавим выпадающий список, который мы использовали при выборе альбома.

Что мы выучим тут, так это как использовать `.filter` для элементов списка на лету - в зависимости от того что пользователь ввел.


#### список стран

Данные которые будт автозаполнятся - страны.

В качестве данных, мы можем использовать неплохой JSON список [ссылка](https://gist.github.com/Keeguon/2310008)

Snoop просто хочет чтобы его автохаполнение работало, и чтобы его фаны(неважно откуда они) наслаждались использованием.


#### фарматирование данных

данные выводятся в таком виде:

```js
[
  { name: 'the actual name that we want to use', code: 'some two letter code we don\'t care about' },
  //...
]
```

для того чтобы получить нам формат который нам нужен(только названия стран), я вставил все данные в консоль браузера, чтобы избавится от всего ненужного

```js
const output = [{ /* entire output from JSON file */ }];
```

чтобы вывести все данные, что нам нужны мы можем сделать следуещее


```js
JSON.stringify(output.map(i => i.name)).replace(/",/g, '",\n')
```

затем скопировать и вставить результат(без "двойных кавычек") в наш файл

как это работает?

сначала мы используем `.map` чтобы получить нужную строку из каждого объекта(в список названий стран)

далее мы используем `.replace` для все элементов `",`s (используя regex `/",/g` с g = глобально... то есть `.replaceAll`) заменив `'",\n'` т.е. двойные кавычки, запятая и символ новой строки.

теперь когда мы это сделали, мы можем

`$ touch ./src/countries.js`

и экспортировать весь список

<sub>./src/countries.js</sub>
```js
export default [
  'Canada',
  'Japan',
  //... etc ...
];
```

#### создание еще одного поля ввода


<sub>./src/App.js</sub>
```js
  state = {
    //...

    countryQuery: '',
    selectableCountries: [],
  }

```

```html
//...

          <div className="card swanky-input-container">
            <div className="country-dropdown-base">
              <input value={this.state.countryQuery} onChange={this.setCountryQuery}/>
              <span className='title'>Country</span>
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
//...
```


#### создание еще одного выпадающего списка <ul/>

в `state.countryQuery`, нам нужно определить список `state.selectableCountries`

<sub>./src/App.js</sub>
```js
//...
import countries from './countries';

  //...

  setCountryQuery = event => this.setState({
    countryQuery: event.target.value,
    selectableCountries: countries.slice(0,3),
  })

  selectCountry = country => this.setState({ country, selectableCountries: [], countryQuery: country })

  //...
```

тут, когда мы выбираем страну(пользователь кликнул на один из вариантов) мы хотим определить `state.country` - настоящее значение И `state.countryQuery` - значения которые пользователь видит в результате

И мы хотим определить `state.selectableCountries` как пустые, так что они больше не выводятся


<sub>./src/App.css</sub>
```css
//...


.country-dropdown-base {
  position: relative;
  height: 100%;
}

.country-dropdown-base input {
  background-color: #0000;
}


ul.selectable-countries {
  list-style: none;
  padding: 0;

  position: absolute;
  top: 100%;
  width: 100%;

  max-height: 25vh;
  overflow-y: auto;

  margin: 2px 0 0 0;

  z-index: 30;

  background-color: white;
  box-shadow:
    0px 1px 3px 0px rgba(0,0,0,0.2),
    0px 1px 1px 0px rgba(0,0,0,0.14),
    0px 2px 1px -1px rgba(0,0,0,0.12);

}

ul.selectable-countries li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
}

ul.selectable-countries li:hover {
  background-color: #eee;
}

```

тут все достаточно ясно, так ведь?

теперь нам нужно заставить автозаполнение работать



#### фильтрация и сортировка на лету

если есть точное совпадение, мы должны определить это в `state.country`

также

чтобы сгенерировать список автозаполнения

мы хотим сортировать по лучшему совпадению

нам нужно определить для каждой страны, насколько точно она совпадает с введенным тесктом

и далее сортировать по точности

а затем вернуться к названию страны

и использовать тольок топ три

```js
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

```

но, тут есть ошибка! `score` неопределен как функция!

так что давайте напишем `score` функцию, которая принимает `(query, option)=>` наш текущий вводимый текст и каждое возможное совпадение, и возвращает число, которое говорит о том насколько текст близок к названию страны

Есть миллион возможных путей сделать это, - в данном случае я покажуодин из самых простых

```
start the score at 0
first, check if the entire query is included in the option -> if it is add (query.length) to the score
for every number N less than the length of the query, take the first N characters of the query
 -> check if those are included in the option -> if they are add (N) to the score
subtract the length of the option (or 10, whichever is less ... we don't want to punish long names too much)
```

Результат будет максимизирован если совпадение будет точным

давайте посмотрим как жто удет выглядеть в js

```js
const score = (query, option)=>
  [...Array(query.length)].reduce((p, c, i)=>
    p + (option.toLowerCase().includes( query.slice(0, query.length -i).toLowerCase() ) ?
         query.length - i : 0
    ), -Math.min(10, option.length));
```

Я пропусти шаг `начать с 0` и `вычесть длину или 10` тем что начал с `-length, или -10`

`[...Array(query.length)]` вернет нам массив нужнай нам длины, чтобы мы могли использовать `.reduce`

`.reduce((p, c, i)=>` это функция сокращения (p = начальное значение(previous value), c = настоящее значение(current item), i = индекс(index))

в данном случае, на самом деле нет настоящего, так нам нужно только сохранить сумму в p и индекс на котором мы сейчас находимся

`p + (...)` вернет нам предыдущее значение плюс все что насчиталось для конкретного индекса

`option.toLowerCase().includes( ... ) ? query.length - i : 0` если опция содержит (... часть запроса ...) посчитать длину этой части (добавить в сумму), иначе 0 (не менять существующую сумму)

`query.slice(0, query.length -i).toLowerCase()` взять первые N букв запроса (`i` ведет счет начиная с `0`, и `query.length -i` выведет длину запроса) и сравнит с

`, -Math.min(10, option.length)` начать подсчет суммы (`p`'s init value) с `-length` или `-10` как можно ближе к `0`

обе строки приведены к строчним символам чтобы игнорировать разность в запросе и опции


#### закрытие списка

в данном случае нам также нужно создать возможность закрытия списка


```html
          <div className="card swanky-input-container">
            <div className="country-dropdown-base">
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
```

мы можем использовать то что у нас уже есть `this.clickOut`, нам нужно переназначить некоторые значения в `state`

```js
  clickOut = ()=> this.setState({
    topAlbumOpen: false,
    selectableCountries: [],
    countryQuery: this.state.country,
  })
```


### выбор даты

Snoop хочет знать когда ты можешь начать работать!

Чтобы сделать нашу жизнь проще, мы не будем создавать выбор даты из ничего - это будет переизобретением колеса!

Мы будем использовать уже готовое решение[Hacker0x01's popular react-datepicker module](https://github.com/Hacker0x01/react-datepicker)

`$ npm install -S react-datepicker`

или

`$ yarn add react-datepicker`

документация для react-datepicker объснит что нужно сделать чтоб вырать дату и сохранить ее в `state`!


команда которая написала react-datepicker создали свой `<DatePicker/>` копмонент который использует обычный паттерн поля ввода, так использовать его не будет сложным

только не забудте обернуть его `<div className='card'>...</div>`


<details>
<summary>Click here to view solution for this section</summary>

```html

          <div className='card date-input-container swanky-input-container'>
            <DatePicker selected={this.state.startDate} onChange={this.setStartDate}/>
            <span className='title'>Start Date</span>
          </div>
```

```js
  setStartDate = startDate => this.setState({ startDate })
```

</details>


#### стилизация

теперь когда `<DatePicker/>` работает, нам нужно исправить несколько CSS багов

1. некоторые компоненты отображаются некорректно
2. `<input/>` не занимает нужного места в `.card`
3. наш `span.title` не подсвечивается корректно в `:focus`

как мы исправим CSS в чьем-то коде?

Известное высказывание Snoop`а "gangsters use the dev tools"... так что давай те откроем панел инспектирования и найдемь в чем проблемы

1. проблема с z-index

когда мы кликаем на `<input/>` чтобы открыть date-picker-popper, мы можем увидеть в панеле HTML элементов, какая-то часть datepicker.css указывает `z-index: 1`

мы можем протестировать, в этов ли проблема(сделать это можно сраз в браузере)

так что мы омжем просто поменять `z-index: 40` на этом `<div/>`, и все будет в порядке

<sub>./src/App.css</sub>
```css
.react-datepicker-popper {
  z-index: 40;
}
```

... хмм, не сработало... почему?

если мы снова обратим внимание на список правил, мы увидим, что наш `z-index: 40` находится ниже в списке чем `z-index: 1`!

причиной этому является каскадность стилей в CSS (каскадность: правила написанные ниже имеют приоритет над теми что выше)

так вызодит, что компилятор сохраняет наш CSS до CSS из библиотеки, потому их и является более приоритетным!

ка мы можем переназначить его?

хороший вопрос: и ответ [CSS специфичность](https://www.google.com/search?q=css+specificity)

все что нам нужно сделать, это сделать наше правило БОЛЕЕ СПЕЦИФИЧНЫМ, и наш CSS будет выполнятся!

```css
.card .react-datepicker-popper {
  z-index: 40;
}
```

так выходит, что два имени класса более спецефичны, чем одно



2. `<input/>` ихменение размера

когда мы задали размер `<input/>` ранее, мы полагались на `.card` которая в свою очередь полагалась на размер элемента над ней

однако, когда мы инспектируем настоящее состояние, мы видим, что билиотека `react-datepicker` добавляет свой `relative` div между нашими `<input/>`

хмм...

не на самом деле хорошего решения для этого.

В общем, я бы оставил все стили что мы использовали до этого

и в данном случае, скорректировал попиксельно

```css
.date-input-container input {
  height: 60px;
  width: 286px;
  top: 0;
}
```

не элегантно, но работать будет


3. заголовок не подсвечивается

это происходит из-за `input:focus + span.title`

которые относятся к `<input/>`, и `<span/>` являются родственными

теперь когда мы имеем ввиду datepicker, мы видим что `<input/>` находится внутри `<div/>`, и из-за этого больше не является родственным

так что нам нужно будет новое решение... мы можем использовать `:focus-within` псевдоселектор, он менее специфичен, но работает как положено

```css
.date-input-container:focus-within span.title {
  color: green;
  font-size: 12px;
}
```

Snoop говорит: "Gangsters use the dev tools"

иногда, мы имеем дело с чужим CSS, и с ним всегда случаются проблемы

в таких случаях панель инспектирования очень полезна

в ней можно найт все о HTML элементах и как они структурированы, и какие CSS к ним применяются

ТАКЖЕ это позволяет нам корректировать CSS на лету.

Как только я начал пользоваться этим функции по максимуму, мои навыки CSS ВЗОРВАЛИСЬ.

---

[навер](#thatop)

---

следующая часть материала более сложная
<a name="step4"></a>
## step 4: and it's gotta be bumpin - refactor to components

### rapper images, menu dropdown
### floating label input
### image dropdown
### autocomplete dropdown
### SCSS
### destructuring this.state in render


<a name="step5"></a>
## city of compton - notifications and animations

### toastr on submit
### transition on cards entry
### transition on floating labels
### transition on validation colors
### transition on dropdowns
### tupac ak-47!!!!


Этот проект был создан с помощью [Create React App](https://github.com/facebook/create-react-app).
