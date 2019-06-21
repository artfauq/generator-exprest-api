module.exports = {
  MYSQL: {
    name: 'MySQL',
    value: 'mysql',
    packages: [
      {
        mysql2: '^1.6.5',
      },
    ],
  },
  POSTGRESQL: {
    name: 'PostgreSQL',
    value: 'postgres',
    packages: [
      {
        pg: '^7.11.0',
        'pg-hstore': '^2.3.3',
      },
    ],
  },
  SQLITE: {
    name: 'SQLite',
    value: 'sqlite',
    packages: [
      {
        sqlite3: '^4.0.9',
      },
    ],
  },
  MARIA: {
    name: 'MariaDB',
    value: 'mariadb',
    packages: [
      {
        mariadb: '^2.0.5',
      },
    ],
  },
  MSSQL: {
    name: 'Microsoft SQL Server',
    value: 'mssql',
    packages: [
      {
        tedious: '^6.2.0',
      },
    ],
  },
};
