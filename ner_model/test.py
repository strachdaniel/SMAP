import spacy
import json

nlp = spacy.load("./output/model-last")

# Sample text for prediction
text = "Výplatní lístek: 3 - Mgr. Jarmila Hlodavá Identifikace  Pracoviště: Funkce: Druh PPV:  1. Výplatní místo: Kategorie: 101 Činnost pro VL:  Pracovní fond Pracovní fond: 21d Odpracováno: 21d 168.00h Odpracováno přesčas: Pracovní pohotovost: Neodpracováno: Neplacené volno:  1 111 Zaměstnání: 0 Zdr. pojišťovna: Základní plat 168.00h 33500  234110 ZPŠ  Základní: Ukolový: Za přesčas: Ostatní:  období: 05.21  Pracovněprávní vztah  Skupina: 100.00 Třída: 1. Stupeň:  Náhrady  Zar.mzda: Úvazek: Rozvrh:  Dovolená:  Svátek:  Skolení:  Osobní přek.: Přek. DPN:  Přek. organizace: Ostatní/|zolačka:  33 500.00 1 000 1000  7 Tarif: Příplatek osobní: Příplatky ostatní: Srážky  Zákonné:  Půjčky:  FKSP:  Pojistné:  Spoření:  Odbory:  Ostatní:  Průměry Průměr pro náhrady: Red. prům. pro DPN: Hod. výše náhrady - 60%: Prům. pro náhrady škody:  Dovolená  320.00h 40.00d 4.00d  Letošní: Dřívější: Dodatková: Krácení: Čerpání: Proplacení: Zůstatek: 320.00h 42.00d  Mimomzdová plnění Penzijní a živ. pojištění: Stipendia:  Cestovné: Ostatní:  0.00h 2.00d  Ostatní platby za práci Dohody o PČ: Dohody o PP: Ostatní:  Tisk 09.06.2021 10:31:53  Příplatky Osobní: 168.00h 1000 Vedení: Zvláštní: Prostředí: Přesčasový: So Ne noc: Svátek: Specializační: Ped.činnost: Ostatní:  168.00h 1000  Odměny Prémie: Odměny: Jubilejní: Fond vedoucího: Ostatní:  Ostatní složky platu Pracovní pohotovost: Naturální:  Ostatní:  Hrubý příjem Mzdový náklad: Hrubá mzda: Hrubý příjem: - další činnost: - opravy do minulosti: Daň  68 907 51 500 51 500  Osvobozeno: Pojistné zaml.: Zvýšení základu: Základ daně: Záloha před slevou: z toho solidární zvýšení: Měsíční slevy: Slevy uplatněné: Daň. zv. - sleva: Zálohová daň: Daňový bonus: Srážková daň: Roční zúčtování: Korekce:  Pojistné Sociální - základ: Sociální - odvod: Zdravotní - základ: Zdravotní - odvod:  Zpracováno systémem Vema  Nemoc:  Ošetřovné:  Mateřská:  Otcovská:  Dlouhodobé ošetřovné: Příjem  Čistý příjem:  Čistá mzda:  Nepeněžní příjem:  Izolačka:  Půjčeno:  Vráceno:  Sraženo:  Nesraženo:  Zálohy: 0  K výplatě: 40 429 1828398883/0100 (na účet)  MOZAIKA o.p.s  www.vema.cz "

# Process the text through the loaded pipeline
doc = nlp(text)

# Create a list to hold the entities
entities = {}

for ent in doc.ents:
    # Add each entity to the dictionary
    entities[ent.label_.lower()] = ent.text

# Convert the dictionary of entities to JSON format
entities_json = json.dumps(entities, ensure_ascii=False)

print(entities_json)