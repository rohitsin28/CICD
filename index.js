import express from "express";

const app = express();

app.use(express.json());
app.use("/",(req,res)=>{
    return res.send("Server is working fine")
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});