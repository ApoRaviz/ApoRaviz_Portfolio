# Design Direction

เอกสารนี้คือทิศทางใหม่ของเว็บ `ApoRaviz_Portfolio` หลังจากคุยกันว่าเว็บควรสื่อความเป็นตัวตนมากขึ้น

## Core Idea

เว็บนี้ไม่ควรเป็น portfolio template ที่พยายามดูเก่งหรือดูทางการเกินไป

เป้าหมายใหม่คือ:

```text
Gamer-minded developer profile
```

หรือพูดง่าย ๆ:

```text
โปรแกรมเมอร์ที่ชอบเกม สนุกง่าย แคร์คนรอบตัว และชอบสร้างของที่ใช้งานได้จริง
```

## Personality

สิ่งที่เว็บควรสื่อ:

- ชอบเล่นเกม
- เป็นโปรแกรมเมอร์
- รักเพื่อนและแคร์คนอื่น
- ง่าย ๆ สนุกสนาน
- ชอบ fantasy/RPG mood
- ชอบตัวละครผู้หญิงเท่ ๆ ใส่เกราะ ถือขวาน
- กำลังเติบโตและพัฒนาฝีมือ ไม่ต้องขายตัวเองว่าเป็นผู้เชี่ยวชาญ

## Words To Avoid

ไม่ควรใช้คำเหล่านี้ใน copy หลักของเว็บ:

- pro
- professional
- expert
- guru
- master
- elite
- specialist ถ้าไม่จำเป็น

เหตุผล:

- เจ้าของเว็บไม่ได้อยากวางตัวเป็นผู้เชี่ยวชาญ
- โทนเว็บควรจริงใจ เป็นกันเอง และไม่โอ้อวด
- ให้ผลงานและวิธีคิดเล่าแทนคำใหญ่ ๆ

## Voice And Tone

ควรใช้ประโยคแบบ:

- I build web apps, small tools, bots, and automations.
- I like turning messy workflows into simple tools.
- I enjoy games, code, and helping people around me.
- Learning, building, and improving one project at a time.
- Friendly builder of web apps and useful systems.

ไม่ควรใช้ประโยคแบบ:

- I deliver professional-grade solutions.
- I am an expert full-stack developer.
- I build enterprise-level scalable systems.

## Visual Mood

แนวภาพรวม:

- Dark RPG dashboard
- Friendly game UI
- Slight HUD feeling
- Orange accent from ApoRaviz logo
- Steel/armor neutral colors
- Small crimson accent for axe/energy feel
- No heavy cyberpunk neon overload
- No power bars or skill level meters

## Color Palette

ถ้าใช้ดำ + ส้มเป็นหลัก ไม่ควรเติมสีเยอะเกินไป เพราะจะเสีย brand mood ได้ง่าย

Palette ที่เหมาะ:

| Role | Color | ใช้ทำอะไร |
|---|---|---|
| Base black | `#0A0A0A` | พื้นหลังหลัก |
| Card black | `#111111` | การ์ด / panel |
| Border steel | `#2A2A2A` | เส้นขอบ / HUD frame |
| Apo orange | `#FF6B00` | CTA / active / highlight |
| Ember red | `#B91C1C` | axe energy / danger accent / fantasy detail |
| Soft green | `#22C55E` | available / success state |
| Warm text | `#E5E5E5` | body text |
| Muted text | `#A3A3A3` | secondary text |

กติกา:

- Orange เป็นสีหลัก อย่าให้แดงแย่ง orange
- Red ใช้แค่เล็กน้อยเพื่อให้รู้สึก fantasy/action
- Green ใช้เฉพาะสถานะดี เช่น ready, success, available
- Steel gray ใช้ช่วยให้ดำส้มไม่แบนเกินไป
- หลีกเลี่ยง purple/blue เยอะ เพราะจะพาเว็บไปทาง cyberpunk คนละ mood

## Section Naming

ชื่อ section แบบใหม่:

- Hero: Player Intro
- About: Player Profile
- Skills: Loadout
- Projects: Quest Log
- Services: Can Help With
- Experience: Journey
- Testimonials: Party Notes
- Contact: Send a Message

## Navbar

Navbar should:

- Show ApoRaviz logo only
- Not show the full name
- Keep menu short
- Feel like a game menu but still readable

Suggested labels:

- Profile
- Loadout
- Quests
- Help
- Journey
- Contact

## Character Direction

ใช้เป็น visual identity ได้:

```text
Original armored axe heroine
```

กติกา:

- เป็นตัวละคร original เท่านั้น
- ไม่อิงตัวละครจากเกมจริง
- ใช้เป็น mood/companion visual ไม่แย่งตัวตนเจ้าของเว็บ
- ถ้ายังไม่มีภาพจริง ให้ทำเป็น concept card ก่อน

## Admin Idea

ตอนนี้ยังไม่ควรทำหลังบ้านทันที

ลำดับที่เหมาะกว่า:

1. ทำ identity ของเว็บให้ชัด
2. จัด data model ให้พร้อมต่อยอด
3. ถ้ามีผลงานเพิ่มบ่อย ค่อยทำ `/admin`

แนวหลังบ้านในอนาคต:

- Login เฉพาะเจ้าของเว็บ
- CRUD projects
- Upload project images
- Draft / publish
- ใช้ Supabase หรือ Firebase

## Design Skill Notes

จาก `.codex/skills/ui-ux-pro-max` แนวที่เหมาะคือ:

- Portfolio grid
- Motion-driven แบบพอดี
- Friendly typography
- Avoid corporate templates
- Avoid generic layouts
- Respect `prefers-reduced-motion`

เราจะไม่ใช้คำว่า `pro` จากชื่อ skill ในเว็บจริง เพราะไม่ตรงกับ tone ที่ต้องการ
