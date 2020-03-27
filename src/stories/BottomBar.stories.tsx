import { storiesOf } from "@storybook/react";
import React from "react";
import { ContainerFluid } from "../components/_common/Container/Container";
import { BottomBar } from "../components/BottomBar/BottomBar";

export default {
    title: "BottomBar",
    component: BottomBar,
};

storiesOf("BottomBar ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("player", () => (
        <ContainerFluid space={"0"}>
            <BottomBar
                audioUrl={
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
                }
            />
        </ContainerFluid>
    ));
