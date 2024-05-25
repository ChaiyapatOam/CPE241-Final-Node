import { connection } from "@/db";
import { TCreateCategory, TCategory } from "@/domain/category";

export class Category {
  public static async Create(data: TCreateCategory) {
    try {
      const query = await connection.query("INSERT INTO category SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get(): Promise<TCategory[]> {
    try {
      const [results] = await connection.query("SELECT * FROM category");
      return results as TCategory[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async Update(data: TCategory) {
    try {
      const query = await connection.query("UPDATE category SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
