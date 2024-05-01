const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const kegiatanRoutes = require("./routes/kegiatanRoutes");
const proyekRoutes = require("./routes/proyekRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Define routes
app.use("/users", userRoutes);
app.use("/kegiatan", kegiatanRoutes);
app.use("/proyek", proyekRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(() => {
	console.log("Server running on port", PORT);
});
sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});
