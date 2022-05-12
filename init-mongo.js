db = new Mongo().getDB('admin');

db.createUser({
  user: 'admin',
  pwd: 'root',
  roles: [
    {
      role: 'clusterAdmin',
      db: 'admin',
    },
  ],
});

db.auth('admin', 'root');

db = db.getSiblingDB('nest');

db.createUser({
  user: 'user',
  pwd: 'pwd',
  roles: [
    {
      role: 'readWrite',
      db: 'nest',
    },
  ],
});

db.createCollection('user');
