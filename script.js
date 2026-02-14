document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const overlayMessage = document.getElementById('overlay-message');
    const overlayText = document.querySelector('#overlay-message h1'); // Select the h1 inside
    const overlaySuccess = document.getElementById('overlay-success');

    let noClickCount = 0;
    const messages = [
        "Why are you doing this to me?",
        "It is just a matter of time.",
        "I am still waiting...",
        "I am shocked how persistent you are!"
    ];

    noBtn.addEventListener('click', (e) => {
        // Prevent default behavior just in case
        e.preventDefault();

        noClickCount++;

        // Check if it's a multiple of 5
        if (noClickCount % 5 === 0) {
            let message = "";
            if (noClickCount === 5) {
                message = "Stop doing this";
            } else {
                const randomIndex = Math.floor(Math.random() * messages.length);
                message = messages[randomIndex];
            }

            showOverlay(message, 3000);
            return;
        }

        // Teleport the button
        teleportButton(noBtn);
    });

    yesBtn.addEventListener('click', () => {
        overlaySuccess.classList.remove('hidden');
        createHearts();
    });

    // Handle "No" button hover for desktop - make it run away? 
    // The prompt only says "If the person presses button 'No'".
    // So we invoke teleport logic only on click.

    function teleportButton(btn) {
        // Calculate available space
        const btnWidth = btn.offsetWidth;
        const btnHeight = btn.offsetHeight;

        // Ensure we don't spawn partially off-screen
        const maxX = window.innerWidth - btnWidth;
        const maxY = window.innerHeight - btnHeight;

        const randomX = Math.max(0, Math.floor(Math.random() * maxX));
        const randomY = Math.max(0, Math.floor(Math.random() * maxY));

        btn.style.position = 'fixed';
        btn.style.left = `${randomX}px`;
        btn.style.top = `${randomY}px`;
    }

    function showOverlay(text, duration) {
        overlayText.textContent = text;
        overlayMessage.classList.remove('hidden');

        setTimeout(() => {
            overlayMessage.classList.add('hidden');
            resetPage();
        }, duration);
    }

    function resetPage() {
        noBtn.style.position = 'static'; // Returns to flow layout
        noBtn.style.left = 'auto';
        noBtn.style.top = 'auto';
        // Reset transform if any
        noBtn.style.transform = 'none';
    }

    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + "vw";
            // Random fall duration
            heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
            overlaySuccess.appendChild(heart);

            // Cleanup
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 300);
    }
});
