module.exports = {
  mysql: {
    name: 'MySQL',
    value: 'mysql',
    packages: ['mysql2@2'],
    port: 3306,
  },
  postgresql: {
    name: 'PostgreSQL',
    value: 'postgres',
    packages: ['pg@7', 'pg-hstore'],
    port: 5432,
  },
  maria: {
    name: 'MariaDB',
    value: 'mariadb',
    packages: ['mariadb'],
    port: 3306,
  },
  mssql: {
    name: 'Microsoft SQL Server',
    value: 'mssql',
    packages: ['tedious@6'],
    port: 1433,
  },
};
