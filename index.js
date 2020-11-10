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

const customService = require('@mia-platform/custom-plugin-lib')({
  type: 'object',
  required: ['CRUD_PATH'],
  properties: {
    CRUD_PATH: { type: 'string' },
  },
})

module.exports = customService(async function index(service) {
  service.addRawCustomPlugin('GET', '/riders', async(request, reply) => {
    const proxy = request.getDirectServiceProxy(service.config.CRUD_PATH, { protocol: 'http' })
    const { statusCode, payload } = await proxy.get('/riders/')
    reply.code(statusCode).send(payload)
  })

  service.addRawCustomPlugin('POST', '/riders', async(request, reply) => {
    const { body } = request
    const proxy = request.getDirectServiceProxy(service.config.CRUD_PATH, { protocol: 'http' })
    const { statusCode, payload } = await proxy.post('/riders/', { body, json: true })
    reply.code(statusCode).send(payload)
  })

  service.addRawCustomPlugin('GET', '/riders/:id', async(request, reply) => {
    const { id } = request.params
    const proxy = request.getDirectServiceProxy(service.config.CRUD_PATH, { protocol: 'http' })
    const { statusCode, payload } = await proxy.get(`/riders/${id}`)
    reply.code(statusCode).send(payload)
  })
})
