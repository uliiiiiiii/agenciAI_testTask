# agenciAI_testTask

## Wersja polska 🇵🇱

### Rozumowanie podejścia

**Stack technologiczny:** Next.js — łatwiejsze (dosłownie trzy kliknięcia) wdrożenie, łatwiejsza komunikacja front-end/back-end (wykorzystanie API frameworka), brak problemów z CORS.

Na początku myślałam o parsowaniu pliku PDF i dopiero wtedy wysyłaniu zapytania do Gemini — prawdopodobnie kosztowałoby to mniej (choć nie badałam tego dokładnie). Następnie zdecydowałam się wysyłać cały plik bezpośrednio, ponieważ model może również analizować strukturę i uzyskać coś z niej. Na przykład, jeśli w PDF byłby obrazek, a wyciągnęlibyśmy tylko tekst, moglibyśmy przegapić coś ważnego.

Na początku wymagałam również, aby użytkownik wprowadzał swój token, aby nie używać mojego. Potem pomyślałam, że to zły pomysł, gdy chcę, aby wszystko działało „out of the box” (czyli po prostu wchodzi się na stronę i sprawdzić, czy działa). Dlatego jeśli token nie zostanie podany (co nadal jest możliwe), aplikacja użyje domyślnego — mojego (bezpiecznie przechowywanego w zmiennej środowiskowej).

---

### Uruchamianie lokalnie

1. `npm install`  
2. Wklej swoją zmienną środowiskową do pliku `.env` (przykład w `.env.example`)  
3. Uruchom:
   - `npm run dev` — tryb developerski  
   - `npm run build && npm run start` — uruchomienie wersji produkcyjnej  

---

### Wdrożenie

Wdrożone tutaj: [https://agenciai-testtask.onrender.com/](https://agenciai-testtask.onrender.com/)

---

### Struktura projektu

```

app/          - cała aplikacja
  api/        - backend
    summarize/route.ts  - /api/summarize endpoint
   page.tsx      - główna strona
   styles.css    - style strony

```

---

### Jak to działa

1. **Akcja użytkownika:** Użytkownik przesyła plik PDF przez formularz.  
2. **Wysyłka danych:** Front-end wysyła plik do endpointu `/api/summarize`.  
3. **Walidacja:** Back-end weryfikuje typ pliku i jego zawartość.  
4. **Zapytanie do AI:** Back-end wysyła PDF do API Gemini w celu wygenerowania podsumowania.  
5. **Obsługa odpowiedzi:** Back-end odbiera podsumowanie od Gemini.  
6. **Prezentacja wyniku:** Podsumowanie jest zwracane do front-endu i wyświetlane użytkownikowi.  

---

## English version 🇬🇧

## Reasoning behind the approach

**Tech stack:** Next.js — easier (literally three clicks) deploy, easier backend/frontend communication (using API interface of the framework), no CORS-related issues.

At first, I thought about parsing the PDF file and only then sending the request to Gemini — it probably would've cost less (but I'm not sure since I didn't really research it). Then I decided to send the whole file directly, since the model can also analyze structure and get something from it. For example, if there was a picture in the PDF and we extracted only text, we could've missed something important.

Also, at first I required the user to paste their token, to not use mine. Then I thought that it's a bad idea for now, when I want everything to work "out of the box" (aka you just go on the website and can check if it works). So if the token isn't provided (which you still can do), it will fallback to the default one — mine (it gets it securely from an environment variable).

---

## Running locally

1. `npm install`  
2. Paste your environment variable into the `.env` file (you have an example in `.env.example`)  
3. Run:
   - `npm run dev` — for development  
   - `npm run build && npm run start` — to run the production build  

---

## Deployment

Deployed here: [https://agenciai-testtask.onrender.com/](https://agenciai-testtask.onrender.com/)

---

## Project structure

```

app/          - the whole application
  api/        - backend
    summarize/route.ts  - /api/summarize endpoint
   page.tsx      - main page
   styles.css    - styles for the page

```


---

## How it works

1. **User Action:** The user uploads a PDF via the form.  
2. **Data Submission:** The front-end sends the file to the `/api/summarize` endpoint.  
3. **Validation:** The back-end validates the file type and content.  
4. **AI Request:** The back-end sends the PDF to the Gemini API for summarization.  
5. **Response Handling:** The back-end receives the summary from Gemini.  
6. **Result Delivery:** The summary is returned to the front-end and displayed to the user.  

