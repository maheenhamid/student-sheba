import { Layout } from 'antd';
import { Route, Redirect } from "react-router-dom";
import * as React from "react";
import { useStoreState } from '../../store/hooks/easyPeasy';

interface IProps {
	component: React.ComponentType<any>;
	path: string;
	exact?: boolean;
}

export const Authenticated = ({ component: Component, ...otherProps }: IProps) => {
	const user = useStoreState((state) => state.auth.user);
	// console.log("user");
	// console.log(user);
	if (user === null || user === undefined) {
		return <Redirect to="/login" />
	}

	return (
		<Layout>
			<Route
				render={otherProps => (
					<>
						<Component {...otherProps} />
					</>
				)}
			/>
		</Layout>
	);
};
