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

This proyect is a spotify copycat with a little twist in the UI, it is also responsive. You are able to login with your spotify account, see content from your library, create and modify playlists, save songs, albums or playlists, search by categories or specific words. You could play music too! 

At the home page  you could find new releases and featured playlist of the moment, in addition, can see your created and followed playlists and albums, your top songs and artists.

As I am using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/), there are some limitations such as only registered users in my dashboard can login and as you need to have a premium account to use the player.
  


## Live site

-  [Add live site URL here](https://your-live-site-url.com)



## Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) 
- [Redux](https://es.redux.js.org/) 
- [Redux Thunk](https://redux.js.org/usage/writing-logic-thunks#redux-thunk-middleware) 
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [React Router](https://reactrouter.com/en/v6.3.0/getting-started/tutorial)  
- [AXIOS](https://axios-http.com/es/docs/intro) 
- [react-spotify-web-playback](https://www.npmjs.com/package/react-spotify-web-playback) 



## What I learned


Building this project helped me to improve my knowledge about:

- Using axios interceptors to add some headers without writing boilerplate code on all my requests, and also to intercept the responses for handle some token expiry related errors before they crash my app.
- Integrating redux middleware to manage async actions.
- Creating a custom hook to fetch data and handle states of loading and error.
- Creating a custom hook for use a debounce function that delay the search in order to avoid unnecessary requests to the API when the user is typing.
- Defining public and private services for the different endpoints provided by the API. This helped me to keep my component´s code cleaner.



## Continued development


There are some tasks that, eventually, I would like to do for improve this app, such as:

- Create loading skeletons for the diferents components.
- Implement a different way to store the token and refresh token, currently I am using localStorage.
- Implement an infinite scroll when fetching data in the search tab.
- Create a component for visualize track's lyrics, currently this functionality is not avilable in the API.


## Some views

Take a look at the project:
</br>
[![search.png](https://i.postimg.cc/QCg8c4Q8/search.png)](https://postimg.cc/tnTGjzvw)
[![artist.png](https://i.postimg.cc/N0VjtrGc/artist.png)](https://postimg.cc/gwVWqj6S)
[![playlist.png](https://i.postimg.cc/9M7FQFzq/playlist.png)](https://postimg.cc/5YfMPJBx)

## Author

**Andrea Támara Correa**
* [tamara11correa@gmail.com](tamara11correa@gmail.com)
* [LinkedIn](https://www.linkedin.com/in/andreatamara/)
* [Portafolio web](https://tu-dominio.com/)


## Useful resources

- [react-spotify-web-playback](https://www.npmjs.com/package/react-spotify-web-playback) - This library saved me so much time. the playback component is basic but functional and really easy to use.


<!-- ## How to run the project

#### Pre-requisites ✅
- Add your Spotify client ID & secret to a `.env` file in root using the environment variables `REACT_APP_SPOTIFY_CLIENT_ID` and `REACT_APP_SPOTIFY_CLIENT_SECRET`
  - Note. **Never add this type of config to version control. This would usually come from your build server.** -->

