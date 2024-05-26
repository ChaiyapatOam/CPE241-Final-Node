import { connection } from "@/db";
import { TProduct } from "@/domain/product";
import { RowDataPacket } from "mysql2";

export class ProductService {
  public static async Create(data: TProduct) {
    try {
      const query = await connection.query("INSERT INTO product SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get(): Promise<TProduct[]> {
    try {
      const [results] = await connection.query("SELECT * FROM product");
      return results as TProduct[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async GetById(id: number): Promise<TProduct | null> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM product WHERE id = ? LIMIT 1",
        id
      );
      return results[0] as TProduct;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async FindByName(name: string): Promise<TProduct[]> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM product WHERE name = ?",
        name
      );
      return results as TProduct[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async Update(data: TProduct) {
    try {
      const query = await connection.query("UPDATE product SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
