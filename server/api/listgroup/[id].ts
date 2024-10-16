import { useRoute } from "vue-router";
import { list_video  } from "../../database/schema"
import { eq } from 'drizzle-orm';

export default defineEventHandler((event) => {
const id = event.context.params!.id as string

  console.log(id);
  
// export default defineEventHandler((event) => {
  const aa = db.select().from(list_video).where(eq(list_video.course_id,id))
  console.log(aa);
  return aa;


})