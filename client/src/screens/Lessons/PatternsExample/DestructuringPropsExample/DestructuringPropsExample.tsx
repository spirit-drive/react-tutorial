/* eslint-disable react/no-unused-prop-types, @typescript-eslint/no-unused-vars, no-console */
import React, { FC } from 'react';
import cn from 'clsx';
import s from './DestructuringPropsExample.sass';

type PoorComponentProps = {
  two: string;
  three?: number;
  [key: string]: unknown;
};

const PoorComponent: FC<PoorComponentProps> = (props) => {
  console.log(props);
  return <p>{JSON.stringify(props)}</p>;
};

type ManyProps = PoorComponentProps & {
  one: number;
};

type ButtonProps = {
  some?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ className, ...rest }) => <button type="button" className={className} {...rest} />;

const RichComponent: FC<ManyProps> = ({ one, ...props }) => (
  <div>
    {one}

    <PoorComponent {...props} four="4" />
  </div>
);

// <PoorComponent {...{ two: '' }} />

export type DestructuringPropsExampleProps = {
  className?: string;
};

export const DestructuringPropsExample: FC<DestructuringPropsExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <RichComponent one={1} two="two" three={3} four="four" />
  </div>
);

// const person = { name: 'Nikita', age: 32, phone: '+7(999)888-77-66' };
// const { name, ...other } = person;
//
// console.log({ name, other });

// const animals = ['Утка', 'Слон', 'Тигр', 'Бобр', 'Медведь'];
// const [, , first, second, ...other] = animals;
//
// console.log({ first, second, other });
