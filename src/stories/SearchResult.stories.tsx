import { storiesOf } from "@storybook/react";
import React from "react";
import { SearchResult } from "components/SearchResult/SearchResult";

storiesOf("Search ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => <SearchResult />);
