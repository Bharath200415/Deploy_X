"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const simple_git_1 = __importDefault(require("simple-git"));
const utils_1 = require("./utils");
const path_1 = __importDefault(require("path"));
const file_1 = require("./file");
const aws_1 = require("./aws");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
console.log(__dirname);
app.post("/deploy", async (req, res) => {
    const repoURL = req.body.repoURL;
    const id = (0, utils_1.generate)(); //to generate a random id and add the cloned repo
    try {
        await (0, simple_git_1.default)().clone(repoURL, path_1.default.join(__dirname, `output/${id}`), ["--depth", "1"] //shallow cloning
        );
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "cloning failed"
        });
    }
    const files = (0, file_1.getAllFiles)(path_1.default.join(__dirname, `output/${id}`)).filter(file => !file.includes(".git") && !file.includes("node_modules"));
    files.forEach(async (file) => {
        //users/bhara/desktop/
        await (0, aws_1.uploadFile)(file.slice(__dirname.length + 1), file);
    });
    console.log(repoURL);
    res.json({
        message: `repo url logged with id: ${id}`
    });
});
app.get("/health", (req, res) => {
    console.log("The server is up!");
    res.json({
        message: "the backend is up!"
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map