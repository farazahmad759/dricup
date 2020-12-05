exports.up = function (knex) {
    return knex.schema.createTable('templates', function (table) {
      table.increments();
table.string('title').nullable();
table.string('description').nullable();
table.string('before_instructions').nullable();
table.text('instructions').nullable();
table.string('after_instructions').nullable();
table.string('tags').nullable();
table.integer('created_by').nullable();

    });
  };exports.down = function (knex) {
    return knex.schema.dropTable('templates');
  };
  