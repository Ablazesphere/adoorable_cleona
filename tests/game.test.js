/**
 * @jest-environment jsdom
 */
const { Key } = require('../js/Key');

// Mock createjs before loading game.js
global.createjs = {
    Sound: {
        addEventListener: jest.fn(),
        registerSound: jest.fn(),
        play: jest.fn(),
        alternateExtensions: []
    }
};

// Mock canvas and context
class CanvasMock {
    constructor() {
        this.width = 800;
        this.height = 600;
    }
    getContext(type) {
        return {
            save: jest.fn(),
            restore: jest.fn(),
            scale: jest.fn(),
            translate: jest.fn(),
            clearRect: jest.fn(),
            fillRect: jest.fn(),
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            drawImage: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            stroke: jest.fn(),
            rotate: jest.fn()
        };
    }
}
global.HTMLCanvasElement = CanvasMock;
global.document.createElement = (tag) => {
    if (tag === 'canvas') return new CanvasMock();
    return {};
};
global.document.getElementById = (id) => {
    // Return a mock canvas for any canvas-related ID
    if (id.includes('canvas')) return new CanvasMock();
    // Return a mock element for text containers
    return {
        style: {},
        textContent: '',
        focus: jest.fn()
    };
};

// Load game.js
const { Peep, DoorKey, Door, Level, Clock } = require('../js/game');

describe('Game Tests', () => {
    let mockLevel;
    let mockContext;

    beforeEach(() => {
        mockContext = new CanvasMock().getContext('2d');
        mockLevel = {
            width: 800,
            height: 600,
            circles: [],
            player: { x: 0, y: 0 },
            ctx: mockContext,
            keyCollected: false,
            isIntro: false
        };
    });

    describe('Peep (Player)', () => {
        test('initialization', () => {
            const peep = new Peep({ x: 100, y: 100 }, mockLevel);
            expect(peep.x).toBe(100);
            expect(peep.y).toBe(100);
        });

        test('update with no keys', () => {
            const peep = new Peep({ x: 100, y: 100 }, mockLevel);
            peep.update();
            // Should effectively stay same (damping applied to 0 velocity)
            expect(peep.vel.x).toBe(0);
            expect(peep.vel.y).toBe(0);
        });

        // We can't easily trigger Key.left globally without modifying the Key object state directly
        // Since Key is a singleton exported from Key.js, we can modify it.
        test('movement left', () => {
            const peep = new Peep({ x: 100, y: 100 }, mockLevel);
            Key.left = true;
            peep.update();
            expect(peep.vel.x).toBeLessThan(0); // Should move negative X
            Key.left = false; // Reset
        });

        test('boundary collision', () => {
            const peep = new Peep({ x: -10, y: 100 }, mockLevel);
            peep.update();
            expect(peep.x).toBe(0); // Should clamp to 0
        });
    });

    describe('DoorKey', () => {
        test('collision detection', () => {
            mockLevel.player = { x: 100, y: 100 };
            const key = new DoorKey({ x: 100, y: 100 }, mockLevel);

            // Force update logic (bypass hover animation for a sec, just check distance)
            key.update();

            expect(mockLevel.keyCollected).toBe(true);
            expect(createjs.Sound.play).toHaveBeenCalledWith("unlock"); // Should play sound
        });

        test('no collision when far', () => {
            mockLevel.player = { x: 0, y: 0 };
            mockLevel.keyCollected = false;
            const key = new DoorKey({ x: 100, y: 100 }, mockLevel);

            key.update();

            expect(mockLevel.keyCollected).toBe(false);
        });
    });

    describe('Door', () => {
        test('door opens when key collected', () => {
            mockLevel.keyCollected = true;
            mockLevel.player = { x: 0, y: 0 }; // Far away so don't trigger end level
            const door = new Door({ x: 200, y: 200 }, mockLevel);

            door.frame = 0;
            door.update();

            expect(door.frame).toBeGreaterThan(0); // Should animate
        });

        test('door triggers next level when player close and key collected', () => {
            mockLevel.keyCollected = true;
            mockLevel.player = { x: 200, y: 200 };
            const door = new Door({ x: 200, y: 200 }, mockLevel);

            // Mock global next() function or handle the return value which is cleaner
            // The Door code returns "END_LEVEL" and calls next() which is global.
            // We can't ensure global next() exists easily without poluting global scope,
            // but we can check if it returns "END_LEVEL" which indicates success condition.

            // We need to mock 'next' global function to avoid crash
            global.next = jest.fn();
            global.STAGE = 1;
            global.syncScreens = jest.fn();
            global.CURRENT_LEVEL = 0;
            global.LEVEL_CONFIG = [{}, {}, {}]; // minimal mock

            const result = door.update();
            expect(result).toBe("END_LEVEL");
        });
    });
});
