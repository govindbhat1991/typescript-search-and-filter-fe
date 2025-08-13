export interface Class<T = any> extends Function {
    new (...arguments_: any[]): T;
}

export type InstanceOf<T> = InstanceType<Class<T>>;

export type Empty = null | undefined;

export type Maybe<T> = Empty | T;

export type Primitive = null | undefined | boolean | number | string | symbol | bigint;
