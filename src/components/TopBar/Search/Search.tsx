import styled from "styled-components";
import { Search as SearchIco } from "@styled-icons/evil";
import React, { useEffect, useState } from "react";
import { Input } from "components/_common/Input/Input.styled";
import { useHistory } from "react-router";
import { useDebounce } from "hooks/useDebounce";

const SearchIcon = styled(SearchIco)`
    color: black;
`;

const SearchContainer = styled.div`
    display: flex;
    width: 300px;
    position: relative;
    overflow: hidden;
`;

const MIN_SEARCH_LENGTH = 3;

export const Search: React.FC = () => {
    const { push } = useHistory();
    const [searchPhrase, setSearchPhrase] = useState<string | null>(null);
    const debouncedSearchPhrase = useDebounce(searchPhrase || "");

    useEffect(() => {
        if (debouncedSearchPhrase.length >= MIN_SEARCH_LENGTH) {
            push(`/search?q=${debouncedSearchPhrase}`);
        }
    }, [debouncedSearchPhrase]);

    return (
        <SearchContainer>
            <SearchIcon />
            <Input
                value={searchPhrase ? searchPhrase : ""}
                placeholder="Search..."
                onChange={(e) => setSearchPhrase(e.target.value)}
            />
        </SearchContainer>
    );
};
