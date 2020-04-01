import { Container, FlexContainer } from "../_common/Container/Container";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Typography } from "components/_common/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../../hooks/useLoader";
import { useNotification } from "../../hooks/useNotification";
import { getCategoryPlaylists } from "../../store/selectors/categories.selectors";
import { fetchCategoryPlaylists } from "../../store/actions/categoryPlaylists.actions";
import { PlaylistCard } from "./PlaylistCard/PlaylistCard";

const { H3, Link } = Typography;

export const CategoryPlaylists: React.FC<RouteComponentProps<{
    id: string;
}>> = ({ match }) => {
    const dispatch = useDispatch();
    const { showLoader, hideLoader } = useLoader();
    const { showNotification } = useNotification();
    const {
        playlists,
        isFetching,
        categoriesPlaylistsFetchingFailed,
    } = useSelector(getCategoryPlaylists);

    useEffect(() => {
        // TODO: visited categories should be cached and taken from store
        dispatch(fetchCategoryPlaylists.request(match.params.id));
    }, []);

    useEffect(() => {
        if (isFetching) {
            showLoader();
        }

        hideLoader();
    }, [isFetching]);

    useEffect(() => {
        if (categoriesPlaylistsFetchingFailed) {
            showNotification(
                "Error occurred while fetching category playlists",
                "error"
            );
        }
    }, [categoriesPlaylistsFetchingFailed]);

    return (
        <Container>
            <H3>Playlists</H3>
            <FlexContainer style={{ flexWrap: "wrap" }}>
                {playlists.map(({ id, name, description, images }) => {
                    const [image] = images;

                    return (
                        <Link key={id} to={`/playlist/${id}`}>
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
