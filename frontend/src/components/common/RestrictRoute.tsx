import React from 'react';
import * as H from 'history';
import { Redirect, Route, RouteChildrenProps, RouteComponentProps } from 'react-router';

interface RestrictRouteProps {
    location?: H.Location;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: (props: RouteComponentProps<any>) => React.ReactNode;
    children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
    isAllow: boolean;
}

function RestrictRoute({ isAllow, render, component: Component, ...rest }: RestrictRouteProps) {    
    return (
        <Route
            {...rest}
            render={(props) => {
                if(!isAllow) {
                    return <Redirect to={{ pathname: "/login" }} />
                }

                if(render) {
                    return render(props);
                }

                if(Component) {
                    return <Component {...props} />;
                }

                return null;
            }}
        />
    )
    
};

export default React.memo(RestrictRoute);