// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import "@testing-library/jest-dom/extend-expect";
import "jest-localstorage-mock";
import "jest-styled-components";

configure({ adapter: new Adapter() });

const allowedHeaders = [
    "Authorization",
    "Accept",
    "App-Platform",
    "Authorization",
    "Content-Type",
    "Origin",
    "Retry-After",
    "Spotify-App-Version",
    "X-Cloud-Trace-Context",
];

export const nockHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": allowedHeaders.join(","),
};

/**
 * jsdom doesn't support any loading or playback media operations.
 */
window.HTMLMediaElement.prototype.load = () => {
    /* do nothing */
};
window.HTMLMediaElement.prototype.play = () => {
    /* do nothing */
};
window.HTMLMediaElement.prototype.pause = () => {
    /* do nothing */
};
window.HTMLMediaElement.prototype.addTextTrack = () => {
    /* do nothing */
};
