# Spotify dupe with react

[![Captura.png](https://i.postimg.cc/6Q2mbGDG/Captura.png)](https://postimg.cc/kVCsBDMn)


## Table of contents

- [Description](#description)
- [Live site](#live-site)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Continued development](#continued-development)
- [Some views](#some-views)
- [Author](#author)
- [Useful resources](#useful-resources)
- [How to run the project](#how-to-run-the-project)
  


## Description

This is a solution to the [Easybank landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/easybank-landing-page-WaUhkoDN). the users are be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page


## Live site

- Live Site URL: [Add live site URL here](https://your-live-site-url.com)
- Solution URL: [Add solution URL here](https://your-solution-url.com)


## Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) - JS library
- [Redux](https://es.redux.js.org/) - State management for JavaScript applications.
- [Redux Thunk](https://redux.js.org/usage/writing-logic-thunks#redux-thunk-middleware) - Redux middleware that allows you to perform asynchronous actions.
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [React Router](https://reactrouter.com/en/v6.3.0/getting-started/tutorial)
- [AXIOS](https://axios-http.com/es/docs/intro)
- [react-spotify-web-playback](https://www.npmjs.com/package/react-spotify-web-playback) - Library for Spotify's web playback



## What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

Building this project helped me learn to use and improve my knowledge of some React and JS tools, such as:

- Setting up husky alongside Prettier to make my code so much better :D
- Integrating redux, react-redux and redux-saga to manage my state and perform async actions.
- Creating a .prettierrc file to set up some code conventions.
- Adding static typing with TS to my service-workers and redux code.
- Forwarding refs from one component to another.
- Creating a custom hook to lazy-load the images that come from the API.
- Writing a very reusable pagination component that covers many edge cases.
- Using TS features in a React project and typing my components.
- Managing my service workers with Workbox.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

## Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.


## Some views

Take a look at the project:
[![search.png](https://i.postimg.cc/QCg8c4Q8/search.png)](https://postimg.cc/tnTGjzvw)
[![artist.png](https://i.postimg.cc/N0VjtrGc/artist.png)](https://postimg.cc/gwVWqj6S)
[![playlist.png](https://i.postimg.cc/9M7FQFzq/playlist.png)](https://postimg.cc/5YfMPJBx)

## Author

**Andrea Támara Correa**
* [tamara11correa@gmail.com](tamara11correa@gmail.com)
* [LinkedIn](https://www.linkedin.com/in/andreatamara/)
* [Portafolio web](https://tu-dominio.com/)


## Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

## How to run the project

#### Pre-requisites ✅
- Add your Spotify client ID & secret to a `.env` file in root using the environment variables `REACT_APP_SPOTIFY_CLIENT_ID` and `REACT_APP_SPOTIFY_CLIENT_SECRET`
  - Note. **Never add this type of config to version control. This would usually come from your build server.**

