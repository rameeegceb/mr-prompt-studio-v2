/**
 * ============================================================
 * Mr. Prompt Studio
 * Enterprise Storage Service
 * ============================================================
 *
 * Centralized wrapper around localStorage.
 *
 * Future:
 * localStorage
 * ↓
 * IndexedDB
 * ↓
 * REST API
 * ↓
 * Enterprise Database
 *
 * No feature should access localStorage directly.
 */

class StorageService {
  constructor(prefix = "mrpromptstudio") {
    this.prefix = prefix;
  }

  /**
   * Builds the storage key.
   */
  buildKey(key) {
    return `${this.prefix}.${key}`;
  }

  /**
   * Returns true if localStorage is available.
   */
  isAvailable() {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Save any value.
   */
  set(key, value) {
    if (!this.isAvailable()) return;

    try {
      localStorage.setItem(
        this.buildKey(key),
        JSON.stringify(value)
      );
    } catch (error) {
      console.error("Storage Error:", error);
    }
  }

  /**
   * Read any value.
   */
  get(key, defaultValue = null) {
    if (!this.isAvailable()) return defaultValue;

    try {
      const value = localStorage.getItem(
        this.buildKey(key)
      );

      if (value === null) {
        return defaultValue;
      }

      return JSON.parse(value);
    } catch (error) {
      console.error("Storage Error:", error);

      return defaultValue;
    }
  }

  /**
   * Remove one key.
   */
  remove(key) {
    if (!this.isAvailable()) return;

    localStorage.removeItem(this.buildKey(key));
  }

  /**
   * Check existence.
   */
  has(key) {
    if (!this.isAvailable()) return false;

    return (
      localStorage.getItem(
        this.buildKey(key)
      ) !== null
    );
  }

  /**
   * Clear only Mr Prompt Studio keys.
   */
  clear() {
    if (!this.isAvailable()) return;

    Object.keys(localStorage)
      .filter((key) =>
        key.startsWith(this.prefix)
      )
      .forEach((key) =>
        localStorage.removeItem(key)
      );
  }

  /**
   * Returns all application keys.
   */
  keys() {
    if (!this.isAvailable()) return [];

    return Object.keys(localStorage)
      .filter((key) =>
        key.startsWith(this.prefix)
      )
      .sort();
  }

  /**
   * Storage usage statistics.
   */
  statistics() {
    const keys = this.keys();

    let bytes = 0;

    keys.forEach((key) => {
      const value =
        localStorage.getItem(key) ?? "";

      bytes += key.length;
      bytes += value.length;
    });

    return {
      totalKeys: keys.length,
      estimatedBytes: bytes,
      estimatedKB: (
        bytes / 1024
      ).toFixed(2),
    };
  }

  /**
   * Export all application data.
   */
  export() {
    const data = {};

    this.keys().forEach((key) => {
      data[key] = JSON.parse(
        localStorage.getItem(key)
      );
    });

    return data;
  }

  /**
   * Import previously exported data.
   */
  import(data = {}) {
    Object.entries(data).forEach(
      ([key, value]) => {
        localStorage.setItem(
          key,
          JSON.stringify(value)
        );
      }
    );
  }
}

export default new StorageService();