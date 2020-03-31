import styled from "styled-components";

export const CategoryBox = styled.div<{ url: string }>`
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    margin: 8px;
    overflow: hidden;
    position: relative;
    width: 200px;
    height: 200px;
    border: none;
    border-radius: 8px;
    background: url(${({ url }) => url}) no-repeat center;
`;
