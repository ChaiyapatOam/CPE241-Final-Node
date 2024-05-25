import { connection } from "@/db";
import { RoomType } from "@/domain/roomType";

export class RoomTypeService {
  public static async Create(data: RoomType) {
    // const roomType = { name: "Hello MySQL", price: 5000, max_people: 50 };
    const query = await connection.query("INSERT INTO roomtype SET ?", data);
    // const query = await connection.query("UPDATE roomtype SET ?", roomType);
    // const query = await connection.query("SELECT * FROM roomtype", roomType);
    console.log(query);
  }
}
