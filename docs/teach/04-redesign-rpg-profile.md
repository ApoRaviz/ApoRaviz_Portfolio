# Redesign แนว RPG Profile

ไฟล์นี้อธิบายเหตุผลของการ redesign เว็บให้สื่อถึงตัวตนแบบ gamer-minded developer โดยยังไม่ใช้คำโอ้อวดเกินตัว

## ทำไมต้องเริ่มจาก design direction

รอบ redesign เราไม่ได้แค่เปลี่ยนสีหรือเปลี่ยนคำบนหน้า แต่เปลี่ยน "ตัวตน" ของเว็บ

โจทย์ใหม่คือ:

```text
Gamer-minded developer profile
```

ก่อนแก้ component เราจึงเพิ่มไฟล์:

```text
docs/design-direction.md
```

ไฟล์นี้ทำหน้าที่เป็นข้อตกลงร่วมกันว่าเว็บควรสื่ออะไร เช่น:

- เป็นโปรแกรมเมอร์ที่ชอบเกม
- เป็นกันเอง
- สนุกง่าย
- แคร์เพื่อนและคนรอบตัว
- ไม่พยายามขายตัวเองว่าเป็นผู้เชี่ยวชาญ
- ไม่ใช้คำอย่าง `pro`, `professional`, `expert`

เหตุผลที่ควรมี design direction:

- เวลาแก้หลาย component จะไม่หลุดคนละโทน
- ช่วยตัดสินใจว่า copy ไหนควรใช้หรือไม่ควรใช้
- ช่วยให้เว็บไม่กลายเป็น template ทั่วไป
- เป็นเอกสารที่กลับมาอ่านก่อนแก้ UI รอบถัดไปได้

## Copy tone คืออะไร

`copy` คือข้อความที่ผู้ใช้เห็นบนเว็บ เช่น heading, tagline, button, section label

`copy tone` คืออารมณ์ของข้อความเหล่านั้น

ตัวอย่าง tone เดิม:

```text
Full-Stack Developer & AI Automation Developer
```

โทนนี้ไม่ได้ผิด แต่ฟังดูทางการและอาจดูเหมือนพยายามขายความเชี่ยวชาญ

ตัวอย่าง tone ใหม่:

```text
Gamer-minded developer who builds useful web tools
```

โทนนี้สื่อว่า:

- เป็น developer
- ชอบเกม
- เน้นสร้างของที่ใช้ได้จริง
- ไม่โอ้อวด

## ทำไม navbar เอาชื่อออก

เดิม navbar มี logo และชื่อ:

```html
<img ... />
<span>{{ data.profile().name }}</span>
```

รอบนี้เราเอาชื่อออกจาก navbar เหลือ logo อย่างเดียว

เหตุผล:

- ชื่อมีอยู่ใน Hero แล้ว และควรเด่นที่สุดตรงนั้น
- navbar ควรเบา อ่านง่าย และไม่แย่ง spotlight
- โลโก้ ApoRaviz เป็นสัญลักษณ์พอแล้วสำหรับมุมซ้าย
- เว็บแนว profile/game menu มักใช้ mark หรือ emblem เป็นจุดจำ

หลักคิด:

```text
Navbar = แผนที่
Hero = ตัวตน
```

ดังนั้น navbar ไม่จำเป็นต้องเล่าทุกอย่าง

## ทำไมเปลี่ยน Skills เป็น Loadout

คำว่า `Skills` เข้าใจง่าย แต่ให้ความรู้สึก portfolio ทั่วไป

คำว่า `Loadout` มาจากภาษาเกม หมายถึงชุดอุปกรณ์ที่ผู้เล่นเลือกใช้

ในเว็บนี้เราใช้ `Loadout` เพื่อสื่อว่า:

- skill เป็นเครื่องมือที่หยิบมาใช้
- ไม่ใช่ค่าพลัง
- ไม่ต้องมี progress bar
- ยังเรียนรู้และเปลี่ยน loadout ได้เรื่อย ๆ

ตัวอย่างใน data:

```ts
readonly skillGroups = signal<SkillGroup[]>([
  { category: 'Frontend', skills: ['Angular', 'Ionic', 'Tailwind CSS'] },
]);
```

ใน template:

```html
@for (group of data.skillGroups(); track group.category) {
  <article>
    <h3>{{ group.category }}</h3>
  </article>
}
```

สิ่งที่ควรจำ:

```text
Data ยังเป็น skillGroups เหมือนเดิม
แต่ presentation เปลี่ยนชื่อ section เป็น Loadout
```

นี่คือการแยก content structure ออกจาก visual concept

## ทำไม Projects เป็น Quest Log

ในเกม `Quest Log` คือรายการภารกิจที่ทำหรือกำลังทำ

ใน portfolio:

```text
Project = Quest
```

ข้อดีของแนวคิดนี้:

- เข้ากับตัวตนคนชอบเกม
- ทำให้ project card ดูมีเรื่องเล่า
- ไม่ต้องพูดว่าเก่ง แต่ให้สิ่งที่สร้างเล่าแทน

ใน project card เราเพิ่ม label:

```html
<p>Quest {{ project.id }}</p>
```

ตรงนี้ไม่ได้เปลี่ยน logic ใหญ่ แค่เปลี่ยน presentation ให้มี game flavor

## ทำไมเปลี่ยน emoji icon เป็น text badge

เดิม service/feature บางส่วนใช้ emoji เช่น icon ของ card

รอบนี้เราเปลี่ยนเป็น text badge เช่น:

```ts
{ icon: 'WEB', title: 'Website / Landing Page' }
{ icon: 'BOT', title: 'AI Chatbot' }
```

เหตุผล:

- text badge ดูเหมือน game UI / HUD มากกว่า
- คุมขนาดง่ายกว่า emoji
- ไม่เกิดปัญหา emoji แสดงต่างกันในแต่ละเครื่อง
- อ่านเป็น code-like label ได้ดี

ใน HTML:

```html
<p class="inline-flex rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-sm text-primary">
  {{ service.icon }}
</p>
```

ตรงนี้ใช้ `<p>` เพราะเป็น text label ของ card ไม่ใช่ปุ่มหรือ link

## ทำไมเพิ่ม prefers-reduced-motion

เว็บแนวเกม/portfolio อาจมี animation เยอะขึ้น

แต่บางคนตั้งค่าในเครื่องว่าไม่อยากเห็น motion มาก เพราะอาจเวียนหัวหรือรบกวนการอ่าน

เราเพิ่มใน `src/styles.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

แปลว่า:

- ถ้าผู้ใช้ขอลด motion
- animation/transition จะสั้นมาก
- เว็บยังใช้ได้ แต่ไม่เคลื่อนไหวเยอะ

นี่คือ accessibility ที่ควรมีเมื่อทำ UI ที่มี motion

## ทำไมเปลี่ยน font

เดิมใช้:

```text
Space Grotesk + DM Sans
```

โทนเดิมจะออก tech/clean

รอบนี้เพิ่ม:

```text
Fredoka + Nunito
```

เหตุผล:

- `Fredoka` ทำให้ heading ดูสนุกและเป็นกันเองขึ้น
- `Nunito` อ่านง่ายและนุ่มกว่า
- ยังเก็บ `JetBrains Mono` สำหรับ badge/code/HUD feeling

จำง่าย:

```text
Fredoka = character / heading
Nunito = reading / body
JetBrains Mono = code / HUD / tags
```

## สรุป redesign รอบนี้

- เว็บขยับจาก dark portfolio template ไปเป็น gamer-minded developer profile
- navbar เหลือโลโก้ ไม่ใส่ชื่อ
- ลดคำที่ดูโอ้อวด
- Skills กลายเป็น Loadout
- Projects กลายเป็น Quest Log
- Services กลายเป็น Useful Builds
- Testimonials กลายเป็น Party Notes
- เพิ่ม design direction doc เพื่อเป็นเข็มทิศ
- เพิ่ม reduced motion เพื่อ accessibility

