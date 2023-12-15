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

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    const jsonValue = localStorage.getItem(key);
    console.log("로컬스토리지 데이터", jsonValue);
  }, [key, value]);

  return { value, setValue };
}
