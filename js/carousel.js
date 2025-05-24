/**
 * 轮播图功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    initCarousel();
});

/**
 * 初始化轮播图
 */
function initCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let slideInterval;
    
    // 开始自动轮播
    startSlideInterval();
    
    // 添加指示点点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlides();
            resetSlideInterval();
        });
    });
    
    // 添加箭头按钮点击事件
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
            resetSlideInterval();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
            resetSlideInterval();
        });
    }
    
    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    /**
     * 处理滑动
     */
    function handleSwipe() {
        // 滑动距离超过50像素才触发切换
        if (touchStartX - touchEndX > 50) {
            // 向左滑，显示下一张
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
            resetSlideInterval();
        } else if (touchEndX - touchStartX > 50) {
            // 向右滑，显示上一张
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
            resetSlideInterval();
        }
    }
    
    /**
     * 更新轮播图显示
     */
    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
                slide.style.opacity = 1;
                slide.style.zIndex = 1;
            } else {
                slide.classList.remove('active');
                slide.style.opacity = 0;
                slide.style.zIndex = 0;
            }
        });
        
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
                dot.classList.remove('opacity-50');
            } else {
                dot.classList.remove('active');
                dot.classList.add('opacity-50');
            }
        });
    }
    
    /**
     * 开始自动轮播
     */
    function startSlideInterval() {
        // 每3秒自动切换到下一张
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }, 3000);
    }
    
    /**
     * 重置自动轮播计时
     */
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // 当用户将鼠标悬停在轮播图上时暂停自动轮播
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // 当用户将鼠标移开时恢复自动轮播
    carousel.addEventListener('mouseleave', () => {
        resetSlideInterval();
    });
}
