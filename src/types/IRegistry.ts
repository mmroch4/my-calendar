import { Subject } from "./Subject";
import { Type } from "./Type";

export interface IRegistry {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  type: Type;
  subjects: Subject[];
  title: string;
  details: string | null;
  date: string;
  startAt: string | null;
  endAt: string | null;
}
