import { render } from '@testing-library/react'
import Heroes from '../components/Heroes'

jest.mock("../http/api", () => ({
    getAllHeroes: jest.fn(),
}))

const {getAllHeroes} = require("../http/api.js");
getAllHeroes.mockImplementation(() => Promise.resolve({  data: [
        { localized_name: 'Hero1' },
        { localized_name: 'Hero2' },
        { localized_name: 'Hero3' }
    ]}));

describe('Heroes component', () => {
    const mockConnectSelectedHeroes = jest.fn();

    beforeEach(() => {
        getAllHeroes.mockClear();
    });

    it('renders without crashing', () => {
        const {getByTestId} = render(<Heroes searchHero="" connectSelectedHeroes={mockConnectSelectedHeroes} />);
        expect(getByTestId('heroes-component')).toBeInTheDocument();
    });

    it('displays loading indicator while fetching heroes', () => {
        const {getByTestId} = render(<Heroes searchHero="" connectSelectedHeroes={mockConnectSelectedHeroes} />);
        expect(getByTestId('heroes-loading')).toBeInTheDocument();
    });

});
