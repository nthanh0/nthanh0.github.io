//Show password
document.getElementById('show-pw').addEventListener('click', function() {
    var password = document.getElementById('password');
    if (this.checked) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
});

// Predefined user credentials
const validCredentials = {
  'Hoang Phu Dung': '123',
  'Do Van Duc': '123',
  'Phan Cao Huy': '123',
  'Vu Nhat Thanh': '123',  
};

// Login function
function submitLogin(event) {
  event.preventDefault(); // Prevent form submission
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Check if the username exists and the password matches
  if (validCredentials[username] && validCredentials[username] === password) {
      alert('Đăng nhập thành công!');
      window.location.href = "../Đỗ Văn Đức(Quản lý kho sách)/KhoSach.html";
  } else {
      alert('Tên đăng nhập hoặc mật khẩu không chính xác.');
  }
}

// Attach the submitLogin function to your form submit event
document.getElementById('loginForm').addEventListener('submit', submitLogin);
