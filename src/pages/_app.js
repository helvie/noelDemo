// require('dotenv').config();

import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
// import { combineReducers } from 'redux'; // N'importe pas configureStore de cette manière
import { configureStore } from '@reduxjs/toolkit'; // Importez configureStore depuis Redux Toolkit

// Importez ici vos reducers s'ils sont nécessaires

import user from '../reducers/user';
import windowSize from '../reducers/windowSize';

// const rootReducer = combineReducers({
//   // Ajoutez vos reducers ici
//   // screen,
//   // organismData,
//   // user,
// });

const store = configureStore({
  reducer: {user, windowSize},
  // Ajoutez ici des middlewares personnalisés si nécessaire
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>C'est Noël !</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;