import { db } from '../../../utils/db';
import { course } from '../../../database/schema';
import { defineEventHandler, readBody } from 'h3';
import { eq } from 'drizzle-orm';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

export default defineEventHandler(async (event) => {
  const courseId = event.context.params!.id as string;

  try {
    const body = await readBody(event);

    const { subject, name, image, content, teacher_name, toppic_sub, group_work_id } = body;

    // ตรวจสอบว่า image เป็น base64 string หรือไม่
    if (image && image.includes('base64')) {
      // แยก mime type และ base64 data
      const [fileType, fileData] = image.split(';base64,');
      const fileExtension = fileType.split('/')[1];
      const fileName = `${uuid()}.${fileExtension}`;
      const filePath = path.join(process.cwd(), 'public', 'img', fileName);

      // แปลง base64 เป็นไฟล์และบันทึก
      await writeFile(filePath, fileData, 'base64');

      // อัปเดตชื่อไฟล์ในฐานข้อมูล
      body.image = fileName;
    }

    await db.update(course).set({
      subject,
      name,
      image: body.image, // ใช้ชื่อไฟล์ที่บันทึกแล้ว
      content,
      teacher_name,
      toppic_sub,
      group_work_id,
    }).where(eq(course.id, courseId)).execute();

    return {
      statusCode: 200,
      body: {
        message: 'แก้ไขหลักสูตรสำเร็จ',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        message: 'เกิดข้อผิดพลาดในการแก้ไขหลักสูตร',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
});