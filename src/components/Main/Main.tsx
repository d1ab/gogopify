import React, { useEffect } from "react";
import {
    Container,
    FlexColumnContainer,
} from "components/_common/Container/Container";
import { Button } from "components/_common/Button/Button";
import { Typography } from "components/_common/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
    getAuthorizationAccessToken,
    getAuthorizationFailedState,
    getAuthorizationState,
    getAuthProcessingState,
} from "store/selectors/authorization.selectors";
import { authorize } from "store/actions/authorization.actions";
import { useNotification } from "hooks/useNotification";
import { useLoader } from "../../hooks/useLoader";

const { H5, Link } = Typography;

export const Main: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthorized = useSelector(getAuthorizationState);
    const authorizationFailed = useSelector(getAuthorizationFailedState);
    const isAuthorizing = useSelector(getAuthProcessingState);
    const token = useSelector(getAuthorizationAccessToken);
    const { showNotification } = useNotification();
    const { showLoader, hideLoader } = useLoader();

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

    return (
        <Container>
            {!isAuthorized ? (
                <FlexColumnContainer alignItems={"center"}>
                    <H5>Proszę się zalogować żeby uzyskać dostęp do serwisu</H5>
                    <Button onClick={() => dispatch(authorize.request())}>
                        Zaloguj się!
                    </Button>
                </FlexColumnContainer>
            ) : (
                <FlexColumnContainer>
                    <H5>Zalogowno pomyślnie</H5>
                    <Link to={"/profile"}>Link do profilu</Link>
                </FlexColumnContainer>
            )}
        </Container>
    );
};
