import asyncio, requests, os, random, re
from playwright.async_api import async_playwright
from datetime import datetime

# --- ⚙️ CONFIGURACIÓN MAESTRA ---
TOKEN = "8789526536:AAG5R2oGyibtZkViWsd1WYMc6pqkyzea4UI"
ID = "8286325878"
APOLLO_KEY = "mZ08lVfOnP5kjIH2mxty7w"

# Diccionario de detección
TECH_KEYWORDS = {
    "n8n / Automatización": [r"n8n", r"workflow automation", r"zapier alternative"],
    "Vibe Coding / Cursor": [r"vibe coding", r"cursor ai", r"ai-driven dev", r"lovable\.dev"],
    "Agentes Autónomos": [r"autonomous agents", r"langchain", r"crewai", r"ai agents"],
    "Marketing con IA": [r"ai marketing", r"automated content", r"predictive analytics"]
}

async def analizar_sitio_tech(page, url):
    try:
        print(f"🕵️  Escaneando tecnologías en: {url}")
        await page.goto(url, timeout=15000)
        await asyncio.sleep(3) # Esperar a que carguen scripts dinámicos
        content = await page.content()
        text_content = await page.evaluate("() => document.body.innerText")
        
        hallazgos = []
        for tech, patterns in TECH_KEYWORDS.items():
            for pattern in patterns:
                if re.search(pattern, text_content, re.IGNORECASE) or re.search(pattern, content, re.IGNORECASE):
                    hallazgos.append(tech)
                    break
        return hallazgos
    except: return []

def buscar_decisor_apollo(url_web):
    dominio = url_web.replace("https://","").replace("http://","").split('/')[0].replace("www.","")
    url_api = "https://api.apollo.io/v1/people/match"
    data = {"api_key": APOLLO_KEY, "domain": dominio, "prospective_titles": ["CEO", "CTO", "Founder", "Owner"]}
    try:
        res = requests.post(url_api, json=data, timeout=10).json()
        p = res.get('person', {})
        if p and p.get('email'):
            return {"nombre": p.get('name'), "email": p.get('email'), "cargo": p.get('title')}
    except: return None

async def enviar_telegram(msg):
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    requests.post(url, data={"chat_id": ID, "text": msg, "parse_mode": "Markdown"})

async def ejecutar_rastreo(page):
    queries = ["AI Automation Agency London", "Software Development New York", "Agencia Marketing Digital Mexico"]
    random.shuffle(queries)
    
    for q in queries:
        print(f"🚀 Buscando en Maps: {q}")
        await page.goto(f"https://www.google.com/maps/search/{q.replace(' ','+')}")
        await asyncio.sleep(5)
        
        negocios = await page.locator("div[role='article']").all()
        for neg in negocios[:5]: # Analizar los primeros 5 de cada búsqueda
            nombre = await neg.get_attribute("aria-label")
            print(f"📌 Evaluando: {nombre}")
            await neg.click()
            await asyncio.sleep(4)
            
            web_elem = page.locator("a[aria-label*='Website'], a[aria-label*='Sitio web']")
            if await web_elem.count() > 0:
                url_web = await web_elem.first.get_attribute("href")
                techs = await analizar_sitio_tech(page, url_web)
                
                if techs:
                    print(f"✨ ¡Tecnología detectada en {nombre}!")
                    datos = buscar_decisor_apollo(url_web)
                    msg = (f"🔥 *NUEVO TARGET DETECTADO*\n"
                           f"🏢 *Empresa:* {nombre}\n"
                           f"🛠 *Usa:* {', '.join(techs)}\n"
                           f"👤 *Contacto:* {datos['nombre'] if datos else 'N/A'}\n"
                           f"📧 *Email:* {datos['email'] if datos else 'N/A'}")
                    await enviar_telegram(msg)

async def main():
    async with async_playwright() as p:
        try:
            # Conexión al Chrome que abriste en la terminal
            browser = await p.chromium.connect_over_cdp("http://127.0.0.1:9222")
            page = browser.contexts[0].pages[0]
            print("✅ Conectado a Chrome. Iniciando Sabueso...")
            while True:
                await ejecutar_rastreo(page)
                print("💤 Ronda terminada. Esperando 15 min...")
                await asyncio.sleep(900)
        except Exception as e:
            print(f"❌ Error: {e}. Revisa que Chrome esté abierto en el puerto 9222.")

if __name__ == "__main__":
    asyncio.run(main())
