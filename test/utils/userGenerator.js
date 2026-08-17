import { faker } from '@faker-js/faker';

export default async function generateUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const phone = faker.phone.number('international')
    const [basePhone, ext] = phone.split(' x')
    return  {
    firstName,
    lastName,
    email: faker.internet.email({firstName, lastName}),
    phone: basePhone,
    text: faker.lorem.lines(1)
    }
}