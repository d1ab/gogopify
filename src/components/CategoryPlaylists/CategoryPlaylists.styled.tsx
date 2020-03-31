import styled from "styled-components";
import { truncate } from "styles/utils";
import { fontFamilies, fontSize } from "styles/typography";

export const CategoryPlaylistBoxContainer = styled.div`
    display: flex;
    //align-items: flex-end;
    flex-direction: column;
    padding: 20px;
    margin: 8px;
    overflow: hidden;
    position: relative;
    width: 165px;
    height: 240px;
    border: none;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.bgGraphite};
`;

export const CategoryPlaylistBoxImage = styled.div<{ url: string }>`
    background: url(${({ url }) => url}) no-repeat center;
    background-size: cover;
    height: 100%;
`;

export const Description = styled.div`
    ${truncate("100%")};
    color: ${({ theme }) => theme.colors.secondary};
    font-family: ${fontFamilies.body};
    font-size: ${fontSize.small}px;
`;
