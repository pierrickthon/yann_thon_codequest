/**
 * CodeQuest 2.3 - Mock Async Module
 * Simule délais, échecs et rate limiting en mode offline
 */

class MockAsync {
  constructor() {
    this.requestCount = 0;
    this.rateLimitWindow = new Map(); // endpoint -> { count, resetTime }
  }

  /**
   * Simule un délai réseau
   * @param {number} ms - Délai en millisecondes
   * @returns {Promise<void>}
   */
  delay(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Simule un appel réseau avec possibilité d'échec
   * @param {string} endpoint - Nom de l'endpoint
   * @param {Object} options - Options de simulation
   * @returns {Promise<any>}
   */
  async mockFetch(endpoint, options = {}) {
    const {
      delay = 100 + Math.random() * 200,  // 100-300ms
      failureRate = 0.1,                  // 10% échec
      rateLimit = null,                   // {requests: 10, windowMs: 60000}
      response = { data: `Mock data for ${endpoint}` }
    } = options;

    this.requestCount++;

    // Vérification rate limit
    if (rateLimit) {
      const now = Date.now();
      const window = this.rateLimitWindow.get(endpoint) || { count: 0, resetTime: now + rateLimit.windowMs };
      
      if (now > window.resetTime) {
        window.count = 0;
        window.resetTime = now + rateLimit.windowMs;
      }
      
      if (window.count >= rateLimit.requests) {
        await this.delay(delay);
        throw new Error(`Rate limit exceeded for ${endpoint}. Try again in ${Math.ceil((window.resetTime - now) / 1000)}s`);
      }
      
      window.count++;
      this.rateLimitWindow.set(endpoint, window);
    }

    // Simulation du délai réseau
    await this.delay(delay);

    // Simulation d'échec aléatoire
    if (Math.random() < failureRate) {
      throw new Error(`Network error: ${endpoint} failed (simulated)`);
    }

    return response;
  }

  /**
   * Mock pour récupérer des profils utilisateur
   */
  async mockFetchProfiles(userIds) {
    const profiles = userIds.map(id => ({
      id,
      name: `User ${id}`,
      avatar: `avatar_${id}.png`,
      score: Math.floor(Math.random() * 1000)
    }));

    return this.mockFetch('profiles', {
      delay: 150 + Math.random() * 100,
      failureRate: 0.05, // 5% échec
      response: { profiles }
    });
  }

  /**
   * Mock pour récupérer des posts
   */
  async mockFetchPosts(userId) {
    const posts = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
      id: `post_${userId}_${i}`,
      userId,
      title: `Post ${i + 1} by User ${userId}`,
      content: `Content of post ${i + 1}`,
      likes: Math.floor(Math.random() * 100)
    }));

    return this.mockFetch('posts', {
      delay: 200 + Math.random() * 150,
      failureRate: 0.08, // 8% échec
      rateLimit: { requests: 5, windowMs: 10000 }, // 5 req/10s
      response: { posts }
    });
  }

  /**
   * Mock pour récupérer des scores
   */
  async mockFetchScores(gameId) {
    const scores = Array.from({ length: 10 }, (_, i) => ({
      userId: `user_${i + 1}`,
      gameId,
      score: Math.floor(Math.random() * 10000),
      timestamp: Date.now() - Math.random() * 86400000 // Dernières 24h
    })).sort((a, b) => b.score - a.score);

    return this.mockFetch('scores', {
      delay: 180 + Math.random() * 120,
      failureRate: 0.12, // 12% échec
      rateLimit: { requests: 3, windowMs: 5000 }, // 3 req/5s
      response: { scores }
    });
  }

  /**
   * Mock pour API météo (Raid #1)
   */
  async mockWeatherAPI(city, options = {}) {
    const {
      includeHourly = false,
      includeForecast = false
    } = options;

    const weather = {
      city,
      temperature: Math.floor(Math.random() * 35) - 5, // -5°C à 30°C
      description: ['sunny', 'cloudy', 'rainy', 'snowy'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 100),
      windSpeed: Math.floor(Math.random() * 50),
      timestamp: Date.now()
    };

    if (includeHourly) {
      weather.hourly = Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        temp: weather.temperature + (Math.random() - 0.5) * 10,
        desc: weather.description
      }));
    }

    if (includeForecast) {
      weather.forecast = Array.from({ length: 7 }, (_, i) => ({
        day: i + 1,
        tempMin: weather.temperature - 5 + (Math.random() - 0.5) * 8,
        tempMax: weather.temperature + 5 + (Math.random() - 0.5) * 8,
        desc: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)]
      }));
    }

    return this.mockFetch(`weather/${city}`, {
      delay: 300 + Math.random() * 200,
      failureRate: city === 'InvalidCity' ? 1.0 : 0.15, // 15% échec, 100% si ville invalide
      rateLimit: { requests: 10, windowMs: 60000 }, // 10 req/min
      response: weather
    });
  }

  /**
   * Reset des compteurs (utile pour tests)
   */
  reset() {
    this.requestCount = 0;
    this.rateLimitWindow.clear();
  }

  /**
   * Statistiques d'usage
   */
  getStats() {
    return {
      totalRequests: this.requestCount,
      activeRateLimits: this.rateLimitWindow.size,
      rateLimitDetails: Object.fromEntries(this.rateLimitWindow)
    };
  }
}

// Singleton pour usage global
const mockAsync = new MockAsync();

module.exports = {
  MockAsync,
  mockAsync,
  
  // Helpers directs
  delay: (ms) => mockAsync.delay(ms),
  mockFetch: (endpoint, options) => mockAsync.mockFetch(endpoint, options),
  mockFetchProfiles: (userIds) => mockAsync.mockFetchProfiles(userIds),
  mockFetchPosts: (userId) => mockAsync.mockFetchPosts(userId),
  mockFetchScores: (gameId) => mockAsync.mockFetchScores(gameId),
  mockWeatherAPI: (city, options) => mockAsync.mockWeatherAPI(city, options)
};