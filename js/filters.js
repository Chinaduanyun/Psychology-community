// 筛选功能相关的JS

document.addEventListener('DOMContentLoaded', function() {
    // 确保只在课程页面才初始化筛选功能
    const filterButtons = document.querySelector('.filter-buttons');
    if (filterButtons) {
        // 设置筛选按钮事件监听
        setupFilterButtons();
        
        // 默认显示全部课程
        filterCourses('all');
        
        console.log("课程筛选功能已初始化");
    }
});

// 设置筛选按钮
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮样式
            filterBtns.forEach(b => {
                b.classList.remove('bg-blue-500', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-600');
            });
            
            this.classList.remove('bg-gray-200', 'text-gray-600');
            this.classList.add('bg-blue-500', 'text-white');
            
            // 获取筛选值并应用
            const filterValue = this.getAttribute('data-filter');
            filterCourses(filterValue);
            
            // 显示筛选提示
            showFilterNotification(this.textContent.trim());
        });
    });
}

// 筛选课程
function filterCourses(filter) {
    const courseItems = document.querySelectorAll('.course-item');
    let visibleCount = 0;
    
    courseItems.forEach(item => {
        if (filter === 'all') {
            // 显示所有课程
            item.style.display = 'block';
            // 添加动画效果
            item.style.animation = 'fadeIn 0.5s';
            visibleCount++;
        } else {
            // 检查课程标签
            const tags = item.getAttribute('data-tags');
            if (tags && tags.includes(filter)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        }
    });
    
    // 更新课程数量显示
    updateCourseCount(visibleCount);
}

// 更新课程数量显示
function updateCourseCount(count) {
    const courseCountEl = document.querySelector('.text-sm.text-gray-500');
    
    if (courseCountEl) {
        courseCountEl.textContent = `共 ${count} 门课程`;
    }
}

// 显示筛选通知
function showFilterNotification(filterName) {
    // 创建或更新筛选提示
    let filterNotice = document.querySelector('.filter-notice');
    if (!filterNotice) {
        filterNotice = document.createElement('div');
        filterNotice.className = 'filter-notice fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm z-50';
        document.body.appendChild(filterNotice);
        
        // 3秒后自动消失
        setTimeout(() => {
            filterNotice.style.opacity = '0';
            setTimeout(() => {
                if (filterNotice.parentNode) {
                    filterNotice.parentNode.removeChild(filterNotice);
                }
            }, 300);
        }, 3000);
    }
    filterNotice.textContent = `已筛选: ${filterName}`;
    filterNotice.style.opacity = '1';
}
