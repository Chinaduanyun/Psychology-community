// 页面导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 页面导航函数
    function handleNavigation(targetPage) {
        console.log("导航到:", targetPage);
        window.location.href = targetPage;
    }

    // 设置底部导航
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // 获取要导航到的页面
            const pages = ['home.html', 'courses.html', 'activities.html', 'messages.html', 'profile.html'];
            if (pages[index]) {
                // 清除所有active类
                navItems.forEach(i => i.classList.remove('active'));
                // 添加active类到当前点击的元素
                this.classList.add('active');
                // 导航到目标页面
                handleNavigation(pages[index]);
            }
        });
    });

    // 设置搜索框点击
    const searchBar = document.querySelector('.flex-1.bg-gray-100.rounded-full.py-2.px-4');
    if (searchBar) {
        searchBar.addEventListener('click', function() {
            handleNavigation('search.html');
        });
    }

    // 设置返回按钮
    const backButtons = document.querySelectorAll('.fas.fa-chevron-left');
    backButtons.forEach(button => {
        const parent = button.parentElement;
        if (parent && parent.tagName.toLowerCase() === 'button') {
            parent.addEventListener('click', function() {
                history.back();
            });
        }
    });

    // 设置通知图标点击
    const bellIcon = document.querySelector('.fas.fa-bell');
    if (bellIcon) {
        bellIcon.addEventListener('click', function() {
            handleNavigation('message_center.html');
        });
    }

    // 设置用户图标点击
    const userIcon = document.querySelector('.fas.fa-user-circle');
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            handleNavigation('profile.html');
        });
    }

    // 设置课程卡片点击
    const courseCards = document.querySelectorAll('.bg-white.rounded-xl.overflow-hidden.shadow, .bg-white.rounded-lg.overflow-hidden.mb-4');
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            handleNavigation('./course_detail/course_detail.html');
        });
    });

    // 设置活动卡片点击
    const activityCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-sm.border');
    activityCards.forEach(card => {
        card.addEventListener('click', function() {
            handleNavigation('activity_detail.html');
        });
    });
    
    // 设置创建活动按钮
    const createActivityBtn = document.querySelector('#createActivityBtn');
    if (createActivityBtn) {
        createActivityBtn.addEventListener('click', function() {
            handleNavigation('create_activity.html');
        });
    }

    console.log("导航脚本已加载");
});
