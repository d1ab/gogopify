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
import {
    authorize,
    writeAccessToken,
} from "store/actions/authorization.actions";
import { useNotification } from "hooks/useNotification";
import { setAccessToken } from "utils/utils";
import { useLoader } from "../../hooks/useLoader";
import { getAccessToken } from "utils/utils";

const { H3, H5, Link } = Typography;

export const Main: React.FC = () => {
    const { showLoader, hideLoader } = useLoader();
    const dispatch = useDispatch();
    const isAuthorized = useSelector(getAuthorizationState);
    const authorizationFailed = useSelector(getAuthorizationFailedState);
    const isAuthorizing = useSelector(getAuthProcessingState);
    const token = useSelector(getAuthorizationAccessToken);
    const { showNotification } = useNotification();

    useEffect(() => {
        const accessToken = getAccessToken();

        if (accessToken) {
            dispatch(writeAccessToken({ accessToken }));
        }
    }, []);

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
            setAccessToken(token);
            hideLoader();
        }
    }, [isAuthorizing, isAuthorized, token]);

    return (
        <Container>
            <H3>Kategorie</H3>
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
