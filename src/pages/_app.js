import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux'; // N'importe pas configureStore de cette manière
import { configureStore } from '@reduxjs/toolkit'; // Importez configureStore depuis Redux Toolkit
import dotenv from 'dotenv';

dotenv.config();
// Importez ici vos reducers s'ils sont nécessaires
// import screen from '../reducers/screen';
// import organismData from '../reducers/organism';
// import user from '../reducers/user';

const rootReducer = combineReducers({
  // Ajoutez vos reducers ici
  // screen,
  // organismData,
  // user,
});

const store = configureStore({
  reducer: rootReducer,
  // Ajoutez ici des middlewares personnalisés si nécessaire
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;