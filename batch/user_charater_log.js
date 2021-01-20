const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const mysql = require("mysql2/promise")

const schedule = require('node-schedule');

const insertLogs = async () => {

    const connection = await mysql.createConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
    })

    const [rows] = await connection.query(
        `
        SELECT 
            u.id userId,
            u.character_id characterId,
            c.image characterImage,
            ci.id characterItemId,
            ci.name characterItemName,
            ci.pos_x characterItemPosX,
            ci.pos_y characterItemPosY,
            ci.activate_image characterItemImage
        FROM users u
        JOIN (
            SELECT * 
            FROM character_item_logs
            WHERE is_active = 'Y'
        ) cil ON cil.user_id = u.id 
        JOIN character_items ci ON ci.id = cil.character_item_id
        JOIN characters c ON c.id = u.character_id
        ORDER BY u.id, ci.id
    `)

    const userItemsMap = rows.reduce((acc, { userId, characterId, characterImage, characterItemId, characterItemName, characterItemPosX, characterItemPosY, characterItemImage }) => {
        if (!acc[userId]) acc[userId] = [];

        acc[userId].push({
            characterId,
            characterImage,
            characterItemId,
            characterItemName,
            characterItemPosX,
            characterItemPosY,
            characterItemImage
        });

        return acc;
    }, {})

    const insertValues = Object.entries(userItemsMap).map(([userId, items]) => [userId, JSON.stringify({ items })])

    await connection.query(`INSERT INTO user_character_logs (user_id, log) VALUES ?`, [insertValues]);

};


const j = schedule.scheduleJob('00 59 23 * * 0-6', async () => {
    console.log("do character log batch")
    await insertLogs()
})

