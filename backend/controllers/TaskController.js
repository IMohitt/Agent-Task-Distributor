const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const Task = require("../models/task");
const Agent = require("../models/agent");
const stream = require("stream");

// Function to parse CSV file
const parseCSV = async (buffer) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const readableStream = new stream.PassThrough();
        readableStream.end(buffer);

        readableStream
            .pipe(csvParser())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (err) => reject(err));
    });
};

// Function to parse XLSX file
const parseXLSX = (buffer) => {
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

// Upload and distribute tasks
exports.uploadTasks = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        let tasks;
        const fileExt = req.file.originalname.split(".").pop().toLowerCase();

        if (fileExt === "csv") {
            tasks = await parseCSV(req.file.buffer);
        } else if (fileExt === "xlsx" || fileExt === "xls") {
            tasks = parseXLSX(req.file.buffer);
        } else {
            return res.status(400).json({ msg: "Invalid file format" });
        }

        // Validate format
        if (!tasks.every((row) => row.FirstName && row.Phone && row.Notes)) {
            return res.status(400).json({ msg: "Invalid CSV/XLSX format" });
        }

        // Fetch all agents
        const agents = await Agent.find();
        if (agents.length < 1) {
            return res.status(400).json({ msg: "No agents available" });
        }

        // Distribute tasks among agents
        const distributedTasks = tasks.map((task, index) => ({
            firstName: task.FirstName,
            phone: task.Phone,
            notes: task.Notes,
            agentId: agents[index % agents.length]._id, // Distribute sequentially
            createdBy: req.user.id, // Track which admin uploaded
        }));

        // Save to database
        await Task.insertMany(distributedTasks);

        res.status(200).json({ msg: "Tasks uploaded and assigned successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};


exports.getTasks = async (req,res)=>{
   try {
      const tasks = await Task.find();
      res.status(200).json({
         data:tasks,
         success:true,
      })
   } catch (error) {
      console.log(error);
     res.status(500).json({
        success:false,
        message:error.message
     })
   }
}