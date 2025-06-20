export interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class CacheManager {
  private static cache = new Map<string, CacheItem<any>>();
  private static defaultTTL = 5 * 60 * 1000; // 5 minutes

  static set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const now = Date.now();
    const item: CacheItem<T> = {
      data,
      timestamp: now,
      expiresAt: now + ttl,
    };
    this.cache.set(key, item);
  }

  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  static has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    const now = Date.now();
    if (now > item.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  static delete(key: string): boolean {
    return this.cache.delete(key);
  }

  static clear(): void {
    this.cache.clear();
  }

  static cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  static getStats() {
    const now = Date.now();
    let expired = 0;
    let active = 0;

    for (const item of this.cache.values()) {
      if (now > item.expiresAt) {
        expired++;
      } else {
        active++;
      }
    }

    return {
      total: this.cache.size,
      active,
      expired,
    };
  }

  // Automatic cleanup every 10 minutes
  static startCleanupTimer() {
    setInterval(() => {
      this.cleanup();
    }, 10 * 60 * 1000);
  }
}

// Enhanced profile service with caching
export class CachedProfileService {
  private static getCacheKey(userId: string, type: string) {
    return `profile_${userId}_${type}`;
  }

  static async getProfile(userId: string, forceRefresh = false) {
    const cacheKey = this.getCacheKey(userId, 'complete');
    
    if (!forceRefresh) {
      const cached = CacheManager.get(cacheKey);
      if (cached) return cached;
    }

    // Import the actual service
    const { ProfileService } = await import('./profile');
    const profile = await ProfileService.getCompleteProfile(userId);
    
    if (profile) {
      CacheManager.set(cacheKey, profile, 2 * 60 * 1000); // 2 minutes
    }
    
    return profile;
  }

  static invalidateProfile(userId: string) {
    const keys = [
      this.getCacheKey(userId, 'complete'),
      this.getCacheKey(userId, 'basic'),
      this.getCacheKey(userId, 'work'),
      this.getCacheKey(userId, 'education'),
      this.getCacheKey(userId, 'skills'),
    ];
    
    keys.forEach(key => CacheManager.delete(key));
  }
}

// Start cleanup timer when module loads
CacheManager.startCleanupTimer();