import { z } from 'zod'

// Base schemas for common fields
const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const UserSchema = BaseEntitySchema.extend({
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['admin', 'volunteer', 'organizer']),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  badges: z.array(z.string().uuid()).default([]),
})

export const OrganizationSchema = BaseEntitySchema.extend({
  name: z.string().min(2),
  description: z.string(),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  contactEmail: z.string().email(),
  address: z.string(),
  phone: z.string().optional(),
  approved: z.boolean().default(false),
  adminId: z.string().uuid(),
})

export const EventSchema = BaseEntitySchema.extend({
  organizationId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string(),
  location: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  imageUrl: z.string().url().optional(),
  capacity: z.number().int().positive(),
  category: z.enum(['education', 'environment', 'health', 'animals', 'community', 'other']),
  status: z.enum(['draft', 'published', 'cancelled', 'completed']).default('draft'),
})

export const ShiftSchema = BaseEntitySchema.extend({
  eventId: z.string().uuid(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  title: z.string(),
  description: z.string().optional(),
  roles: z.array(z.string()),
  capacity: z.number().int().positive(),
  filledSpots: z.number().int().min(0).default(0),
})

export const SignupSchema = BaseEntitySchema.extend({
  userId: z.string().uuid(),
  shiftId: z.string().uuid(),
  role: z.string(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']),
  notes: z.string().optional(),
})

export const AttendanceSchema = BaseEntitySchema.extend({
  signupId: z.string().uuid(),
  checkInTime: z.string().datetime().optional(),
  checkOutTime: z.string().datetime().optional(),
  status: z.enum(['pending', 'present', 'absent', 'partial']).default('pending'),
  notes: z.string().optional(),
  hours: z.number().min(0).optional(),
})

export const CommentSchema = BaseEntitySchema.extend({
  userId: z.string().uuid(),
  entityType: z.enum(['event', 'organization']),
  entityId: z.string().uuid(),
  content: z.string(),
  parentId: z.string().uuid().optional(),
})

export const BadgeSchema = BaseEntitySchema.extend({
  name: z.string(),
  description: z.string(),
  icon: z.string().url(),
  criteria: z.object({
    type: z.enum(['hours', 'events', 'streak']),
    threshold: z.number().positive(),
  }),
})

// TypeScript types derived from Zod schemas
export type User = z.infer<typeof UserSchema>
export type Organization = z.infer<typeof OrganizationSchema>
export type Event = z.infer<typeof EventSchema>
export type Shift = z.infer<typeof ShiftSchema>
export type Signup = z.infer<typeof SignupSchema>
export type Attendance = z.infer<typeof AttendanceSchema>
export type Comment = z.infer<typeof CommentSchema>
export type Badge = z.infer<typeof BadgeSchema>

// API response types
export type PaginatedResponse<T> = {
  data: T[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export type ApiResponse<T> = {
  data: T
  message?: string
}

export type ApiError = {
  message: string
  errors?: Record<string, string[]>
  status: number
}