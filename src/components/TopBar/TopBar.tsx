import React from "react";
import styled from "styled-components";
import { FlexContainer } from "../_common/Container/Container.styled";

const Bar = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 50px;
    width: 100%;
    padding: 5px 25px;
    background-color: rgba(0, 0, 0, 0.6);
`;

export const TopBar: React.FC = ({ children }) => {
    return (
        <FlexContainer>
            <Bar>{children}</Bar>
        </FlexContainer>
    );
};
