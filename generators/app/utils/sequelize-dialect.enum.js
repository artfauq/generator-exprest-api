module.exports = {
  mysql: {
    name: 'MySQL',
    value: 'mysql',
    packages: ['mysql2@^2.3.3'],
    docker: {
      image: 'mysql:5.7',
      user: 'MYSQL_USER',
      password: 'MYSQL_PASSWORD',
      database: 'MYSQL_DATABASE',
      volume: '/var/lib/mysql',
    },
    port: 3306,
  },
  postgresql: {
    name: 'PostgreSQL',
    value: 'postgres',
    packages: ['pg@^8.8.0', 'pg-hstore@^2.3.4'],
    docker: {
      image: 'postgres:12.3',
      user: 'POSTGRES_USER',
      password: 'POSTGRES_PASSWORD',
      database: 'POSTGRES_DB',
      volume: '/var/lib/postgresql/data',
    },
    port: 5432,
  },
};
