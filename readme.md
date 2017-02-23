#react-truncate-html

We all know how this goes: one day you’re just minding your own business, and then suddenly hear your content manager say ‘but we also want to use html in the summaries’, you yell out ‘why?!’ and shake your head in disbelief, sadly; the choice isn’t up to you.   
Good news, luckily for you there’s `react-truncate-html`, which unlike `react-truncate` also supports html (who would’ve guessed, right?!)

react-truncate-html is based on [ellipsis.js](https://github.com/glinford/ellipsis.js), so it features:

- Full responsiveness
- Pure JS, no weird css hacks
- High configurability

##Caveats

- **No react children allowed!**  Because of the dom manipulation react-truncate-html does, it only supports html as a string. The only way to set it’s content is by passing dangerouslySetInnerHTML.
- Not very performance friendly:  [As the author of ellipsis.js mentions](https://github.com/glinford/ellipsis.js), having 100 elements with 100 lines is not an option, as it does some heavy computations.
- Doesn't work on server side: we can't compute height and stuff on the server side, so passed HTML will be kept intact on server side. (but don't worry, rendering won't differ)

##Installation

```bash
npm i react-truncate-html --save
```

```bash
yarn add react-truncate-html
```

```bash
whatever-new-package-manager-we-will-have-next-month install react-truncate-html
```

_etc..._

##Usage

Simple example (truncate after 3 lines):
```
import Truncate from 'react-truncate-html';
<Truncate lines={3} dangerouslySetInnerHTML={{__html: “Hi, <strong>here’s some</strong> <i>HTML</i>”}}/>
```

Complex example (don't listen for browser resizing events, don’t break words, use 4 lines on portrait mode):
```
<Truncate 
    lines={3} 
    portrait={4} 
    breakWord={false} 
    responsive={false} 
    dangerouslySetInnerHTML={{__html: “Hi, <strong>here’s some</strong> <i>HTML</i>”}}
    />
```

##Available props

| Name       | Type   | Default | Desc                                                                                                   |
|------------|--------|---------|--------------------------------------------------------------------------------------------------------|
| debounce   | Number | 100     | Use a timeout before recalculating when resizing the window.                                           |
| responsive | Bool   | true    | If you want the ellipsis to move with the window resizing                                              |
| lines      | Number | 2       | Number of lines you wish to have before the ellipsis will appear                                       |
| portrait   | Number | null    | Additionally, you can set a different amount of lines when using portrait mode                         |
| breakWord  | Bool   | true    | If true the words can be truncated by the ellipsis, eg: "Hello Wo…", if false they won't, eg "Hello …" |


_Additional props will be transferred over to react-truncate-html’s internal <span> tag, so, for example `<Truncate style={{color: ‘yellow’}}/>` will work._

