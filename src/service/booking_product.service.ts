import { connection } from "@/db";
import {
  TBookingProduct,
  TCreateBookingProduct,
} from "@/domain/booking_product";

export class BookingProductService {
  public static async Create(data: TCreateBookingProduct) {
    try {
      const query = await connection.query(
        "INSERT INTO booking_product SET ?",
        data
      );
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get() {
    try {
      const [results] = await connection.query("SELECT * FROM booking_product");
      return [results];
    } catch (err) {
      console.log(err);
    }
  }

  public static async Update(data: TBookingProduct) {
    try {
      const query = await connection.query(
        "UPDATE booking_product SET ?",
        data
      );
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
