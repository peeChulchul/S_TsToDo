import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { addJsonToDos, deleteJsonToDo, getJsonToDos, modifyJsonToDo, switchJsonToDos } from "src/api/json_server";
import { Itodo } from "src/types/todo";

const QUERY_KEY = "toDos";

interface IuseToDos {
  toDos: Itodo[];
  isLoading: boolean;
  isError: boolean;
  addToDo: UseMutateFunction<AxiosResponse<any, any>, Error, Omit<Itodo, "isDone">, unknown>;
  switchToDo: UseMutateFunction<AxiosResponse<any, any>, Error, Pick<Itodo, "isDone" | "id">, unknown>;
  modifyToDo: UseMutateFunction<AxiosResponse<any, any>, Error, Omit<Itodo, "isDone">, unknown>;
  deleteToDo: UseMutateFunction<AxiosResponse<any, any>, Error, Pick<Itodo, "id">, unknown>;
}

export const useTodos = (): IuseToDos => {
  const queryClient = useQueryClient();

  const {
    data: toDos,
    isLoading,
    isError
  } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getJsonToDos
  });

  const addToDoMutation = useMutation({
    mutationFn: addJsonToDos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: () => {}
  });

  const modifyToDoMutation = useMutation({
    mutationFn: modifyJsonToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: () => {}
  });
  const switchToDoMutation = useMutation({
    mutationFn: switchJsonToDos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: () => {}
  });

  const deleteToDoMutation = useMutation({
    mutationFn: deleteJsonToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: () => {}
  });

  return {
    toDos: toDos?.data || [],
    isLoading,
    isError,
    addToDo: addToDoMutation.mutate,
    switchToDo: switchToDoMutation.mutate,
    modifyToDo: modifyToDoMutation.mutate,
    deleteToDo: deleteToDoMutation.mutate
  };
};
