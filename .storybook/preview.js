import { addParameters } from '@storybook/react'; // <- or your storybook framework
import { addDecorator, configure } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { defaultTheme } from "../src/styles/defaultTheme";

const history = createBrowserHistory();


addParameters({
    backgrounds: [
        { name: 'gogopify', value: '#151514' },
        { name: 'default', value: '#ffffff', default: true },
    ],
});

addDecorator((story) => (
    <ThemeProvider theme={defaultTheme}>
        <Router history={history}>{story()}</Router>
    </ThemeProvider>
));

configure(require.context("../src", true, /\.stories\.tsx$/), module);
