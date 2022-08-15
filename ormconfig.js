var dbconfig = {
  synchronize: true,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

console.log('inside man', process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbconfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbconfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    break;

  default:
    throw new Error('unknown env');
    break;
}

module.exports = dbconfig;
