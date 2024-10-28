const {data} = require("./protocolo-migration-data")

import prismaClient from "./prismaClient";

const migration = async () => {
    try {
        let modificados: any[] = []

        for (let item in data) {
            let protocolo = data[item]

            let query = await prismaClient.wiki_protocolo.create({
                data: {
                    id: +protocolo.pro_cod,
                    titulo: protocolo.pro_titulo,
                    texto: protocolo.pro_texto,
                    categoriaId: +protocolo.pro_cat_cod
                }
            })

            modificados.push(query)
        }

        console.log(modificados.length + " protocolos modificados")
    } catch (err) {
        console.log(err)
    }
}

migration();