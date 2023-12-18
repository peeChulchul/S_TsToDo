import axios, { AxiosResponse } from "axios";
import { Itodo } from "src/types/todo";

export const jsonServerInstance = axios.create({
  baseURL: process.env.REACT_APP_JSON_SERVER
});

export async function getJsonToDos(): Promise<AxiosResponse<Itodo[], []>> {
  const result = await jsonServerInstance.get(`toDos/?_sort=createAt&_order=desc`);
  return result;
}

export async function addJsonToDos({ content, title, id, createAt }: Omit<Itodo, "isDone">) {
  const result = await jsonServerInstance.post(`toDos`, { title, content, id, createAt, isDone: false });
  return result;
}

export async function switchJsonToDos({ id, isDone }: Pick<Itodo, "id" | "isDone">) {
  const result = await jsonServerInstance.patch(`toDos/${id}`, { isDone });
  return result;
}

export async function modifyJsonToDo({ content, title, id, createAt }: Omit<Itodo, "isDone">) {
  const result = await jsonServerInstance.patch(`toDos/${id}`, {
    content,
    title,
    createAt
  });
  return result;
}
export async function deleteJsonToDo({ id }: Pick<Itodo, "id">) {
  const result = await jsonServerInstance.delete(`toDos/${id}`);
  return result;
}
