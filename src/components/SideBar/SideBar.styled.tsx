import styled from "styled-components";

export const SideBarList = styled.ul`
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
`;

export const SideBarItem = styled.li`
    transition: 0.3s;
    display: list-item;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.015em;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    padding: 10px 8px;
    color: rgba(255, 255, 255, 0.5);

    &:hover {
        color: rgba(255, 255, 255, 1);
    }
`;

export const NavMenu = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    max-width: 230px;
    z-index: 3;
`;
