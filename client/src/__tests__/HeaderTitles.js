import { render } from '@testing-library/react'

import HeaderTitles from '../components/HeaderTitles'

describe('HeaderTitles component', () => {
    it('renders without crashing', () => {
        const {getByTestId} = render(<HeaderTitles />);
        expect(getByTestId('header-titles')).toBeInTheDocument();
    });

    it('contains the correct text', () => {
        const {getByText} = render(<HeaderTitles />);
        expect(getByText('PICK YOUR TEAM')).toBeInTheDocument();
        expect(getByText('Tactical wizards, brutal big men, and agile scouts - the choice of Dota 2 heroes is staggeringly huge and endlessly varied. On your way to victory, you will use incredible abilities and devastating ultimatum skills')).toBeInTheDocument();
    });
});
