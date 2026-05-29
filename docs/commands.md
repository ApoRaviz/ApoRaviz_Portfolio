# Commands

เอกสารนี้เป็นสารบัญคำสั่งที่เราใช้ระหว่างทำโปรเจกต์ `ApoRaviz_Portfolio`

เป้าหมายของเอกสารชุดนี้:

- รวมคำสั่งที่ใช้จริงหรือใช้ในรูปแบบเทียบเท่าระหว่างทำโปรเจกต์
- ไม่ใส่คำสั่งซ้ำหลายรอบ
- อธิบายว่าคำสั่งนั้นใช้ทำอะไร
- แยกไฟล์ตามหมวด เพื่อกลับมาอ่านง่าย

## แนะนำลำดับการอ่าน

1. [Project Setup Commands](commands/01-project-setup.md)
2. [Development Server Commands](commands/02-development-server.md)
3. [Verification Commands](commands/03-verification.md)
4. [Git Commands](commands/04-git.md)
5. [Utility และ Troubleshooting Commands](commands/05-utility-and-troubleshooting.md)

## หมายเหตุ

บางคำสั่งในเอกสารนี้ใส่เป็นรูปแบบที่อ่านง่าย เช่น `npm run build`

ตอนที่ Codex รันจริงในเครื่อง อาจใช้รูปแบบยาวกว่านี้เพื่อบังคับ Node 24 เช่น:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm run build
```

เหตุผลคือป้องกันไม่ให้เครื่องเผลอใช้ Node version อื่นตอน build/test

