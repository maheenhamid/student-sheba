import React from 'react';
import './styles.css';
import './assets/scss/global.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './app/Container';
import ContainerUniversity from './app/ContainerUniversity';
import { Login } from './app/components/auth/Login';
import { PremierSignup } from './app/components/auth/PremierSignup';
import { Authenticated } from './app/components/auth/Authenticated';
import { useStoreActions, useStoreState } from './app/store/hooks/easyPeasy';
import { QrLogin } from './app/components/auth/QrLogin';

function App() {
	const checkAuth = useStoreActions(state => state.auth.checkAuth);
	const checkType = useStoreState(state => state.auth.checkType)
	checkAuth();
	return (
		<Router>
			<Switch>
				<Route exact path="/login">
					<Login />
				</Route>				
				<Route exact path="/student-signup">
					<PremierSignup />
				</Route>
				<Route exact path="/go/:any">
					<QrLogin />
				</Route>
				<Authenticated path="/" component={checkType === 'school' ? Container : ContainerUniversity} />
				{/* <Authenticated path="/" component={Container} /> */}
			</Switch>
		</Router>
	);
}

export default App;
