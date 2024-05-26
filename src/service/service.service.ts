import { connection } from "@/db";
import { TCreateRoomService, TRoomService } from "@/domain/service";
import { RowDataPacket } from "mysql2";

export class RoomServiceService {
  public static async Create(data: TCreateRoomService) {
    try {
      const query = await connection.query("INSERT INTO service SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get(): Promise<TRoomService[]> {
    try {
      const [results] = await connection.query("SELECT * FROM service");
      return results as TRoomService[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async GetById(id: number): Promise<TRoomService | null> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM service WHERE id = ? LIMIT 1",
        id
      );
      return results[0] as TRoomService;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async FindByPhone(phone: string): Promise<TRoomService | null> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM payment WHERE phone = ? LIMIT 1",
        phone
      );
      return results[0] as TRoomService;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async Update(data: TRoomService) {
    try {
      const query = await connection.query("UPDATE room SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
