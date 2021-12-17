const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');

// token creator
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    {
      expiresIn: '1h',
    },
  );
};

module.exports = {
  Mutation: {
    // User login
    async login(_, { username, password }) {
      // validation
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User does not exist!';
        throw new UserInputError('User not found!', {
          errors,
        });
      }

      // if user found
      const match = await bcrypt.compare(password, user.password);
      // check password
      if (!match) {
        errors.general = 'Wrong credentials!';
        throw new UserInputError('Wrong credentials!', {
          errors,
        });
      }

      // create token
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    // User Registration
    async register(_, { registerInput: { username, password, confirmPassword, email } }) {
      // validation
      const { valid, errors } = validateRegisterInput(username, password, confirmPassword, email);
      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }

      // find user email and check already exist
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        throw new UserInputError('Email already used!', {
          errors: {
            email: 'This email already used!',
          },
        });
      }

      // bcrypting user password
      password = await bcrypt.hash(password, 12);

      // creating user
      const newUser = new User({
        email,
        username,
        password,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      });

      // saving to database
      const res = await newUser.save();

      // creating token
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
