import {
    Container,
    FlexContainer,
} from "components/_common/Container/Container.styled";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Typography } from "components/_common/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "hooks/useLoader";
import { useNotification } from "hooks/useNotification";
import { getCategoryPlaylists } from "store/selectors/categories.selectors";
import { PlaylistCard } from "./PlaylistCard/PlaylistCard";
import { resetStateError } from "store/actions/utility.actions";
import { PayloadActionCreator } from "typesafe-actions";

const { H3, Link } = Typography;

interface Playlists extends RouteComponentProps<{ id?: string }> {
    handleRequest?: PayloadActionCreator<string, string>;
    title: string;
}

export const Playlists: React.FC<Playlists> = ({
    match,
    title,
    handleRequest,
}) => {
    const dispatch = useDispatch();
    const { showLoader, hideLoader } = useLoader();
    const { showNotification } = useNotification();
    const { playlists, isFetching, playlistsFetchingFailed } = useSelector(
        getCategoryPlaylists
    );

    // TODO: think of a better way to handle this in storybook
    useEffect(() => {
        if (match.params.id && handleRequest) {
            dispatch(handleRequest(match.params.id));

            return;
        }

        if (handleRequest) {
            dispatch(handleRequest("")); //empty string used only for consistency with shared reducer
        }

        return () => {
            if (playlistsFetchingFailed) {
                dispatch(resetStateError());
            }
        };
    }, []);

    useEffect(() => {
        if (isFetching) {
            return showLoader();
        }

        hideLoader();
    }, [isFetching]);

    useEffect(() => {
        if (playlistsFetchingFailed) {
            showNotification(
                "Error occurred while fetching category playlists",
                "error"
            );
        }
    }, [playlistsFetchingFailed]);

    return (
        <Container>
            <H3>{title}</H3>
            <FlexContainer style={{ flexWrap: "wrap" }}>
                {playlists.map(({ id, name, description, images, type }) => {
                    const [image] = images;
                    const isAlbum = type === "album";
                    const url = isAlbum
                        ? `/albums/${id}/playlists/`
                        : `/playlists/${id}`;

                    return (
                        <Link key={id} to={url}>
                            <PlaylistCard
                                key={id}
                                name={name}
                                description={description}
                                backgroundUrl={image.url}
                            />
                        </Link>
                    );
                })}
            </FlexContainer>
        </Container>
    );
};
