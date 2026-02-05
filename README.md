# it's a(door)able 🚪❤️

A charming one-minute minigame built with vanilla JavaScript. Navigate through levels, collect keys, and reach the door to unlock a special surprise.

## 🚀 Features
- **Minimalist Gameplay**: Intuitive controls and level design.
- **Dynamic Ending**: A special "I Heart You" sequence with a garden surprise.
- **Mobile Friendly**: Includes touch controls for mobile play.
- **Responsive Design**: Adapts to various screen sizes.

## 🧪 Testing Suite
This project now includes a robust unit testing suite using **Jest** and **JSDOM**.

### Running Tests
To run the automated tests, ensure you have Node.js installed, then run:

```bash
# Install dependencies
npm install

# Run tests
npm test
```

### Coverage
- **Player Logic (`Peep`)**: Movement, velocity handling, and boundary collisions.
- **Door & Key Logic**: Collision detection, state transitions, and animations.
- **Popup System**: Parameter handling and window management (fixed a critical bug where custom sizes were ignored).

## 🛠 Bug Fixes & Improvements
- **Popup Logic**: Fixed a bug in `js/popup.js` where custom window parameters (width, height) were being ignored due to incorrect property access.
- **Code Structure**: Refactored `js/game.js` for better modularity and testability.
- **Environment Support**: Added conditional exports to allow logic files to be tested in Node.js while remaining browser-compatible.

## 🎨 Asset Credits
* **Jazz Music**: [Newgrounds](http://www.newgrounds.com/audio/listen/522444) (CC-BY-NC)
* **SFX Error**: [Freesound - Autistic Lucario](http://freesound.org/people/Autistic%20Lucario/sounds/142608/) (CC-BY)
* **SFX Step**: [Freesound - Phil25](http://freesound.org/people/Phil25/sounds/208103/) (CC ZERO)
* **SFX Ding**: [Freesound - Aiwha](http://freesound.org/people/Aiwha/sounds/196106/) (CC-BY)
* **SFX Rewind**: [Freesound - kasa90](http://freesound.org/people/kasa90/sounds/174363/) (CC ZERO)
* **SFX Unlock**: [Freesound - keweldog](http://freesound.org/people/keweldog/sounds/181140/) (CC ZERO)
* **Social Media Icons**: [Customizr](http://customizr.net/icons/)

---
*Created with ❤️ for Saira.*
