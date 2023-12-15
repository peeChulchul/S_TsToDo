export interface Itodo {
  title: string;
  content: string;
  createAt: number;
  id: string;
  isDone: boolean;
}

export type Tcategory = "All" | "Active" | "Completed";
