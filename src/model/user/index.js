const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

require('dotenv').config();

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

exports.selectUser = async (email, password) => {
	const user = await User.findOne({
		where: {
			email,
		}
	})
	if (user) {
		if (await bcrypt.compareSync(password, user.password)) {
			const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
				algorithm: 'HS256',
				expiresIn: '1h',
			})
			return token
		}
		throw new Error('Incorrect password.')
	}
	throw new Error('No Such User exists.')
} 

exports.autheticate = (authorization) => {
	try {
		const token = jwt.verify(authorization, process.env.JWT_SECRET)
		if (token) {
			return token.name
		}
		throw new Error('unauthorized.')
	} catch (err) {
		throw new Error('token expired')
	}
}

exports.participateTeam = async(user_id, team_id) => {
  const [result, user] = await User.update({ team_id }, { where: { id: user_id } })
  return result
}
