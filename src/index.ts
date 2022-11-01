import { Pool } from 'pg';
import Cursor from 'pg-cursor';
import * as dotenv from 'dotenv';
dotenv.config();

export async function populate() {
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASS,
    port: Number(process.env.PGPORT),
  });
  const client = await pool.connect();
  const text = 'SELECT * FROM alerts';

  const cursor = client.query(new Cursor(text));

  cursor.read(100, async (err, rows) => {
    const addColumnSentence = `
    ALTER TABLE follow_alerts
    ADD instcode_res_id varchar(8);
    `;

    try {
      await pool.query(addColumnSentence);

      for (const alert of rows) {
        //get instcode_res_id
        const { code, institution } = alert;

        const res = await pool.query(
          `UPDATE follow_alerts
            SET instcode_res_id = '${institution}'
            WHERE alert_code = '${code}'`,
        );
        // eslint-disable-next-line no-console
        console.log(res);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(' === CONTROLLED ERROR === \n', error);
    }

    cursor.close(() => {
      client.release();
    });
  });
}

populate();
