import { Fragment } from 'react';
export default function addNewlinesInList<T extends string>(list: T[]) : JSX.Element[] {

  const resultList = list.map(
    (value, index) =>
      (index !== list.length - 1)
        ? (<Fragment key={value}>{` ${value}, `}<br/></Fragment>)
        : (<Fragment key={value}>{` ${value} `}</Fragment>)
  );

  return resultList;
}
