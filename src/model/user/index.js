const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

require('dotenv').config();


const { User, UserTypes, Teams, TeamTypes, Sequelize: { Sequelize, Op } } = require('../../../db/models');
const { styleHyphenFormat } = require('../../lib/util')


const insertUserType = async (oldObj) => {
	const userType = await UserTypes.findOne({ where: { type: oldObj.type } });
	const newObj = { ...oldObj, userTypeId: userType.id };
	delete newObj.type;
	return newObj;
};

const isUniqueName = async (name) => {
	const user = await User.findOne({
		where: {
			name
		}
	})
	if (!user) return true;
	return false
}

const isUniqueEmail = async (email) => {
	const user = await User.findOne({
		where: {
			email
		}
	})
	if (!user) return true;
	return false
}


const matchTeam = async (type) => {
	type = type.slice(0, 2)
	const team = await Teams.findOne({
		attributes: {
			include: [
				[
					Sequelize.literal(`(
						SELECT COUNT(u.id)
						FROM users u
							JOIN teams t ON t.id = u.team_id
							JOIN team_types tt ON tt.id = t.team_type_id AND tt.type = '${type}'
						WHERE t.id = teams.id
						GROUP BY t.id
					)`),
					'userCount'
				]
			]
		},
		order: [
			[Sequelize.literal('userCount'), 'ASC']
		]
	})

	if (!team.userCount || team.userCount >= 4) {
		const teamType = await TeamTypes.findOne({
			where: { type },
		});

		const newTeam = await Teams.create({
			team_type_id: teamType.id,
		})
		return newTeam
	}
	return team
}

exports.get = async (id) => {
	const user = await User.findOne({
		where: {
			id,
		},
	});
	return user;
};
exports.getByEmail = async (email) => {
	const user = await User.findOne({
		where: {
			email,
		},
	});
	return user;
}
exports.update = async (id, updateData) => {
	if (updateData.type) {
		updateData = await insertUserType(updateData);
	}

	updateData = Object.entries(updateData)
		.filter(([k, v]) => v)
		.map(([k, v]) => [styleHyphenFormat(k), v])
		.reduce((acc, [k, v]) => {
			acc[k] = v;
			return acc;
		}, {});
	const [result, user] = await User.update(updateData, { where: { id } });
	return result;
};
exports.insertUser = async (email, name, password) => {
	const salt = bcrypt.genSaltSync(saltRounds);

	if (!await isUniqueName(name)) throw new Error("중복된 닉네임 입니다.")
	if (!await isUniqueEmail(email)) throw new Error("중복된 이메일 입니다.")
	const user = await User.create({
		email,
		name,
		password: password ? bcrypt.hashSync(password, salt) : null,
	});

	return user;
};

exports.selectUser = async (email, password) => {
	const user = await User.findOne({
		where: {
			email,
		},
	});
	if (user) {
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ id: user.id, email: user.email, name: user.name },
				process.env.JWT_SECRET,
				{
					algorithm: 'HS256',
					expiresIn: '1h',
				}
			);
			return token;
		}
		throw new Error('Incorrect password.');
	}
	throw new Error('No Such User exists.');
};

exports.autheticate = (authorization) => {
	try {
		const token = jwt.verify(authorization, process.env.JWT_SECRET);
		if (token) {
			return token.name;
		}
		throw new Error('unauthorized.');
	} catch (err) {
		throw new Error('token expired');
	}
};

exports.participateTeam = async (user_id, team_id) => {
	const [result, user] = await User.update({ team_id }, { where: { id: user_id } })
	return result
}

exports.matchTeam = async (id, type) => {

	const user = await User.findOne({
		where: {
			id
		}
	})

	const team = await matchTeam(type)

	user.team_id = team.id
	await user.save();
	return user;
}

