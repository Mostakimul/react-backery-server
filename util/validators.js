module.exports.validateRegisterInput = (username, password, confirmPassword, email) => {
  const errors = {};
  // username
  if (username.trim() === '') {
    errors.username = 'Username can not be empty!';
  }
  // email
  if (email.trim() === '') {
    errors.email = 'Email can not be empty!';
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be valid!';
    }
  }
  // password
  if (password === '') {
    errors.password = 'Password can not be empty!';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// for login user
module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username can not be empty!';
  }

  if (password.trim() === '') {
    errors.password = 'Password can not be empty!';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
