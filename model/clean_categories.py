forbidden = [
    "AC with",
    "articles lacking reliable references",
    "articles lacking sources",
    "articles needing additional references",
    "articles needing coordinates",
    "articles to be expanded",
    "articles with dead external links", 
    "articles with unsourced statements", 
    "containing video clips",
    "Creative Commons",
    "description is different from Wikidata", 
    "hCards",
    "identifiers", 
    "lacking in-text citations",
    "missing coordinates", 
    "needing translation from",  
    "stub articles", 
    "to be expanded",
    "Wikidata", 
    "with short description", 
    "with unsourced statements",
]

with open("clean_categories.txt", "w") as o:
    with open("categories.txt", "r") as f:
        while True:
            cat = f.readline()
            if len(cat) == 0:
                break
            permissible = all([f not in cat for f in forbidden])
            if permissible:
                o.write(cat)