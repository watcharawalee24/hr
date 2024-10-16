import { course, news_slide } from "../database/schema"

export default defineEventHandler((event) => {
  return db.select().from(news_slide)
    
  })
  