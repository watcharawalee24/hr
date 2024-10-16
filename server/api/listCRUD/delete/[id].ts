import { list_video  } from '../../../database/schema';
import { defineEventHandler } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const videoId = event.context.params!.id as string; // Get the ID from the URL params

  try {
    // Delete video from the database by ID
    const result = await db.delete(list_video).where(eq(list_video.id, videoId)); // Ensure to reference the list_video correctly

    // Check if the delete operation affected any rows
    if (result) {
      return {
        status: 404,
        message: 'Video not found', // Update the message to reflect video deletion
      };
    }

    return {
      status: 200,
      message: 'Video deleted successfully', // Update the success message accordingly
    };

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return {
      status: 500,
      message: `Error deleting video: ${errorMessage}`, // Update the error message for clarity
    };
  }
});
