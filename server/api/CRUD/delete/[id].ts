import { course } from '../../../database/schema';
import { defineEventHandler } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const courseId = event.context.params!.id as string;

  try {
    // Delete course from the database by ID
    const result = await db.delete(course).where(eq(course.id, courseId));

    if (result) {
      return {
        status: 404,
        message: 'Course not found',
      };
    }

    return {
      status: 200,
      message: 'Course deleted successfully',
    };

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return {
      status: 500,
      message: `Error deleting course: ${errorMessage}`,
    };
  }
});
