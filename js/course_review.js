/**
 * 课程评价页面交互脚本
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化星级评分系统
    initRatingStars();
    
    // 初始化标签选择系统
    initTagSelection();
    
    // 添加文本框字数统计功能
    initTextareaCounter();
    
    // 添加发布按钮事件
    initPublishAction();
});

/**
 * 初始化星级评分交互
 */
function initRatingStars() {
    const ratingGroups = document.querySelectorAll('.rating-stars');
    
    ratingGroups.forEach(group => {
        const stars = group.querySelectorAll('.fa-star');
        const category = group.getAttribute('data-category');
        
        stars.forEach(star => {
            // 点击事件
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                updateStars(group, rating);
                
                // 将评分保存到表单数据
                const ratingField = document.createElement('input');
                ratingField.type = 'hidden';
                ratingField.name = `rating-${category}`;
                ratingField.value = rating;
                
                // 移除旧的评分字段
                const existingField = document.querySelector(`input[name="rating-${category}"]`);
                if (existingField) {
                    existingField.parentNode.removeChild(existingField);
                }
                
                // 添加新的评分字段
                document.body.appendChild(ratingField);
                
                // 显示评分反馈
                showRatingFeedback(group, rating);
            });
            
            // 鼠标悬停效果
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                hoverStars(group, rating);
            });
            
            // 鼠标移出效果
            group.addEventListener('mouseout', function() {
                const selectedRating = getSelectedRating(group);
                resetStars(group);
                if (selectedRating > 0) {
                    updateStars(group, selectedRating);
                }
            });
        });
    });
}

/**
 * 获取当前选中的星级评分
 */
function getSelectedRating(group) {
    const stars = group.querySelectorAll('.fas.fa-star');
    return stars.length;
}

/**
 * 更新星级显示
 */
function updateStars(group, rating) {
    const stars = group.querySelectorAll('.fa-star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

/**
 * 星级悬停效果
 */
function hoverStars(group, rating) {
    const stars = group.querySelectorAll('.fa-star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('text-yellow-500');
        } else {
            star.classList.remove('text-yellow-500');
        }
    });
}

/**
 * 重置星级显示
 */
function resetStars(group) {
    const stars = group.querySelectorAll('.fa-star');
    stars.forEach(star => {
        star.classList.remove('text-yellow-500');
    });
}

/**
 * 显示评分反馈
 */
function showRatingFeedback(group, rating) {
    // 移除旧的反馈
    const oldFeedback = group.parentNode.querySelector('.rating-feedback');
    if (oldFeedback) {
        oldFeedback.parentNode.removeChild(oldFeedback);
    }
    
    // 创建新的反馈
    const feedback = document.createElement('div');
    feedback.className = 'rating-feedback text-xs text-green-500 ml-2 mt-1 animation-fade-in';
    feedback.textContent = `已评 ${rating} 星`;
    
    // 插入反馈
    group.parentNode.appendChild(feedback);
    
    // 3秒后淡出
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

/**
 * 初始化标签选择交互
 */
function initTagSelection() {
    const tags = document.querySelectorAll('.course-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 切换选中状态
            this.classList.toggle('bg-blue-100');
            this.classList.toggle('text-blue-600');
            this.classList.toggle('bg-blue-500');
            this.classList.toggle('text-white');
            
            // 添加或删除选中标记
            const tagName = this.getAttribute('data-tag');
            
            if (this.classList.contains('bg-blue-500')) {
                // 如果没有选中标记，则添加
                if (!this.querySelector('.fa-check')) {
                    const checkmark = document.createElement('i');
                    checkmark.className = 'fas fa-check ml-1';
                    this.appendChild(checkmark);
                }
                
                // 添加到已选标签列表
                addSelectedTag(tagName);
            } else {
                // 如果有选中标记，则删除
                const checkmark = this.querySelector('.fa-check');
                if (checkmark) {
                    this.removeChild(checkmark);
                }
                
                // 从已选标签列表中移除
                removeSelectedTag(tagName);
            }
        });
    });
}

/**
 * 添加已选标签
 */
function addSelectedTag(tag) {
    let selectedTags = getSelectedTags();
    if (!selectedTags.includes(tag)) {
        selectedTags.push(tag);
        updateSelectedTagsField(selectedTags);
    }
}

/**
 * 移除已选标签
 */
function removeSelectedTag(tag) {
    let selectedTags = getSelectedTags();
    selectedTags = selectedTags.filter(t => t !== tag);
    updateSelectedTagsField(selectedTags);
}

/**
 * 获取当前已选标签列表
 */
function getSelectedTags() {
    const tagsField = document.querySelector('input[name="selected-tags"]');
    if (tagsField && tagsField.value) {
        return tagsField.value.split(',');
    }
    return [];
}

/**
 * 更新已选标签字段
 */
function updateSelectedTagsField(tags) {
    let tagsField = document.querySelector('input[name="selected-tags"]');
    if (!tagsField) {
        tagsField = document.createElement('input');
        tagsField.type = 'hidden';
        tagsField.name = 'selected-tags';
        document.body.appendChild(tagsField);
    }
    tagsField.value = tags.join(',');
}

/**
 * 初始化文本框字数统计
 */
function initTextareaCounter() {
    const textarea = document.querySelector('textarea');
    const counter = document.querySelector('.char-count');
    const counterContainer = document.querySelector('.text-right.text-xs.text-gray-400.mt-1');
    const minCountNotice = document.querySelector('.text-xs.text-yellow-500.ml-1');
    
    if (textarea && counter) {
        // 初始化计数
        updateCharCount(textarea, counter, counterContainer, minCountNotice);
        
        // 监听输入事件
        textarea.addEventListener('input', function() {
            updateCharCount(this, counter, counterContainer, minCountNotice);
        });
    }
}

/**
 * 更新字符计数
 */
function updateCharCount(textarea, counter, counterContainer, minCountNotice) {
    const count = textarea.value.length;
    const maxCount = 500;
    const minCount = 50;
    
    // 更新计数
    counter.textContent = count;
    
    // 根据字数变化颜色
    if (count < minCount) {
        counter.classList.remove('text-green-500', 'text-red-500');
        counter.classList.add('text-yellow-500');
        minCountNotice.style.display = 'inline';
    } else if (count > maxCount) {
        counter.classList.remove('text-green-500', 'text-yellow-500');
        counter.classList.add('text-red-500');
        minCountNotice.style.display = 'none';
    } else {
        counter.classList.remove('text-yellow-500', 'text-red-500');
        counter.classList.add('text-green-500');
        minCountNotice.style.display = 'none';
    }
}

/**
 * 初始化发布按钮事件
 */
function initPublishAction() {
    const publishBtn = document.querySelector('.text-blue-500.text-sm.font-medium');
    
    if (publishBtn) {
        publishBtn.addEventListener('click', function() {
            // 验证表单
            if (validateForm()) {
                // 显示成功提示
                showFeedback('评价发布成功', 'success');
                
                // 模拟跳转回上一页
                setTimeout(() => {
                    // 这里应该是实际的跳转逻辑，例如 window.location.href = 'course_detail.html'
                    showFeedback('返回上一页', 'info');
                }, 2000);
            }
        });
    }
}

/**
 * 表单验证
 */
function validateForm() {
    // 检查星级评分
    const ratingGroups = document.querySelectorAll('.rating-stars');
    let allRatingsComplete = true;
    let missingRatings = [];
    
    ratingGroups.forEach(group => {
        const category = group.getAttribute('data-category');
        const stars = group.querySelectorAll('.fas.fa-star');
        
        if (stars.length === 0) {
            allRatingsComplete = false;
            
            // 记录未评分的类别
            switch(category) {
                case 'teaching-quality':
                    missingRatings.push('教学质量');
                    break;
                case 'grading':
                    missingRatings.push('给分情况');
                    break;
                case 'workload':
                    missingRatings.push('作业量');
                    break;
                case 'difficulty':
                    missingRatings.push('考核难度');
                    break;
                default:
                    missingRatings.push(category);
            }
        }
    });
    
    if (!allRatingsComplete) {
        showFeedback(`请完成 ${missingRatings.join('、')} 评分`, 'error');
        return false;
    }
    
    // 检查评价文字
    const textarea = document.querySelector('textarea');
    if (!textarea || textarea.value.length < 50) {
        showFeedback('评价内容至少需要50个字', 'error');
        return false;
    }
    
    // 检查是否选择了标签
    const selectedTags = getSelectedTags();
    if (selectedTags.length === 0) {
        showFeedback('请至少选择一个课程标签', 'error');
        return false;
    }
    
    return true;
}

/**
 * 显示操作反馈
 */
function showFeedback(message, type) {
    // 首先移除旧的反馈条
    const oldFeedback = document.querySelector('.feedback-toast');
    if (oldFeedback) {
        oldFeedback.parentNode.removeChild(oldFeedback);
    }
    
    // 创建反馈条
    const feedback = document.createElement('div');
    feedback.className = 'feedback-toast fixed top-16 left-1/2 transform -translate-x-1/2 py-2 px-4 rounded-lg z-50 shadow-lg';
    
    // 根据类型设置样式
    switch(type) {
        case 'error':
            feedback.classList.add('bg-red-500', 'text-white');
            break;
        case 'success':
            feedback.classList.add('bg-green-500', 'text-white');
            break;
        case 'info':
        default:
            feedback.classList.add('bg-blue-500', 'text-white');
    }
    
    // 设置内容
    feedback.textContent = message;
    
    // 添加到页面
    document.body.appendChild(feedback);
    
    // 设置自动消失
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translate(-50%, -10px)';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// CSS 样式补充
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .feedback-toast {
            transition: opacity 0.3s, transform 0.3s;
        }
        
        .rating-feedback {
            transition: opacity 0.3s;
        }
        
        .animation-fade-in {
            animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
})();
