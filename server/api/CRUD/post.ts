import { db } from '../../utils/db';
import { course } from '../../database/schema';
import { defineEventHandler, readBody, sendError, createError } from 'h3';
import { v4 as uuid } from 'uuid';
import { writeFile } from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
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

    await db.insert(course).values({
      id: uuid(),
      subject,
      name,
      image: body.image, // ใช้ชื่อไฟล์ที่บันทึกแล้ว
      content,
      teacher_name,
      toppic_sub,
      group_work_id,
    }).execute();

    return {
      statusCode: 201,
      body: {
        message: 'เพิ่มหลักสูตรสำเร็จ',
      },
    };
  } catch (error) {
    sendError(event, createError({ 
      statusCode: 500, 
      statusMessage: 'เกิดข้อผิดพลาดในการเพิ่มหลักสูตร', 
      data: error instanceof Error ? error.message : 'Unknown error' 
    }));
  }
});