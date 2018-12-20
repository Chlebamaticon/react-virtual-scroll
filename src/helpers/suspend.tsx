const suspendFunction = (fn: Function, threshold: number = 1) => {
    let counter = 0;

    return async function(...args: any[]) {
        if ( counter >= threshold )
            return;
        
        counter++;
        await fn.call(this, ...args);
        counter--;
    }
};

export const Suspend = (threshold: number = 1) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const originalFn = descriptor.value;
    
        descriptor.value = suspendFunction(originalFn, threshold);
    
        return descriptor;
    }
};