// 活动相关功能

document.addEventListener('DOMContentLoaded', function() {
    // 如果在活动发布页面
    if (document.querySelector('#publishButton')) {
        initializeCreateActivityPage();
    }
    
    // 如果在活动浏览页面
    if (document.querySelector('.fas.fa-plus.text-blue-500')) {
        setupCreateActivityButton();
    }
    
    // 如果在活动详情页面
    if (document.querySelector('#enrollButton')) {
        initializeActivityDetailPage();
    }
});

// 初始化活动发布页面
function initializeCreateActivityPage() {
    // 返回按钮
    const backButton = document.querySelector('#backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'activities.html';
        });
    }
    
    // 发布按钮
    const publishButton = document.querySelector('#publishButton');
    if (publishButton) {
        publishButton.addEventListener('click', function() {
            if (validateActivityForm()) {
                showPublishSuccessMessage();
            }
        });
    }
    
    // 标题字数统计
    const titleInput = document.querySelector('#activityTitle');
    const titleCount = document.querySelector('#titleCount');
    if (titleInput && titleCount) {
        titleInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            titleCount.textContent = `${currentLength}/20`;
            
            if (currentLength > 20) {
                titleCount.classList.add('text-red-500');
                this.classList.add('border-red-500');
            } else {
                titleCount.classList.remove('text-red-500');
                this.classList.remove('border-red-500');
            }
        });
    }
    
    // 描述字数统计
    const descInput = document.querySelector('#activityDescription');
    const descCount = document.querySelector('#descCount');
    if (descInput && descCount) {
        descInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            descCount.textContent = `${currentLength}/500`;
            
            if (currentLength > 500) {
                descCount.classList.add('text-red-500');
                this.classList.add('border-red-500');
            } else {
                descCount.classList.remove('text-red-500');
                this.classList.remove('border-red-500');
            }
        });
    }
    
    // 封面图片上传
    const coverImage = document.querySelector('#coverImage');
    if (coverImage) {
        coverImage.addEventListener('click', function() {
            simulateImageUpload(this);
        });
    }
    
    // 活动类型选择
    const typeButtons = document.querySelectorAll('.activity-type-btn');
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 取消其他选中状态
            typeButtons.forEach(btn => {
                btn.classList.remove('bg-blue-500', 'text-white');
            });
            
            // 设置当前选中
            this.classList.add('bg-blue-500', 'text-white');
        });
    });
    
    // 不限制人数按钮
    const noLimitBtn = document.querySelector('#noLimit');
    const limitInput = document.querySelector('#activityLimit');
    if (noLimitBtn && limitInput) {
        noLimitBtn.addEventListener('click', function() {
            limitInput.value = "";
            limitInput.placeholder = "不限制";
            limitInput.disabled = true;
            this.classList.add('bg-blue-500', 'text-white');
            
            // 3秒后恢复
            setTimeout(() => {
                limitInput.disabled = false;
                limitInput.placeholder = "0";
                this.classList.remove('bg-blue-500', 'text-white');
            }, 3000);
        });
    }
    
    // 设置默认日期为今天
    const dateInput = document.querySelector('#activityDate');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
    
    // 设置默认时间为当前时间
    const timeInput = document.querySelector('#activityTime');
    if (timeInput) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        timeInput.value = `${hours}:${minutes}`;
    }
}

// 设置创建活动按钮
function setupCreateActivityButton() {
    const createBtn = document.querySelector('.fas.fa-plus.text-blue-500');
    if (createBtn) {
        const btnContainer = createBtn.closest('button');
        if (btnContainer) {
            btnContainer.addEventListener('click', function() {
                window.location.href = 'create_activity.html';
            });
        }
    }
}

// 模拟图片上传
function simulateImageUpload(element) {
    // 显示选择进行中的效果
    const originalContent = element.innerHTML;
    element.innerHTML = `
        <div class="text-center">
            <i class="fas fa-spinner fa-spin text-blue-500 text-4xl"></i>
            <p class="text-blue-500 mt-2">选择图片中...</p>
        </div>
    `;
    
    // 模拟2秒后返回
    setTimeout(() => {
        // 模拟上传成功并显示图片
        const randomImage = getRandomActivityImage();
        element.style.backgroundImage = `url('${randomImage}')`;
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';
        element.innerHTML = `
            <div class="bg-black bg-opacity-50 w-full h-full flex items-center justify-center rounded-lg">
                <div class="text-center">
                    <i class="fas fa-camera text-white text-2xl"></i>
                    <p class="text-white text-sm mt-1">更换图片</p>
                </div>
            </div>
        `;
    }, 2000);
}

// 获取随机活动图片
function getRandomActivityImage() {
    const images = [
        'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg',
        'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg',
        'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
        'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg',
        'https://images.pexels.com/photos/1181526/pexels-photo-1181526.jpeg'
    ];
    
    return images[Math.floor(Math.random() * images.length)];
}

// 表单验证
function validateActivityForm() {
    const title = document.querySelector('#activityTitle').value;
    const location = document.querySelector('#activityLocation').value;
    const speaker = document.querySelector('#activitySpeaker').value;
    
    let hasError = false;
    let errorMessage = "";
    
    // 清除所有错误提示
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));
    
    // 验证标题
    if (!title) {
        showInputError('activityTitle', '请输入活动标题');
        hasError = true;
        errorMessage = "请填写活动标题";
    } else if (title.length > 20) {
        showInputError('activityTitle', '标题不能超过20个字');
        hasError = true;
        errorMessage = "标题不能超过20个字";
    }
    
    // 验证地点
    if (!location) {
        showInputError('activityLocation', '请输入活动地点');
        hasError = true;
        errorMessage = errorMessage || "请填写活动地点";
    }
    
    // 验证主讲人
    if (!speaker) {
        showInputError('activitySpeaker', '请输入主讲人信息');
        hasError = true;
        errorMessage = errorMessage || "请填写主讲人信息";
    }
    
    // 验证是否选择了活动类型
    const selectedType = document.querySelector('.activity-type-btn.bg-blue-500');
    if (!selectedType) {
        // 给类型容器添加错误提示
        const typeContainer = document.querySelector('.activity-type-btn').parentElement;
        appendErrorMessage(typeContainer, '请选择一个活动类型');
        hasError = true;
        errorMessage = errorMessage || "请选择一个活动类型";
    }
    
    // 如果有错误，显示提示
    if (hasError) {
        showToast(errorMessage);
        return false;
    }
    
    return true;
}

// 显示输入框错误
function showInputError(inputId, message) {
    const input = document.querySelector(`#${inputId}`);
    
    if (input) {
        // 添加红色边框
        input.classList.add('border-red-500');
        
        // 检查是否已存在错误消息
        const parentElement = input.parentElement;
        const existingError = parentElement.querySelector('.error-message');
        
        if (!existingError) {
            appendErrorMessage(parentElement, message);
        }
    }
}

// 添加错误消息
function appendErrorMessage(parent, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-xs mt-1';
    errorDiv.textContent = message;
    parent.appendChild(errorDiv);
}

// 显示Toast提示
function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification fixed top-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm z-50';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    
    // 2秒后消失
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// 显示发布成功信息
function showPublishSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
    successMessage.innerHTML = `
        <div class="bg-white rounded-lg p-6 w-4/5 max-w-sm">
            <div class="text-center">
                <i class="fas fa-check-circle text-green-500 text-5xl"></i>
                <h3 class="text-xl font-semibold mt-4">发布成功</h3>
                <p class="text-gray-600 mt-2">您的活动已成功发布，等待审核</p>
                <div class="mt-6">
                    <button id="confirmBtn" class="w-full py-3 bg-blue-500 text-white rounded-lg font-medium">确定</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // 点击确定返回活动页面
    document.querySelector('#confirmBtn').addEventListener('click', function() {
        window.location.href = 'activities.html';
    });
}

// 初始化活动详情页面
function initializeActivityDetailPage() {
    // 设置返回按钮
    const backButton = document.querySelector('#backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // 使用history.back()确保能够回到上一页
            history.back();
            // 如果直接访问的详情页，则导航到活动列表
            setTimeout(() => {
                if (document.location.pathname.includes('activity_detail.html')) {
                    window.location.href = 'activities.html';
                }
            }, 100);
        });
    }
    
    // 设置报名按钮
    const enrollButton = document.querySelector('#enrollButton');
    const enrollForm = document.querySelector('#enrollForm');
    if (enrollButton && enrollForm) {
        enrollButton.addEventListener('click', function() {
            enrollForm.classList.remove('hidden');
            // 弹出动画效果
            const formContent = enrollForm.querySelector('.bg-white');
            formContent.style.transform = 'translateY(20px)';
            formContent.style.opacity = '0';
            formContent.style.transition = 'all 0.3s ease-out';
            
            setTimeout(() => {
                formContent.style.transform = 'translateY(0)';
                formContent.style.opacity = '1';
            }, 10);
        });
    }
    
    // 关闭报名表单
    const closeEnrollForm = document.querySelector('#closeEnrollForm');
    if (closeEnrollForm && enrollForm) {
        closeEnrollForm.addEventListener('click', function() {
            const formContent = enrollForm.querySelector('.bg-white');
            formContent.style.transform = 'translateY(20px)';
            formContent.style.opacity = '0';
            
            setTimeout(() => {
                enrollForm.classList.add('hidden');
            }, 300);
        });
    }
    
    // 提交报名表单
    const submitEnrollButton = document.querySelector('#submitEnrollButton');
    const successModal = document.querySelector('#successModal');
    if (submitEnrollButton && successModal) {
        submitEnrollButton.addEventListener('click', function() {
            if (validateEnrollForm()) {
                // 隐藏报名表单
                enrollForm.classList.add('hidden');
                
                // 显示成功提示
                successModal.classList.remove('hidden');
                const modalContent = successModal.querySelector('.bg-white');
                modalContent.style.transform = 'scale(0.9)';
                modalContent.style.opacity = '0';
                modalContent.style.transition = 'all 0.3s ease-out';
                
                setTimeout(() => {
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                }, 10);
            }
        });
    }
    
    // 确认报名成功
    const confirmSuccessButton = document.querySelector('#confirmSuccessButton');
    if (confirmSuccessButton) {
        confirmSuccessButton.addEventListener('click', function() {
            successModal.classList.add('hidden');
            
            // 更新页面状态为已报名
            if (enrollButton) {
                enrollButton.textContent = '已报名';
                enrollButton.classList.remove('bg-blue-500');
                enrollButton.classList.add('bg-gray-400');
                enrollButton.disabled = true;
            }
            
            // 更新报名人数和进度条
            const enrollCount = document.querySelector('#enrollCount');
            const progressBar = document.querySelector('#progressBar');
            if (enrollCount && progressBar) {
                const countText = enrollCount.textContent;
                const match = countText.match(/(\d+)\/(\d+)/);
                
                if (match && match[1] && match[2]) {
                    const current = parseInt(match[1]);
                    const total = parseInt(match[2]);
                    const newCurrent = current + 1;
                    const newPercentage = (newCurrent / total) * 100;
                    
                    enrollCount.textContent = `${newCurrent}/${total} 人`;
                    progressBar.style.width = `${newPercentage}%`;
                }
            }
        });
    }
    
    // 为表单输入添加验证和反馈
    setUpFormInputValidation();
}

// 设置表单输入验证和反馈
function setUpFormInputValidation() {
    const nameInput = document.querySelector('#nameInput');
    const phoneInput = document.querySelector('#phoneInput');
    const idInput = document.querySelector('#idInput');
    
    // 姓名输入验证
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateInput(this, this.value.trim() !== '', '请输入您的姓名');
        });
        
        nameInput.addEventListener('focus', function() {
            removeValidationStatus(this);
        });
    }
    
    // 手机号输入验证
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            const phoneRegex = /^1[3456789]\d{9}$/;
            validateInput(this, phoneRegex.test(this.value), '请输入有效的手机号');
        });
        
        phoneInput.addEventListener('focus', function() {
            removeValidationStatus(this);
        });
    }
    
    // 学号/工号验证
    if (idInput) {
        idInput.addEventListener('blur', function() {
            validateInput(this, this.value.trim() !== '', '请输入您的学号/工号');
        });
        
        idInput.addEventListener('focus', function() {
            removeValidationStatus(this);
        });
    }
}

// 输入框验证
function validateInput(input, isValid, errorMessage) {
    // 移除旧的验证状态
    removeValidationStatus(input);
    
    // 添加新的验证状态
    if (!isValid) {
        input.classList.add('border-red-500');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-red-500 text-xs mt-1 validation-error';
        errorDiv.textContent = errorMessage;
        
        input.parentNode.appendChild(errorDiv);
    } else {
        input.classList.add('border-green-500');
        
        const successIcon = document.createElement('div');
        successIcon.className = 'absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 validation-success';
        successIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        
        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(successIcon);
    }
}

// 移除验证状态
function removeValidationStatus(input) {
    input.classList.remove('border-red-500', 'border-green-500');
    
    // 移除错误信息
    const errorMessages = input.parentNode.querySelectorAll('.validation-error');
    errorMessages.forEach(el => el.remove());
    
    // 移除成功图标
    const successIcons = input.parentNode.querySelectorAll('.validation-success');
    successIcons.forEach(el => el.remove());
}

// 验证报名表单
function validateEnrollForm() {
    const nameInput = document.querySelector('#nameInput');
    const phoneInput = document.querySelector('#phoneInput');
    const idInput = document.querySelector('#idInput');
    const agreeCheckbox = document.querySelector('#agreeCheckbox');
    
    let isValid = true;
    
    // 验证姓名
    if (!nameInput.value.trim()) {
        validateInput(nameInput, false, '请输入您的姓名');
        isValid = false;
    }
    
    // 验证手机号
    const phoneRegex = /^1[3456789]\d{9}$/;
    if (!phoneRegex.test(phoneInput.value)) {
        validateInput(phoneInput, false, '请输入有效的手机号');
        isValid = false;
    }
    
    // 验证学号/工号
    if (!idInput.value.trim()) {
        validateInput(idInput, false, '请输入您的学号/工号');
        isValid = false;
    }
    
    // 验证是否同意协议
    if (!agreeCheckbox.checked) {
        showToast('请阅读并同意活动规则');
        isValid = false;
    }
    
    return isValid;
}
