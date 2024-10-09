import Dexie from 'dexie';

const db = new Dexie('TimeCapsuleDB');

db.version(1).stores({
  users: '++id,name,email,password', 
  files: '++id,fileType,fileContent,unlockDate,createdAt', 
});

export default db;
