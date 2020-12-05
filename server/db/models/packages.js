const { Model } = require("objection");
const knex = require("knex");
const knexFile = require("../../../knexfile");

Model.knex(knex(knexFile.knexConfig.development));
class Package extends Model {
  static get tableName() {
    return "packages";
  }
}
module.exports = Package;
