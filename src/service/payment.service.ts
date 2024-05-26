import { connection } from "@/db";
import { TCreatePayment, TPayment } from "@/domain/payment";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class PaymentService {
  public static async Create(data: TCreatePayment) {
    try {
      const query = await connection.query("INSERT INTO payment SET ?", data);
      // Update promotion amount
      if (data.promotion_id) {
        const [promotionResult] = await connection.query<ResultSetHeader>(
          `
          UPDATE promotion SET amount = CASE 
          WHEN amount - ? >= 0 THEN amount - ? 
          ELSE 0 
          END 
          where id = ?;`,
          [data.promotion_id, data.promotion_id, data.promotion_id]
        );
      }
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get(): Promise<TPayment[]> {
    try {
      const [results] = await connection.query("SELECT * FROM payment");
      return results as TPayment[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async GetById(id: number): Promise<TPayment | null> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM payment WHERE id = ? LIMIT 1",
        id
      );
      return results[0] as TPayment;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async FindByPhone(phone: string): Promise<TPayment | null> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM payment WHERE phone = ? LIMIT 1",
        phone
      );
      return results[0] as TPayment;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async Update(data: TPayment) {
    try {
      data.paid_time = new Date();
      const query = await connection.query("UPDATE room SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
