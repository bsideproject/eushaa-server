const { SpaceItems, SpaceItemLog } = require('../../../db/models');

const { styleUpperFormat } = require('../../lib/util')


const makeCamelKeyObject = (object) => Object.entries(object)
    .map(([k, v]) => [styleUpperFormat(k), v])
    .reduce((acc, [k, v]) => {
        acc[k] = v
        return acc;
    }, {});

const curryMakeTeamSpaceItems = (spaceItemLogs) => ({dataValues}) => {
    if (spaceItemLogs.findIndex((spaceItemLog) => spaceItemLog.spaceItem.id === spaceItem.id) !== -1) {
        return { id : dataValues.id, level_id : dataValues.level_id, pos_x : dataValues.pos_x, pos_y : dataValues.pos_y, image: dataValues.activate_image }
    } else {
        return { id : dataValues.id, level_id : dataValues.level_id, pos_x : dataValues.pos_x, pos_y :dataValues.pos_y, image: dataValues.deactivate_image }
    }
};

exports.getSpaceItemsByLevel = async ({ levelId }) => {
    const spaceItems = await SpaceItems.findAll({
        where: {
            level_id: levelId
        }
    })
    return spaceItems;
}

exports.getSpaceItemsByTeam = async ({ teamId, levelId }) => {
    const spaceItems = await SpaceItems.findAll({
        where: {
            level_id: levelId
        }
    })

    const spaceItemLogs = await SpaceItemLog.findAll({
        include: {
            model: SpaceItems,
            as: 'space_item',
            where: {
                level_id: levelId
            }
        },
        where: {
            team_id: teamId,

        }
    })

    const makeTeamSpaceItems = curryMakeTeamSpaceItems(spaceItemLogs)
    return spaceItems.map(makeCamelKeyObject).map(makeTeamSpaceItems);
}