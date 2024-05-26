import { connection } from "@/db";
import { TPromotion, TCreatePromotion } from "@/domain/promotion";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class PromotionService {
  public static async Create(data: TCreatePromotion) {
    try {
      const [promotionResult] = await connection.query<ResultSetHeader>(
        `INSERT INTO promotion (code, start_date, expired_date, amount, discount_percent)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          data.code,
          new Date(data.start_date),
          new Date(data.expired_date),
          data.amount,
          data.discount_percent,
        ]
      );
      const promotionId = [promotionResult][0].insertId;

      for (const roomtype_id of data.roomtype_id) {
        await connection.query<ResultSetHeader>(
          `INSERT INTO room_promotion (roomtype_id, promotion_id)
          VALUES (?, ?)
          `,
          [roomtype_id, promotionId]
        );
      }
      return { ...data, id: promotionId };
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get(): Promise<TPromotion[]> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        `SELECT promotion.* , rt.name AS roomtype_name, rt.id AS roomtype_id
        FROM promotion 
        JOIN room_promotion  ON promotion.id = room_promotion.promotion_id
        JOIN roomtype rt ON room_promotion.roomtype_id = rt.id`
      );
      // console.log(results);
      const data = results as any[];
      const mergedData = data.reduce((acc, current) => {
        const existing = acc.find((item: any) => item.id === current.id);
        if (existing) {
          existing.roomtype.push({
            id: current.roomtype_id,
            name: current.roomtype_name,
          });
        } else {
          const { roomtype_id, roomtype_name, ...rest } = current;
          acc.push({
            ...rest,
            roomtype: [
              {
                id: roomtype_id,
                name: roomtype_name,
              },
            ],
          });
        }
        return acc;
      }, []);
      return mergedData as TPromotion[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  public static async FindCode(code: string): Promise<TPromotion> {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM promotion WHERE code = ? LIMIT 1",
        code
      );
      return results[0] as TPromotion;
    } catch (err) {
      console.log(err);
      return {} as TPromotion;
    }
  }

  public static async Update(data: TPromotion) {
    try {
      const query = await connection.query("UPDATE promotion SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
