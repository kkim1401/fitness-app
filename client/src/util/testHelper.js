/* Testing containers may require access to mock-store. */

import React from "react";
import {mount, shallow} from "enzyme";
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import moxios from "moxios";

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

export const createMockStore = (initialState = {}) => {
    const middlewares = [thunk],
        mockStore = configureMockStore(middlewares);

    return mockStore(initialState);
};

export function assertActions(endpoint, response = null, action, actionParam, expected) {
    moxios.stubRequest(`/api/${endpoint}`, {
        status: 200,
        response
    });

    const store = createMockStore();
    return store.dispatch(action(...actionParam)).then(() => {
        expect(store.getActions()).toEqual([expected]);
    });
}

export function assertInputs(wrapper, index, title, type, name) {
    const input = wrapper.find("input").at(index),
        props = input.props();

    expect(props.type).toBe(type);
    expect(props.name).toBe(name);
    expect(input.parent().type()).toBe("label");
    expect(input.parent().childAt(0).text()).toBe(title);
}