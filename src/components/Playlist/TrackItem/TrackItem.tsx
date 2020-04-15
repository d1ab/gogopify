import React from "react";
import { fontSize } from "styles/typography";
import { ListItem } from "components/_common/List/List.styled";
import { Typography } from "components/_common/Typography/Typography";
import { PlayerIcon } from "components/Playlist/TrackItem/TrackItem.styled";
import { Play, Pause, Heart } from "@styled-icons/boxicons-regular";
import { useDispatch, useSelector } from "react-redux";
import { checkActiveItemById } from "store/selectors/playlist.selectors";
import { updateTrack } from "store/actions/playlist.actions";
import styled from "styled-components";
import { addToFavourites } from "store/actions/favourites.actions";
import { getFavouriteById } from "store/selectors/favourites.selectors";
import { useNotification } from "hooks/useNotification";

const PlayBtn = PlayerIcon(Play);
const PauseBtn = PlayerIcon(Pause);
const FavouriteIcon = styled(Heart)`
    width: 25px;
    height: 25px;
    color: white;
    cursor: pointer;
`;

const { Paragraph, SmallParagraph } = Typography;

interface TrackItem {
    id: string;
    artistName: string;
    songName: string;
    audioUrl: string;
}

/**
 * Component representing single song on the playlist
 * @param id
 * @param artistName
 * @param songName
 * @constructor
 */
export const TrackItem: React.FC<TrackItem> = ({
    id,
    artistName,
    songName,
}) => {
    const dispatch = useDispatch();
    const { isActive, isPlaying } = useSelector(checkActiveItemById(id));
    const existingFavourite = useSelector(getFavouriteById(id));
    const { showNotification } = useNotification();

    const handleFavourite = () => {
        // don't add same favourite second time
        if (existingFavourite) {
            return;
        }

        dispatch(addToFavourites.request({ trackId: id }));
        showNotification("Track was added to favourites", "success");
    };

    return (
        <ListItem isActive={isActive}>
            {!isPlaying ? (
                <PlayBtn
                    isActive={isActive}
                    onClick={() =>
                        dispatch(updateTrack({ id, isPlaying: true }))
                    }
                />
            ) : (
                <PauseBtn
                    isActive={isActive}
                    onClick={() =>
                        dispatch(updateTrack({ id, isPlaying: false }))
                    }
                />
            )}
            <Paragraph margin={"5px 0"}>{artistName}</Paragraph>
            <SmallParagraph margin={"2px 0"} fontSize={fontSize.small}>
                {songName}
            </SmallParagraph>
            <FavouriteIcon onClick={handleFavourite} />
        </ListItem>
    );
};
