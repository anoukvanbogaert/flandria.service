const db = require('../connection');


const getServices = () => {
  return db
    .query(`SELECT services.*, boats.boat_name, overview.service_name as service_name 
    FROM services
    INNER JOIN boats ON services.boat_id=boats.id
    INNER JOIN overview ON services.overview_id=overview.id`)
    .then(services => {
      return services.rows;
    })
    .catch(err => {
      return err.mesage;
    });
};

module.exports = {getServices};

