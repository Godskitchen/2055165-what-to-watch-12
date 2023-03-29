export default function addNewlinesInList<T extends string>(list: T[]) : (JSX.Element | string)[] {

  const resultList = list.map(
    (value, index) =>
      (index !== list.length - 1)
        ? (<>{` ${value}, `}<br/></>)
        : (` ${value} `)
  );

  return resultList;
}
