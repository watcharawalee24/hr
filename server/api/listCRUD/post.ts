import { db } from '../../utils/db';
import { list_video } from '../../database/schema';
import { defineEventHandler, readBody, sendError, createError } from 'h3';
import { v4 as uuid } from 'uuid';
import { writeFile } from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { course_id, subject, name, image, video, subtopic, url } = body;

    // ตรวจสอบและบันทึกรูปภาพ
    if (image && image.includes('base64')) {
      const [fileType, fileData] = image.split(';base64,');
      const fileExtension = fileType.split('/')[1];
      const fileName = `${uuid()}.${fileExtension}`;
      const filePath = path.join(process.cwd(), 'public', 'img', fileName);

      await writeFile(filePath, fileData, 'base64');
      body.image = fileName;
    }

    // ตรวจสอบและบันทึกวิดีโอ
    if (video && video.includes('base64')) {
      const [fileType, fileData] = video.split(';base64,');
      const fileExtension = fileType.split('/')[1];
      const fileName = `${uuid()}.${fileExtension}`;
      const filePath = path.join(process.cwd(), 'public', 'video', fileName);

      await writeFile(filePath, fileData, 'base64');
      body.video = fileName;
    }

    await db.insert(list_video).values({
      id: uuid(),
      course_id,
      subject,
      name,
      image: body.image,
      video: body.video,
      subtopic,
      url,
    }).execute();

    return {
      statusCode: 201,
      body: {
        message: 'เพิ่มวิดีโอสำเร็จ',
      },
    };
  } catch (error) {
    sendError(event, createError({ 
      statusCode: 500, 
      statusMessage: 'เกิดข้อผิดพลาดในการเพิ่มวิดีโอ', 
      data: error instanceof Error ? error.message : 'Unknown error' 
    }));
  }
});