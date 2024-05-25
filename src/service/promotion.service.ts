import { connection } from "@/db";
import { TPromotion, TCreatePromotion } from "@/domain/promotion";
import { RowDataPacket } from "mysql2";

export class Promotion {
  public static async Create(data: TCreatePromotion) {
    try {
      const query = await connection.query("INSERT INTO promotion SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get(): Promise<TPromotion[]> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM promotion"
      );
      return results as TPromotion[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async Update(data: TPromotion) {
    try {
      const query = await connection.query("UPDATE promotion SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
