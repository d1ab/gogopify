import React from "react";
import { Container } from "components/_common/Container/Container.styled";
import { Typography } from "components/_common/Typography/Typography";
import { useLocation } from "react-router";

const { H3 } = Typography;

export const SearchResult: React.FC = () => {
    const { search } = useLocation();
    // search value is stored in "q" parameter
    const searchValue = search.replace("?q=", "");

    return (
        <Container>
            <H3>Search results for "{searchValue}"</H3>
        </Container>
    );
};
