import { connection } from "@/db";
import { TRoom,TCreateRoom } from "@/domain/room";

export class RoomService {
  public static async Create(data: TCreateRoom) {
    try {
      const query = await connection.query("INSERT INTO room SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get() :Promise<TRoom[]> {
    try {
      const [results] = await connection.query("SELECT * FROM room");
      return results as TRoom[];
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
}
