const express = require("express");
const cors = require('cors');
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors({
    origin: '*' ,
    methods: 'GET,POST,PUT,DELETE'
}));

app.use(express.json());


const db = new sqlite3.Database("./transactions.db", (err) => {
    if (err) {
        console.log("Error opening database", err);
    } else {
        console.log("Database connected successfully");
        db.run(`
            CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            type TEXT, 
            amount REAL, 
            description TEXT, 
            date TEXT, 
            running_balance REAL
            )`, (err) => {
                if (err) {
                    console.log("Error creating transactions table", err);
                }
            });
    }
});

db.run(`
    INSERT INTO transactions (type, amount, description, date, running_balance) 
    VALUES ('credit', 1000, 'Initial deposit', '2023-01-01', 1000)
`);

app.get('/', (req, res) => {
    res.send('Hello, the server is running!');
});

app.get('/transactions', (req, res) => {
    db.all('SELECT * FROM transactions', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ transactions: rows });
    });
});

app.post('/transactions', (req, res) => {
    const { type, amount, description, date } = req.body;
    if (!type || !amount || !date) {
        return res.status(400).json({ error: "Type, amount, and date are required" });
    }

    db.get('SELECT running_balance FROM transactions ORDER BY id DESC LIMIT 1', [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const previousBalance = row ? row.running_balance : 0;
        const newBalance = type === 'credit' ? previousBalance + amount : previousBalance - amount;

        const query = 'INSERT INTO transactions (type, amount, description, date, running_balance) VALUES (?, ?, ?, ?, ?)';
        db.run(query, [type, amount, description, date, newBalance], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, type, amount, description, date, running_balance: newBalance });
        });
    });
});

app.put("/transactions/:id/", (req, res) => {
    const { id } = req.params;
    const { type, amount, description, date } = req.body;

    const updateQuery = `UPDATE transactions SET type = ?, amount = ?, description = ?, date = ? WHERE id = ?`;
    db.run(updateQuery, [type, amount, description, date, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.send("Transaction updated successfully");
    });
});

app.delete("/transactions/:id/", (req, res) => {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM transactions WHERE id = ?`;
    db.run(deleteQuery, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.send("Transaction deleted successfully");
    });
});

app.listen(4001, () => {
    console.log("Server is running on port 4001");
});
