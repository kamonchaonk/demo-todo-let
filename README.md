โบนัส
กำหนดข้อมูล 2 ชุด เป็น array of number จงคิดวิธีการในการ filter array ชุดแรก
ให้เหลือเพียงแค่สมาชิกที่มีใน array ที่ชุดสอง

const array1 = ['a', 'b', 'c', 'd', 'e'];
const array2 = ['b', 'd', 'f'];

const res = array1.filter((item)=> {
return array2.includes(item);
})
