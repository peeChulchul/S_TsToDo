import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IuseLocalStorage {
  key: string;
  initialValue: string[];
}

export interface Itodo {
  title: string;
  content: string;
  createAt: number;
  key: string;
  isDone: boolean;
}

export default function useLocalStorage({ key, initialValue }: IuseLocalStorage): {
  value: Itodo[];
  setValue: Dispatch<SetStateAction<Itodo[]>>;
} {
  const [value, setValue] = useState<Itodo[]>(() => {
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
