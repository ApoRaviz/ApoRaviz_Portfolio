# Resume Data, Hero Background และ Color

ไฟล์นี้อธิบายว่าข้อมูลจาก resume ถูกนำไปใส่ตรงไหน ทำไม Hero background ถึงใช้ `div` หลายชั้น และถ้าใช้ดำส้มควรเติมสีอะไร

## เอาข้อมูล resume มาใส่ตรงไหน

หลังจากอ่าน resume แล้ว เราเอาข้อมูลที่สัมพันธ์กับเว็บมาใส่ใน data service หลัก:

```text
src/app/services/portfolio-data.service.ts
```

จุดที่อัปเดต:

- `profile`
- `skillGroups`
- `experiences`
- `contactInfo`

ทำไมไม่แก้ HTML ตรง ๆ?

เพราะ HTML ควรเป็น layout/presentation ส่วนข้อมูลจริงควรอยู่ใน data service

ตัวอย่าง:

```ts
readonly experiences = signal<Experience[]>([
  {
    period: 'Nov 2023-Present',
    role: 'Senior Programmer',
    company: 'Unbox.IT',
    description: 'Working with WMS interfaces...',
  },
]);
```

แล้ว `experience.component.html` ใช้ `@for` วนแสดง:

```html
@for (item of data.experiences(); track item.period) {
  <article>
    <p>{{ item.period }}</p>
    <h3>{{ item.role }}</h3>
    <p>{{ item.company }}</p>
  </article>
}
```

ข้อดี:

- ถ้าแก้ข้อมูล resume ต่อไป แก้ที่ service เป็นหลัก
- layout ไม่ต้องเปลี่ยน
- component ใช้ซ้ำกับข้อมูลใหม่ได้
- ถ้าอนาคตมีหลังบ้าน service นี้คือจุดเริ่มต้นที่ดี

## ทำไมข้อมูล Build Journey ควรมาจาก resume

`Build Journey` หรือ section ประสบการณ์ทำงานควรเล่าเรื่องที่สัมพันธ์กับ resume จริง เพราะเป็นส่วนที่คนอ่านใช้ประเมินว่าเคยทำงานแบบไหนมาแล้ว

สิ่งที่ใส่ได้จาก resume:

- บริษัทและช่วงเวลา
- role/job title ตามจริง
- งานระบบที่เคยทำ เช่น WMS, TMS, back office, reports
- technology ที่เกี่ยวข้อง เช่น Angular, C#, .NET, SQL Server, GitHub Actions
- ลักษณะงานที่สะท้อนตัวตน เช่น support team, ช่วย junior, คุย requirement

สิ่งที่ควรเลี่ยง:

- คำโอ้อวดเกินจริง
- progress bar เป็นค่าพลัง
- คำอย่าง `expert`, `professional`, `pro`

## Hero background รอบใหม่

Hero เดิมมี grid และ glow พื้นฐาน

รอบนี้ปรับให้มีอารมณ์ RPG/HUD มากขึ้นด้วย visual layers:

- atmosphere background
- grid map overlay
- diagonal energy lines
- HUD corner frame
- glass panel หลังข้อความ

ตัวอย่าง:

```html
<div class="absolute inset-0 -z-30 bg-[radial-gradient(...)]"></div>
```

ทำไมใช้ `div`?

เพราะ layer นี้เป็นภาพตกแต่งพื้นหลัง ไม่มีความหมายเชิงเนื้อหา จึงไม่ควรใช้ `section`, `article`, หรือ heading

ทำไมใส่ `-z-30`?

เพราะต้องวาง layer ไว้ด้านหลัง content หลักของ Hero

ทำไมใส่ comment อธิบาย?

เพราะ background แบบ layered UI อ่านยากกว่าปกติ ถ้าไม่มี comment จะงงว่าแต่ละ `div` มีไว้ทำอะไร

## ทำไมตรง Hero หลักควรใช้ section

Hero เป็นส่วนใหญ่ของหน้า และเป็น target ของ navigation `#home`

ดังนั้นควรใช้:

```html
<section id="home">
  ...
</section>
```

เหตุผล:

- เป็น semantic landmark ของเนื้อหาหนึ่งส่วน
- browser และ screen reader เข้าใจว่าเป็น section หลัก
- navbar สามารถ scroll มาหา `id="home"` ได้
- เหมาะกับ portfolio ที่มีหลาย section เช่น about, skills, projects, contact

## ทำไมบางชั้นใน Hero ใช้ div

`div` เหมาะกับของที่ไม่มีความหมายเชิงเนื้อหา เช่น:

- layout wrapper
- grid/flex container
- background layer
- glow layer
- frame ตกแต่ง
- กลุ่ม visual ที่ใช้จัดวางเท่านั้น

ตัวอย่าง flow:

```html
<section id="home">
  <div aria-hidden="true">background layer</div>
  <div>layout wrapper</div>
</section>
```

ตรงนี้ `section` คือความหมายของเนื้อหา ส่วน `div` คือเครื่องมือจัด layout/visual

## สีดำส้มควรเติมสีอะไร

ดำ + ส้มเป็นคู่สีหลักที่ดีสำหรับ ApoRaviz แล้ว

แต่ถ้าใช้แค่ดำกับส้ม เว็บจะดูแบนและร้อนเกินไป

สีเสริมที่เหมาะ:

- Steel gray: ใช้กับ border, panel, HUD frame
- Ember red: ใช้เล็กน้อยกับ axe/fantasy energy
- Soft green: ใช้เฉพาะ status เช่น ready/success
- Warm white: ใช้กับ text หลัก

จำง่าย:

```text
Black = world
Orange = brand / action
Steel = armor / structure
Red = axe energy
Green = good status
```

สิ่งที่ควรระวัง:

- อย่าใช้แดงเยอะ เพราะจะแย่ง orange
- อย่าใช้ฟ้า/ม่วงเยอะ เพราะจะพาเว็บไปทาง cyberpunk
- อย่าใช้สีเยอะเกิน 4-5 role หลัก

