import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import TodosDashboard from '../components/TodosDashboard';
import TodoEdit from '../components/TodoEdit';
import PageNotFound from '../components/PageNotFound';

const AppRouter = () => {
	return (
		<Router>
			<React.Fragment>
				<TopBar />
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/signUp" component={SignUp} />
					<Route path="/todosDashboard" component={TodosDashboard} />
					<Route path="/editTodo/:id" component={TodoEdit} />
					<Route component={PageNotFound} />
				</Switch>
			</React.Fragment>
		</Router>
	);
};

export default AppRouter;
