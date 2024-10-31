// Function to check viewport width and set initial sidebar state
function checkViewportWidth() {
    const menu = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (window.innerWidth <= 1180) {
        menu.classList.add('hidden');
        overlay.classList.remove('active'); // Hide overlay when menu is hidden
    } else {
        menu.classList.remove('hidden');
        overlay.classList.remove('active'); // Ensure overlay is hidden on wider screens
    }
}

// Toggle menu function
function toggleMenu() {
    const menu = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        overlay.classList.add('active');
    } else {
        menu.classList.add('hidden');
        overlay.classList.remove('active');
    }
}

// Reset sidebar visibility on resize
function handleResize() {
    checkViewportWidth();
}

// Event listeners
window.addEventListener('resize', handleResize);
window.addEventListener('load', checkViewportWidth);
document.querySelector('.overlay').addEventListener('click', () => {
    toggleMenu();
});

// Clock
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    timeElement.textContent = now.toLocaleDateString('vi-VN', options);
}
updateTime();
setInterval(updateTime, 1000);

// leave page confirmation

window.addEventListener('beforeunload', e => e.preventDefault());