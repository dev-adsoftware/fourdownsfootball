import 'reflect-metadata';
import {ClassConstructor, plainToClass} from 'class-transformer';
import {validateSync, ValidationError} from 'class-validator';

abstract class Dto {
  public init(obj?: Record<string | number, unknown>): this {
    Object.assign(
      this,
      plainToClass(this.constructor as ClassConstructor<this>, {...obj}),
    );
    return this.validate(true);
  }

  public toPlainObject(): Record<string, unknown> {
    return JSON.parse(this.serialize());
  }

  public serialize(): string {
    return JSON.stringify(this);
  }

  public clone<
    T extends {init(obj?: Record<string | number, unknown>): T},
  >(): T {
    const copy = new (this.constructor as ClassConstructor<T>)();
    copy.init(this.toPlainObject());
    return copy;
  }

  private validate(whitelist: boolean): this {
    const errors = validateSync(this, {
      whitelist,
      validationError: {target: false},
    });
    if (errors.length > 0) {
      throw new Error(
        `${this.constructor.name}: ${this.validationErrors(errors)}`,
      );
    }

    return this;
  }

  private validationErrors(errors: ValidationError[]): string {
    return errors
      .map(e => {
        if (e.constraints) {
          return Object.values(e.constraints).join(', ');
        }
        return String(e);
      })
      .join(', ');
  }
}

export {Dto};
