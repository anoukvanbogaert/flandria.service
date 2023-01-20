const db = require('../connection');


const getServices = () => {
  return db
    .query(`SELECT services.*, boats.boat_name 
    FROM services
    INNER JOIN boats
    ON services.boat_id=boats.id`)
    .then(services => {
      return services.rows;
    })
    .catch(err => {
      return err.mesage;
    });
};

module.exports = {getServices};

