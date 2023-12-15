import app from '../app'
import request from 'supertest'
import dotenv from 'dotenv'
dotenv.config()

describe("Pregunta module", () => {
    let pregunta_id : string
    const payload = {
        pregunta: "preguntaTest"
    }

    test('crear pregunta', async () =>{
        const response = await request(app)
            .post('/preguntas/pregunta')
            .set('Content-type', 'application/json')
            .send(payload)
        expect(response.status).toBe(201)
        expect(response.body.nuevaPregunta._id).toBeDefined()
        pregunta_id = response.body.nuevaPregunta._id
    })

    test('get preguntas', async () =>{
        const response = await request(app)
            .get('/preguntas')
        expect(response.status).toBe(200)
        expect(response.body.preguntas).toEqual(expect.any(Array))
    })
    
    test('get pregunta', async () =>{
        const response = await request(app)
            .get('/preguntas/' + pregunta_id)
        expect(response.status).toBe(200)
        expect(response.body.respuestas).toEqual(expect.any(Array))
    })
    
    test('responder pregunta', async () =>{
        const payloadRespuesta = {
            id: pregunta_id,
            respuesta: "respuestaTest"
        }
        const response = await request(app)
            .post('/preguntas/respuesta')
            .set('Content-type', 'application/json')
            .send(payloadRespuesta)
        expect(response.status).toBe(201)
    })
})

describe("Calculadora module", () => {
    const numeroUno = 5
    const numeroDos = 5
    const numeroCero = 0
    const operacionSum = "sum"
    const operacionRes = "res"
    const operacionDiv = "div"
    const opereacionMul = "mul"
    const badOperacion = "dasfas"

    test('suma', async () =>{
        const response = await request(app)
            .post('/calculadora')
            .set('Content-type', 'application/json')
            .send({numeroUno, numeroDos, operacion: operacionSum})
        expect(response.status).toBe(201)
        expect(response.body.resultado).toEqual(10)
    })

    test('resta', async () =>{
        const response = await request(app)
            .post('/calculadora')
            .set('Content-type', 'application/json')
            .send({numeroUno, numeroDos, operacion: operacionRes})
        expect(response.status).toBe(201)
        expect(response.body.resultado).toEqual(0)
    })

    test('multiplicacion', async () =>{
        const response = await request(app)
            .post('/calculadora')
            .set('Content-type', 'application/json')
            .send({numeroUno, numeroDos, operacion: opereacionMul})
        expect(response.status).toBe(201)
        expect(response.body.resultado).toEqual(25)
    })

    test('division', async () =>{
        const response = await request(app)
            .post('/calculadora')
            .set('Content-type', 'application/json')
            .send({numeroUno, numeroDos, operacion: operacionDiv})
        expect(response.status).toBe(201)
        expect(response.body.resultado).toEqual(1)
    })

    test('division por cero', async () =>{
        const response = await request(app)
            .post('/calculadora')
            .set('Content-type', 'application/json')
            .send({numeroUno, numeroDos: numeroCero, operacion: operacionDiv})
        expect(response.status).toBe(400)
    })

    test('operacion no encontrada', async () =>{
        const response = await request(app)
            .post('/calculadora')
            .set('Content-type', 'application/json')
            .send({numeroUno, numeroDos, operacion: badOperacion})
        expect(response.status).toBe(400)
    })

})