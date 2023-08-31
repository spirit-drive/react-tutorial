import { isValidNickname } from './helpers';
import { Customer } from '../../graphql.types';
import { get, set } from './db';
import { InvalidNickNameError } from '../../Errors';

export type CustomerDocument = Partial<Customer> & {
  save?: () => Promise<void>;
};

export class CustomerModel {
  id: string;
  name: string;
  img: string;

  constructor(data?: CustomerDocument) {
    if (data?.name && !isValidNickname(data.name)) throw new InvalidNickNameError(`"${data.name}" is not valid name`);

    this.id = data?.id || (Math.random() * 10 ** 17).toString(16);
    this.name = data?.name;
    this.img = data?.img;
  }

  static async findOne(params: Partial<Pick<CustomerDocument, 'name'>>): Promise<CustomerDocument> {
    const customers = await get();
    const found = customers.find((u) => {
      let res = false;
      if (params.name) {
        res = u.name === params.name;
      }
      return res;
    });
    return found && (new CustomerModel(found) as CustomerDocument);
  }

  static async findById(id: string): Promise<CustomerDocument> {
    const customers = await get();
    const found = customers.find((u) => u.id === id);
    return found && (new CustomerModel(found) as CustomerDocument);
  }

  static async findByIds(ids: string[]): Promise<CustomerDocument[]> {
    const customers = await get();
    const found = ids ? customers.filter((u) => ids.includes(u.id)) : customers;
    return found && found.map((f) => new CustomerModel(f) as CustomerDocument);
  }

  async save(): Promise<void> {
    const customers = await get();
    const customer = {
      id: this.id,
      name: this.name,
      img: this.img,
    };
    const index = customers.findIndex((u) => u.id === this.id);
    if (index !== -1) {
      customers[index] = customer;
      await set(customers);
      return;
    }
    customers.push(customer);
    await set(customers);
  }

  static async findByIdAndUpdate(id: string, data: Omit<Partial<Customer>, 'id'>): Promise<Customer> {
    const customers = await get();
    const result = customers?.map((i) => (i.id === id ? { ...i, ...data } : i));
    await set(result);
    return result.find((i) => i.id === id) as Customer;
  }

  static async removeById(id: string): Promise<boolean> {
    const stored = await get();
    const customers = stored?.filter((i) => i.id !== id);
    await set(customers);
    return stored?.length !== customers?.length;
  }
}
