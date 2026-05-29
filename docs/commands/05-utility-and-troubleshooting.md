# Utility และ Troubleshooting Commands

ไฟล์นี้รวมคำสั่งช่วยตรวจไฟล์ ค้นหา port และแก้ปัญหาระหว่างพัฒนา

## rg

```bash
rg -n "inject\\(\\)|Dependency Injection" docs/teach.md docs/teach
```

ใช้ค้นหาข้อความในไฟล์อย่างรวดเร็ว

ในโปรเจกต์นี้ใช้เช็กว่าเอกสาร `teach` มีอธิบาย `inject()` แล้วหรือยัง

เหตุผลที่ใช้ `rg`:

- เร็วกว่า `grep` ในหลายกรณี
- แสดง filename และ line number ได้อ่านง่าย

## rg --files

```bash
rg --files
```

ใช้แสดงรายชื่อไฟล์ทั้งหมดที่ ripgrep เห็นในโปรเจกต์

เหมาะสำหรับหาไฟล์โดยไม่ต้องเปิด folder ทีละชั้น

## find

```bash
find docs/teach -maxdepth 1 -type f -name '*.md' -print | sort
```

ใช้เช็กไฟล์ markdown ใน folder `docs/teach`

ในโปรเจกต์นี้ใช้หลังแยกเอกสารสอนเป็นไฟล์ย่อย เพื่อยืนยันว่าไฟล์ถูกสร้างครบ

## sed

```bash
sed -n '1,220p' docs/teach.md
```

ใช้เปิดดูเฉพาะช่วงบรรทัดของไฟล์

เหมาะกับไฟล์ยาว เพราะไม่ต้องพิมพ์ออกมาทั้งไฟล์

## tail

```bash
tail -n 80 docs/progress.md
```

ใช้ดูท้ายไฟล์

ในโปรเจกต์นี้ใช้เช็ก section ล่าสุดของ `progress.md` ก่อนเพิ่มบันทึกใหม่

## wc -l

```bash
wc -l docs/teach.md
```

ใช้นับจำนวนบรรทัดของไฟล์

ในโปรเจกต์นี้ใช้ก่อนแยก `teach.md` เพราะไฟล์เริ่มยาวมาก

## lsof

```bash
lsof -ti :4201
```

ใช้หา process id ที่ใช้ port 4201

ตัวเลือก:

- `-t`: แสดงเฉพาะ process id
- `-i :4201`: หา process ที่ใช้ port 4201

## kill

```bash
kill 37958
```

ใช้หยุด process ตาม process id

ในโปรเจกต์นี้ใช้หยุด Angular dev server ที่เปิดไว้บน port 4201 เพื่อไม่ปล่อย process ค้าง

ข้อควรระวัง:

- ต้องแน่ใจก่อนว่า process id นั้นคือ process ที่ต้องการหยุดจริง
- ไม่ควรใช้กับ process ที่ไม่รู้จัก

## mkdir -p

```bash
mkdir -p docs/teach
```

ใช้สร้าง folder และไม่ error ถ้า folder มีอยู่แล้ว

ในโปรเจกต์นี้ใช้ตอนแยกเอกสาร:

- `docs/teach/`
- `docs/commands/`

