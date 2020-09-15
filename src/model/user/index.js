const bcrypt = require('bcrypt');
const saltRounds = 10;

const { User } = require('../../../db/models');


exports.insertUser = async (email, name, password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
        email,
        name,
        password: hashedPassword
    })
    return user;
}