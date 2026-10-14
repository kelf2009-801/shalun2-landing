# Шалун: Свои на одной волне

## Brief
Русская интернет-рация для коллег и друзей. Цель сайта: понятное скачивание Android APK и инструкции. Не рекламировать подтверждённую приватность, гарантированную доставку SOS или офлайн-связь.

## Concepts
1. Радиосигнал соединяет людей. Originality 4, fit 5, feasibility 5, portability 2. Signature: нажатие демонстрационной кнопки отправляет графическую волну, без доступа к микрофону.
2. Дорожный маршрут команды. Originality 3, fit 4, feasibility 5, portability 4. Слишком близко к транспортному сервису.
3. Шалун как игривый голосовой персонаж. Originality 4, fit 3, feasibility 4, portability 3. Не подходит рабочей аудитории.
Выбран первый: реальное действие PTT определяет круговую графику, краткие реплики, ритм и композицию.

Idea: Свои на одной волне.
Metaphor: сигнал от одной кнопки к своей команде.
Signature: интерактивная иллюстрация радиоимпульса, явно не настоящий эфир.
Emotion: уверенная, дружелюбная рабочая связь.
Motion verb: импульс распространяется и спокойно затухает.
Screenshot: огромный заголовок, круглая кнопка на поле графитовых дуг и кобальтовый акцент.

## System
Ground #f1f3f0, ink #17241f, muted #53615b, line #c9d1cc, accent #1646d7, curtain #17241f.
System sans Segoe UI/Arial: кириллица, отсутствие внешнего запроса шрифта, быстрый первый экран. Display weight 800, tracking -0.06em; body 18px/1.6. Grid: 12-column desktop, mobile one column; 44px minimum primary targets. Радиус: 18px, круг только у радиокнопки.
Static HTML/CSS/JS for existing GitHub Pages. No framework/router/build overhead; no GL/loader/smooth-scroll libraries because downloading and reading are the primary tasks. Quiet idle state intentional; animation only after deliberate interaction. Reduced motion disables pulse. Native cursor retained.

## Composition
Hero: large statement left | diagram right.
Statement: full-width dark panel, one sentence.
Product: screen gallery + numbered feature index.
Guide: separate readable page, collapsible native details.
Footer: large download invitation + developer/legal links.

## Delivery
Isolated next/ preview, original site untouched. APK ../app-release.apk reuses maintained signed mirror. Current known release 1.9.0, device privacy acceptance pending. Real screenshots from existing assets, not artificial UI. No invented testimonials, metrics, client logos or awards. No content placeholders.
