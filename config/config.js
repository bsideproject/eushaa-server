require('dotenv').config({ path: './.env' });

module.exports = {
	// 개발용
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: 'mysql',
		operatorsAliases: 'false',
	},
	// 배포 환경
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: 'mysql',
		operatorsAliases: 'false',
		// 쿼리 명령어를 숨긴다
		logging: false,
	},
};
