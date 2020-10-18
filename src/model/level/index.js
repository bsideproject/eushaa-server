const { Levels } = require('../../../db/models');

exports.get = ({ levelNumber }) => {
    const level = await Levels.findOne({
        where: {
            level: levelNumber
        }
    })
    return level;
}