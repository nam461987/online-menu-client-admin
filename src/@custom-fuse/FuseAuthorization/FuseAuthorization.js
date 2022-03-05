/* eslint-disable prettier/prettier */
import AppContext from "app/AppContext";
import { Component } from "react";
import { connect } from "react-redux";
import { matchRoutes } from "react-router-config";
import { withRouter } from "react-router-dom";

class FuseAuthorization extends Component {
    constructor(props, context) {
        super(props);
        const { routes } = context;
        this.state = {
            accessGranted: true,
            routes,
        };
    }

    componentDidMount() {
        if (!this.state.accessGranted) {
            this.redirectRoute();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.accessGranted !== this.state.accessGranted;
    }

    componentDidUpdate() {
        if (!this.state.accessGranted) {
            this.redirectRoute();
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { location, user } = props;
        const { pathname } = location;

        const matched = matchRoutes(state.routes, pathname)[0];

        return {
            accessGranted:
                matched?.route.authByStr?.length > 0
                    ? user.permissions.includes(matched.route.authByStr)
                    : true,
        };
    }

    redirectRoute() {
        const { location, history, user, login } = this.props;
        const { pathname, state } = location;
        const redirectUrl =
            state && state.redirectUrl ? state.redirectUrl : "/";

        /*
        User is guest
        Redirect to Login Page
        */
        if (!login.success) {
            history.push({
                pathname: "/login",
                state: { redirectUrl: pathname },
            });
        } else {
            /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
            history.push({
                pathname: "/deny",
            });
        }
    }

    render() {
        // console.info('Fuse Authorization rendered', this.state.accessGranted);
        return this.state.accessGranted ? <>{this.props.children}</> : null;
    }
}

function mapStateToProps({ auth }) {
    return {
        user: auth.user,
        login: auth.login,
    };
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
