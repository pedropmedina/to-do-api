import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import TodosDashboard from '../components/TodosDashboard';
import TodoEdit from '../components/TodoEdit';
import PageNotFound from '../components/PageNotFound';

class AppRouter extends React.Component {
	state = {
		isAuth: true,
	};

	handleIsAuth = pathname => {
		if (pathname === '/' || pathname === '/signUp') {
			this.setState(() => ({ isAuth: false }));
		} else {
			this.setState(() => ({ isAuth: true }));
		}
	};

	render() {
		return (
			<Router>
				<React.Fragment>
					{this.state.isAuth ? <TopBar /> : ''}
					<Switch>
						<Route
							exact
							path="/"
							render={props => (
								<Login {...props} handleIsAuth={this.handleIsAuth} />
							)}
						/>
						<Route
							path="/signUp"
							render={props => (
								<SignUp {...props} handleIsAuth={this.handleIsAuth} />
							)}
						/>
						<Route
							path="/todosDashboard"
							render={props => (
								<TodosDashboard {...props} handleIsAuth={this.handleIsAuth} />
							)}
						/>
						<Route
							path="/editTodo/:id"
							render={props => (
								<TodoEdit {...props} handleIsAuth={this.handleIsAuth} />
							)}
						/>
						<Route
							render={props => (
								<PageNotFound {...props} handleIsAuth={this.handleIsAuth} />
							)}
						/>
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}

export default AppRouter;
