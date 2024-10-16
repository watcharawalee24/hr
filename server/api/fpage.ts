import { group_work } from "../database/schema";
import { db } from "../utils/db";

export default defineEventHandler((event) => {
  return db.select().from(group_work)
    // return (
    //   [
    //     { id: '1', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
    //     { id: '2', group: '◉ กลุ่มภารกิจอำนวยการ', image: 'GroupWork.jpg'}, 
    //     { id: '3', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
    //     { id: '4', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
    //     { id: '5', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
    //     { id: '6', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
    //     { id: '7', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
    //     { id: '8', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
    //     { id: '9', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
    //     { id: '10', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
    //     { id: '11', group: '◉ กลุ่มงานอัตรากำลัง', image: 'GroupWork.jpg'},
       
      
    //   ])
      
})
