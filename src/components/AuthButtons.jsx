import React from 'react';

function AuthButtons() {
  return (
    <div className="auth-buttons d-flex justify-content-center mt-3">
      <a href="/login" className="btn btn-primary mr-2">Giriş Yap</a>
      <a href="/register" className="btn btn-primary">Kayıt Ol</a>
    </div>
  );
}

export default AuthButtons;
