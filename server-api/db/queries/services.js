const db = require('../connection');


const getServices = () => {
  return db
    .query(`SELECT overview_id FROM services`)
    .then(services => {
      return services.rows;
    })
    .catch(err => {
      return err.mesage;
    });
};

module.exports = {getServices};