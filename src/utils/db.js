import Dexie from 'dexie';

const db = new Dexie('TimeCapsuleDB');

db.version(1).stores({
  files: '++id,fileType,fileContent,unlockDate,createdAt', // Only store files now
});

export default db;
