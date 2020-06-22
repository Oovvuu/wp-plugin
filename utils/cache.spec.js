import cache from './cache';

describe('removeVideo', () => {
  it('Set cache value', () => {
    const value = {
      test: 'value',
    };

    // Get the cache value.
    expect(cache('test-key')).toEqual(null);

    // Set the cache value.
    cache('test-key', value);

    // Get the cache value.
    expect(cache('test-key')).toEqual(value);
  });
});
