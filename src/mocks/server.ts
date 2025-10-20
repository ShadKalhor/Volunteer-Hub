import { createServer, Model, Factory, Response } from 'miragejs'
import { faker } from '@faker-js/faker'
import type { User, Organization, Event, Shift } from '@/types/models'

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      user: Model.extend({}),
      organization: Model.extend({}),
      event: Model.extend({}),
      shift: Model.extend({}),
      signup: Model.extend({}),
      attendance: Model.extend({}),
      comment: Model.extend({}),
      badge: Model.extend({})
    },

    factories: {
      user: Factory.extend({
        name() { return faker.person.fullName() },
        email() { return faker.internet.email() },
        role() { return faker.helpers.arrayElement(['volunteer', 'organizer']) },
        avatar() { return faker.image.avatar() },
        bio() { return faker.lorem.paragraph() },
      }),

      organization: Factory.extend({
        name() { return faker.company.name() },
        description() { return faker.company.catchPhrase() },
        logo() { return faker.image.url() },
        website() { return faker.internet.url() },
        contactEmail() { return faker.internet.email() },
        address() { return faker.location.streetAddress() },
        phone() { return faker.phone.number() },
        approved: true,
      }),

      event: Factory.extend({
        title() { return faker.lorem.words(3) },
        description() { return faker.lorem.paragraph() },
        location() { return faker.location.streetAddress() },
        startDate() { return faker.date.future().toISOString() },
        endDate() { 
          const start = new Date(this.startDate)
          return faker.date.between({
            from: start,
            to: new Date(start.getTime() + 24 * 60 * 60 * 1000)
          }).toISOString()
        },
        imageUrl() { return faker.image.url() },
        capacity() { return faker.number.int({ min: 5, max: 50 }) },
        category() { 
          return faker.helpers.arrayElement([
            'education', 'environment', 'health', 'animals', 'community', 'other'
          ])
        },
        status: 'published',
      })
    },

    seeds(server) {
      // Create admin user
      const admin = server.create('user', {
        email: 'admin@volunteerhub.com',
        role: 'admin',
        name: 'Admin User'
      })

      // Create organizations with events
      server.createList('organization', 3).forEach(org => {
        server.createList('event', 2, { organizationId: org.id })
      })

      // Create some regular users
      server.createList('user', 5)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 1000 // Add realistic delay

      // Auth routes
      this.post('/auth/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody)
        const user = schema.users.findBy({ email })

        if (user) {
          return {
            token: 'mock-jwt-token',
            user
          }
        }
        return new Response(401, {}, { message: 'Invalid credentials' })
      })

      // Protected routes middleware
      const authenticatedRoutes = () => {
        this.get('/user/profile', (schema, request) => {
          const authHeader = request.requestHeaders.Authorization
          if (!authHeader) {
            return new Response(401, {}, { message: 'Unauthorized' })
          }
          // In real app, decode JWT and fetch user
          return schema.users.find(1)
        })
      }

      // CRUD routes for main entities
      this.get('/organizations')
      this.get('/organizations/:id')
      this.post('/organizations')
      this.put('/organizations/:id')
      this.delete('/organizations/:id')

      this.get('/events')
      this.get('/events/:id')
      this.post('/events')
      this.put('/events/:id')
      this.delete('/events/:id')

      this.get('/events/:id/shifts')
      this.post('/events/:id/shifts')
      
      this.get('/shifts/:id')
      this.put('/shifts/:id')
      this.delete('/shifts/:id')

      // Signup routes
      this.post('/shifts/:id/signup')
      this.delete('/shifts/:id/signup')
      
      // Attendance routes
      this.post('/signups/:id/attendance')
      this.put('/signups/:id/attendance')

      // Search and filters
      this.get('/search', (schema, request) => {
        const { q, category, date } = request.queryParams
        let events = schema.events.all()

        if (q) {
          events = events.filter(event => 
            event.title.toLowerCase().includes(q.toLowerCase()) ||
            event.description.toLowerCase().includes(q.toLowerCase())
          )
        }

        if (category) {
          events = events.filter(event => event.category === category)
        }

        // Add more filters as needed

        return events
      })
    }
  })
}