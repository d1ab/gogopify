import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
    Container,
    FlexContainer,
} from "components/_common/Container/Container";
import { Typography } from "components/_common/Typography/Typography";
import { CategoryBox } from "./Categories.styled";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/actions/categories.actions";
import { getCategoriesProperties } from "store/selectors/categories.selectors";
import { useLoader } from "../../hooks/useLoader";
import { useNotification } from "../../hooks/useNotification";

const { H3, H5, Link } = Typography;
const CATEGORY_LIMIT = 50;

export const Categories: React.FC<RouteComponentProps> = () => {
    const dispatch = useDispatch();
    const { showLoader, hideLoader } = useLoader();
    const { showNotification } = useNotification();
    const { categories, isFetching, categoriesFetchingFailed } = useSelector(
        getCategoriesProperties
    );

    useEffect(() => {
        if (!categories.length) {
            dispatch(fetchCategories.request(CATEGORY_LIMIT));
        }
    }, []);

    useEffect(() => {
        if (isFetching) {
            showLoader();
        }

        hideLoader();
    }, [isFetching]);

    useEffect(() => {
        if (categoriesFetchingFailed) {
            showNotification(
                "Error occurred while fetching categories",
                "error"
            );
        }
    }, [categoriesFetchingFailed]);

    return (
        <Container>
            <H3>Kategorie</H3>
            <FlexContainer style={{ flexWrap: "wrap" }}>
                {categories.map(({ id, name, href, icons }) => {
                    const [icon] = icons;

                    return (
                        <Link key={id} to={"/somewhere"}>
                            <CategoryBox url={icon.url}>
                                <H5 textAlign={"center"} margin={15}>
                                    {name}
                                </H5>
                            </CategoryBox>
                        </Link>
                    );
                })}
            </FlexContainer>
        </Container>
    );
};
