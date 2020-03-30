import React, { useEffect } from "react";
import {
    Container,
    FlexColumnContainer,
} from "components/_common/Container/Container";
import { Typography } from "components/_common/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
    getAuthorizationFailedState,
    getAuthorizationState,
    getAuthProcessingState,
} from "store/selectors/authorization.selectors";
import { Button } from "components/_common/Button/Button";
import { authorize } from "../../store/actions/authorization.actions";
import { useNotification } from "../_common/NotificationBar/useNotification";

const { H3, H5, Link } = Typography;

export const Main: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthorized = useSelector(getAuthorizationState);
    const authorizationFailed = useSelector(getAuthorizationFailedState);
    const isAuthorizing = useSelector(getAuthProcessingState);
    const { showNotification } = useNotification();

    useEffect(() => {
        if (authorizationFailed) {
            showNotification(
                "Authorization failed, please check clientId and secret",
                "error"
            );
        }
    }, [authorizationFailed]);

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
