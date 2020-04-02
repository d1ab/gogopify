import { storiesOf } from "@storybook/react";
import React from "react";
import { ContainerFluid } from "../components/_common/Container/Container";
import { Player } from "../components/BottomBar/BottomBar";

export default {
    title: "BottomBar",
    component: Player,
};

storiesOf("Player ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <ContainerFluid space={"0"}>
            <Player />
        </ContainerFluid>
    ));
