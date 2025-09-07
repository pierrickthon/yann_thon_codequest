#!/usr/bin/env node

/**
 * Raid #1 - Weather Service Tests
 * Tests de validation pour l'évaluation
 */

const WeatherService = require('./scaffold/weather-service');

async function runTests() {
  console.log('🧪 Raid #1 - Weather Service Tests\n');
  
  const service = new WeatherService();
  let passed = 0, failed = 0;

  function test(description, condition) {
    if (condition) {
      console.log(`✅ ${description}`);
      passed++;
    } else {
      console.log(`❌ ${description}`);
      failed++;
    }
  }

  try {
    // Test 1: Basic weather fetch
    console.log('📋 Testing basic functionality...');
    const weather = await service.getCurrentWeather('Paris');
    test('getCurrentWeather returns data', weather && weather.city === 'Paris');
    test('Weather has required fields', 
         weather.temperature !== undefined && weather.description !== undefined);

    // Test 2: Error handling
    console.log('\n📋 Testing error handling...');
    try {
      await service.getCurrentWeather('InvalidCity');
      test('Invalid city throws error', false);
    } catch (error) {
      test('Invalid city throws error', true);
    }

    // Test 3: Batch processing
    console.log('\n📋 Testing batch processing...');
    const cities = ['Paris', 'London', 'Berlin'];
    const batchResults = await service.getBatchWeather(cities);
    test('Batch returns array', Array.isArray(batchResults));
    test('Batch handles multiple cities', batchResults.length === cities.length);

    // Test 4: Health check
    console.log('\n📋 Testing health status...');
    const health = await service.getHealthStatus();
    test('Health check returns status', health && health.service);
    test('Health includes uptime', typeof health.uptime === 'number');

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
    
    if (failed === 0) {
      console.log('🏆 All basic tests passed! Ready for advanced implementation.');
      console.log('\n💡 Next steps:');
      console.log('  - Implement circuit breaker pattern');
      console.log('  - Add intelligent caching with TTL');
      console.log('  - Implement retry with exponential backoff');
      console.log('  - Add rate limiting per source');
      console.log('  - Test graceful degradation scenarios');
    } else {
      console.log('🔧 Fix failing tests before adding advanced features.');
    }

    console.log('\n🎯 Full rubric: See mission-brief.md for 100-point scoring');
    process.exit(failed === 0 ? 0 : 1);

  } catch (error) {
    console.log(`❌ Test setup error: ${error.message}`);
    process.exit(1);
  }
}

runTests();