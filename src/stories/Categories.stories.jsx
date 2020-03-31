import {
    Container,
    FlexContainer,
} from "../components/_common/Container/Container";
import { CategoryBox } from "../components/Categories/Categories.styled";
import React from "react";
import { Typography } from "../components/_common/Typography/Typography";
import { storiesOf } from "@storybook/react";
import { Categories } from "../components/Categories/Categories";
import { linkTo } from "@storybook/addon-links";

const { H5, H3 } = Typography;
const background = "https://images6.alphacoders.com/909/thumb-350-909641.png";

export default {
    title: "Categories",
    component: Categories,
};

storiesOf("Categories ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container>
            <H3>Kategorie</H3>
            <FlexContainer style={{ flexWrap: "wrap" }}>
                <CategoryBox
                    url={background}
                    onClick={linkTo("Buttons", "all")}>
                    <H5 textAlign={"center"} margin={15}>
                        Category 1
                    </H5>
                </CategoryBox>
                <CategoryBox url={background}>
                    <H5 textAlign={"center"} margin={15}>
                        Category 2
                    </H5>
                </CategoryBox>
                <CategoryBox url={background}>
                    <H5 textAlign={"center"} margin={15}>
                        Category 3
                    </H5>
                </CategoryBox>
            </FlexContainer>
        </Container>
    ));
