import { connection } from "@/db";

export class AnalyticService {
  public static async BookingSummary() {
    const [results] = await connection.query(
      `
    SELECT customer.first_name,customer.last_name,booking.id,SUM(payment.price) FROM payment,booking,customer
    WHERE payment.booking_id = booking.id
    AND customer.id = booking.customer_id
    GROUP BY booking.id;
    `
    );
    console.log(results);
    return results;
  }

  public static async RoomTypeByDate() {
    const [results] = await connection.query(
      `
      SELECT roomtype.id,SUM(booking.guest_number) as guest_num
      FROM booking,room,roomtype
      WHERE booking.room_id = room.id
      AND room.id = roomtype.id
      AND CURRENT_DATE BETWEEN booking.check_in_date AND booking.check_out_date
      GROUP BY roomtype.id;
    `
    );
    return results;
  }

  public static async MostRoomType() {
    const [results] = await connection.query(
      `
      SELECT name,guest_number FROM
      (SELECT roomtype.name,guest_number,COUNT(guest_number) as count
      FROM   booking,room,roomtype
      WHERE booking.room_id = room.id
      AND room.id = roomtype.id
      GROUP  BY roomtype.name,guest_number
      ORDER BY roomtype.name,count DESC) as Table1
      GROUP BY name
    `
    );
    return results;
  }

  public static async MostSellProduct() {
    const [results] = await connection.query(
      `
      SELECT roomtype.id,booking_product.product_id,SUM(booking_product.quantity) as sum FROM booking_product,booking,room,roomtype
      WHERE booking_product.booking_id = booking.id
      AND booking.room_id = room.id
      AND room.id = roomtype.id
      GROUP BY roomtype.id
      ORDER BY sum DESC
      LIMIT 5;
    `
    );
    return results;
  }
}
