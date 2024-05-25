import { connection } from "@/db";
import { TCreateCustomer, TCustomer } from "@/domain/customer";
import { RowDataPacket } from "mysql2";

export class CustomerService {
  public static async Create(data: TCreateCustomer) {
    try {
      const query = await connection.query("INSERT INTO customer SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get(): Promise<TCustomer[]> {
    try {
      const [results] = await connection.query("SELECT * FROM customer");
      return results as TCustomer[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async GetById(id: number): Promise<TCustomer | null> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM customer WHERE id = ? LIMIT 1",
        id
      );
      return results[0] as TCustomer;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async FindByPhone(phone: string): Promise<TCustomer | null> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM customer WHERE phone = ? LIMIT 1",
        phone
      );
      return results[0] as TCustomer;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async Update(data: TCustomer) {
    try {
      const query = await connection.query("UPDATE room SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
