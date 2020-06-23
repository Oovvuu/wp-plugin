import Cache from './cache';

describe('removeVideo', () => {
  it('Set cache value', () => {
    const value = {
      test: 'value',
    };

    // Get the cache value.
    expect(Cache.get('test-key')).toEqual(null);

    // Set the cache value.
    Cache.set('test-key', value);

    // Get the cache value.
    expect(Cache.get('test-key')).toEqual(value);

    // Delete the cache value.
    Cache.delete('test-key');

    // Cache was deleted.
    expect(Cache.get('test-key')).toEqual(null);
  });
});
