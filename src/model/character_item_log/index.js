const { CharacterItemLogs } = require('../../../db/models');

exports.insert = async (user_id, character_item_id) => {    
    try {
        const log = await CharacterItemLogs.create({
            is_active: 'N',
            user_id,
            character_item_id,
        })
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

exports.setActive = async (user_id, character_item_id, is_active) => {
    try {
        const [result, data] = await CharacterItemLogs.update({
            is_active
        }, { where: { user_id, character_item_id } } )
        return result
    } catch (err) {
        console.error(err)
        return false
    }
}