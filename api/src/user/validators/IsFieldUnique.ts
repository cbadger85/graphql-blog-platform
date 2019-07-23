import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../User.repository';

const userRepository = getCustomRepository(UserRepository);

@ValidatorConstraint({ async: true })
export class IsFieldUniqueConstraint implements ValidatorConstraintInterface {
  validate(fieldValue: string, args: ValidationArguments): Promise<boolean> {
    return userRepository.findByField(args.property, fieldValue).then(user => {
      if (!user) {
        return true;
      }

      return false;
    });
  }
}

export function IsFieldUnique(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFieldUniqueConstraint,
    });
  };
}
