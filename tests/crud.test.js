/*
 * Copyright 2019 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict'

const tap = require('tap')
const nock = require('nock')
const lc39 = require('@mia-platform/lc39')

const riders = [{ '_id': 'rider1', 'name': 'Mario', 'surname': 'Rossi', 'date': '2019-04-01T22:00:00.000Z', 'position': [9.18380000000002, 45.45391], 'email': 'user1@fake-domain.com', 'skypeId': 'user1', 'chat': 'user1', '__STATE__': 'PUBLIC', 'creatorId': 'c724614a-3c9b-42de-8db6-175224b9bbb8', 'updaterId': 'c724614a-3c9b-42de-8db6-175224b9bbb8', 'updatedAt': '2019-04-16T10:16:01.076Z', 'createdAt': '2019-04-16T10:15:51.303Z' }, { '_id': 'rider2', 'name': 'Marta', 'surname': 'Bianchi', 'date': '1992-12-25T23:00:00.000Z', 'position': [9.18380019999995, 45.4539471], 'email': 'user2@fake-domain.com', 'skypeId': 'user2', 'chat': 'user2', '__STATE__': 'PUBLIC', 'creatorId': 'c724614a-3c9b-42de-8db6-175224b9bbb8', 'updaterId': 'c724614a-3c9b-42de-8db6-175224b9bbb8', 'updatedAt': '2019-05-28T09:43:43.056Z', 'createdAt': '2019-04-16T10:15:51.303Z' }]
const rider = {
  _id: 'rider1',
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
    45.45391,
  ],
  email: 'user1@fake-domain.com',
  skypeId: 'user1',
  chat: 'user1',
}

async function setupFastify(envVariables) {
  const fastify = await lc39('./index.js', {
    logLevel: 'silent',
    envVariables,
  })
  return fastify
}

tap.test('Testing CRUD', async test => {
  const fastify = await setupFastify({
    USERID_HEADER_KEY: 'userid',
    GROUPS_HEADER_KEY: 'groups',
    CLIENTTYPE_HEADER_KEY: 'clienttype',
    BACKOFFICE_HEADER_KEY: 'backoffice',
    MICROSERVICE_GATEWAY_SERVICE_NAME: 'microservice-gateway.example.org',
    CRUD_PATH: 'crud-service',
  })
  test.tearDown(() => fastify.close())

  test.test('GET /riders/ route CORRECTLY', async assert => {
    assert.plan(3)
    const scope = nock('http://crud-service')
      .get('/riders/')
      .reply(200, riders)
    const response = await fastify.inject({
      method: 'GET',
      url: '/riders/',
    })
    const expectedResponse = riders
    assert.strictSame(response.statusCode, 200)
    assert.strictSame(JSON.parse(response.body), expectedResponse)
    assert.ok(scope.isDone())
  })
  test.test('GET /riders/:id route CORRECTLY', async assert => {
    assert.plan(3)

    const scope = nock('http://crud-service')
      .get('/riders/rider1')
      .reply(200, rider)

    const response = await fastify.inject({
      method: 'GET',
      url: '/riders/rider1',
    })

    const expectedResponse = rider

    assert.strictSame(response.statusCode, 200)
    assert.strictSame(JSON.parse(response.payload), expectedResponse)
    assert.ok(scope.isDone())
  })

  test.test('GET /riders/ route SERVER ERROR', async assert => {
    assert.plan(3)

    const scope = nock('http://crud-service')
      .get('/riders/')
      .reply(500, { statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' })

    const response = await fastify.inject({
      method: 'GET',
      url: '/riders/',
    })
    const expectedResponse = {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Something went wrong',
    }

    assert.strictSame(response.statusCode, 500)
    assert.strictSame(JSON.parse(response.payload), expectedResponse)
    assert.ok(scope.isDone())
  })

  test.test('GET /riders/:id route SERVER ERROR', async assert => {
    assert.plan(3)

    const scope = nock('http://crud-service')
      .get('/riders/rider1')
      .reply(500, { statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' })

    const response = await fastify.inject({
      method: 'GET',
      url: '/riders/rider1',
    })

    const expectedResponse = {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Something went wrong',
    }

    assert.strictSame(response.statusCode, 500)
    assert.strictSame(JSON.parse(response.payload), expectedResponse)
    assert.ok(scope.isDone())
  })

  test.test('GET /riders/:id route WRONG ID', async assert => {
    assert.plan(3)

    const scope = nock('http://crud-service')
      .get('/riders/fake_rider')
      .reply(404, { statusCode: 404, error: 'Not Found', message: 'Response code 404 (Not Found)' })

    const response = await fastify.inject({
      method: 'GET',
      url: '/riders/fake_rider',
    })

    const expectedResponse = {
      statusCode: 404,
      error: 'Not Found',
      message: 'Response code 404 (Not Found)',
    }
    assert.strictSame(response.statusCode, 404)
    assert.strictSame(JSON.parse(response.payload), expectedResponse)
    assert.ok(scope.isDone())
  })
  test.end()
})
