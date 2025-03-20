const express = require("express");
const { signUp, login } = require("../controllers/User");
const { auth } = require("../middlewares/authMiddleware");
const { createAgent, getAgents, updateAgent, deleteAgent } = require("../controllers/Agents");
const upload = require("../middlewares/uploadMiddleware");
const { uploadTasks, getTasks } = require("../controllers/TaskController");
const router = express.Router();

router.post("/signUp" , signUp);
router.post("/login" , login);
router.get("/agents" , getAgents);
router.get("/tasks" , getTasks);
router.put('/agents/:id', updateAgent );
router.delete('/agents/:id',deleteAgent);

//protected routes
router.post("/createAgent" , auth , createAgent);
router.post("/upload-tasks", auth, upload.single("file"), uploadTasks);

module.exports = router;