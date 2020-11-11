const { Characters } = require('../../../db/models');

exports.getById = async id => {
    const character = await Characters.findOne({
        where: { id },
    })
    return character
}