// require('dotenv').config();

import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
// import { combineReducers } from 'redux'; // N'importe pas configureStore de cette manière
// import { configureStore } from '@reduxjs/toolkit'; // Importez configureStore depuis Redux Toolkit
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// Importez ici vos reducers s'ils sont nécessaires

import user from '../reducers/user';
import windowSize from '../reducers/windowSize';

// const rootReducer = combineReducers({
//   // Ajoutez vos reducers ici
//   // screen,
//   // organismData,
//   // user,
// });

const reducers = combineReducers({ user, windowSize });
const persistConfig = { key: 'noel', storage };
// const store = configureStore({
//   reducer: {user, windowSize},
//   // Ajoutez ici des middlewares personnalisés si nécessaire
// });
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}

        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>C&apos;est Noël !</title>
        </Head>
        <Component {...pageProps} />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;