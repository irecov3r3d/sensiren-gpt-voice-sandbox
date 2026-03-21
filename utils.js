export function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  } else if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    // Fallback to crypto.getRandomValues for cryptographic UUIDv4
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);

    // Set version to 4
    arr[6] = (arr[6] & 0x0f) | 0x40;
    // Set variant to 10
    arr[8] = (arr[8] & 0x3f) | 0x80;

    const hex = [...arr].map(b => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20,32)}`;
  } else {
    // Insecure fallback if crypto API is completely missing
    return (Date.now() + "-" + Math.random().toString(16).slice(2));
  }
}

export function openDB(dbName, dbVersion, storeName) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName, dbVersion);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const os = db.createObjectStore(storeName, { keyPath: "id" });
        os.createIndex("ts", "ts");
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function dbPut(dbName, dbVersion, storeName, item) {
  const db = await openDB(dbName, dbVersion, storeName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(item);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export async function dbGetAll(dbName, dbVersion, storeName) {
  const db = await openDB(dbName, dbVersion, storeName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export async function dbClear(dbName, dbVersion, storeName) {
  const db = await openDB(dbName, dbVersion, storeName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).clear();
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
