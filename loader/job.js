require('dotenv').config()

const { CronJob } = require('cron');
const InstrumentsLoader = require('./InstrumentsLoader');

const DEFAULT_CRON_SPEC = '*/5 * * * * *'; // 5 seconds
const DEFAULT_SRC_URI = 'https://api.coingecko.com/api/v3/coins';

const cronSpec = process.env.LOADER_CRON_SPEC || DEFAULT_CRON_SPEC;
const srcUri = process.env.LOADER_SRC_URI || DEFAULT_SRC_URI;
const loader = new InstrumentsLoader(srcUri);

const job = new CronJob(
    cronSpec,
    async () => {
        await loader.load();
    },
    null, // onComplete
    true, // start
    null, // timezone
    null, // context
    false, // runOnInit
);

module.exports = job;
