export type KeyOfType<Type, ValueType> = keyof {
  [Key in keyof Type as Type[Key] extends ValueType ? Key : never]: any;
};

export type ClassMethods<T> = KeyOfType<T, Function>;
export type ClassMethodsRecord<Type> = Partial<Record<ClassMethods<Omit<Type, 'defineAll'>>, any>>;

