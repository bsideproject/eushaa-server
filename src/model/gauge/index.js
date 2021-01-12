const { Guages } = require('../../../db/models');

exports.get = async ({ level, gauge }) => {
    const result = await Guages.findOne({
        where: { level, guage: gauge },
    });

    return result;
};