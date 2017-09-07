import React from "react";
import {mount, shallow} from "enzyme";
import {Field} from "redux-form";
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
    return mount(node, context);
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

export function assertFields(wrapper, index, name, elem, label, type = false, diveComponent = false) {
    const nameField = diveComponent ? wrapper.find(diveComponent).at(index).dive() : wrapper.find(Field).at(index),
        props = nameField.props();

    expect(props.name).toBe(name);
    expect(typeof props.component).toBe("function");
    expect(props.elem).toBe(elem);
    expect(props.label).toBe(label);
    expect(type && props.type).toBe(type);
}

export function assertFieldArrays(wrapper, index, name) {
    const FieldArray = wrapper.find("FieldArray").at(index),
        props = FieldArray.props();

    expect(FieldArray.exists()).toBe(true);
    expect(props.name).toBe(name);
    expect(typeof props.component).toBe("function");
}

export function assertAddButtons(wrapper, text) {
    const button = wrapper.find("button").at(0);

    expect(button.exists()).toBe(true);
    expect(typeof button.props().onClick).toBe("function");
    expect(button.text()).toBe(text);
}

