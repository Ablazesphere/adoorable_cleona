/**
 * @jest-environment jsdom
 */
const { sharePopup } = require('../js/popup');

describe('Popup Tests', () => {
    let mockEvent;
    let originalWindowOpen;

    beforeEach(() => {
        mockEvent = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            returnValue: true
        };
        originalWindowOpen = window.open;
        window.open = jest.fn();
    });

    afterEach(() => {
        window.open = originalWindowOpen;
    });

    test('opens window with correct params', () => {
        const config = {
            href: 'http://example.com',
            width: 500,
            height: 400
        };

        sharePopup(mockEvent, config);

        expect(window.open).toHaveBeenCalled();
        const args = window.open.mock.calls[0];
        expect(args[0]).toBe('http://example.com');
        expect(args[2]).toContain('width=500');
        expect(args[2]).toContain('height=400');
    });

    test('prevents default event', () => {
        sharePopup(mockEvent, { href: '#' });
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
});
