import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IuseLocalStorage<T> {
  key: string;
  initialValue: T;
}

export default function useLocalStorage<T>({ key, initialValue }: IuseLocalStorage<T>): {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
} {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null) {
      return initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  console.log("코드 실행됨");
  useEffect(() => {
    console.log(value);
    localStorage.setItem(key, JSON.stringify(value));
    const jsonValue = localStorage.getItem(key);
    console.log(jsonValue);
  }, [key, value]);

  return { value, setValue };
}
