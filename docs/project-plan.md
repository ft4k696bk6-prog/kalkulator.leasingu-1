# Project Plan: Kalkulator Leasingu

## English

### Project Goal

I built a lead-generation leasing calculator for Polish businesses. The app should help users estimate leasing costs quickly, understand the result, print or save a clean summary, and submit a qualified lead for follow-up.

### Problem and Users

I designed this for a business owner or decision maker comparing leasing options for cars, vans, trucks, machines, or other assets. The business user needs a fast estimate before talking to an advisor. The company needs the calculator to turn an interested visitor into a useful sales lead with calculation context.

### Functional Scope

I planned the project scope around:

- Leasing calculator for multiple asset categories.
- Support for net and gross asset values, VAT, down payment, lease period, buyout, annual rate, and optional costs.
- Scenario presets for common financing setups.
- Result panel with monthly net/gross rates, financed amount, installments, buyout, and estimated financing cost.
- Browser print/PDF summary.
- Validated contact form connected to a serverless lead endpoint.
- Optional forwarding to an external webhook through `LEADS_WEBHOOK_URL`.
- Responsive landing page where the calculator and lead form remain close together.
- Prepared workspace structure for web, desktop, and mobile expansion.

### Architecture and Technical Decisions

- I chose React, TypeScript, and Vite for the main web calculator.
- I chose Bun workspaces and Turborepo to keep web, mobile, and desktop packages in one repository.
- I kept leasing formulas in a dedicated calculation module so UI components do not own business math.
- I chose a Vercel serverless endpoint for lead capture so deployment stays simple.
- I kept webhook forwarding optional, allowing local development without external services.
- I prepared Expo and Electron shells as future expansion paths without blocking the main web app.
- I used Tailwind and componentized UI sections for a responsive landing and application experience.

### Delivery Phases

1. Project foundation: monorepo setup, web package, Vite app, styling, and responsive layout.
2. Calculation engine: leasing inputs, VAT/net/gross handling, down payment, buyout, rate, optional costs, and presets.
3. Result explanation: summary cards, cost breakdown, comparison-friendly output, and print/PDF styling.
4. Lead capture: validated contact form, serverless endpoint, webhook forwarding, and safe local fallback.
5. Deployment readiness: Vercel config, environment template, README, and production build/typecheck scripts.
6. Expansion preparation: mobile and desktop package shells for future app variants.

### What Has Been Delivered

In the repository I delivered a functional portfolio version of the leasing calculator and lead capture flow. It includes the web app, calculation logic, result summary, presets, lead form, Vercel endpoint, webhook environment support, project/design notes, and monorepo setup with web, mobile, and desktop packages. The later commits cover deployment hardening and documentation polish.

### Acceptance Criteria

- User can calculate leasing costs for supported asset types.
- Inputs support VAT mode, down payment, lease period, buyout, rate, and optional costs.
- Result summary clearly separates monthly payments, financed amount, buyout, installments, and total estimated cost.
- Presets update calculator inputs in a predictable way.
- User can print or save a readable summary from the browser.
- Contact form validates required fields before submission.
- Lead endpoint accepts valid submissions and either forwards them to a webhook or logs them locally when no webhook is configured.
- The app works on desktop and mobile screen sizes.

### Testing and Verification

- Run `bun run build` to verify workspace build readiness.
- Run `bun run typecheck` to verify TypeScript across packages.
- Manually test calculation scenarios for net/gross values, different VAT settings, down payments, buyouts, rates, and optional costs.
- Test form validation with missing and invalid contact data.
- Test endpoint behavior with and without `LEADS_WEBHOOK_URL`.
- Verify print/PDF output remains readable and calculation context is included.

### What This Project Shows

This project shows business-oriented frontend project engineering: a real calculator, domain-specific inputs, clear result communication, lead generation, serverless integration, and deployment preparation. It also shows architectural thinking through a monorepo prepared for web, mobile, and desktop variants.

### Future Improvements

- Store leads in a database and expose an admin lead list.
- Add analytics for calculator usage and conversion rate.
- Add CRM integration for automatic lead assignment.
- Add richer leasing rules per asset type or lender.
- Add saved calculation links for returning users and advisors.

---

## Polski

### Cel projektu

Zbudowałem kalkulator leasingu generujący leady dla polskich firm. Aplikacja ma pomóc użytkownikowi szybko oszacować koszt leasingu, zrozumieć wynik, wydrukować lub zapisać czytelne podsumowanie i wysłać kwalifikowany kontakt do dalszej obsługi.

### Problem i użytkownicy

Zaprojektowałem to dla właściciel firmy lub osoba decyzyjna porównująca leasing samochodu, vana, ciężarówki, maszyny albo innego środka trwałego. Użytkownik biznesowy chce szybkiej estymacji przed rozmową z doradcą. Firma potrzebuje, żeby kalkulator zamieniał zainteresowanego odwiedzającego w użyteczny lead z kontekstem wyliczenia.

### Zakres funkcjonalny

Zakres projektu rozpisałem na:

- Kalkulator leasingu dla kilku kategorii aktywów.
- Obsługę wartości netto i brutto, VAT, wkładu własnego, okresu leasingu, wykupu, oprocentowania i kosztów dodatkowych.
- Presety scenariuszy dla typowych ustawień finansowania.
- Panel wyniku z ratą netto/brutto, kwotą finansowania, sumą rat, wykupem i szacowanym kosztem finansowania.
- Podsumowanie gotowe do wydruku lub zapisu jako PDF z przeglądarki.
- Walidowany formularz kontaktowy połączony z endpointem serverless.
- Opcjonalne przekazanie leada do zewnętrznego webhooka przez `LEADS_WEBHOOK_URL`.
- Responsywny landing page, gdzie kalkulator i formularz są blisko siebie.
- Przygotowaną strukturę workspace pod przyszłe wersje web, desktop i mobile.

### Architektura i decyzje techniczne

- React, TypeScript i Vite jako baza głównego kalkulatora webowego.
- Bun workspaces i Turborepo, żeby trzymać web, mobile i desktop w jednym repozytorium.
- Formuły leasingowe w osobnym module kalkulacji, żeby komponenty UI nie przechowywały logiki biznesowej.
- Endpoint serverless Vercel do przyjmowania leadów, żeby deployment był prosty.
- Opcjonalne przekazywanie do webhooka, dzięki czemu lokalny development nie wymaga zewnętrznych usług.
- Szkielety Expo i Electron jako ścieżki rozwoju bez blokowania głównej aplikacji webowego.
- Tailwind i komponentowe sekcje UI dla responsywnego doświadczenia landingowego i aplikacyjnego.

### Etapy realizacji

1. Fundament projektu: monorepo, paczka web, aplikacja Vite, style i responsywny layout.
2. Silnik kalkulacji: pola leasingowe, VAT/netto/brutto, wkład własny, wykup, oprocentowanie, koszty dodatkowe i presety.
3. Wyjaśnienie wyniku: karty podsumowania, breakdown kosztów, output do porównania i style print/PDF.
4. Lead capture: walidowany formularz, endpoint serverless, przekazanie webhookiem i bezpieczny fallback lokalny.
5. Gotowość do wdrożenia: konfiguracja Vercel, template środowiska, README i skrypty build/typecheck.
6. Przygotowanie rozwoju: szkielety paczek mobile i desktop.

### Co zostało zrobione

W repozytorium dowiozłem działającą wersję portfolio kalkulatora leasingu i flow lead capture. Jest aplikacja webowa, logika kalkulacji, podsumowanie wyniku, presety, formularz leada, endpoint Vercel, obsługa webhooka przez zmienną środowiskową, notatki projektowe i designowe i monorepo z paczkami web, mobile oraz desktop. Późniejsze commity obejmują dopracowanie deploymentu i dokumentacji.

### Kryteria akceptacji

- Użytkownik może policzyć leasing dla wspieranych typów aktywów.
- Formularz obsługuje VAT, wkład własny, okres, wykup, oprocentowanie i koszty dodatkowe.
- Wynik jasno pokazuje raty, kwotę finansowania, sumę rat, wykup i szacowany koszt całkowity.
- Presety przewidywalnie aktualizują pola kalkulatora.
- Użytkownik może wydrukować lub zapisać czytelne podsumowanie.
- Formularz kontaktowy waliduje wymagane pola przed wysłaniem.
- Endpoint przyjmuje poprawne zgłoszenie i przekazuje je do webhooka albo loguje lokalnie bez konfiguracji webhooka.
- Aplikacja działa na ekranach desktop i mobile.

### Testowanie i weryfikacja

- Uruchomić `bun run build`, żeby sprawdzić build workspace.
- Uruchomić `bun run typecheck`, żeby sprawdzić TypeScript w paczkach.
- Ręcznie sprawdzić scenariusze kalkulacji dla wartości netto/brutto, VAT, wkładu, wykupu, oprocentowania i kosztów dodatkowych.
- Przetestować walidację formularza dla pustych i błędnych danych.
- Sprawdzić endpoint z `LEADS_WEBHOOK_URL` i bez niego.
- Zweryfikować, że wydruk/PDF jest czytelny i zawiera kontekst kalkulacji.

### Co pokazuje ten projekt

Tym projektem pokazuję frontend nastawiony na realny biznes: kalkulator z logiką domenową, konkretne pola finansowe, jasne wyjaśnienie wyniku, generowanie leadów, integrację serverless i gotowość deploymentu. Dodatkowo pokazuje myślenie architektoniczne przez monorepo przygotowane pod web, mobile i desktop.

### Możliwe dalsze kroki

- Zapisywać leady w bazie danych i dodać panel administracyjny.
- Dodać analitykę użycia kalkulatora i konwersji.
- Dodać integrację CRM do automatycznego przypisania leadów.
- Rozbudować reguły leasingowe per typ aktywa lub finansujący.
- Dodać linki do zapisanych kalkulacji dla powracających użytkowników i doradców.
