import { RenderMode, ServerRoute } from '@angular/ssr';

// ServerRoute ใช้บอก Angular SSR ว่า route แต่ละเส้นควรถูก render แบบไหนบน server
export const serverRoutes: ServerRoute[] = [
  {
    // path '**' แปลว่าครอบคลุมทุก route ที่ไม่ได้ระบุแยกไว้ เหมาะกับ portfolio หน้าเดียว
    path: '**',

    // Prerender คือสร้าง HTML static ตอน build ช่วยให้หน้าโหลดเร็วและ SEO อ่านเนื้อหาได้ตั้งแต่แรก
    renderMode: RenderMode.Prerender,
  },
];
