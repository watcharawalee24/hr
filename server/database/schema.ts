import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const group_work = mysqlTable("group_work", {
  id: serial("id").primaryKey(),
  group: varchar("group", { length: 100 }),
  image: varchar("img", { length: 100 }),
});

export const course = mysqlTable("course", {
    id: varchar("id",{ length: 36 }).primaryKey(),
    subject: varchar("subject", { length: 100 }),
    name: varchar("name", { length: 100 }),
    image: varchar("img", { length: 100 }),
    content: varchar("content", { length: 100 }),
    teacher_name: varchar("teacher_name", { length: 100 }),
    toppic_sub: varchar("toppic_sub", { length: 100 }),
    group_work_id:serial(( "group_work_id")),
    
  });



  export const list_video = mysqlTable("list_video", {
    id: varchar("id",{ length: 36 }).primaryKey(),
    course_id: varchar("course_id", { length: 36 }),
    subject: varchar("subject", { length: 100 }),
    name: varchar("name", { length: 100 }),
    image: varchar("img", { length: 100 }),
    video: varchar("video", { length: 100 }),
    subtopic: varchar("subtopic",{length:200}),
    url:varchar("url",{length:255}),
  });

  export const news_slide = mysqlTable("news_slide", {
    id: serial("id").primaryKey(),
    image: varchar("img", { length: 200 }),
 
  });