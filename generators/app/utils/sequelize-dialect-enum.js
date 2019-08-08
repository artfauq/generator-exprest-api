module.exports = {
  MYSQL: {
    name: 'MySQL',
    value: 'mysql',
    packages: ['mysql2'],
  },
  POSTGRESQL: {
    name: 'PostgreSQL',
    value: 'postgres',
    packages: ['pg', 'pg-hstore'],
  },
  SQLITE: {
    name: 'SQLite',
    value: 'sqlite',
    packages: ['sqlite3'],
  },
  MARIA: {
    name: 'MariaDB',
    value: 'mariadb',
    packages: ['mariadb'],
  },
  MSSQL: {
    name: 'Microsoft SQL Server',
    value: 'mssql',
    packages: ['tedious'],
  },
};
