(function (exports) {

	// Singleton
	var Key = {};
	exports.Key = Key;

	// Keycodes to words mapping
	var KEY_CODES = {
		37: "left", 38: "up", 39: "right", 40: "down",
		65: "left", 87: "up", 68: "right", 83: "down",
		16: "slow",
		32: "action", 13: "action",
		27: "pause", 80: "pause"
	};

	// Event Handling
	var onKeyDown = function (event) {
		var code = KEY_CODES[event.keyCode];
		Key[code] = true;
		if (window.STAGE == 4) return;
		event.stopPropagation();
		event.preventDefault();
	}
	var onKeyUp = function (event) {
		var code = KEY_CODES[event.keyCode];
		Key[code] = false;
		if (window.STAGE == 4) return;
		event.stopPropagation();
		event.preventDefault();
	}
	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);

	// Mobile touch controls
	var bindMobileControls = function () {
		var buttons = [
			{ id: "btn_left", code: "left" },
			{ id: "btn_right", code: "right" },
			{ id: "btn_up", code: "up" },
			{ id: "btn_down", code: "down" }
		];

		buttons.forEach(function (btn) {
			var element = document.getElementById(btn.id);
			if (!element) return;

			var setKey = function (val, e) {
				Key[btn.code] = val;
				e.preventDefault();
				e.stopPropagation();
				if (val) element.classList.add('active');
				else element.classList.remove('active');
			};

			element.addEventListener("touchstart", function (e) { setKey(true, e); }, false);
			element.addEventListener("touchend", function (e) { setKey(false, e); }, false);
			element.addEventListener("mousedown", function (e) { setKey(true, e); }, false);
			element.addEventListener("mouseup", function (e) { setKey(false, e); }, false);
		});
	};
	window.addEventListener("load", bindMobileControls, false);

})(typeof window !== "undefined" ? window : global);

if (typeof module !== 'undefined' && module.exports) {
	module.exports = { Key: global.Key };
}