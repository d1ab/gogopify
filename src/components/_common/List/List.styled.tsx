import styled from "styled-components";

export const List = styled.ul`
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
`;

export const ListItem = styled.li.attrs<{
    isActive?: boolean;
}>(({ isActive }) => {
    if (isActive) {
        return {
            style: {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
        };
    }
})<{ isActive?: boolean }>`
    position: relative;
    display: flex;
    align-items: flex-start;
    background-color: transparent;
    padding: 5px 5px 5px 40px;
    flex-direction: column;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
