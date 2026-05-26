import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// serverConfig คือ provider เฉพาะฝั่ง server ใช้ตอน Angular render หน้าเป็น HTML ก่อนส่งให้ browser
const serverConfig: ApplicationConfig = {
  // provideServerRendering เปิดความสามารถ SSR และ withRoutes บอกว่า server ควร render route ไหนด้วย mode อะไร
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

// mergeApplicationConfig รวม config ฝั่ง browser/app ปกติกับ config ฝั่ง server ให้ใช้ร่วมกันตอน SSR
export const config = mergeApplicationConfig(appConfig, serverConfig);
