
import { list_video } from "../database/schema";
import { db } from "../utils/db";

export default defineEventHandler((event) => {
    return db.select().from(list_video)

})

  