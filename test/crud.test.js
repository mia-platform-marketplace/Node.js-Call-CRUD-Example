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

const tap = require('tap')
const nock = require('nock')
const fastifyBuilder = require('../src/builder')
const riders = [{"_id":"5cb5ab579008340010c735fd","name":"Mario","surname":"Rossi","date":"2019-04-01T22:00:00.000Z","position":[9.18380000000002,45.45391],"email":"user1@fake-domain.com","skypeId":"user1","chat":"user1","__STATE__":"PUBLIC","creatorId":"c724614a-3c9b-42de-8db6-175224b9bbb8","updaterId":"c724614a-3c9b-42de-8db6-175224b9bbb8","updatedAt":"2019-04-16T10:16:01.076Z","createdAt":"2019-04-16T10:15:51.303Z"},{"_id":"5cb5ab579008340010c735fe","name":"Marta","surname":"Bianchi","date":"1992-12-25T23:00:00.000Z","position":[9.18380019999995,45.4539471],"email":"user2@fake-domain.com","skypeId":"user2","chat":"user2","__STATE__":"PUBLIC","creatorId":"c724614a-3c9b-42de-8db6-175224b9bbb8","updaterId":"c724614a-3c9b-42de-8db6-175224b9bbb8","updatedAt":"2019-05-28T09:43:43.056Z","createdAt":"2019-04-16T10:15:51.303Z"}]
const rider = {
    _id: '5cb5ab579008340010c735fd',
    creatorId: 'c724614a-3c9b-42de-8db6-175224b9bbb8',
    createdAt: '2019-04-16T10: 15: 51.303Z',
    updaterId: 'c724614a-3c9b-42de-8db6-175224b9bbb8',
    updatedAt: '2019-04-16T10: 16: 01.076Z',
    __STATE__: 'PUBLIC',
    name: 'Mario',
    surname: 'Rossi',
    date: '2019-04-01T22: 00: 00.000Z',
    position: [
      9.18380000000002,
      45.45391
    ],
    email: 'user1@fake-domain.com',
    skypeId: 'user1',
    chat: 'user1'
  }
  

tap.test('Testing CRUD', test => {
    const fastify = fastifyBuilder()
    test.tearDown(() => fastify.close())
    test.test('GET /riders/ route CORRECTLY', async assert => {
        assert.plan(3)
        console.log("INTO GET")
        const scope = nock('https://demo.test.mia-platform.eu')
        .get('/v2/riders/')
        .reply(200,riders)
        
        console.log("AFTER NOCK GET")
        const response = await fastify.inject({
            method: 'GET',
            url: '/riders'
        })
        console.log("AFTER GET INJECT")

        const expectedResponse = {
            statusCode: 200,
            result : riders
        }
        assert.strictSame(response.statusCode, 200)
        assert.strictSame(JSON.parse(response.body), expectedResponse)
        assert.ok(scope.isDone())
        console.log("BEFORE END GET")
    })
    console.log("OUT GET")
    test.test('GET /riders/:id route CORRECTLY', async assert => {
        assert.plan(3)

        const scope = nock('https://demo.test.mia-platform.eu')
            .get('/v2/riders/5cb5ab579008340010c735fd')
            .reply(200,rider)

        const response = await fastify.inject({
            method: 'GET',
            url: '/riders/5cb5ab579008340010c735fd'
        })

        const expectedResponse = {
            statusCode: 200,
            result : rider
        }

        assert.strictSame(response.statusCode, 200)
        assert.strictSame(JSON.parse(response.payload), expectedResponse)
        assert.ok(scope.isDone())
    })

    test.test('GET /riders/ route SERVER ERROR', async assert => {
        assert.plan(3)

        const scope = nock('https://demo.test.mia-platform.eu')
            .get('/v2/riders/')
            .reply(400,'Bad request')

        const response = await fastify.inject({
            method: 'GET',
            url: '/riders'
        })

        const expectedResponse = {
            statusCode: 500,
            error : "Internal server error"
        }

        assert.strictSame(response.statusCode, 500)
        assert.strictSame(JSON.parse(response.payload), expectedResponse)
        assert.ok(scope.isDone())
    })
    
    test.test('GET /riders/:id route BAD REQUEST', async assert => {
        assert.plan(3)

        const scope = nock('https://demo.test.mia-platform.eu')
            .get('/v2/riders/5cb5ab579008340010c735fd')
            .reply(400,'Bad request')

        const response = await fastify.inject({
            method: 'GET',
            url: '/riders/5cb5ab579008340010c735fd'
        })

        const expectedResponse = {
            statusCode: 400,
            error : "Bad Request"
        }

        assert.strictSame(response.statusCode, 400)
        assert.strictSame(JSON.parse(response.payload), expectedResponse)
        assert.ok(scope.isDone())
    })

    test.test('GET /riders/:id route MISSING ID', async assert => {
        assert.plan(2)

        const scope = nock('https://demo.test.mia-platform.eu')
            .get('/v2/riders/')
            .reply(400,'Bad request')

        const response = await fastify.inject({
            method: 'GET',
            url: '/riders/'
        })

        const expectedResponse = {
            statusCode: 400,
            error : "Missing ID"
        }

        assert.strictSame(response.statusCode, 400)
        assert.strictSame(JSON.parse(response.payload), expectedResponse)
    })

    test.test('GET /riders/:id route WRONG ID', async assert => {
        assert.plan(3)

        const scope = nock('https://demo.test.mia-platform.eu')
            .get('/v2/riders/5cb5ab579008340010c735ff')
            .reply(404,'Not found')

        const response = await fastify.inject({
            method: 'GET',
            url: '/riders/5cb5ab579008340010c735ff'
        })

        const expectedResponse = {
            statusCode: 404,
            error : "Not Found"
        }

        assert.strictSame(response.statusCode, 404)
        assert.strictSame(JSON.parse(response.payload), expectedResponse)
        assert.ok(scope.isDone())
    })
    test.end()
})
