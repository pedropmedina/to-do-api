import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import { injectGlobal } from 'styled-components';

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

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
