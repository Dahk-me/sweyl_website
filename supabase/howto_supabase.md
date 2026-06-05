# Supabase Déploiement manuel

Toutes les manipulations se font depuis **supabase.com → projet `fybnpenwtzvjwlbnbmrq`**.

---

## Formulaire de contact (submit-lead)

### 1. Créer le schéma et la table

**SQL Editor → New query**, exécute :

```sql
create schema if not exists s_lead;

create table if not exists s_lead.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  club        text not null,
  role        text not null,
  message     text,
  created_at  timestamptz not null default now()
);

alter table s_lead.leads enable row level security;

create policy "service role insert" on s_lead.leads
  for insert with check (true);

create policy "no public read" on s_lead.leads
  for select using (false);

grant usage on schema s_lead to service_role;
grant all on s_lead.leads to service_role;
```

Vérifie dans **Table Editor** que le schéma `s_lead` apparaît avec la table `leads`.

### 2. Déployer l'Edge Function

**Edge Functions → Create a new function** → nom exact : `submit-lead`

Colle le contenu du fichier :
`supabase/functions/submit-lead/index.ts`

### 3. Ajouter les secrets Mailjet

**Project Settings → Edge Functions → Secrets**, ajoute :

| Nom | Valeur |
|-----|--------|
| `MAILJET_API_KEY` | *(clé API Mailjet Dashboard Mailjet → Account → API Keys)* |
| `MAILJET_SECRET_KEY` | *(secret key Mailjet)* |

### 4. Tester

Soumettre le formulaire sur le site. Vérifier :
- Email reçu sur `contact@sweyl.com`
- Ligne visible dans **Table Editor → s_lead → leads**

---

## Ajouter une nouvelle Edge Function

1. **Edge Functions → Create a new function** → nom de la fonction
2. Coller le contenu du fichier `supabase/functions/<nom>/index.ts`
3. Ajouter les secrets nécessaires dans **Project Settings → Edge Functions → Secrets**

---

## Ajouter un secret

**Project Settings → Edge Functions → Secrets → Add secret**

Les secrets sont accessibles dans les Edge Functions via `Deno.env.get('NOM_DU_SECRET')`.

---

## Modifier une table existante

**SQL Editor → New query**, exécute le SQL `ALTER TABLE` souhaité.  
Exemple ajouter une colonne :

```sql
alter table s_lead.leads add column phone text;
```

---

## Consulter les logs d'une Edge Function

**Edge Functions → submit-lead → Logs**

Utile pour débugger si le formulaire ne fonctionne pas.
