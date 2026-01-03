export class TokenRefreshQueue {
  private isRefreshing = false;
  private subscribers: Array<(error?: Error) => void> = [];

  getIsRefreshing(): boolean {
    return this.isRefreshing;
  }

  setIsRefreshing(value: boolean): void {
    this.isRefreshing = value;
  }

  subscribe(callback: (error?: Error) => void): void {
    this.subscribers.push(callback);
  }

  notifySubscribers(error?: Error): void {
    this.subscribers.forEach(callback => callback(error));
  }

  clearSubscribers(): void {
    this.subscribers = [];
  }
}
