/*
 * Copyright 2019 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fastify = require('fastify')()
const got = require('got');
//USELESS
const fastJson = require('fast-json-stringify')

const paramSchema = {
    type: 'object',
    properties: {
        'number': { type: 'integer' }
      },
      required: ['number']
}
const schema = {
    params: paramSchema
}

function Builder(){

    fastify.get('/', async (request, reply) => {
        reply.send({statusCode: 200, msg: "Hello world!"})
    } )
    
    fastify.get('/riders', async (request, reply) => {
        try {
            console.log("BEFORE GOT")
            const response = await got('https://demo.test.mia-platform.eu/v2/riders/', { json: true});
            console.log("AFTER")
            reply.send({statusCode: 200, result: response.body})
        } catch (error) {
            console.log('ERROR', error)
            reply.status(500).send({statusCode: 500, error: "Internal server error" })
        }
    })
    
    fastify.get('/riders/:id', async (request, reply) => {
        let id = request.params.id
        if(request.params.id === ""){
            reply.status(400).send({statusCode: 400, error : "Missing ID"})
            return
        }
        try {        
            const response = await got('https://demo.test.mia-platform.eu/v2/riders/' + id, {json: true});
            reply.send({statusCode: 200, result: response.body})
        } catch (error) {
            reply.status(error.statusCode).send({statusCode: error.statusCode, error: error.statusMessage})
        }
    })

    

    return fastify;
}

module.exports = Builder
