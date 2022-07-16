import * as cron from 'cron';
import { updateStock } from '../jobs/updateStock';
function startCronJobs() {
    // console.log('a');
    var CronJob = cron.CronJob;
    const job = new CronJob('*/15 * * * *', function () {
        updateStock();
    });
    job.start();
    console.log('Cron Jobs started')

}

export { startCronJobs as startJobs }