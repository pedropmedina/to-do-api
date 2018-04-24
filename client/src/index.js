import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import { injectGlobal } from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

injectGlobal`
	html {
		font-size: 62.5%;
	}

	body {
		line-height: 1.3;
		font-family: 'Helvetica';
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
		margin: 0;
		padding: 0;
	}
`;

// invoke store
const store = configureStore();

const state = store.getState();
console.log(state);

const jxs = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jxs, document.getElementById('root'));
registerServiceWorker();
