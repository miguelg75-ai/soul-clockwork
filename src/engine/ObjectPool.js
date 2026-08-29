export class ObjectPool {
  constructor(factory, size) {
    this.pool = new Array(size);
    this.freeIndices = new Array(size);
    this.freeCount = size;

    for (let i = 0; i < size; i++) {
      this.pool[i] = factory();
      this.pool[i].active = false;
      this.freeIndices[i] = i;
    }
  }

  obtain() {
    if (this.freeCount === 0) return null;
    this.freeCount--;
    const index = this.freeIndices[this.freeCount];
    const instance = this.pool[index];
    instance.active = true;
    if (typeof instance.reset === "function") {
      instance.reset();
    }
    return instance;
  }

  release(instance) {
    const index = this.pool.indexOf(instance);
    if (index === -1 || !instance.active) return;
    instance.active = false;
    this.freeIndices[this.freeCount] = index;
    this.freeCount++;
  }

  getActiveEntities() {
    return this.pool;
  }
}
