exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('templates', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.string('thumbnail_url');
      table.string('category');
      table.timestamps(true, true);
    })
    .createTable('favorites', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('template_id').unsigned().references('id').inTable('templates').onDelete('CASCADE');
      table.timestamps(true, true);
      table.unique(['user_id', 'template_id']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('favorites')
    .dropTableIfExists('templates')
    .dropTableIfExists('users');
};
