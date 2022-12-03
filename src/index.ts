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
  const text = 'SELECT * FROM seguimiento_revit';

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
        const { tipo_alerta, institucion_id } = alert;

        const res = await pool.query(
          `UPDATE follow_alerts
            SET instcode_res_id = '${institucion_id}'
            WHERE alert_code = '${tipo_alerta}'`,
        );
        // eslint-disable-next-line no-console
        console.log(`tipo_alerta: ${tipo_alerta}\n`);
        console.log(res)
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
