import { TokenRefreshQueue } from "./token-refresh-queue";

describe("TokenRefreshQueue", () => {
  let queue: TokenRefreshQueue;

  beforeEach(() => {
    queue = new TokenRefreshQueue();
  });

  describe("getIsRefreshing / setIsRefreshing", () => {
    it("starts as false", () => {
      expect(queue.getIsRefreshing()).toBe(false);
    });

    it("updates to true when set", () => {
      queue.setIsRefreshing(true);
      expect(queue.getIsRefreshing()).toBe(true);
    });

    it("updates back to false when set", () => {
      queue.setIsRefreshing(true);
      queue.setIsRefreshing(false);
      expect(queue.getIsRefreshing()).toBe(false);
    });
  });

  describe("subscribe", () => {
    it("adds callback to the queue", () => {
      const callback = jest.fn();
      queue.subscribe(callback);
      queue.notifySubscribers();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("adds multiple callbacks", () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      queue.subscribe(cb1);
      queue.subscribe(cb2);
      queue.notifySubscribers();
      expect(cb1).toHaveBeenCalledTimes(1);
      expect(cb2).toHaveBeenCalledTimes(1);
    });
  });

  describe("notifySubscribers", () => {
    it("calls all callbacks without error when no error passed", () => {
      const callback = jest.fn();
      queue.subscribe(callback);
      queue.notifySubscribers();
      expect(callback).toHaveBeenCalledWith(undefined);
    });

    it("calls all callbacks with error when error passed", () => {
      const callback = jest.fn();
      const error = new Error("refresh failed");
      queue.subscribe(callback);
      queue.notifySubscribers(error);
      expect(callback).toHaveBeenCalledWith(error);
    });
  });

  describe("clearSubscribers", () => {
    it("empties the subscriber queue", () => {
      const callback = jest.fn();
      queue.subscribe(callback);
      queue.clearSubscribers();
      queue.notifySubscribers();
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
