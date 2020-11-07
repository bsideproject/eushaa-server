const { User, Teams, TeamTypes, SpaceItems, SpaceItemLog, Levels } = require('../../../db/models');


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
      include: [
        {
          model: TeamTypes,
          as: 'team_type'
        },{
          model: User,
          as: 'users'
        }
      ],
			where: {id},
  });
  
  const levels = await Levels.findAll({
    include:
      {
        model:SpaceItems,
        as: 'space_items',
        include:[{
          model: SpaceItemLog,
          as: 'space_item_logs',
          include:{
            model:User,
            as:'user'
          }
        }]
      }
    
  })

  const spaces = levels.map((s)=>{
    s.space_items = s.space_items.map((i)=>{
      if(i.space_item_logs.length > 0) {
        i["image"] = i.activate_image
        i["user"] = i.space_item_logs[0].user
      }
      else {
        i["image"] = i.deactivate_image
      }
      return i
    })
    return s;
  })

  team['spaces'] = spaces;
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
			model: teams,
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
