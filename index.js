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

'use strict'

const got = require('got')
const customService = require('@mia-platform/custom-plugin-lib')({
  type: 'object',
  required: ['CRUD_PATH'],
  properties: {
    CRUD_PATH: { type: 'string' },
  },
})

module.exports = customService(async function index(service) {
  service.addRawCustomPlugin('GET', '/', async(request, reply) => {
    reply.send({ statusCode: 200, msg: 'Hello world!' })
  })
  service.addRawCustomPlugin('GET', '/riders', async(request, reply) => {
    const response = await got(`${service.config.CRUD_PATH}/v2/riders/`, { json: true })
    reply.send({ statusCode: 200, result: response.body })
  })
  service.addRawCustomPlugin('GET', '/riders/:id', async(request, reply) => {
    const { id } = request.params
    if (id === '') {
      reply.status(400).send({ statusCode: 400, error: 'Missing ID' })
      return
    }
    const response = await got(`${service.config.CRUD_PATH}/v2/riders/${id}`, { json: true })
    reply.send({ statusCode: 200, result: response.body })
  })
})
