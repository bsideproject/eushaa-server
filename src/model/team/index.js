const { User, Teams, TeamTypes } = require('../../../db/models');

exports.insert = async(type) => {

    const teamType = await TeamTypes.findOne({
      where:{type}
    })

    const team = await Teams.create({
      team_type_id : teamType.id
    })
    return team.dataValues;
}

exports.get = async id => {
	const team = await Teams.findOne({
			where: {id},
	})
	return team
}

exports.getTeamByUserId = async user_id => {
	const team = await Teams.findOne({
		include: {
			model: User,
			where: { id: user_id },
		},
	})
	return team
}

exports.getUsersByTeamId = async team_id => {
	const users = await User.findAll({
		include: {
			model: Teams,
			where: { id: team_id },
		},
	})
	return users
}

exports.update = async (id, update_datas) => {
	const [result, team] = await Teams.update(update_datas, { where: { id } })
	return result
}

exports.increase = async (id, keys) => {
  try {
    const team = await Teams.findByPk(id)
    const incrementResult = await team.increment(keys);
    return team.reload()
  } catch (err) {
    console.error(err)
  }
}

exports.removeTeam = async id => {
    try {
        const result = await Teams.destroy({
            where: {
                id
            }
        })
        return result
    } catch (err) {
        console.error(err)
    }
}
