require('dotenv').config()
const C = require('./model/Connector')

// Set globally the connector to make db request
global.Connector = new C()

const start = async (retried) => {
  if (process.env.autoMigrate && retried) {
    // Migrate DB up if new migrations are needed and available
    await Connector.migrateDB()
  }
  // Test the integrity of the db.
  try {
    await Connector.checkIntegrity()
    console.log('✅ DB checked')
    if (process.env.telegramToken) {
      // Load telegram bot
      require('./src')
      console.log('✅ Telegram Bot loaded')
    }
  } catch (err) {
    console.error(err)
    if (err.code) {
      // Handle
      if (retried) {
        console.log('⛔️ Could not init properly the DB')
        process.exit(1)
      } else {
        await Connector.initDB()
        await start(true)
      }
    }
  }
}

start()
