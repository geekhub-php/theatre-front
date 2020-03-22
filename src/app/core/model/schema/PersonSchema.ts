import { Employee } from '../employee/Employee';
import { Person, WithContext } from 'schema-dts';

export class PersonSchema {
  static map(employee: Employee): WithContext<Person> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      givenName: employee.first_name,
      familyName: employee.last_name,
      birthDate: employee.dob,
      jobTitle: employee.position
    };
  }
}
