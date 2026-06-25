var player = document.getElementById("player");
var error = document.getElementById("error");
var playerX = 0;
var playerY = 0;

player.style.position = "relative";

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
    
}

document.addEventListener("keydown", move);