const {TeamTypes, Teams} = require('../../../db/models');

exports.getByTeamId = async(teamId)=>{
    const {team_type} = await Teams.findOne({
        include:{
            model: TeamTypes,
            as: 'team_type'
        },
        where:{
            id : teamId
        }
    })
    return team_type;
}