import { useRoute } from "vue-router";
import { course } from "../../database/schema"
import { eq } from 'drizzle-orm';

export default defineEventHandler((event) => {
const id = parseInt(event.context.params!.id) as number

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID should be an integer',
    })
  }
// export default defineEventHandler((event) => {
  return db.select().from(course).where(eq(course.group_work_id,id))
    
  
})