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
  }, [key, value]);

  return { value, setValue };
}
