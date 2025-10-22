# Paleta de Culori NOBIS FARM

## Definirea Culorilor

### 1. Verde (Culoare Principală)
- **Rol**: Simbolizează sănătatea, echilibrul, natura
- **Utilizare**: Logo și accente principale
- **Clase Tailwind**: `nobis-green-*`

```css
/* Exemple de utilizare */
.text-nobis-green-500     /* Verde principal pentru text */
.bg-nobis-green-600       /* Fundal verde pentru butoane */
.text-nobis-green-700     /* Verde închis pentru contraste */
.border-nobis-green-400   /* Bordură verde */
```

### 2. Albastru Calm (Culoare Secundară)
- **Rol**: Reprezintă încrederea, profesionalismul și curățenia
- **Utilizare**: Titluri sau zone de contrast
- **Clase Tailwind**: `nobis-blue-*`

```css
/* Exemple de utilizare */
.text-nobis-blue-500      /* Albastru pentru titluri */
.bg-nobis-blue-100        /* Fundal albastru deschis */
.hover:text-nobis-blue-600 /* Hover pe albastru */
```

### 3. Alb Pur (Culoare Neutră 1)
- **Rol**: Fundal principal – transmite claritate și simplitate
- **Utilizare**: Fundal principal
- **Clase Tailwind**: `nobis-white`

```css
/* Exemple de utilizare */
.bg-nobis-white           /* Fundal alb pur */
.text-nobis-white         /* Text alb */
```

### 4. Gri Deschis (Culoare Neutră 2)
- **Rol**: Fundal secundar, zone de delimitare, text discret
- **Utilizare**: Fundaluri secundare, delimitări
- **Clase Tailwind**: `nobis-gray-*`

```css
/* Exemple de utilizare */
.bg-nobis-gray-100        /* Fundal gri deschis */
.text-nobis-gray-600      /* Text gri pentru detalii */
.border-nobis-gray-200    /* Bordură gri subtilă */
```

### 5. Bej Cald (Culoare Complementară)
- **Rol**: Sugerează grijă, apropiere, blândețe
- **Utilizare**: Materiale destinate mamelor și copiilor
- **Clase Tailwind**: `nobis-beige-*`

```css
/* Exemple de utilizare */
.bg-nobis-beige-300       /* Fundal bej cald */
.text-nobis-beige-700     /* Text bej închis */
.hover:bg-nobis-beige-200 /* Hover pe bej */
```

## Exemple de Combinații

### Pentru Butoane Principale
```jsx
<button className="bg-nobis-green-600 hover:bg-nobis-green-700 text-nobis-white">
  Adaugă în coș
</button>
```

### Pentru Carduri de Produse
```jsx
<div className="bg-nobis-white border border-nobis-gray-200 hover:shadow-lg">
  <h3 className="text-nobis-green-700">Nume Produs</h3>
  <p className="text-nobis-gray-600">Descriere</p>
</div>
```

### Pentru Secțiuni Mama & Copil
```jsx
<div className="bg-nobis-beige-100 border border-nobis-beige-300">
  <h2 className="text-nobis-beige-800">Produse pentru Mama & Copil</h2>
</div>
```

### Pentru Zone de Încredere/Profesionale
```jsx
<div className="bg-nobis-blue-50 border-l-4 border-nobis-blue-500">
  <h3 className="text-nobis-blue-700">Consiliere Profesională</h3>
</div>
```

## Ghid de Utilizare

### DO ✅
- Folosește `nobis-green-*` pentru acțiuni principale și logo
- Folosește `nobis-blue-*` pentru zone de încredere și profesionale
- Folosește `nobis-beige-*` pentru produse mama & copil
- Folosește `nobis-gray-*` pentru text secundar și delimitări
- Folosește `nobis-white` pentru fundal principal

### DON'T ❌
- Nu combina prea multe culori într-un singur element
- Nu folosi culori care nu sunt în paletă
- Nu folosi verde închis (`nobis-green-700+`) pentru text pe fundal închis
- Nu folosi bej pentru elemente critice de navigație

## Implementare Completă

Paleta a fost implementată în:
- ✅ `tailwind.config.ts` - Definițiile culorilor
- ✅ `Header.tsx` - Logo și navigație
- ✅ `Footer.tsx` - Footer complet
- 🔄 În curs: Alte componente vor fi actualizate gradual

## Compatibilitate

Paleta `nobis-*` funcționează alături de culorile existente din design system pentru o tranziție lină.
