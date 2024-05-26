import { connection } from "@/db";
import { TRoom, TCreateRoom } from "@/domain/room";
import { PaymentService } from "./payment.service";
import { ResultSetHeader } from "mysql2";
import { RoomServiceService } from "./service.service";
import { PromotionService } from "./promotion.service";
import { ProductService } from "./product.service";
import { RoomType } from "@/domain/roomType";

export class RoomService {
  public static async Create(data: TCreateRoom) {
    try {
      const query = await connection.query("INSERT INTO room SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get(): Promise<TRoom[]> {
    try {
      const [results] = await connection.query("SELECT * FROM room");
      return results as TRoom[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  public static async GetRoomType(): Promise<RoomType[]> {
    try {
      const [results] = await connection.query("SELECT * FROM roomtype");
      return results as RoomType[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async Update(data: TRoom) {
    try {
      const query = await connection.query("UPDATE room SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async AddRoomService(data: {
    service_id: number;
    booking_id: number;
    promotion_code: string;
  }) {
    try {
      const service = await RoomServiceService.GetById(data.service_id);
      const [roomServiceResult] = await connection.query<ResultSetHeader>(
        "INSERT INTO roomservice (service_id, booking_id) VALUES (?, ?)",
        [data.service_id, data.booking_id]
      );
      if (data.promotion_code) {
        const promotion = await PromotionService.FindCode(data.promotion_code);
        await PaymentService.Create({
          booking_id: data.booking_id,
          price: service?.cost as number,
          title: "Room service",
          promotion_id: promotion.id,
        });
      }
      await PaymentService.Create({
        booking_id: data.booking_id,
        price: service?.cost as number,
        title: service?.name as string,
      });
    } catch (err) {
      console.log(err);
    }
  }

  public static async AddProduct(data: {
    booking_id: number;
    product_id: number;
    quantity: string;
  }) {
    try {
      const product = await ProductService.GetById(data.product_id);
      const [productResult] = await connection.query<ResultSetHeader>(
        "INSERT INTO booking_product (product_id, booking_id, quantity) VALUES (?, ?, ?)",
        [data.product_id, data.booking_id, data.quantity]
      );
      const [productQuantityResult] = await connection.query<ResultSetHeader>(
        `
        UPDATE product SET stock = CASE 
        WHEN stock - ? >= 0 THEN stock - ? 
        ELSE 0 
        END 
        where id = ?;`,
        [data.product_id, data.product_id, data.product_id]
      );
      await PaymentService.Create({
        booking_id: data.booking_id,
        price: product?.price as number,
        title: "Add Product",
      });
    } catch (err) {
      console.log(err);
    }
  }
}
