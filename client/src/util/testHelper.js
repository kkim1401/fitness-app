import React from "react";
import {mount, shallow} from "enzyme";
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

export const shallowWithStore = (node, store) => {
    const context = {
        store
    };
    return shallow(node, {context});
};

export const mountWithStore = (node, store) => {
    const context = {
        store
    };
    return mount(node, {context});
};

export const createMockStore = initialState => {
    const middlewares = [thunk],
        mockStore = configureMockStore(middlewares);

    return mockStore(initialState);
};

