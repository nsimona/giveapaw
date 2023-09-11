import { Types } from "mongoose";

export function isArrayOfValidMongoIds(ids: string[]) {
  for (const id of ids) {
    return Types.ObjectId.isValid(id);
  }
}
