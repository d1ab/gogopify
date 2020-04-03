import { TopBar } from "../components/TopBar/TopBar";
import { storiesOf } from "@storybook/react";
import { Typography } from "components/_common/Typography/Typography";
import React from "react";
import { Search } from "components/TopBar/Search/Search";

const { Paragraph } = Typography;

storiesOf("TopBar ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <TopBar>
            <Paragraph>Empty TopBar</Paragraph>
        </TopBar>
    ))
    .add("with search", () => (
        <TopBar>
            <Search />
        </TopBar>
    ));
