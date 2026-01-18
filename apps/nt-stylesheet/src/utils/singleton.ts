export abstract class Singleton {
    private static instances = new Map<new () => unknown, unknown>()

    static getInstance<T extends Singleton>(this: new () => T): T {
        if (!Singleton.instances.has(this)) {
            Singleton.instances.set(this, new this())
        }
        return Singleton.instances.get(this) as T
    }

    static init<T extends Singleton>(this: new () => T): void {
        ;(this as unknown as { getInstance: () => T }).getInstance()
    }

    static clearInstance<T extends Singleton>(
        this: new () => T
    ): void {
        Singleton.instances.delete(this)
    }
}
