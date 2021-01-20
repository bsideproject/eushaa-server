const { Characters, CharacterItems, CharacterItemLogs, User, UserCharacterLogs } = require('../../../db/models')

exports.getByUserId = async (userId) => {
    const { character } = await User.findOne({
        include: {
            model: Characters,
            as: 'character',
        },
        where: {
            id: userId
        },
        attributes: ["character.id", "character.image"]
    });

    const characterItems = await CharacterItems.findAll({
        include: {
            model: CharacterItemLogs,
            as: 'character_item_logs',
            where: {
                user_id: userId
            },
            attributes: ["is_active"]
        }
    });

    character["characterItems"] = characterItems.map((c) => {
        if (c.character_item_logs[0].is_active === 'Y') {
            return { ...c.dataValues, image: c.activate_image, is_active: c.character_item_logs[0].is_active }
        } else {
            return { ...c.dataValues, image: c.deactivate_image, is_active: c.character_item_logs[0].is_active }
        }

    })
    return character
}

exports.getLogsByUserId = async (userId, count = 10) => {
    const logs = await UserCharacterLogs.findAll({
        where: {
            user_id: userId
        },
        order: [['created_at', 'DESC']],
        limit: count
    });

    return logs.map((l) => {
        const items = JSON.parse(l.log).items;
        const character = {
            id: items[0].characterId,
            image: items[0].characterImage,
            characterItems: items.map(({ characterItemId: id, characterItemName: name, characterItemPosX: pos_x, characterItemPosY: pos_y, characterItemImage: image }) => {
                return { id, name, image, is_active: 'Y', pos_x, pos_y }
            })
        }
        return character
    })
}

exports.insertLog = async ({ userId, itemId }) => {
    const characterItemLog = await CharacterItemLogs.create({
        user_id: userId,
        character_item_id: itemId
    })
    return { ...characterItemLog.dataValues, item_id: characterItemLog.character_item_id, created_at: characterItemLog.createdAt }

}

exports.updateCharacterItemStatus = async ({ userId, itemId, isActive }) => {
    const [result] = await CharacterItemLogs.update({ is_active: isActive }, { where: { user_id: userId, character_item_id: itemId } });
    return result;
}