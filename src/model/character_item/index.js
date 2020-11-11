const { CharacterItems, CharacterItemLogs } = require('../../../db/models');

exports.getByUserId = async user_id => {
    let items = await CharacterItemLogs.findAll({
        where: { user_id },
        include: {
            model: CharacterItems,
        },
        attributes: ['is_active']
    })
    items = items.map(item => {
        item.character_item.is_active = item.is_active
        return item.character_item
    })
    return items
}