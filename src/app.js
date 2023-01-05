import express from "express"
import cors from "cors"

const server = express()
server.use(cors())
server.use(express.json())

const users = [];
const tweetsUser = [];

server.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    const isEmpty = !username || !avatar
    const isString = typeof username !== "string" || typeof avatar !== "string"

    if (isEmpty || isString) {
        return res.status(400).json("Todos os campos são obrigatórios!")
    }

    const existUser = users.find((user) => user.username === username);
    if (existUser) {
        return res.status(400).json("Usuário já existente!");
    }
    const newUser = { username, avatar };
    users.push(newUser)
    res.status(2001).send("OK")
})

server.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    const isEmpty = !username || !tweet
    const isString = typeof username !== "string" || typeof tweet !== "string"

    if (!users.find(user => user.username === username)) {
        return res.status(400).send('UNAUTHORIZED');
    }

    if (isEmpty || isString) {
        return res.status(400).json("Todos os campos são obrigatórios!")
    }

    const { avatar } = users.find((user) => user.username === username)
    const newTweet = { username, tweet, avatar };
    tweetsUser.push(newTweet);
    res.status(201).send("OK")
})

server.get("/tweets", (req, res) => {
    if (tweetsUser.length === 0) {
        return res.send(tweetsUser)
    }
    if (tweetsUser.length > 10) {
        let lastTweets = tweetsUser.slice(-10);
        return res.status(200).send(lastTweets)
    } else {
        return res.status(200).send(tweetsUser)
    }
})

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))