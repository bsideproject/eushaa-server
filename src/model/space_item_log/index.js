const {spaceItemLogs} = require('../../../db/models');

exports.insert = async({teamId, userId, itemId}) =>{
    const spaceItemLog = await spaceItemLogs.create({
        team_id: teamId,
        user_id: userId,
        item_id: itemId
    })
    return spaceItemLog.dataValues;
}