import StorageService from "../../../core/services/StorageService";
import PromptVersion from "../models/PromptVersion";

const STORAGE_KEY = "prompt.versions";
const VERSION_LIMIT = 50;

class VersionRepository {
  getAll() {
    const storedVersions =
      StorageService.get(STORAGE_KEY, []);

    if (!Array.isArray(storedVersions)) {
      return [];
    }

    const versions = storedVersions.map(
      (version) => new PromptVersion(version)
    );

    if (
      versions.some(
        (version) => version.versionNumber <= 0
      )
    ) {
      const migratedVersions =
        this.assignLegacyVersionNumbers(versions);

      this.persist(migratedVersions);

      return migratedVersions;
    }

    return this.sortVersions(versions);
  }

  findById(id) {
    return this.getAll().find(
      (version) => version.id === id
    ) ?? null;
  }

  save(version) {
    const nextVersion =
      version instanceof PromptVersion
        ? version
        : new PromptVersion(version);

    const versions = this.getAll().filter(
      (item) => item.id !== nextVersion.id
    );

    const nextVersions = this.sortVersions([
      nextVersion,
      ...versions,
    ]).slice(0, VERSION_LIMIT);

    this.persist(nextVersions);

    return nextVersion;
  }

  update(id, changes = {}) {
    let updatedVersion = null;

    const nextVersions = this.getAll().map(
      (version) => {
        if (version.id !== id) {
          return version;
        }

        updatedVersion = new PromptVersion({
          ...version,
          ...changes,
          id: version.id,
          versionNumber:
            version.versionNumber,
          timestamp: version.timestamp,
        });

        return updatedVersion;
      }
    );

    if (!updatedVersion) {
      return null;
    }

    this.persist(nextVersions);

    return updatedVersion;
  }

  delete(id) {
    const nextVersions = this.getAll().filter(
      (version) => version.id !== id
    );

    this.persist(nextVersions);
  }

  clear() {
    StorageService.remove(STORAGE_KEY);
  }

  assignLegacyVersionNumbers(versions) {
    const chronologicalVersions = [
      ...versions,
    ].reverse();

    return this.sortVersions(
      chronologicalVersions.map(
        (version, index) =>
          new PromptVersion({
            ...version,
            versionNumber: index + 1,
          })
      )
    );
  }

  sortVersions(versions) {
    return [...versions].sort((left, right) => {
      if (
        left.versionNumber !== right.versionNumber
      ) {
        return (
          right.versionNumber -
          left.versionNumber
        );
      }

      return (
        new Date(right.timestamp).getTime() -
        new Date(left.timestamp).getTime()
      );
    });
  }

  persist(versions) {
    StorageService.set(
      STORAGE_KEY,
      this.sortVersions(versions).slice(
        0,
        VERSION_LIMIT
      )
    );
  }
}

export default new VersionRepository();