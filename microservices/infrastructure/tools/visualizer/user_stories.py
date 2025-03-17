import os
from pathlib import Path
from diagrams import Diagram, Edge
from diagrams.programming.flowchart import StartEnd, Action, Decision


graph_attr = {
    "fontsize": "30",
    "bgcolor": "white",
    "rankdir": "TB",
    "splines": "spline",
    "format": "svg",  # Use SVG format for better quality
}

ROOT = Path(__file__).parent / "res"
os.makedirs(ROOT, exist_ok=True)


# consumer
with Diagram(show=False, graph_attr=graph_attr, filename=str(ROOT / "consumer.svg")):
    a1 = StartEnd("Consumer click btn ADD COINS")
    a2 = Action("Camera opens")
    a3 = StartEnd("Consumer scans QR code")
    a4 = Decision("Is QR already scanned")
    a5 = StartEnd("Message Ucoins not added")
    a6 = Action("Add Ucoin amount in consumer wallet")

    a1 >> a2 >> a3 >> a4 >> Edge(label="yes") >> a5
    a4 >> Edge(label="no") >> a6
