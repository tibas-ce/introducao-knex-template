import express, { Request, Response } from "express";
import cors from 'cors';
import { db } from "./database/knex";

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`)
});

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//selectBands
app.get("/bands", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`
        SELECT * FROM bands;
        `)

        res.status(200).send({result})

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//createBand
app.post("/bands", async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string;
        const name = req.body.name as string;

        if(!id || !name) {
            res.status(400)
            throw new Error("Dados inválidos, inserir valores válidos")
        }
        if(name.length < 3) {
            res.status(400)
            throw new Error("Nome muito curto, use pelo menos 3 caracteres")
        }

        await db.raw(`
            INSERT INTO bands (id, name) VALUES
            ("${id}", "${name}");
        `)

        res.status(200).send({message: "Banda criada"})

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//upDateBands
app.put("/bands/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const name = req.body.name as string;

        if(!id){
            res.status(400)
            throw new Error("ID inválidos, inserir ID")
        }
        if(!name){
            res.status(400)
            throw new Error("Nome inválidos, inserir Nome")
        }
        if(name.length < 3){
            res.status(400)
            throw new Error("Nome muito curto, use pelo menos 3 caracteres")
        }

        const [band] = await db.raw(`
            SELECT * FROM bands
            WHERE id ="${id}";
        `)

        if(!band){
            res.status(404)
            throw new Error("Banda não encontrada")
        }

        await db.raw(`
        UPDATE bands
        SET name = "${name}"
        WHERE id = "${id}";
        `)

        res.status(200).send({message: "Banda atualizada"})

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

// selectSongs
app.get("/songs", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`
        SELECT * FROM songs;
        `)

        res.status(200).send({result})

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

// createSongs
app.post("/songs", async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string;
        const name = req.body.name as string;
        const band_id = req.body.band_id as string;

        if(!id || !name || !band_id) {
            res.status(400)
            throw new Error("Dados inválidos, inserir valores válidos")
        }
        if(name.length < 1) {
            res.status(400)
            throw new Error("Nome muito curto, use pelo menos 1 caracteres")
        }
        
        const [band] = await db.raw(`
            SELECT * FROM bands
            WHERE id ="${band_id}";
        `)

        if(!band){
            res.status(404)
            throw new Error("Banda não encontrada verificar ID")
        }

        await db.raw(`
            INSERT INTO songs (id, name, band_id) VALUES
            ("${id}", "${name}", "${band_id}");
        `)

        res.status(200).send({message: "Música criada"})

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//upDateSongs
app.put("/songs/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const name = req.body.name as string;

        if(!id){
            res.status(400)
            throw new Error("ID inválidos, inserir ID")
        }
        if(!name){
            res.status(400)
            throw new Error("Nome inválido, inserir Nome")
        }
        if(name.length < 3){
            res.status(400)
            throw new Error("Nome muito curto, use pelo menos 3 caracteres")
        }

        const [song] = await db.raw(`
            SELECT * FROM songs
            WHERE id ="${id}";
        `)

        if(!song){
            res.status(404)
            throw new Error("Música não encontrada")
        }

        await db.raw(`
        UPDATE songs
        SET name = "${name}"
        WHERE id = "${id}";
        `)

        res.status(200).send({message: "Música atualizada"})

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});