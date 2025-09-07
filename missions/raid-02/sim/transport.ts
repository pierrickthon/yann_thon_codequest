/**
 * Raid #2 - Transport Layer Simulation
 * Simulates WebSocket connections using event bus
 */

export interface EditEvent {
  id: string;
  userId: string;
  type: 'operation' | 'cursor' | 'connect' | 'disconnect';
  timestamp: number;
  data: any;
}

export interface Connection {
  userId: string;
  isConnected: boolean;
  latency: number;
  send(event: EditEvent): void;
  disconnect(): void;
}

export interface NetworkConditions {
  latency: { min: number; max: number };
  dropRate: number;
  partitions: Set<string>[];
}

export class SimulatedTransport {
  private connections = new Map<string, SimulatedConnection>();
  private eventBus = new Map<string, ((event: EditEvent) => void)[]>();
  private conditions: NetworkConditions = {
    latency: { min: 10, max: 50 },
    dropRate: 0,
    partitions: []
  };

  connect(userId: string, onMessage: (event: EditEvent) => void): Connection {
    const connection = new SimulatedConnection(userId, this, onMessage);
    this.connections.set(userId, connection);
    
    if (!this.eventBus.has(userId)) {
      this.eventBus.set(userId, []);
    }
    this.eventBus.get(userId)!.push(onMessage);

    // Broadcast connect event
    this.broadcast({
      id: this.generateId(),
      userId,
      type: 'connect',
      timestamp: Date.now(),
      data: { userId }
    });

    return connection;
  }

  broadcast(event: EditEvent): void {
    // Check if sender is partitioned
    const senderPartition = this.findPartition(event.userId);
    
    this.connections.forEach((connection, targetUserId) => {
      if (targetUserId === event.userId) return; // Don't send to self
      
      // Check network partition
      const targetPartition = this.findPartition(targetUserId);
      if (senderPartition !== null && targetPartition !== null && 
          senderPartition !== targetPartition) {
        return; // Different partitions, drop message
      }

      // Check packet drop
      if (Math.random() < this.conditions.dropRate) {
        return; // Simulate packet loss
      }

      // Simulate network latency
      const latency = this.conditions.latency.min + 
                     Math.random() * (this.conditions.latency.max - this.conditions.latency.min);
      
      setTimeout(() => {
        if (connection.isConnected) {
          connection.receive(event);
        }
      }, latency);
    });
  }

  // Network condition simulation
  setLatency(min: number, max: number): void {
    this.conditions.latency = { min, max };
  }

  setDropRate(rate: number): void {
    this.conditions.dropRate = Math.max(0, Math.min(1, rate));
  }

  createPartition(userIds: string[]): void {
    this.conditions.partitions.push(new Set(userIds));
  }

  healPartitions(): void {
    this.conditions.partitions = [];
  }

  simulateDisconnect(userId: string, duration: number): void {
    const connection = this.connections.get(userId);
    if (connection) {
      connection.forceDisconnect();
      setTimeout(() => {
        if (this.connections.has(userId)) {
          connection.forceReconnect();
        }
      }, duration);
    }
  }

  private findPartition(userId: string): number | null {
    for (let i = 0; i < this.conditions.partitions.length; i++) {
      if (this.conditions.partitions[i].has(userId)) {
        return i;
      }
    }
    return null;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Cleanup
  shutdown(): void {
    this.connections.forEach(conn => conn.disconnect());
    this.connections.clear();
    this.eventBus.clear();
  }
}

class SimulatedConnection implements Connection {
  public isConnected = true;

  constructor(
    public userId: string,
    private transport: SimulatedTransport,
    private onMessage: (event: EditEvent) => void
  ) {}

  send(event: EditEvent): void {
    if (!this.isConnected) {
      throw new Error(`Connection ${this.userId} is disconnected`);
    }
    
    event.userId = this.userId;
    event.timestamp = Date.now();
    this.transport.broadcast(event);
  }

  receive(event: EditEvent): void {
    if (this.isConnected && this.onMessage) {
      this.onMessage(event);
    }
  }

  disconnect(): void {
    this.isConnected = false;
    
    // Broadcast disconnect event
    this.transport.broadcast({
      id: this.transport['generateId'](),
      userId: this.userId,
      type: 'disconnect',
      timestamp: Date.now(),
      data: { userId: this.userId }
    });
  }

  forceDisconnect(): void {
    this.isConnected = false;
  }

  forceReconnect(): void {
    this.isConnected = true;
  }

  get latency(): number {
    return (this.transport['conditions'].latency.min + 
            this.transport['conditions'].latency.max) / 2;
  }
}