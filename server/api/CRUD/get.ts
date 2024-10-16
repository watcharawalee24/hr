import { course } from '../../database/schema';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  try {
    const courses = await db.select().from(course);
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return { error: 'Error fetching courses' };
  }
});
