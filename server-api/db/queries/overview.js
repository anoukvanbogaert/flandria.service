const db = require('../connection');


const getOverview = () => {
  return db
    .query(`SELECT service_name
    FROM overview`)
    .then(services => {
      return services.rows;
    })
    .catch(err => {
      return err.mesage;
    });
};

module.exports = {getOverview};