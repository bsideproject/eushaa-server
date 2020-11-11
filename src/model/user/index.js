const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { User, UserTypes, Teams ,Sequelize:{Sequelize,Op}} = require('../../../db/models');
const { styleHyphenFormat } = require('../../lib/util')

const insertUserType = async (oldObj)=>{
	const userType = await UserTypes.findOne({where:{type:oldObj.type}})
	const newObj = {...oldObj, userTypeId : userType.id}
	delete newObj.type
	return newObj;
}

exports.get = async (id) => {
    const user = await User.findOne({
		where:{
			id
		}
	})
    return user;
}
exports.update = async (id,updateData) =>{

	if(updateData.type){
		updateData = await insertUserType(updateData)
	}

	updateData = Object.entries(updateData)
        .filter(([k, v]) => v)
        .map(([k, v]) => [styleHyphenFormat(k), v])
        .reduce((acc, [k, v]) => {
            acc[k] = v
            return acc;
        }, {})
    const [result, user] = await User.update(updateData, { where: { id } })
    return result;
}
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
		if (await bcrypt.compare(password, user.password)) {
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

exports.matchTeam = async(id, type) =>{

	const team = await Teams.findOne({
		attributes: {
			include:[
				[
					Sequelize.literal(`(
						SELECT COUNT(u.id)
						FROM users u
							JOIN teams t ON t.id = u.team_id
							JOIN team_types tt ON tt.id = t.team_type_id AND tt.type = '${type.slice(0, 2)}'
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

	const user = await User.findOne({
		where:{
			id
		}
	})
	user.team_id = team.id
	await user.save();
	return user;
}