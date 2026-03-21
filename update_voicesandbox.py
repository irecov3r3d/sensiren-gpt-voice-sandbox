import re

with open('voice_sandbox.html', 'r') as f:
    content = f.read()

content = content.replace('<script>', '<script type="module">')

imports_str = """<script type="module">
import { uid, dbPut as _dbPut, dbGetAll as _dbGetAll, dbClear as _dbClear } from './utils.js';

const DB_NAME = "voice_sandbox_db";
const DB_VERSION = 1;
const STORE = "clips";

async function putClip(clip) {
  return _dbPut(DB_NAME, DB_VERSION, STORE, clip);
}

async function getAllClips() {
  return _dbGetAll(DB_NAME, DB_VERSION, STORE);
}

async function clearAll() {
  return _dbClear(DB_NAME, DB_VERSION, STORE);
}
"""

old_script_start = """<script type="module">
const DB_NAME = "voice_sandbox_db";
const DB_VERSION = 1;
const STORE = "clips";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const os = db.createObjectStore(STORE, { keyPath: "id" });
        os.createIndex("ts", "ts");
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function putClip(clip) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(clip);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

async function getAllClips() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function clearAll() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).clear();
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
"""

content = content.replace(old_script_start, imports_str)

old_uid = """function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : (Date.now()+"-"+Math.random().toString(16).slice(2));
}
"""

content = content.replace(old_uid, "")

with open('voice_sandbox.html', 'w') as f:
    f.write(content)
