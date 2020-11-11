const { CharacterItems, CharacterItemLogs } = require('../../../db/models');

exports.getByUserId = async user_id => {
    let items = await CharacterItemLogs.findAll({
        where: { user_id },
        include: {
            model: CharacterItems,
        },
    })
    items = items.map(item => {
        let temp = item.character_item
        temp['is_active'] = item.is_active
        return temp
    })
    return items
}