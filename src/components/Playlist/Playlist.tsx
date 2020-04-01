import {
    Container,
    FlexColumnContainer,
    FlexContainer,
    FlexContainerItem,
} from "components/_common/Container/Container";
import * as React from "react";
import { Typography } from "components/_common/Typography/Typography";
import { Button } from "components/_common/Button/Button";
import { space } from "components/../styles/spaces";
import { Image } from "components/_common/Image/Image.styled";
import { List } from "components/_common/List/List.styled";
import { TrackItem } from "./TrackItem/TrackItem";
import { useDispatch, useSelector } from "react-redux";
import {
    getPlaylistInfo,
    getPlaylistProcessingStatus,
    getTracks,
} from "store/selectors/playlist.selectors";
import { RouteComponentProps } from "react-router";
import { useEffect } from "react";
import { fetchPlaylist } from "../../store/actions/playlist.actions";
import { useLoader } from "../../hooks/useLoader";
import { useNotification } from "../../hooks/useNotification";

const { H4 } = Typography;

/**
 * Playlist component, allows to play audio
 * @param match
 * @constructor
 */
export const Playlist: React.FC<RouteComponentProps<{
    id: string;
}>> = ({ match }) => {
    const dispatch = useDispatch();
    const tracks = useSelector(getTracks);
    const { name, image } = useSelector(getPlaylistInfo);
    const { isFetching, playlistFetchingFailed } = useSelector(
        getPlaylistProcessingStatus
    );
    const { showLoader, hideLoader } = useLoader();
    const { showNotification } = useNotification();

    useEffect(() => {
        dispatch(fetchPlaylist.request(match.params.id));
    }, []);

    useEffect(() => {
        if (isFetching) {
            return showLoader();
        }

        hideLoader();
    }, [isFetching]);

    useEffect(() => {
        if (playlistFetchingFailed) {
            showNotification(
                "Error occurred while fetching category playlists",
                "error"
            );
        }
    }, [playlistFetchingFailed]);

    if (!tracks.length) {
        return null;
    }

    return (
        <Container>
            <FlexContainer>
                <FlexContainerItem space={"30%"} paddings={space.L}>
                    <FlexColumnContainer alignItems={"center"}>
                        <Image src={image} />
                        <H4 margin={"10px 0"}>{name}</H4>
                        <Button>ODTWORZ</Button>
                    </FlexColumnContainer>
                </FlexContainerItem>
                <FlexContainerItem paddings={space.L}>
                    <List>
                        {tracks.map(({ track }) => {
                            // TODO: what if track has more artists?
                            const [artist] = track.album.artists;

                            return (
                                <TrackItem
                                    key={track.id}
                                    id={track.id}
                                    // will be available due to the track filtering on selector
                                    audioUrl={track.preview_url}
                                    artistName={artist.name}
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
