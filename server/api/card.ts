import { course } from "../database/schema"

export default defineEventHandler((event) => {
  return db.select().from(course)
    
  })
  