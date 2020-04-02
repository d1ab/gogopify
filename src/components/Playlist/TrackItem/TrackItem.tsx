import React from "react";
import { fontSize } from "styles/typography";
import { ListItem } from "components/_common/List/List.styled";
import { Typography } from "components/_common/Typography/Typography";
import { PlayerIcon } from "components/Playlist/TrackItem/TrackItem.styled";
import { Play, Pause } from "@styled-icons/boxicons-regular";
import { useDispatch, useSelector } from "react-redux";
import { checkActiveItemById } from "../../../store/selectors/playlist.selectors";
import { updateTrack } from "store/actions/playlist.actions";

const PlayBtn = PlayerIcon(Play);
const PauseBtn = PlayerIcon(Pause);

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
        </ListItem>
    );
};
