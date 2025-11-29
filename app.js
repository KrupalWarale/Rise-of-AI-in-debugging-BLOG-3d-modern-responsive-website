// Project videos - check if elements exist before accessing
const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Navbar and blackhole video elements
const navbar = document.querySelector('header');
const blackholeOriginal = document.getElementById('blackhole-original');
const blackholeCropped = document.getElementById('blackhole-cropped');
const blackholeContainer = document.querySelector('.blackhole-box');

// Filter out null videos
const videoList = [video1, video2, video3].filter(video => video !== null);

// Simple navbar auto-hide
let hideTimer;
let navbarHidden = false;
let canHide = true;

function hideNavbar() {
    if (!canHide || navbarHidden) return;

    console.log('Hiding navbar - switching to cropped video');
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.opacity = '0';
    navbarHidden = true;

    // Apply positioning and remove previous animation
    blackholeContainer.classList.add('navbar-hidden');
    blackholeContainer.classList.remove('blackhole-fade-down');

    // Add fade-down animation after transition
    setTimeout(() => {
        blackholeContainer.classList.add('blackhole-fade-down');
    }, 50);
}

function showNavbar() {
    if (!navbarHidden) return;

    console.log('Showing navbar - switching to original video');
    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';
    navbarHidden = false;

    // Reset positioning and remove previous animation
    blackholeContainer.classList.remove('navbar-hidden');
    blackholeContainer.classList.remove('blackhole-fade-down');

    // Add fade-down animation after transition
    setTimeout(() => {
        blackholeContainer.classList.add('blackhole-fade-down');
    }, 50);

    // Restart timer after showing
    startHideTimer();
}

function startHideTimer() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideNavbar, 3000);
}

// Start initial timer
startHideTimer();

// Show navbar on mouse move to top
document.addEventListener('mousemove', (e) => {
    if (navbarHidden && e.clientY < 80) {
        showNavbar();
    }
});

// Prevent hiding when hovering navbar
navbar.addEventListener('mouseenter', () => {
    canHide = false;
    clearTimeout(hideTimer);
});

navbar.addEventListener('mouseleave', () => {
    canHide = true;
    startHideTimer();
});

videoList.forEach(function (video) {
    video.addEventListener("mouseover", function () {
        video.play()
    })
    video.addEventListener("mouseout", function () {
        video.pause();
    })
})

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navBubbles = document.querySelectorAll('.nav-bubble');
    
    navBubbles.forEach(bubble => {
        bubble.addEventListener('click', function() {
            const text = this.textContent.toLowerCase();
            
            if (text === 'chapters') {
                document.getElementById('chapters').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            } else if (text === 'about') {
                document.getElementById('about').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            } else if (text === 'topics') {
                document.getElementById('topics').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // Start Reading button functionality
    const startButton = document.querySelector('.hero-info button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            document.getElementById('about').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // Comment System
    const commentInput = document.querySelector('.comment-input');
    const commentSendBtn = document.querySelector('.comment-send-btn');
    const commentsList = document.querySelector('.comments-list');
    const commentsCount = document.querySelector('.comments-count');

    function addNewComment() {
        const commentText = commentInput.value.trim();
        if (!commentText) return;

        // Create comment element
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-meta">
                <span class="comment-author">You</span>
                <span class="comment-time">now</span>
            </div>
            <div class="comment-bubble">
                ${commentText}
            </div>
        `;

        // Add to top of list
        commentsList.insertBefore(commentElement, commentsList.firstChild);

        // Update count
        const currentCount = parseInt(commentsCount.textContent.split(' ')[0]);
        commentsCount.textContent = `${currentCount + 1} comments`;

        // Clear input
        commentInput.value = '';

        // Animate in
        commentElement.style.opacity = '0';
        commentElement.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            commentElement.style.transition = 'all 0.3s ease';
            commentElement.style.opacity = '1';
            commentElement.style.transform = 'translateY(0)';
        }, 10);
    }

    // Event listeners
    if (commentSendBtn) {
        commentSendBtn.addEventListener('click', addNewComment);
    }

    if (commentInput) {
        commentInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addNewComment();
            }
        });
    }
})

