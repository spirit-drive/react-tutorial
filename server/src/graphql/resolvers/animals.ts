import { ResolverWithoutSource } from '../../../types';
import { Animal, QueryAnimalsArgs } from '../../graphql.types';

const fakeAnimals: Animal[] = [
  {
    id: '1',
    name: 'Мурзик',
    age: 1.1,
    __typename: 'Cat',
  },
  {
    id: '2',
    name: 'Барсик',
    age: 0.3,
    __typename: 'Cat',
  },
  {
    id: '3',
    name: 'Бобик',
    age: 1.1,
    __typename: 'Dog',
  },
  {
    id: '4',
    name: 'Барбос',
    age: 0.3,
    __typename: 'Dog',
  },
  {
    id: '5',
    name: 'Тузик',
    age: 1.3,
    __typename: 'Dog',
  },
];

export const animals: ResolverWithoutSource<QueryAnimalsArgs, Animal[] | Error> = async (_, { ids }) =>
  ids ? fakeAnimals.filter((i) => ids.includes(i.id)) : fakeAnimals;
