import styled from "styled-components";
import { Search as SearchIco } from "@styled-icons/evil";
import React from "react";
import { Input } from "../../_common/Input/Input";

const SearchIcon = styled(SearchIco)`
    color: black;
`;

const SearchContainer = styled.div`
    display: flex;
    width: 300px;
    position: relative;
    overflow: hidden;
`;

export const Search: React.FC = () => {
    return (
        <SearchContainer>
            <SearchIcon />
            <Input placeholder="Search..." />
        </SearchContainer>
    );
};
