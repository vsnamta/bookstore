import { shallow } from "enzyme";
import React from 'react';
import Title from "../components/general/Title";

function sum (a: number, b: number) {
    return a + b;
}

describe('<ErrorDetail>', () => {
    it('1st test', () => {
        const wrapper = shallow(<Title content="test" />);
        expect(wrapper.length).toEqual(1);
    });

    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});