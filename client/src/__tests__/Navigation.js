import { render } from '@testing-library/react'
import Navigation from '../components/Navigation'
import React from "react";

describe('Navigation component', () => {
    it('renders without crashing', () => {
        const {getByTestId} = render(<Navigation/>);
        expect(getByTestId('navigation')).toBeInTheDocument();
    });
});