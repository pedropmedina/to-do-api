import React from 'react';

class PageNotFound extends React.Component {
	componentDidMount() {
		this.props.handleIsAuth(this.props.location.pathname);
	}

	render() {
		return <div>404</div>;
	}
}

export default PageNotFound;
