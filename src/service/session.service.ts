import { connection } from "@/db";
import { MyTime } from "@/utils/MyTime";
import crypto from "crypto";
import { CookieOptions } from "express";
import { RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";

class SessionService {
  public cookieConfig: CookieOptions = {
    httpOnly: true,
    secure: true,
    expires: MyTime.setDays(7),
  };

  public async Create(userId: string): Promise<string> {
    const uuid = uuidv4();
    await connection.query(
      "INSERT INTO session (id, userId, expiresAt) VALUES ($1, $2, $3)",
      [uuid, userId, MyTime.setDays(7)]
    );
    // const session = await Session.create({
    //   data: {
    //     id: uuid,
    //     userId: userId,
    //     expiresAt: MyTime.setDays(7).toISOString(),
    //   },
    // });

    return this.Sign(uuid);
  }

  private Sign(id: string): string {
    const signId = crypto
      .createHmac("sha256", process.env.SESSION_SECRET || "session-secret")
      .update(id)
      .digest("hex");
    const id64 = Buffer.from(id).toString("base64url");
    return id64 + "-" + signId;
  }

  private UnSign(ssid: string): string | null {
    const arr = ssid.split("-");
    const id = Buffer.from(arr[0], "base64url").toString("ascii");
    const signId = this.Sign(id);

    if (ssid !== signId) {
      return null;
    }

    return id;
  }

  public async Validate(ssid: string) {
    const id = this.UnSign(ssid);
    if (!id) {
      console.log("Session MisMatch");
      return null;
    }

    const query = await connection.query<RowDataPacket[]>(
      "SELECT * FROM session WHERE id = ?",
      id
    );
    const session = query[0][0];
    if (!session) {
      return null;
    }

    const now = new Date();
    if (session.expires_at < now) {
      console.log("Session Expired");
      return null;
    }

    return session;
  }

  public async Delete(ssid: string) {
    const id = this.UnSign(ssid);
    if (!id) return;
    await connection.query("DELETE FROM session WHERE id = ?", id);
  }
}

export default new SessionService();
