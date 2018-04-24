import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import TodosDashboard from '../components/TodosDashboard';
import PageNotFound from '../components/PageNotFound';

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/todosDashboard" component={TodosDashboard} />
				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
};

export default AppRouter;
