const fs = require("fs");
const uniqueID = require("uniqid");

module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        console.log("Get note request");
        try {
            const data = fs.readFileSync("./app/data/db.json", "utf8");
            res.json(JSON.parse(data));
        } catch (error) {
            console.error("Error reading notes:", error);
            res.status(500).json({ error: "Failed to read notes" });
        }
    });

    app.post("/api/notes", (req, res) => {
        try {
            const newNote = {
                ...req.body,
                id: uniqueID(),
            };

            console.log("Request for New notes posts");

            const data = fs.readFileSync("./app/data/db.json", "utf8");
            const jsonData = JSON.parse(data);
            jsonData.push(newNote);

            fs.writeFile(
                "./app/data/db.json",
                JSON.stringify(jsonData),
                (err) => {
                    if (err) {
                        console.error("Error writing new note:", err);
                        res.status(500).json({ error: "Failed to add new note" });
                        return;
                    }
                    console.log("New note has been added.");
                    res.json(newNote);
                }
            );
        } catch (error) {
            console.error("Error adding new note:", error);
            res.status(500).json({ error: "Failed to add new note" });
        }
    });

    app.delete("/api/notes/:id", (req, res) => {
        try {
            const data = fs.readFileSync("./app/data/db.json", "utf8");
            const jsonData = JSON.parse(data);
            const filteredNotes = jsonData.filter((note) => note.id !== req.params.id);

            fs.writeFile(
                "./app/data/db.json",
                JSON.stringify(filteredNotes),
                (err) => {
                    if (err) {
                        console.error("Error deleting note:", err);
                        res.status(500).json({ error: "Failed to delete note" });
                        return;
                    }
                    console.log("Note has been deleted.");
                    res.json(filteredNotes);
                }
            );
        } catch (error) {
            console.error("Error deleting note:", error);
            res.status(500).json({ error: "Failed to delete note" });
        }
    });
};