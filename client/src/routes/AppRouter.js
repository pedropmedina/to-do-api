import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccessForm from '../components/AccessForm';
import TodosDashboard from '../components/TodosDashboard';
import PageNotFound from '../components/PageNotFound';

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={AccessForm} />
				<Route path="/todosDashboard" component={TodosDashboard} />
				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
};

export default AppRouter;
