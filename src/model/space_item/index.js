const { SpaceItems, SpaceItemLogs } = require('../../../db/models');

const { styleUpperFormat } = require('../../lib/util')


const makeCamelKeyObject = (object) => Object.entries(object)
    .map(([k, v]) => [styleUpperFormat(k), v])
    .reduce((acc, [k, v]) => {
        acc[k] = v
        return acc;
    }, {});

const curryMakeTeamSpaceItems = (spaceItemLogs) => ({ id, levelId, posX, posY, deactivateImage, activateImage }) => {
    if (spaceItemLogs.findIndex((spaceItemLog) => spaceItemLog.spaceItem.id === spaceItem.id) !== -1) {
        return { id, levelId, posX, posY, image: activateImage }
    } else {
        return { id, levelId, posX, posY, image: deactivateImage }
    }
};

exports.getSpaceItemsByLevel = async ({ levelId }) => {
    const spaceItems = SpaceItems.findAll({
        where: {
            level_id: levelId
        }
    })
    return spaceItems;
}

exports.getSpaceItemsByTeam = async ({ teamId, levelId }) => {
    const spaceItems = SpaceItems.findAll({
        where: {
            level_id: levelId
        }
    })

    const spaceItemLogs = SpaceItemLogs.findAll({
        include: {
            model: SpaceItems,
            as: 'spaceItem',
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