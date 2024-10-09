import Dexie from 'dexie';

const db = new Dexie('TimeCapsuleDB');

db.version(1).stores({
  users: '++id,name,email,password', // Existing users
  files: '++id,file,unlockDate,createdAt', // New object store for files
});

export default db;
