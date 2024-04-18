import { SQLError, SQLStatementErrorCallback } from "expo-sqlite";
import db from "./SQliteSetup"

export const executeSelectQuery = (sql: string): Promise<{id: number, name: string}[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                sql,
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                }

            );
        }, (error: any) => {
            reject(error)
        });
    });
}

export const executeInsertQuery = (newperson: string) => {
    console.log("sd")
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO Friend (name) VALUES ('${newperson}')`,
        );
    }, (error: any) => {
        console.log(error)
    });

}