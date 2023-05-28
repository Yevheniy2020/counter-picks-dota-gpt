import { render, fireEvent } from '@testing-library/react';
import HeroesList from '../components/HeroesList';

const mockHeroes = [
    {
        localized_name: 'Hero 1',
        img: '/images/hero1.png',
        roles: ['Role 1', 'Role 2'],
        attack_type: 'Type 1',
    },
    {
        localized_name: 'Hero 2',
        img: '/images/hero2.png',
        roles: ['Role 3', 'Role 4'],
        attack_type: 'Type 2',
    },
];

const mockConnectSelectedHeroes = jest.fn();

describe('HeroList component', ()=>{
    it('renders the heroes', () => {
        const { getByText, getAllByAltText } = render(<HeroesList heroes={mockHeroes} connectSelectedHeroes={mockConnectSelectedHeroes} />);
        expect(getByText('Hero 1')).toBeInTheDocument();
        expect(getByText('Hero 2')).toBeInTheDocument();
    });

    it('selects a hero on click', () => {
        const { getByText } = render(<HeroesList heroes={mockHeroes} connectSelectedHeroes={mockConnectSelectedHeroes} />);

        fireEvent.click(getByText('Hero 1'));
        expect(mockConnectSelectedHeroes).toHaveBeenCalledWith(['\n Hero 1']);
    });

})