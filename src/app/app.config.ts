import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// ApplicationConfig คือจุดรวม provider ระดับแอป คล้ายการตั้งค่า service/plugin หลักก่อน Angular เริ่มทำงาน
export const appConfig: ApplicationConfig = {
  providers: [
    // ดัก error ที่เกิดจาก browser event เช่น click/input แล้วส่งเข้า Angular error handling ให้เห็นปัญหาชัดขึ้น
    provideBrowserGlobalErrorListeners(),

    // เปิดใช้งาน Angular Router แม้เว็บนี้เป็นหน้าเดียว เพราะเรายังต้องมี route config สำหรับ SSR และการขยายหน้าในอนาคต
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),

    // Hydration ทำให้ HTML ที่ SSR/prerender สร้างไว้ถูก Angular รับช่วงต่อบน browser โดยไม่ต้อง render ใหม่ทั้งหน้า
    // withEventReplay ช่วยเก็บ event ที่ผู้ใช้กดระหว่างรอ hydration แล้ว replay หลัง Angular พร้อม ทำให้ UX ลื่นขึ้น
    provideClientHydration(withEventReplay()),

    // เปิดระบบ Angular animations เผื่อใช้ animation trigger ของ Angular ใน component เพิ่มเติมภายหลัง
    provideAnimations(),
  ],
};
