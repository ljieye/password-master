// 字符集定义
const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>/?'
};

function generatePassword(options) {
  let chars = '';
  if (options.uppercase) chars += CHAR_SETS.uppercase;
  if (options.lowercase) chars += CHAR_SETS.lowercase;
  if (options.numbers) chars += CHAR_SETS.numbers;
  if (options.symbols) chars += CHAR_SETS.symbols;
  if (!chars) return '';
  let pwd = '';
  for (let i = 0; i < options.length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

function evaluateStrength(pwd) {
  let score = 0;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (pwd.length < 6) score = 0;
  const levels = ['极弱', '弱', '中', '强', '极强'];
  return levels[Math.min(score, levels.length - 1)];
}

document.getElementById('generate').onclick = function() {
  const options = {
    length: parseInt(document.getElementById('length').value),
    uppercase: document.getElementById('uppercase').checked,
    lowercase: document.getElementById('lowercase').checked,
    numbers: document.getElementById('numbers').checked,
    symbols: document.getElementById('symbols').checked
  };
  const pwd = generatePassword(options);
  document.getElementById('password').value = pwd;
  document.getElementById('strength').textContent = pwd ? '强度：' + evaluateStrength(pwd) : '';
};

document.getElementById('copy').onclick = function() {
  const pwd = document.getElementById('password').value;
  if (!pwd) return;
  navigator.clipboard.writeText(pwd).then(() => {
    document.getElementById('copy').textContent = '已复制!';
    setTimeout(() => {
      document.getElementById('copy').textContent = '复制';
    }, 1200);
  });
}; 