console.log('tinkerovDev')

// Навигация
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Маска телефона
new Cleave('#phoneInput', {
    phone: true,
    phoneRegionCode: 'RU'
});

// Телефон
const phoneInput = document.getElementById('phoneInput');
const phoneButton = document.getElementById('phoneButton');

phoneInput.addEventListener('input', () => {
    const isValid = phoneInput.value.replace(/\D/g,'').length === 11;
    phoneButton.disabled = !isValid;
});

phoneButton.addEventListener('click', () => {
    showScreen('smsScreen');
});

// Смс верификация
document.querySelectorAll('.code-input').forEach((input, index, inputs) => {
    input.addEventListener('input', (e) => {
        if(e.target.value.length === 1) {
            if(index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else {
                showScreen('profileScreen');
            }
        }
    });
});

// Пропуск номера телефона
function skipPhoneNumber() {
    if(confirm('Без номера телефона некоторые функции будут недоступны. Продолжить?')) {
        showScreen('profileScreen');
    }
}

// Юзернейм
const usernameInput = document.getElementById('username');
const usernameStatus = document.getElementById('usernameStatus');

usernameInput.addEventListener('input', () => {
    const username = usernameInput.value;
    if(username.length < 5) {
        usernameStatus.innerHTML = 'Минимум 5 символов';
        return;
    }
    
    setTimeout(() => {
        const isAvailable = Math.random() > 0.5;
        usernameStatus.innerHTML = isAvailable ? 
            '✅ Доступно' : '❌ Занято';
        usernameInput.classList.toggle('error', !isAvailable);
    }, 500);
});

// Регистрация профиля
function completeRegistration() {
    const firstName = document.getElementById('firstName').value;
    if(!firstName || firstName.length < 2) {
        alert('Пожалуйста, введите имя');
        return;
    }
    
    showConfetti();
    document.getElementById('finalName').textContent = firstName;
    showScreen('finalScreen');
}

// Аватар
function changeAvatar() {
    alert('Не реализовано');
}

// Анимация конфетти 
function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}