import {
    Container,
    FlexColumnContainer,
    FlexContainer,
    FlexContainerItem,
} from "components/_common/Container/Container.styled";
import * as React from "react";
import { Typography } from "components/_common/Typography/Typography";
import { space } from "components/../styles/spaces";
import { Image } from "components/_common/Image/Image.styled";
import { List } from "components/_common/List/List.styled";
import { TrackItem } from "./TrackItem/TrackItem";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistProcessingStatus } from "store/selectors/playlist.selectors";
import { RouteComponentProps } from "react-router";
import { useEffect } from "react";
import {
    fetchAlbumPlaylist,
    fetchPlaylist,
    updateWithFavourites,
} from "store/actions/playlist.actions";
import { useLoader } from "hooks/useLoader";
import { useNotification } from "hooks/useNotification";
import { getPlaylistInfoById } from "store/selectors/categories.selectors";
import { resetStateError } from "store/actions/utility.actions";
import {
    getAllFavourites,
    getFavouritesStatus,
} from "store/selectors/favourites.selectors";

const { H4 } = Typography;

/**
 * Playlist component, allows to play audio
 * @param match
 * @constructor
 */
export const Playlist: React.FC<RouteComponentProps<{
    id?: string;
    albumId?: string;
}>> = ({ match: { params, path } }) => {
    const dispatch = useDispatch();
    const favouriteTracks = useSelector(getAllFavourites);
    const { isSuccess, isAdding } = useSelector(getFavouritesStatus);
    const { name, image } = useSelector(
        getPlaylistInfoById(params.id || params.albumId)
    );
    const { isFetching, playlistFetchingFailed, items } = useSelector(
        getPlaylistProcessingStatus
    );
    const { showLoader, hideLoader } = useLoader();
    const { showNotification } = useNotification();

    useEffect(() => {
        if (params.id) {
            dispatch(fetchPlaylist.request(params.id));
        }

        if (params.albumId) {
            dispatch(fetchAlbumPlaylist.request(params.albumId));
        }

        if (path === "/favourites") {
            dispatch(updateWithFavourites({ favourites: favouriteTracks }));
        }

        return () => {
            if (playlistFetchingFailed) {
                dispatch(resetStateError());
            }
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Track was added to favourites", "success");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isFetching || isAdding) {
            return showLoader();
        }

        hideLoader();
    }, [isFetching, isAdding]);

    useEffect(() => {
        if (playlistFetchingFailed) {
            showNotification(
                "Error occurred while fetching tracklist",
                "error"
            );
        }
    }, [playlistFetchingFailed]);

    if (!items.length && !playlistFetchingFailed && !isFetching) {
        return (
            <Container>
                <FlexContainer>
                    <H4>Track list does not contain preview audio</H4>
                </FlexContainer>
            </Container>
        );
    }

    return (
        <Container>
            <FlexContainer>
                <FlexContainerItem space={"30%"} paddings={space.L}>
                    <FlexColumnContainer alignItems={"center"}>
                        <Image src={image} />
                        <H4 margin={"10px 0"}>{name}</H4>
                    </FlexColumnContainer>
                </FlexContainerItem>
                <FlexContainerItem paddings={space.L}>
                    <List>
                        {items.map(({ track }) => {
                            const artists = track.artists
                                .map((artist) => artist.name)
                                .join(", ");

                            return (
                                <TrackItem
                                    key={track.id}
                                    id={track.id}
                                    // will be available due to the track filtering on selector
                                    audioUrl={track.preview_url}
                                    artistName={artists}
                                    songName={track.name}
                                />
                            );
                        })}
                    </List>
                </FlexContainerItem>
            </FlexContainer>
        </Container>
    );
};
