import { readFileSync } from "fs";
import { join } from "path";
import {open} from "sqlite";
import sqlite3 from "sqlite3";

const migrationDir = join(__dirname, "migrations");

const applyMigration = async () => {
    const db = await open({
        filename: "src/db/database.sqlite",//usar nome do banco que se quer abrir conexão
        driver: sqlite3.Database,
    });

    const migrations =["001-initial-schema-sql"];//aqui se define qual script de banco de ados se quer rodar, colocando o nome de arquivo que o coném - um script por arquivo

    for (const migration of migrations) {
        const migrationScript = readFileSync(join(migrationDir, migration), "utf8");
        
        await db.exec(migrationScript);
    }

    console.log("Migrações aplicadas com sucesso.");
};

applyMigration ()
;