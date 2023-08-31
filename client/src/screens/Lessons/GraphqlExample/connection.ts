import { gql } from '@apollo/client';
import { Mutation, Query } from 'src/server.types';
import { get } from 'src/utils/unchanged';

export const CUSTOMER = gql`
  fragment Customer on Customer {
    id
    name
    img
  }
`;

export type GetCustomerResponse = Pick<Query, 'customers'>;

export type GetCustomerArgs = {
  ids?: string[];
};

export const GET_CUSTOMERS = gql`
  query getCustomers($ids: [ID!]) {
    customers(ids: $ids) {
      ...Customer
    }
  }
  ${CUSTOMER}
`;

export type AddCustomerResponse = {
  customers: Pick<Mutation['customers'], 'add'>;
};

export type AddCustomerArgs = {
  name: string;
  img?: string;
};
export const ADD_CUSTOMER = gql`
  mutation addCustomer($name: String!, $img: String) {
    customers {
      add(name: $name, img: $img) {
        ...Customer
      }
    }
  }
  ${CUSTOMER}
`;

export type EditCustomerResponse = {
  customers: Pick<Mutation['customers'], 'edit'>;
};

export type EditCustomerArgs = {
  id: string;
  name: string;
  img?: string;
};

export const EDIT_CUSTOMER = gql`
  mutation editCustomer($id: ID!, $name: String!, $img: String) {
    customers {
      edit(id: $id, name: $name, img: $img) {
        ...Customer
      }
    }
  }
  ${CUSTOMER}
`;

export type RemoveCustomerResponse = {
  customers: Pick<Mutation['customers'], 'remove'>;
};

export type RemoveCustomerArgs = {
  id: string;
};
export const REMOVE_CUSTOMER = gql`
  mutation removeCustomer($id: ID!) {
    customers {
      remove(id: $id)
    }
  }
`;

export const extractGetCustomers = (data: GetCustomerResponse): Query['customers'] => get('customers', data);
export const extractGetCustomer = (data: GetCustomerResponse): Query['customers'][number] => get('customers[0]', data);
export const extractAddCustomer = (data: AddCustomerResponse): Mutation['customers']['add'] =>
  get(`customers.add`, data);
export const extractEditCustomer = (data: EditCustomerResponse): Mutation['customers']['edit'] =>
  get(`customers.edit`, data);
export const extractRemoveCustomer = (data: RemoveCustomerResponse): Mutation['customers']['remove'] =>
  get(`customers.remove`, data);
