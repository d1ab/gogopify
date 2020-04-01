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
                    "https://p.scdn.co/mp3-preview/42847ffa3c83fcfce624d09a8d3d39a15d53e199?cid=d81366c1377b47d99b2d43da6a461c32"
                }
            />
        </ContainerFluid>
    ));

// "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
