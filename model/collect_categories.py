#!/usr/bin/python3

"""
This script will fetch all of the category names (that are of relevance)

This data will be used to categorize into macro-categories that will be more
useful.

For example:
    Deaths in 1910, 1911, 1912, 1913...1919 could be put into
    a macro category of Deaths from 1910-1919. Which will ultimately
    be more useful than the individual categories.
"""

import requests

url = "https://en.wikipedia.org/w/api.php"


file = open("categories.txt", "w")

last = None
count = 0
step = 500
while True:
    params = {
        "action": "query",
        "format": "json",
        "list": "allcategories",
        "aclimit": step,
        "acfrom": last
    }

    r = requests.get(url, params)
    data = r.json()
    categories = data["query"]["allcategories"]
    if count > 0:
        categories = categories[1:]
    for cat in categories:
        category = cat["*"]
        file.write(category+"\n")
    
    last = categories[-1]["*"]

    count += 500

    print(count)

    if len(categories) < step - 1:
        break

file.close()