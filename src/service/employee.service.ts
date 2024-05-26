import { connection } from "@/db";
import { TCreateEmployee, TEmployee } from "@/domain/employee";

export class EmployeeService {
  public static async Create(data: TCreateEmployee) {
    try {
      const query = await connection.query("INSERT INTO employee SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }

  public static async Get() {
    try {
      const [results] = await connection.query("SELECT * FROM employee");
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  public static async GetById(id: number) {
    try {
      const [results] = await connection.query(
        "SELECT * FROM employee WHERE id = ? LIMIT 1",
        id
      );
      return [results][0];
    } catch (err) {
      console.log(err);
    }
  }

  public static async Update(data: TEmployee) {
    try {
      const query = await connection.query("UPDATE employee SET ?", data);
      return query;
    } catch (err) {
      console.log(err);
    }
  }
}
