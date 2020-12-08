exports.up = function (knex) {
    return knex.schema.createTable('packages', function (table) {
      table.increments();
table.string('title').nullable();
table.string('description').nullable();
table.string('npm_command').nullable();
table.text('npm_url').nullable();
table.string('github_url').nullable();
table.string('belongs_to').nullable();
table.string('type').nullable();
table.text('tags').nullable();

    });
  };exports.down = function (knex) {
    return knex.schema.dropTable('packages');
  };
  