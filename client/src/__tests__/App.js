import {render, fireEvent, waitFor, getByText} from '@testing-library/react'

import App from '../components/App'

jest.mock("../http/api", () => ({
    sendChatGPT: jest.fn(),
    postTeams: jest.fn(),
    getTeams: jest.fn(),
}))

const { sendChatGPT, postTeams, getTeams } = require("../http/api.js");

sendChatGPT.mockImplementation(() => Promise.resolve({data: 'Test Data'}));
postTeams.mockImplementation(() => Promise.resolve({data: 'Test Data'}));
getTeams.mockImplementation(() => Promise.resolve({data: []}));

describe('App component', () => {
    beforeEach(() => {
        sendChatGPT.mockClear();
        postTeams.mockClear();
        getTeams.mockClear();
    });

    it('renders without crashing', () => {
        const {getByText} = render(<App />);
        expect(getByText('find counterpicks')).toBeInTheDocument();
    });

    it('opens the counterpicks modal', async () => {
        const {getByText} = render(<App />);
        fireEvent.click(getByText('find counterpicks'));
        await waitFor(() => expect(getByText('Сounterpicks')).toBeInTheDocument());
    });

    it('posts team to the database', async () => {
        const {getByText} = render(<App />);
        fireEvent.click(getByText('find counterpicks'));
        await waitFor(() => expect(getByText('Post team to Database')).toBeInTheDocument());
        fireEvent.click(getByText('Post team to Database'));
        expect(postTeams).toHaveBeenCalled();
    });

    it('opens the previous counterpicks modal', async () => {
        const {getByText} = render(<App />);
        fireEvent.click(getByText('previous'));
        await waitFor(() => expect(getByText('Previous counterpicks')).toBeInTheDocument());
    });
});
