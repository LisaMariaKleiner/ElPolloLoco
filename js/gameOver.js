
/**
 * Navigates to the start screen, hiding the game over screen and displaying the start screen.
 * Also reinitializes the game.
 */
function goToStartScreen() {
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('startscreen').style.display = 'block';
    init();
}