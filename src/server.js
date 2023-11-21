import app from "./app.js";
import apiPort from "./constants/apiPort.js";


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));