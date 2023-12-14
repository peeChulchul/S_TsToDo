export interface Itodo {
  title: string;
  content: string;
  createAt: number;
  key: string;
  isDone: boolean;
}

export type Tcategory = "All" | "Active" | "Completed";
