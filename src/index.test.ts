import { act, renderHook } from '@testing-library/react-hooks';
import useKeyDown from '.';

const TEST_KEY = 'Enter';

const TEST_KEY_DOWN_EVENT: KeyboardEvent = new KeyboardEvent('keydown', {
  key: TEST_KEY,
});

const TEST_KEY_UP_EVENT: KeyboardEvent = new KeyboardEvent('keyup', {
  key: TEST_KEY,
});

const TEST_OTHER_KEY = 'Ctrl';

const TEST_OTHER_KEY_DOWN_EVENT: KeyboardEvent = new KeyboardEvent('keydown', {
  key: TEST_OTHER_KEY,
});

const TEST_OTHER_KEY_UP_EVENT: KeyboardEvent = new KeyboardEvent('keyup', {
  key: TEST_OTHER_KEY,
});

describe('useKeyDown', (): void => {
  it('should default to false', (): void => {
    const { result } = renderHook(useKeyDown);
    expect(result.current).toBe(false);
  });

  it('should listen for keyboard events on mount', (): void => {
    const windowAddEventLstenerSpy: jest.SpyInstance<void> = jest.spyOn(
      window,
      'addEventListener',
    );
    expect(windowAddEventLstenerSpy).toHaveBeenCalledTimes(0);

    renderHook(useKeyDown, { initialProps: TEST_KEY });

    // @testing-library calls this method 5 additional times.
    // expect(windowAddEventLstenerSpy).toHaveBeenCalledTimes(2);
    expect(windowAddEventLstenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
    expect(windowAddEventLstenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function),
    );
  });

  it('should respond to matching keydown events', (): void => {
    const { result } = renderHook(useKeyDown, { initialProps: TEST_KEY });

    act((): void => {
      window.dispatchEvent(TEST_KEY_DOWN_EVENT);
    });

    expect(result.current).toBe(true);
  });

  it('should not respond to unmatching keydown events', (): void => {
    const { result } = renderHook(useKeyDown, { initialProps: TEST_KEY });

    act((): void => {
      window.dispatchEvent(TEST_OTHER_KEY_DOWN_EVENT);
    });

    expect(result.current).toBe(false);
  });

  it('should respond to matching keyup events', (): void => {
    const { result } = renderHook(useKeyDown, { initialProps: TEST_KEY });

    act((): void => {
      window.dispatchEvent(TEST_KEY_DOWN_EVENT);
    });
    act((): void => {
      window.dispatchEvent(TEST_KEY_UP_EVENT);
    });

    expect(result.current).toBe(false);
  });

  it('should not respond to unmatching keyup events', (): void => {
    const { result } = renderHook(useKeyDown, { initialProps: TEST_KEY });

    act((): void => {
      window.dispatchEvent(TEST_KEY_DOWN_EVENT);
    });
    act((): void => {
      window.dispatchEvent(TEST_OTHER_KEY_UP_EVENT);
    });

    expect(result.current).toBe(true);
  });

  it('should stop listening to keyboard events on unmount', (): void => {
    const windowRemoveEventListenerSpy: jest.SpyInstance<void> = jest.spyOn(
      window,
      'removeEventListener',
    );
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledTimes(0);
    const { unmount } = renderHook(useKeyDown, { initialProps: TEST_KEY });
    // @testing-library calls this method 5 additional times.
    // expect(windowRemoveEventListenerSpy).toHaveBeenCalledTimes(0);

    unmount();

    // @testing-library calls this method 9 additional times.
    // expect(windowRemoveEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function),
    );
  });
});
