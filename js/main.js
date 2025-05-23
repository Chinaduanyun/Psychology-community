// 页面交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 初始化课程筛选
    if (document.querySelector('.filter-buttons')) {
        // 默认显示全部课程
        filterCourses('all');
    }
    
    // 处理页面导航 - 在iframe中模拟页面跳转
    const handleNavigation = (targetPage) => {
        // 在父页面环境中
        if (window.parent && window.parent !== window) {
            // 获取所有iframe
            const iframes = window.parent.document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                if (iframe.src.includes(targetPage)) {
                    // 滚动到对应的iframe
                    iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        } else {
            // 在独立页面环境中，直接导航
            window.location.href = targetPage;
        }
    };
    
    // 底部导航点击事件
    const                     } else {
                        // 隐藏子内容
                        const contentContainer = this.nextElementSibling;
                        if (contentContainer && contentContainer.classList.contains('chapter-content')) {
                            contentContainer.classList.add('hidden');
                            chevron.style.transform = 'rotate(0)';
                            
                            setTimeout(() => {
                                if (contentContainer.parentNode) {
                                    contentContainer.parentNode.removeChild(contentContainer);
                                }= document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // 清除所有active类
            navItems.forEach(i => i.classList.remove('active'));
            // 添加active类到当前点击的元素
            this.classList.add('active');
            
            // 导航到相应页面
            const pages = ['home.html', 'courses.html', 'activities.html', 'messages.html', 'profile.html'];
            if (pages[index]) {
                handleNavigation(pages[index]);
            }
        });
    });

    // 搜索框点击事件
    const searchInputs = document.querySelectorAll('input[type="text"], .bg-gray-100.rounded-full.py-2.px-4');
    searchInputs.forEach(input => {
        input.addEventListener('click', function() {
            // 导航到搜索页
            handleNavigation('search.html');
        });
    });

    // 评分星星点击事件
    const setUpRatingSystem = () => {
        // 找到所有评分组
        const ratingGroups = document.querySelectorAll('.flex.justify-between.items-center');
        
        ratingGroups.forEach(group => {
            const stars = group.querySelectorAll('.fa-star, .fa-star-half-alt');
            if (stars.length > 0) {
                stars.forEach((star, index) => {
                    star.style.cursor = 'pointer';
                    star.addEventListener('click', function() {
                        // 实现评分逻辑
                        for (let i = 0; i <= index; i++) {
                            stars[i].classList.remove('far');
                            stars[i].classList.add('fas');
                            stars[i].classList.add('text-yellow-400');
                        }
                        for (let i = index + 1; i < stars.length; i++) {
                            stars[i].classList.remove('fas');
                            stars[i].classList.add('far');
                        }
                        
                        // 显示选择的评分
                        const ratingText = group.querySelector('.text-sm') || group.querySelector('.font-medium');
                        if (ratingText) {
                            // 创建或更新评分提示
                            let ratingFeedback = group.querySelector('.rating-feedback');
                            if (!ratingFeedback) {
                                ratingFeedback = document.createElement('span');
                                ratingFeedback.className = 'rating-feedback text-xs text-green-500 ml-2';
                                group.appendChild(ratingFeedback);
                            }
                            ratingFeedback.textContent = `已评 ${index + 1} 星`;
                        }
                    });
                    
                    // 鼠标悬停效果
                    star.addEventListener('mouseover', function() {
                        for (let i = 0; i <= index; i++) {
                            stars[i].classList.add('text-yellow-500');
                        }
                    });
                    
                    star.addEventListener('mouseout', function() {
                        stars.forEach(s => {
                            if (!s.classList.contains('fas')) {
                                s.classList.remove('text-yellow-500');
                            }
                        });
                    });
                });
            }
        });
    };
    
    setUpRatingSystem();

    // 标签选择事件
    const setupTagSelection = () => {
        // 课程评价页面标签
        const reviewTags = document.querySelectorAll('.px-4.py-2.bg-blue-100');
        reviewTags.forEach(tag => {
            tag.style.cursor = 'pointer';
            tag.addEventListener('click', function() {
                this.classList.toggle('bg-blue-100');
                this.classList.toggle('text-blue-600');
                this.classList.toggle('bg-blue-500');
                this.classList.toggle('text-white');
                
                // 添加选中提示
                const checkmark = document.createElement('i');
                checkmark.className = 'fas fa-check ml-1';
                
                if (this.classList.contains('bg-blue-500')) {
                    if (!this.querySelector('.fa-check')) {
                        this.appendChild(checkmark);
                    }
                } else {
                    const existingCheck = this.querySelector('.fa-check');
                    if (existingCheck) {
                        this.removeChild(existingCheck);
                    }
                }
            });
        });
        
        // 筛选页面的标签
        const filterTags = document.querySelectorAll('.filter-btn');
        filterTags.forEach(tag => {
            tag.style.cursor = 'pointer';
            tag.addEventListener('click', function() {
                const parent = this.parentElement;
                parent.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('bg-blue-500', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-600');
                });
                this.classList.remove('bg-gray-200', 'text-gray-600');
                this.classList.add('bg-blue-500', 'text-white');
                
                // 获取筛选类别
                const filterName = this.textContent.trim();
                const filterValue = this.getAttribute('data-filter');
                
                // 筛选课程
                filterCourses(filterValue);
                
                // 添加筛选效果提示
                const container = document.querySelector('.content');
                
                if (container) {
                    // 创建或更新筛选提示
                    let filterNotice = document.querySelector('.filter-notice');
                    if (!filterNotice) {
                        filterNotice = document.createElement('div');
                        filterNotice.className = 'filter-notice fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm z-50';
                        document.body.appendChild(filterNotice);
                        
                        // 3秒后自动消失
                        setTimeout(() => {
                            filterNotice.classList.add('opacity-0');
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
            });
        });
        
        // 课程筛选函数
        function filterCourses(filter) {
            const courseItems = document.querySelectorAll('.course-item');
            
            courseItems.forEach(item => {
                if (filter === 'all') {
                    // 显示所有课程
                    item.style.display = 'block';
                    // 添加动画效果
                    item.style.animation = 'fadeIn 0.5s';
                } else {
                    // 检查课程标签
                    const tags = item.getAttribute('data-tags');
                    if (tags && tags.includes(filter)) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            
            // 更新课程数量显示
            updateCourseCount();
        }
        
        // 更新显示的课程数量
        function updateCourseCount() {
            const visibleCourses = document.querySelectorAll('.course-item[style="display: block;"], .course-item:not([style*="display"])').length;
            const courseCountEl = document.querySelector('.text-sm.text-gray-500');
            
            if (courseCountEl) {
                courseCountEl.textContent = `共 ${visibleCourses} 门课程`;
            }
        }
    };
    
    setupTagSelection();

    // 评论文本区域监听
    const setupTextareaCounter = () => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.addEventListener('input', function() {
                const counter = this.parentElement.querySelector('.text-right');
                if (counter) {
                    counter.textContent = `${this.value.length}/500`;
                    
                    // 变色提示
                    if (this.value.length > 0 && this.value.length < 50) {
                        counter.classList.add('text-red-500');
                        counter.classList.remove('text-gray-400', 'text-green-500');
                    } else if (this.value.length >= 50) {
                        counter.classList.add('text-green-500');
                        counter.classList.remove('text-gray-400', 'text-red-500');
                    } else {
                        counter.classList.add('text-gray-400');
                        counter.classList.remove('text-red-500', 'text-green-500');
                    }
                }
            });
            
            // 添加评论提交功能
            const publishBtn = document.querySelector('.text-blue-500.text-sm.font-medium');
            if (publishBtn) {
                publishBtn.style.cursor = 'pointer';
                publishBtn.addEventListener('click', function() {
                    if (textarea.value.length < 50) {
                        // 显示错误提示
                        let errorMsg = document.querySelector('.textarea-error');
                        if (!errorMsg) {
                            errorMsg = document.createElement('div');
                            errorMsg.className = 'textarea-error text-red-500 text-xs mt-1';
                            errorMsg.textContent = '评论至少需要50个字';
                            textarea.parentElement.appendChild(errorMsg);
                            
                            // 2秒后自动消失
                            setTimeout(() => {
                                if (errorMsg.parentNode) {
                                    errorMsg.parentNode.removeChild(errorMsg);
                                }
                            }, 2000);
                        }
                    } else {
                        // 显示发布成功提示
                        const successNotice = document.createElement('div');
                        successNotice.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg z-50 flex items-center';
                        successNotice.innerHTML = '<i class="fas fa-check-circle text-green-400 mr-2"></i>评价发布成功';
                        document.body.appendChild(successNotice);
                        
                        // 2秒后导航回课程详情
                        setTimeout(() => {
                            if (successNotice.parentNode) {
                                successNotice.parentNode.removeChild(successNotice);
                            }
                            handleNavigation('course_detail.html');
                        }, 2000);
                    }
                });
            }
        }
    };
    
    setupTextareaCounter();

    // 点赞、收藏功能
    const setupInteractionButtons = () => {
        // 点赞功能
        const likeButtons = document.querySelectorAll('.fa-heart');
        likeButtons.forEach(button => {
            button.style.cursor = 'pointer';
            button.addEventListener('click', function() {
                this.classList.toggle('far');
                this.classList.toggle('fas');
                this.classList.toggle('text-red-500');
                
                // 点赞动画
                const parent = this.parentElement;
                const likeAnimation = document.createElement('div');
                likeAnimation.className = 'absolute text-red-500 text-2xl';
                likeAnimation.style.top = '-20px';
                likeAnimation.style.left = '50%';
                likeAnimation.style.transform = 'translateX(-50%)';
                likeAnimation.style.opacity = '1';
                likeAnimation.style.transition = 'all 0.5s ease-out';
                likeAnimation.innerHTML = '<i class="fas fa-heart"></i>';
                
                parent.style.position = 'relative';
                parent.appendChild(likeAnimation);
                
                setTimeout(() => {
                    likeAnimation.style.top = '-40px';
                    likeAnimation.style.opacity = '0';
                }, 10);
                
                setTimeout(() => {
                    if (likeAnimation.parentNode) {
                        likeAnimation.parentNode.removeChild(likeAnimation);
                    }
                }, 500);
            });
        });
        
        // 消息列表交互
        const messageItems = document.querySelectorAll('.flex.p-4.border-b');
        if (messageItems.length > 0) {
            messageItems.forEach(item => {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    // 移除红点通知
                    const badge = this.querySelector('.rounded-full.bg-red-500');
                    if (badge) {
                        badge.style.transition = 'all 0.3s ease-out';
                        badge.style.transform = 'scale(0)';
                        setTimeout(() => {
                            if (badge.parentNode) {
                                badge.parentNode.removeChild(badge);
                            }
                        }, 300);
                    }
                    
                    // 导航到聊天详情
                    handleNavigation('messages.html');
                });
            });
        }
    };
    
    setupInteractionButtons();

    // 收藏功能
    const setupBookmarkFeature = () => {
        const bookmarkButtons = document.querySelectorAll('.fa-bookmark');
        bookmarkButtons.forEach(button => {
            button.style.cursor = 'pointer';
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // 防止触发父元素事件
                
                this.classList.toggle('far');
                this.classList.toggle('fas');
                this.classList.toggle('text-yellow-500');
                
                // 收藏提示效果
                const message = this.classList.contains('fas') ? '已加入收藏' : '已取消收藏';
                const toast = document.createElement('div');
                toast.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm z-50';
                toast.textContent = message;
                document.body.appendChild(toast);
                
                // 2秒后自动消失
                setTimeout(() => {
                    toast.classList.add('opacity-0');
                    toast.style.transition = 'opacity 0.3s ease-out';
                    setTimeout(() => {
                        if (toast.parentNode) {
                            toast.parentNode.removeChild(toast);
                        }
                    }, 300);
                }, 2000);
            });
        });
    };
    
    setupBookmarkFeature();

    // 消息通知清除和交互
    const setupNotificationInteraction = () => {
        // 消息通知清除
        const closeButtons = document.querySelectorAll('.fa-times');
        closeButtons.forEach(button => {
            button.style.cursor = 'pointer';
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // 防止触发父元素事件
                
                const notification = this.closest('.rounded-lg, .p-3');
                if (notification) {
                    notification.style.transition = 'all 0.3s ease-out';
                    notification.style.transform = 'translateX(100%)';
                    notification.style.opacity = '0';
                    
                    setTimeout(() => {
                        notification.style.height = '0';
                        notification.style.marginBottom = '0';
                        notification.style.padding = '0';
                        notification.style.overflow = 'hidden';
                        
                        setTimeout(() => {
                            if (notification.parentNode) {
                                notification.parentNode.removeChild(notification);
                                
                                // 更新未读数量
                                const unreadElement = document.querySelector('.text-gray-500:contains("未读")');
                                if (unreadElement) {
                                    const text = unreadElement.textContent;
                                    const match = text.match(/(\d+)条未读/);
                                    if (match && match[1]) {
                                        const count = parseInt(match[1]) - 1;
                                        unreadElement.textContent = count + '条未读';
                                    }
                                }
                            }
                        }, 300);
                    }, 300);
                }
            });
        });
        
        // 通知项点击交互
        const notificationItems = document.querySelectorAll('.bg-yellow-50.p-3, .bg-white.p-3.rounded-lg.border');
        notificationItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
                // 高亮选中效果
                this.classList.add('bg-blue-50');
                setTimeout(() => {
                    this.classList.remove('bg-blue-50');
                }, 300);
                
                // 根据通知类型导航到相应页面
                const title = this.querySelector('h3');
                if (title) {
                    const titleText = title.textContent.toLowerCase();
                    if (titleText.includes('活动')) {
                        handleNavigation('activities.html');
                    } else if (titleText.includes('选课')) {
                        handleNavigation('courses.html');
                    } else if (titleText.includes('评论') || titleText.includes('评价')) {
                        handleNavigation('course_review.html');
                    } else if (titleText.includes('私信')) {
                        handleNavigation('messages.html');
                    }
                }
            });
        });
        
        // 全部已读功能
        const readAllButton = document.querySelector('.text-blue-500:contains("全部已读")');
        if (readAllButton) {
            readAllButton.style.cursor = 'pointer';
            readAllButton.addEventListener('click', function() {
                // 移除所有红点通知
                const badges = document.querySelectorAll('.rounded-full.bg-red-500');
                badges.forEach(badge => {
                    badge.style.transition = 'all 0.3s ease-out';
                    badge.style.transform = 'scale(0)';
                    setTimeout(() => {
                        if (badge.parentNode) {
                            badge.parentNode.removeChild(badge);
                        }
                    }, 300);
                });
                
                // 更新未读计数
                const unreadElement = document.querySelector('.text-gray-500:contains("未读")');
                if (unreadElement) {
                    unreadElement.textContent = '0条未读';
                }
                
                // 显示提示
                const toast = document.createElement('div');
                toast.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm z-50';
                toast.textContent = '已全部标记为已读';
                document.body.appendChild(toast);
                
                // 2秒后自动消失
                setTimeout(() => {
                    toast.classList.add('opacity-0');
                    toast.style.transition = 'opacity 0.3s ease-out';
                    setTimeout(() => {
                        if (toast.parentNode) {
                            toast.parentNode.removeChild(toast);
                        }
                    }, 300);
                }, 2000);
            });
        }
        
        // 清空功能
        const clearButton = document.querySelector('.text-blue-500:contains("清空")');
        if (clearButton) {
            clearButton.style.cursor = 'pointer';
            clearButton.addEventListener('click', function() {
                // 显示确认弹窗
                const confirmDialog = document.createElement('div');
                confirmDialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                confirmDialog.innerHTML = `
                    <div class="bg-white rounded-lg p-4 w-4/5 max-w-xs">
                        <h3 class="text-lg font-medium mb-3">确认清空</h3>
                        <p class="text-gray-600 mb-4">确定要清空所有通知吗？此操作不可撤销。</p>
                        <div class="flex justify-end">
                            <button class="px-4 py-2 text-gray-500 mr-2 cancel-btn">取消</button>
                            <button class="px-4 py-2 bg-red-500 text-white rounded-md confirm-btn">确认清空</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(confirmDialog);
                
                // 取消按钮
                confirmDialog.querySelector('.cancel-btn').addEventListener('click', function() {
                    document.body.removeChild(confirmDialog);
                });
                
                // 确认清空按钮
                confirmDialog.querySelector('.confirm-btn').addEventListener('click', function() {
                    // 移除所有通知
                    const notifications = document.querySelectorAll('.bg-yellow-50.p-3, .bg-white.p-3.rounded-lg.border');
                    notifications.forEach(notification => {
                        notification.style.transition = 'all 0.3s ease-out';
                        notification.style.transform = 'translateX(100%)';
                        notification.style.opacity = '0';
                    });
                    
                    setTimeout(() => {
                        notifications.forEach(notification => {
                            if (notification.parentNode) {
                                notification.parentNode.removeChild(notification);
                            }
                        });
                        
                        // 更新未读计数
                        const unreadElement = document.querySelector('.text-gray-500:contains("未读")');
                        if (unreadElement) {
                            unreadElement.textContent = '0条未读';
                        }
                    }, 300);
                    
                    document.body.removeChild(confirmDialog);
                    
                    // 显示清空成功提示
                    const toast = document.createElement('div');
                    toast.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm z-50';
                    toast.textContent = '已清空全部通知';
                    document.body.appendChild(toast);
                    
                    // 2秒后自动消失
                    setTimeout(() => {
                        toast.classList.add('opacity-0');
                        toast.style.transition = 'opacity 0.3s ease-out';
                        setTimeout(() => {
                            if (toast.parentNode) {
                                toast.parentNode.removeChild(toast);
                            }
                        }, 300);
                    }, 2000);
                });
            });
        }
    };
    
    setupNotificationInteraction();

    // 设置页面链接和卡片交互
    const setupPageLinks = () => {
        // 课程卡片点击
        const courseCards = document.querySelectorAll('.course-card, .bg-white.rounded-lg.overflow-hidden.shadow-sm, .course-card');
        courseCards.forEach(card => {
            if (!card.classList.contains('shadow-lg')) { // 避免处理底部导航
                card.style.cursor = 'pointer';
                card.addEventListener('click', function() {
                    // 点击动画效果
                    this.classList.add('transform', 'scale-95');
                    this.style.transition = 'transform 0.2s ease-out';
                    
                    setTimeout(() => {
                        this.classList.remove('transform', 'scale-95');
                        // 导航到课程详情
                        handleNavigation('course_detail.html');
                    }, 200);
                });
            }
        });
        
        // 活动卡片点击
        const activityCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-sm.border.border-gray-100');
        activityCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                // 点击动画效果
                this.classList.add('transform', 'scale-95');
                this.style.transition = 'transform 0.2s ease-out';
                
                setTimeout(() => {
                    this.classList.remove('transform', 'scale-95');
                    
                    // 显示活动详情弹窗
                    const title = this.querySelector('h3').textContent;
                    const time = this.querySelector('.far.fa-clock').nextElementSibling.textContent;
                    const location = this.querySelector('.fas.fa-map-marker-alt').nextElementSibling.textContent;
                    
                    const activityModal = document.createElement('div');
                    activityModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                    activityModal.innerHTML = `
                        <div class="bg-white rounded-lg w-11/12 max-w-sm overflow-hidden">
                            <div class="bg-blue-500 text-white p-4">
                                <h3 class="text-lg font-bold">${title}</h3>
                                <p class="text-sm text-blue-100 mt-1">活动详情</p>
                            </div>
                            <div class="p-4">
                                <div class="flex items-center my-2">
                                    <i class="far fa-clock text-blue-500 mr-2"></i>
                                    <span>${time}</span>
                                </div>
                                <div class="flex items-center my-2">
                                    <i class="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                                    <span>${location}</span>
                                </div>
                                <div class="flex items-center my-2">
                                    <i class="fas fa-user-friends text-blue-500 mr-2"></i>
                                    <span>参与人数：25/50</span>
                                </div>
                                <div class="border-t border-gray-200 pt-3 mt-3">
                                    <p class="text-gray-600 text-sm mb-4">活动详情将在报名后发送到您的消息中心，请注意查收。</p>
                                </div>
                                <div class="flex justify-end space-x-2">
                                    <button class="cancel-btn px-4 py-2 text-gray-500">关闭</button>
                                    <button class="join-btn px-4 py-2 bg-blue-500 text-white rounded-md">报名参加</button>
                                </div>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(activityModal);
                    
                    // 关闭按钮
                    activityModal.querySelector('.cancel-btn').addEventListener('click', function() {
                        document.body.removeChild(activityModal);
                    });
                    
                    // 报名按钮
                    activityModal.querySelector('.join-btn').addEventListener('click', function() {
                        const successNotice = document.createElement('div');
                        successNotice.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg z-50 flex items-center';
                        successNotice.innerHTML = '<i class="fas fa-check-circle text-green-400 mr-2"></i>报名成功';
                        
                        document.body.removeChild(activityModal);
                        document.body.appendChild(successNotice);
                        
                        // 2秒后自动消失
                        setTimeout(() => {
                            successNotice.classList.add('opacity-0');
                            successNotice.style.transition = 'opacity 0.3s ease-out';
                            setTimeout(() => {
                                if (successNotice.parentNode) {
                                    successNotice.parentNode.removeChild(successNotice);
                                }
                            }, 300);
                        }, 2000);
                    });
                }, 200);
            });
        });
        
        // 搜索历史项点击
        const searchHistoryItems = document.querySelectorAll('.flex.items-center.justify-between.py-3');
        searchHistoryItems.forEach(item => {
            const searchText = item.querySelector('.text-sm');
            if (searchText) {
                searchText.parentElement.style.cursor = 'pointer';
                searchText.parentElement.addEventListener('click', function() {
                    // 点击搜索历史项，填充到搜索框
                    const searchInput = document.querySelector('input[type="text"]');
                    if (searchInput) {
                        searchInput.value = searchText.textContent;
                        searchInput.focus();
                    }
                });
            }
            
            // 删除搜索历史
            const deleteBtn = item.querySelector('.fas.fa-times');
            if (deleteBtn) {
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const historyItem = this.closest('.flex.items-center.justify-between');
                    if (historyItem) {
                        historyItem.style.transition = 'all 0.3s ease-out';
                        historyItem.style.opacity = '0';
                        historyItem.style.height = '0';
                        historyItem.style.overflow = 'hidden';
                        
                        setTimeout(() => {
                            if (historyItem.parentNode) {
                                historyItem.parentNode.removeChild(historyItem);
                            }
                        }, 300);
                    }
                });
            }
        });
        
        // 课程导航标签交互
        const courseTabs = document.querySelectorAll('.flex-1.py-3.text-center');
        if (courseTabs.length > 0) {
            courseTabs.forEach(tab => {
                tab.style.cursor = 'pointer';
                tab.addEventListener('click', function() {
                    // 移除所有active状态
                    courseTabs.forEach(t => {
                        t.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500', 'font-medium');
                        t.classList.add('text-gray-500');
                    });
                    
                    // 添加active状态
                    this.classList.remove('text-gray-500');
                    this.classList.add('text-blue-500', 'border-b-2', 'border-blue-500', 'font-medium');
                });
            });
        }
        
        // 章节列表交互
        const chapterItems = document.querySelectorAll('.flex.justify-between.items-center.py-3');
        chapterItems.forEach(item => {
            const chevron = item.querySelector('.fas.fa-chevron-right');
            if (chevron) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    // 展开/收起动画
                    this.classList.toggle('active');
                    
                    if (this.classList.contains('active')) {
                        // 创建子内容
                        const contentContainer = document.createElement('div');
                        contentContainer.className = 'chapter-content ml-5 border-l-2 border-blue-100 pl-3 py-2 text-sm text-gray-600 hidden';
                        contentContainer.innerHTML = `
                            <div class="my-2">1. 数据结构基本概念</div>
                            <div class="my-2">2. 算法效率分析</div>
                            <div class="my-2">3. 时间复杂度和空间复杂度</div>
                            <div class="my-2">4. 习题与讨论</div>
                        `;
                        
                        // 检查是否已存在
                        if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('chapter-content')) {
                            this.parentNode.insertBefore(contentContainer, this.nextSibling);
                            
                            // 显示动画
                            setTimeout(() => {
                                contentContainer.classList.remove('hidden');
                                chevron.style.transform = 'rotate(90deg)';
                                chevron.style.transition = 'transform 0.3s ease-out';
                            }, 10);
                        }
                    } else {
                        // 隐藏子内容
                        const contentContainer = this.nextElementSibling;
                        if (contentContainer && contentContainer.classList.contains('chapter-content')) {
                            contentContainer.classList.add('hidden');
                            chevron.style.transform = 'rotate(0)';
                            
                            setTimeout(() => {
                                if (contentContainer.parentNode) {
                                    contentContainer.parentNode.removeChild(contentContainer);
                                }
                            }, 300);
                        }
                    }
                });
            }
        });
        
        // 评价按钮
        const reviewBtn = document.querySelector('.w-full.bg-blue-500.text-white.py-3');
        if (reviewBtn) {
            reviewBtn.style.cursor = 'pointer';
            reviewBtn.addEventListener('click', function() {
                handleNavigation('course_review.html');
            });
        }
        
        // 消息分类标签
        const messageTabs = document.querySelectorAll('.flex-1.py-3.text-gray-500, .flex-1.py-3.text-blue-500');
        if (messageTabs.length > 0) {
            messageTabs.forEach(tab => {
                tab.style.cursor = 'pointer';
                tab.addEventListener('click', function() {
                    // 移除所有active状态
                    messageTabs.forEach(t => {
                        t.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500');
                        t.classList.add('text-gray-500');
                    });
                    
                    // 添加active状态
                    this.classList.remove('text-gray-500');
                    this.classList.add('text-blue-500', 'border-b-2', 'border-blue-500');
                });
            });
        }
    };
    
    setupPageLinks();
    
    // 设置页面顶部返回按钮
    const setupBackButtons = () => {
        const backButtons = document.querySelectorAll('.fas.fa-chevron-left');
        backButtons.forEach(button => {
            if (button.parentElement.tagName.toLowerCase() === 'button') {
                button.parentElement.style.cursor = 'pointer';
                button.parentElement.addEventListener('click', function() {
                    // 返回首页或上一页
                    const currentPath = window.location.pathname;
                    
                    if (currentPath.includes('course_review.html')) {
                        handleNavigation('course_detail.html');
                    } else if (currentPath.includes('course_detail.html')) {
                        handleNavigation('courses.html');
                    } else if (currentPath.includes('message_center.html')) {
                        handleNavigation('messages.html');
                    } else if (currentPath.includes('search.html')) {
                        handleNavigation('home.html');
                    } else {
                        handleNavigation('home.html');
                    }
                });
            }
        });
    };
    
    setupBackButtons();
    
    // 添加搜索功能
    const setupSearch = () => {
        const searchBtn = document.querySelector('button.text-blue-500.text-sm.font-medium:contains("搜索")');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const searchInput = document.querySelector('input[type="text"]');
                if (searchInput && searchInput.value.trim() !== '') {
                    // 显示搜索结果
                    const searchResultContainer = document.querySelector('.p-4.pb-20');
                    if (searchResultContainer) {
                        searchResultContainer.innerHTML = `
                            <h2 class="text-base font-medium mb-3">搜索结果: "${searchInput.value}"</h2>
                            <div class="text-sm text-gray-500 mb-4">找到 24 个相关结果</div>
                            <div class="grid grid-cols-2 gap-4">
                                <!-- 搜索结果项目 -->
                                <div class="bg-white rounded-lg overflow-hidden shadow-sm">
                                    <img src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg" class="w-full h-32 object-cover" alt="搜索结果">
                                    <div class="p-3">
                                        <h3 class="font-medium text-sm">心理学入门必修课</h3>
                                        <p class="text-xs text-gray-500 mt-1">深入浅出讲解心理学基础</p>
                                        <div class="flex justify-between items-center mt-2">
                                            <span class="text-red-500 font-medium">¥199</span>
                                            <span class="text-xs text-gray-400">1290人在学</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-lg overflow-hidden shadow-sm">
                                    <img src="https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg" class="w-full h-32 object-cover" alt="搜索结果">
                                    <div class="p-3">
                                        <h3 class="font-medium text-sm">心理咨询技巧实战</h3>
                                        <p class="text-xs text-gray-500 mt-1">专业心理咨询师教学</p>
                                        <div class="flex justify-between items-center mt-2">
                                            <span class="text-red-500 font-medium">¥299</span>
                                            <span class="text-xs text-gray-400">845人在学</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8 mb-4">
                                <h2 class="text-base font-medium mb-3">相关活动</h2>
                                <div class="bg-white rounded-lg shadow-sm border border-gray-100 mb-4">
                                    <div class="p-4">
                                        <div class="flex justify-between items-start">
                                            <h3 class="font-medium text-lg">心理健康工作坊</h3>
                                            <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">心理健康</span>
                                        </div>
                                        <div class="flex items-center mt-2 text-sm text-gray-500">
                                            <i class="far fa-clock mr-1"></i>
                                            <span>下周六 14:00</span>
                                        </div>
                                        <div class="flex items-center mt-1 text-sm text-gray-500">
                                            <i class="fas fa-map-marker-alt mr-1"></i>
                                            <span>心理咨询中心</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        
                        // 添加点击事件到结果项
                        setTimeout(() => {
                            setupPageLinks();
                        }, 100);
                    }
                }
            });
        }
    };
    
    setupSearch();
    
    // 注意：课程筛选功能已移至 filters.js 文件中
});
