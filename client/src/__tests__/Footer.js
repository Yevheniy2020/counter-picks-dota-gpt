import { render } from '@testing-library/react'

import Footer from '../components/Footer'
import React from "react";

describe('Footer component', () => {
    it('renders without crashing', () => {
        const {getByTestId} =  render(<Footer />);
        expect(getByTestId('footer')).toBeInTheDocument();
    });
});