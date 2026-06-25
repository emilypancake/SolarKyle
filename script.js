var player = document.getElementById("player");
var enemy = document.getElementById("enemy");
var error = document.getElementById("error");
var collected = document.getElementById("collected");
var collectedCount = 0;
var playerX = 0;
var playerY = 0;

player.style.position = "relative";
enemy.style.position = "relative";

var panels = [];
var panelElements = document.querySelectorAll(".panel");

panelElements.forEach(function(panelEl) {
	panelEl.style.position = "relative";
	panels.push({
		panelId: panelEl.id,
		element: panelEl,
		redness: 0,
		cooldown: false
	});
});

function getPanelDataById(panelId) {
	return panels.find(function(panelData) {
		return panelData.panelId === panelId;
	});
}

function updatePanelColor(panelData) {
	var r = Math.floor(255 * (panelData.redness / 100));
	var g = Math.floor(255 * (1 - panelData.redness / 100));
	var b = Math.floor(255 * (1 - panelData.redness / 100));
	panelData.element.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

setInterval(function() {
	panels.forEach(function(panelData) {
		if (panelData.redness < 100) {
			panelData.redness += 0.5;
			updatePanelColor(panelData);
		}
	});
}, 100);

function checkCollision() {
	var playerRect = player.getBoundingClientRect();
	var enemyRect = enemy.getBoundingClientRect();
	
	if (playerRect.left < enemyRect.right &&
	    playerRect.right > enemyRect.left &&
	    playerRect.top < enemyRect.bottom &&
	    playerRect.bottom > enemyRect.top) {
		error.textContent = "touched";
	}
	
	panels.forEach(function(panelData) {
		var panelRect = panelData.element.getBoundingClientRect();
		
		if (!panelData.cooldown &&
		    playerRect.left < panelRect.right &&
		    playerRect.right > panelRect.left &&
		    playerRect.top < panelRect.bottom &&
		    playerRect.bottom > panelRect.top) {
			
			var touchedPanelId = panelData.panelId;
			var touchedPanelData = getPanelDataById(touchedPanelId);

			error.textContent = "touched " + touchedPanelId;
			touchedPanelData.element.style.display = "none";
			panelData.cooldown = true;
			
			if (panelData.redness < 50) {
				collectedCount++;
				collected.textContent = collectedCount;
			}
			
			setTimeout(function() {
				touchedPanelData.element.style.display = "block";
				touchedPanelData.redness = 0;
				updatePanelColor(touchedPanelData);
				touchedPanelData.cooldown = false;
			}, 5000);
		}
	});
}

function move(event) {
	if (event.key === "ArrowUp") {
		playerY -= 10;
		player.style.top = playerY + "px";
		error.textContent = "Up key pressed";
	}
    if (event.key === "ArrowLeft") {
		playerX -= 10;
		player.style.left = playerX + "px";
		error.textContent = "Left key pressed";
	}
    if (event.key === "ArrowRight") {
		playerX += 10;
		player.style.left = playerX + "px";
		error.textContent = "Right key pressed";
    }
    if (event.key === "ArrowDown") {
		playerY += 10;
		player.style.top = playerY + "px";
		error.textContent = "Down key pressed";
	}
    
    checkCollision();
}

document.addEventListener("keydown", move);