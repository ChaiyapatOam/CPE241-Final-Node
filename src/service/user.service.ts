import { connection } from "@/db";
import { RoomType } from "@/domain/roomType";
import { RowDataPacket } from "mysql2";
type TRoomType = {
  name: string;
  price: number;
  max_people: number;
};

export class UserService {
  public static async Create(data: RoomType) {
    const roomType = { name: "Hello MySQL", price: 5000, max_people: 50 };
    // const query = await connection.query("INSERT INTO roomtype SET ?", data);
    // const query = await connection.query("UPDATE roomtype SET ?", roomType);
    const query = await connection.query<RowDataPacket[]>("SELECT * FROM roomtype", roomType);
    const results = query[0];
    console.log(results[0]);
    return results;
  }

  public static async Update(data: RoomType) {
    const roomType = { name: "Hello MySQL", price: 5000, max_people: 50 };
    const query = await connection.query(
      "UPDATE customer SET ?",
      data
    );
    // const query = await connection.query("UPDATE roomtype SET ?", roomType);
    // const query = await connection.query("SELECT * FROM roomtype", roomType);
    console.log(query);
  }
}
