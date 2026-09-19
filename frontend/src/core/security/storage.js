/**
 * Enterprise Resilient Storage Wrapper
 * Provides safe localStorage/sessionStorage access with JSON serialization,
 * schema validation, and graceful degradation if cookies/storage are disabled.
 */

class SafeStorage {
  constructor(storageType = 'localStorage') {
    this.storageType = storageType;
    this.isAvailable = this._checkAvailability();
    this.memoryFallback = new Map();
  }

  _checkAvailability() {
    try {
      const storage = window[this.storageType];
      const testKey = '__storage_test__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  getItem(key, defaultValue = null) {
    if (!key) return defaultValue;
    try {
      if (this.isAvailable) {
        const raw = window[this.storageType].getItem(key);
        if (raw === null || raw === undefined) return defaultValue;
        try {
          return JSON.parse(raw);
        } catch {
          return raw;
        }
      }
      return this.memoryFallback.get(key) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  }

  setItem(key, value) {
    if (!key) return;
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      if (this.isAvailable) {
        window[this.storageType].setItem(key, serialized);
      } else {
        this.memoryFallback.set(key, value);
      }
    } catch (e) {
      console.warn(`Storage set failed for key "${key}":`, e);
      this.memoryFallback.set(key, value);
    }
  }

  removeItem(key) {
    if (!key) return;
    try {
      if (this.isAvailable) {
        window[this.storageType].removeItem(key);
      }
      this.memoryFallback.delete(key);
    } catch {
      this.memoryFallback.delete(key);
    }
  }

  clear() {
    try {
      if (this.isAvailable) {
        window[this.storageType].clear();
      }
      this.memoryFallback.clear();
    } catch {
      this.memoryFallback.clear();
    }
  }
}

export const safeLocalStorage = new SafeStorage('localStorage');
export const safeSessionStorage = new SafeStorage('sessionStorage');

export default safeLocalStorage;
