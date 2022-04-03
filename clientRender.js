import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Routes from './app/routes/index';

hydrate(
	<BrowserRouter>
		<Routes />
	</BrowserRouter>,
	document.getElementById("root"));