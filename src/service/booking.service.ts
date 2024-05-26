import { connection } from "@/db";
import { TBooking, TCreateBooking } from "@/domain/booking";
import { CustomerService } from "./customer.service";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { PaymentService } from "./payment.service";

export class BookingService {
  public static async Create(data: TCreateBooking) {
    try {
      let customer = await CustomerService.FindByPhone(data.phone);
      if (!customer) {
        customer = await CustomerService.Create({
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          email: data.email,
        });
      }

      const [bookingResult] = await connection.query<ResultSetHeader>(
        `INSERT INTO booking (check_in_date, check_out_date, guest_number, room_id, customer_id, reception_staff)
     VALUES (?, ?, ?, ?, ?, ?)`,
        [
          new Date(data.check_in_date),
          new Date(data.check_out_date),
          data.guest_number,
          data.room_id,
          customer?.id,
          data.reception_staff,
        ]
      );
      const bookingId = [bookingResult][0].insertId;

      const [priceResult] = await connection.query<RowDataPacket[]>(
        `SELECT price FROM roomtype
     WHERE id = (SELECT type_id FROM room WHERE id = ? LIMIT 1) LIMIT 1`,
        [data.room_id]
      );
      const price = priceResult[0]?.price;

      if (!price) {
        throw new Error("Price not found");
      }
      await PaymentService.Create({
        booking_id: bookingId,
        billing_method: "cash",
        price: price,
        // title: "Room payment",
      });
      // await connection.query(
      //   `INSERT INTO payment (price, booking_id)
      //  VALUES (?, ?)`,
      //   [price, bookingId]
      // );

      return bookingId;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get() {
    try {
      const [results] = await connection.query(
        `
      SELECT b.id, b.room_id, c.first_name, c.phone, r.number as room_number  
      FROM booking b
      JOIN customer c on c.id = b.customer_id
      JOIN room r on r.id = b.room_id;
      `
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Update(data: TBooking) {
    try {
      const query = await connection.query("UPDATE booking SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
