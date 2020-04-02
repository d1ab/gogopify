import { mount } from "enzyme";
import { ProviderWrapper } from "../Provider/ProviderWrapper";
import initStore from "../../store/store";
import React from "react";
import { Main } from "./Main";
import { Button } from "../_common/Button/Button.styled";
import { useDispatch, useSelector } from "react-redux";
import { AuthorizationState } from "../../store/reducers/authorization.reducer";
import * as redux from "react-redux";
import { Redirect } from "react-router";

describe("<Main/>", () => {
    it("should HAVE a login button WHEN user is UNAUTHORIZED", () => {
        const wrapper = mount(
            <ProviderWrapper store={initStore()}>
                <Main />
            </ProviderWrapper>
        );

        const main = wrapper.find(Button);
        expect(main).toHaveLength(1);
    });

    it("should trigger 'AUTHORIZE_REQUEST' on button click", () => {
        const authorizationInit: AuthorizationState = {
            isAuthorized: false,
            isAuthorizing: false,
            authorizationFailed: false,
            isTokenExpired: false,
            token: null,
        };

        const store = initStore();
        const mockDispatch = jest.fn();
        const useDispatchSpy = jest
            .spyOn(redux, "useDispatch")
            .mockReturnValue(mockDispatch);
        const useSelectorSpy = jest
            .spyOn(redux, "useSelector")
            .mockReturnValue(authorizationInit);

        useDispatchSpy.mockReturnValue(mockDispatch);

        const wrapper = mount(
            <ProviderWrapper store={store}>
                <Main />
            </ProviderWrapper>
        );

        const button = wrapper.find(Button);
        button.simulate("click");
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "AUTHORIZE_REQUEST",
        });
        useDispatchSpy.mockRestore();
        useSelectorSpy.mockRestore();
    });

    it("should REDIRECT when user is authorized", () => {
        const authorizationInit: AuthorizationState = {
            isAuthorized: true,
            isAuthorizing: false,
            authorizationFailed: false,
            isTokenExpired: false,
            token: "token",
        };

        const mockDispatch = jest.fn();
        const useDispatchSpy = jest
            .spyOn(redux, "useDispatch")
            .mockReturnValue(mockDispatch);
        const useSelectorSpy = jest
            .spyOn(redux, "useSelector")
            .mockReturnValue(authorizationInit);

        const wrapper = mount(
            <ProviderWrapper store={initStore()}>
                <Main />
            </ProviderWrapper>
        );

        const redirect = wrapper.find(Redirect);
        expect(redirect).toHaveLength(1);

        useDispatchSpy.mockRestore();
        useSelectorSpy.mockRestore();
    });
});
