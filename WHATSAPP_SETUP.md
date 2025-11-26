# Configurare WhatsApp Business Cloud API

## Pași pentru configurare

### 1. Setare variabile de mediu în Supabase

Pentru ca funcția `send-whatsapp-notification` să funcționeze, trebuie să setezi următoarele variabile de mediu în Supabase:

1. Accesează **Supabase Dashboard** → **Project Settings** → **Edge Functions** → **Secrets**
2. Adaugă următoarele variabile de mediu:

```
WHATSAPP_TOKEN=EAAWZAzOGTFzABPwfuHFJpOHvpZBMvV16lpVCtkjQLdcthZCTlDcQMZBtpzpAvzWvBqC9xyulIT1ZCRNcl9Fm6HEqAz1Q5ti58feRHZCQGRD1ZCm5Va6J9LBzwW3tngKJkMF6W50zWrX5h6bl99moOHi5A8VLyPyeldGjFh1nQuXNSn080DZCHXWyXkJi7mkQ9Fhahxyp5Ew2rCuH3oAHCdPtNCOkTCV14GeABb5WxMHuGjsHZAgZDZD

WHATSAPP_PHONE_NUMBER_ID=903616276160152

WHATSAPP_BUSINESS_ACCOUNT_ID=1293631669115554

YOUR_WHATSAPP_NUMBER=37369023437
```

### 2. Deploy funcția Edge Function

Dacă folosești Supabase CLI:

```bash
supabase functions deploy send-whatsapp-notification
```

Sau deploy direct din Supabase Dashboard:
- Accesează **Edge Functions** → **Deploy new function**
- Selectează folderul `supabase/functions/send-whatsapp-notification`

### 3. Testare

După deploy, funcția va fi apelată automat când un client plasează o comandă prin pagina de checkout.

## Notă importantă despre WhatsApp Business Cloud API

**Mesaje text directe vs Template-uri:**

Funcția actuală folosește mesaje text directe (`type: "text"`). Acestea funcționează doar dacă:
- Numărul WhatsApp este verificat
- Utilizatorul a inițiat conversația în ultimele 24 de ore

**Pentru notificări automate de comenzi (recomandat pentru producție):**

Ar trebui să folosești **template-uri WhatsApp aprobate**. Pentru a folosi template-uri:

1. Creează un template în Meta Business Manager
2. Obține aprobarea de la Meta
3. Modifică funcția să folosească `type: "template"` în loc de `type: "text"`

Exemplu pentru template:
```json
{
  "messaging_product": "whatsapp",
  "to": "37369023437",
  "type": "template",
  "template": {
    "name": "order_notification",
    "language": { "code": "ro" },
    "components": [
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "John Doe" },
          { "type": "text", "text": "150.00 MDL" }
        ]
      }
    ]
  }
}
```

## Structura mesajului

Mesajul trimis pe WhatsApp conține:
- 🆕 Titlu: COMANDĂ NOUĂ PLASATĂ!
- 👤 Date client (prenume, nume, telefon, email, observații)
- 📦 Metoda de livrare (ridicare din farmacie sau livrare)
- 🛒 Lista produselor comandate
- 💰 Totalul comenzii
- ⏰ Data și ora comenzii

## Troubleshooting

Dacă nu primești mesaje:

1. Verifică că variabilele de mediu sunt setate corect
2. Verifică logs-urile din Supabase Dashboard → Edge Functions → Logs
3. Verifică că token-ul WhatsApp este valid și nu a expirat
4. Verifică că numărul `YOUR_WHATSAPP_NUMBER` este corect formatat (fără +, doar cifre)
5. Pentru mesaje text directe, asigură-te că numărul este verificat și că există o conversație activă în ultimele 24h

