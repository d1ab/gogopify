import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

export interface ProtectedRouteProps extends RouteProps {
    isAuthorized: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    isAuthorized,
    ...props
}) => {
    if (!isAuthorized) {
        const renderComponent = () => <Redirect to={"/"} />;

        return (
            <Route {...props} component={renderComponent} render={undefined} />
        );
    } else {
        return <Route {...props} />;
    }
};
