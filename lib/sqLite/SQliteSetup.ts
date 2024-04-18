import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("discgolfDb.db")

db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Friend (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
    );
});


db.transaction(tx => {
    tx.executeSql(
        'INSERT INTO Friend (id, name) VALUES (1, "Kalle") '
    );
});

db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Nonregistered_friend (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
    );
});

export default db