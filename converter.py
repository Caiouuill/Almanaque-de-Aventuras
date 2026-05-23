import csv
import json

CLASSES_VALIDAS = {
    "Artificer": "Artífice",
    "Barbarian": "Bárbaro",
    "Bard": "Bardo",
    "Cleric": "Clérigo",
    "Druid": "Druida",
    "Sorcerer": "Feiticeiro",
    "Fighter": "Guerreiro",
    "Rogue": "Ladino",
    "Wizard": "Mago",
    "Monk": "Monge",
    "Paladin": "Paladino",
    "Ranger": "Patrulheiro",
    "Warlock": "Bruxo"
}

def feet_to_meters(feet_str):
    """Converte string de pés para metros com arredondamento .5."""
    if not feet_str or feet_str.lower() == "self":
        return None
    try:
        feet = float(feet_str.split()[0])
        meters = feet * 0.3048
        meters_rounded = round(meters * 2) / 2
        return meters_rounded
    except ValueError:
        return None

def parse_components(comp_str):
    comp_dict = {"V": False, "S": False, "M": False, "I": ""}
    if not comp_str:
        return comp_dict
    parts = [p.strip() for p in comp_str.split(",")]
    for p in parts:
        if p.startswith("V"):
            comp_dict["V"] = True
        elif p.startswith("S"):
            comp_dict["S"] = True
        elif p.startswith("M"):
            comp_dict["M"] = True
            if "(" in p:
                comp_dict["I"] = p.split("(", 1)[1].rstrip(")")
    return comp_dict

def filtrar_classes(classes_str):
    result = []
    for part in classes_str.split(","):
        part = part.strip()
        for eng, pt in CLASSES_VALIDAS.items():
            if part.startswith(eng) and pt not in result:
                result.append(pt)
    return result

def normalizar_nivel(nivel_str):
    if nivel_str.lower() == "cantrip":
        return "Truque"
    return (nivel_str.replace("nd", "º")
                      .replace("st", "º")
                      .replace("rd", "º")
                      .replace("th", "º"))

def converter_magias(csv_path, json_path):
    magias = []
    with open(csv_path, encoding='utf-8', newline='') as f_csv:
        reader = csv.reader(f_csv)
        next(reader)  # Pula a linha de cabeçalho
        for idx, row in enumerate(reader, start=1):
            nome_en = row[0]
            livro = row[1]
            pagina = int(row[2])
            nivel = normalizar_nivel(row[3])
            tempo_conj = row[4]
            duracao = row[5]
            escola = row[6]
            alcance_str = row[7]
            comp_str = row[8]
            ritual_str = row[9]
            classes_principais = row[10]
            descricao = row[12]
            niveis_altos = row[13] if len(row) > 13 else ""

            alcance_valor = feet_to_meters(alcance_str)
            if alcance_valor is None:
                alcance = {"tipo": "Especial", "distancia": 0}
            else:
                alcance = {"tipo": "Metros", "distancia": alcance_valor}

            magia = {
                "nome": nome_en,
                "nomeIngles": nome_en,
                "numero": idx,
                "nivel": nivel,
                "escola": escola,
                "tempoConjuracao": tempo_conj,
                "alcance": alcance,
                "ritual": ritual_str.strip().lower() == "true",
                "tipoMagia": "Dano",  # Ajustar se houver coluna para isso
                "duracao": duracao,
                "componentes": parse_components(comp_str),
                "descricao": descricao,
                "niveisAltos": niveis_altos,
                "livro": livro,
                "pagina": pagina,
                "classes": filtrar_classes(classes_principais)
            }
            magias.append(magia)

    with open(json_path, 'w', encoding='utf-8') as f_json:
        json.dump(magias, f_json, ensure_ascii=False, indent=2)

# Exemplo de uso:
converter_magias("Spells.csv", "magias.json")
