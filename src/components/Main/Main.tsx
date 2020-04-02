import React, { useEffect } from "react";
import {
    Container,
    FlexColumnContainer,
} from "components/_common/Container/Container.styled";
import { Button } from "components/_common/Button/Button.styled";
import { Typography } from "components/_common/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorizationState } from "store/selectors/authorization.selectors";
import { authorize } from "store/actions/authorization.actions";
import { useNotification } from "hooks/useNotification";
import { useLoader } from "../../hooks/useLoader";
import { Redirect } from "react-router";

const { H5 } = Typography;

export const Main: React.FC = () => {
    const dispatch = useDispatch();
    const {
        isAuthorized,
        isAuthorizing,
        authorizationFailed,
        token,
    } = useSelector(getAuthorizationState);
    const { showNotification } = useNotification();
    const { showLoader, hideLoader } = useLoader();

    console.log({ isAuthorized, isAuthorizing, authorizationFailed, token });

    useEffect(() => {
        if (authorizationFailed) {
            showNotification(
                "Authorization failed, please check clientId and secret",
                "error"
            );

            hideLoader();
        }
    }, [authorizationFailed]);

    useEffect(() => {
        if (isAuthorizing) {
            showLoader();
        }

        if (isAuthorized && token) {
            hideLoader();
        }
    }, [isAuthorizing, isAuthorized, token]);

    if (isAuthorized) {
        return <Redirect to={"/categories"} />;
    }

    return (
        <Container>
            {!isAuthorized && (
                <FlexColumnContainer alignItems={"center"}>
                    <H5>Please login to get access to the service!</H5>
                    <Button onClick={() => dispatch(authorize.request())}>
                        Login
                    </Button>
                </FlexColumnContainer>
            )}
        </Container>
    );
};
