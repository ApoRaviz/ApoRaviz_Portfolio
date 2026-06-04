# Portfolio Roadmap

เอกสารนี้เป็นแผนอนาคตของ `ApoRaviz_Portfolio` แยกจาก `docs/progress.md` ที่ใช้บันทึกสิ่งที่ทำไปแล้ว

## Phase 1: Hardening

- [x] ใช้ Angular 21, Node 24, strict TypeScript, standalone components และ signals
- [x] ใช้ SSR-safe browser API guards
- [x] มี GitHub Actions สำหรับ CI และ GitHub Pages deploy
- [x] ปรับ `npm run build` ให้ใช้ `CI=1 ng build --progress=false` เพื่อหลบ esbuild deadlock ใน local terminal
- [x] เอา Google Fonts link ออกจาก `index.html` เพื่อให้ build ไม่ต้องพึ่ง network ตอน inline fonts
- [ ] เติมข้อมูลจริงใน `PortfolioDataService`
- [ ] เอา placeholder สำคัญออกหรือซ่อนไว้ก่อน
- [ ] ขยาย `README.md`
- [ ] เพิ่ม unit tests สำหรับ service/form/SSR guards
- [ ] ตรวจ UI บน desktop และ mobile
- [ ] ตรวจ GitHub Actions บน remote หลัง push

## Phase 2: Content Polish

- [ ] เพิ่ม project screenshot หรือ visual preview
- [ ] ปรับ project descriptions ให้เล่า value มากกว่า tech stack
- [ ] เพิ่ม case study ของ `MooPing_Loyalty`
- [ ] ตรวจ SEO title/description/open graph
- [ ] ตรวจ accessibility ของ nav, buttons, links และ form

## Phase 3: Portfolio As Hub

- [ ] เพิ่ม project ใหม่ผ่าน `PortfolioDataService`
- [ ] เชื่อมทุก demo ด้วย live URL และ GitHub URL จริง
- [ ] เพิ่ม learning/case study links
- [ ] วางระบบ publish flow สำหรับโปรเจกต์ลูก

## Definition Of Done For Step 1

```text
npm run build ผ่าน
npm run test:ci ผ่าน
README/roadmap/architecture อ่านแล้วเข้าใจ
GitHub Actions ผ่านหลัง push
หน้า portfolio ไม่มี placeholder สำคัญ
```
