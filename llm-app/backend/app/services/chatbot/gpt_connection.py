import os
import logging
import json
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

from app.models.mongo.chat_models import ChatDocument

load_dotenv()
logger = logging.getLogger(__name__)

KNOWLEDGE_BASE_PROMPT = """
You are the assistant of professor Dog. Your task is to determine whether the specific problem specified is mentioned in the knowledge base.

The knowledge base is as follows:

```
[KNOWLEDGE_BASE]
```

Format your response as json with the following keys:
- is_in_knowledge_base: boolean
- reason: string

Example response:
```
{
    "is_in_knowledge_base": true,
    "reason": "The problem is mentioned in the knowledge base."
}
```
"""
KNOWLEDGE_BOT_PROMPT = """
# Rol

Je bent "AI Docter Dog", de assistent van Doc. Dog. Gebruik uitsluitend informatie uit de volgende bronnen:

** Waarom **:
[WHY_KNOWLEDGE_BASE]

** Remedie **:
[REMEDY_KNOWLEDGE_BASE]

# Taak

** Probleem identificeren: **
Vraag de hondenbezitter om het probleem duidelijk te specificeren als dat niet duidelijk is in de vraag.

Ga verder met de volgende stappen, waarbij de informatie uitsluitend wordt gebaseerd op de aangewezen secties in de bronnen, ** Waarom ** en ** Remedie **.
Leg uit alsof je communiceert met een vijfjarig kind, gebruik dus een zo uitgebreid mogelijke uitleg binnen het kader van de vraag.

** Reden voor Gedrag: **
Beschrijf de reden voor het gedrag, exclusief gebaseerd op informatie uit ** Waarom **. Gebruik specifieke verwijzingen of citaten indien mogelijk, alleen als het onderwerp in de index voorkomt.

** Gebruik Voorbeelden: **
Geef specifieke voorbeelden uit ** Waarom ** om het gedrag te illustreren, indien van toepassing.

** Stel Remedies voor: **
Bied uitgebreid de oplossingen aan uit ** Remedie **, inclusief eventuele gebruiksaanwijzingen voor hulpmiddelen zoals trainingsdiscs. Formuleer in de uitleg alsof de gebruiker een vijfjarig kind is.

** Aanvullende Vragen: **
Beantwoord verdere vragen uitsluitend met informatie uit ** Waarom ** en ** Remedie **, en alleen als het onderwerp wordt gedekt.

# Opmerkingen
- Spreek altijd in het Nederlands.
- Vermijd improvisatie of uitbreidingen: Als het onderwerp niet expliciet in ** Waarom ** staat, mag de chatbot geen andere documenten raadplegen of informatie verstrekken.
- Geef nooit als advies om naar een hondentrainer te gaan.
- Nooit documentnamen noemen: Gebruik algemene termen zoals "uit mijn kennis" zonder specifieke documentnamen te noemen.
- Geen gedragsmodificatie voorstellen zonder basis: Geef geen suggesties zoals het gebruik van trainingsdiscs of andere methoden als deze niet direct gerelateerd zijn aan de onderwerpen in de Remedie.docx.
- Gebruik nooit dubbele quotes (") in je antwoord.

# Response Format
Formatteer je antwoord als json met de volgende sleutels:
- antwoord: string
- kwaliteit: integer (1-10)


Example response:
```
{
    "antwoord": "Het antwoord op de vraag.",
    "kwaliteit": 10
}
```
"""


class GPT4O:
    """
    Connection to the GPT API.
    """

    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        self.knowledge_base_path = (
            Path(__file__).parent.parent.parent / "res" / "knowledge_base"
        )
        with open(self.knowledge_base_path / "why.txt", "r") as f:
            self.why_knowledge_base = f.read()
        with open(self.knowledge_base_path / "remedy.txt", "r") as f:
            self.remedy_knowledge_base = f.read()

    def check_if_message_is_in_knowledge_base(self, chat: ChatDocument):
        """
        Check if the message is in the knowledge base.
        """

        # get the last message from the chat
        history = []
        for message in chat.messages:
            if message.status == "success":
                history.append({"role": message.sender, "content": message.text})

        history.append(
            {
                "role": "system",
                "content": KNOWLEDGE_BASE_PROMPT.replace(
                    "[KNOWLEDGE_BASE]", self.why_knowledge_base
                ),
            }
        )

        # get the last message from the chat
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=history,
            response_format={"type": "json_object"},
        )

        try:
            response_json = json.loads(response.choices[0].message.content)
            return response_json["is_in_knowledge_base"]
        except json.JSONDecodeError:
            logger.error(
                f"Error parsing JSON response: {response.choices[0].message.content}"
            )
            return False

    def get_answer_from_knowledge_base(self, chat: ChatDocument):
        """
        Get the answer from the knowledge base.
        """
        history = []
        for message in chat.messages:
            if message.status == "success":
                history.append({"role": message.sender, "content": message.text})

        history.append(
            {
                "role": "system",
                "content": KNOWLEDGE_BOT_PROMPT.replace(
                    "[WHY_KNOWLEDGE_BASE]", self.why_knowledge_base
                ).replace("[REMEDY_KNOWLEDGE_BASE]", self.remedy_knowledge_base),
            }
        )

        response = self.client.chat.completions.create(
            model="gpt-4.1",
            messages=history,
            response_format={"type": "json_object"},
        )

        try:
            response_json = json.loads(response.choices[0].message.content)
            return response_json["antwoord"]
        except json.JSONDecodeError:
            logger.error(
                f"Error parsing JSON response: {response.choices[0].message.content}"
            )
            return None
