#!/usr/bin/env python3
"""
Kubernetes Project Visualizer
Generates an architecture diagram of the web-app project and its Kubernetes components
with HTML output.
"""

from diagrams import Diagram, Cluster
from diagrams.generic.os import Android, IOS
from diagrams.programming.framework import React, FastAPI
from diagrams.firebase.develop import Authentication
from diagrams.onprem.database import MongoDB
from diagrams.programming.language import Python

# Import the HTML export function from our utility module
from export_utils import create_html_with_svg

# Set diagram attributes
graph_attr = {
    "fontsize": "30",
    "bgcolor": "white",
    "rankdir": "TB",
    "splines": "spline",
    "format": "svg",  # Use SVG format for better quality
}

# Create a temporary file for the SVG
svg_filename = "web_app_architecture"

# Create the diagram
with Diagram(
    show=False,  # Don't show directly
    graph_attr=graph_attr,
    filename=svg_filename,
    outformat="svg",  # Set output format to SVG
):
    with Cluster("UI"):
        apps = [
            Android("Android App"),
            IOS("Apple App"),
        ]
        funder_dashboard = React("Funder dashboard")
        admin_dashboard = React("Admin dashboard")

    with Cluster("Gateways"):
        public_gateway = FastAPI("Consumer Gateway")
        merchant_gateway = FastAPI("Merchant Gateway")
        funder_gateway = FastAPI("Funder Gateway")
        admin_gateway = FastAPI("Admin Gateway")

        with Cluster("Authentication & Authorization"):
            firebase_authentication = Authentication("Firebase")
            user_database = MongoDB("User Database")
            # firebase_authentication - mongodb_userdatabase

    with Cluster("Services"):
        with Cluster("Consumer"):
            scan_qr = Python("Scan QR")

        with Cluster("Merchant"):
            payment_qr = Python("Make Payment QR")
            request_payout = Python("Request Payout")

        with Cluster("Funder"):
            funder_qr = Python("Make Funding QR")
            view_payment_requests = Python("View payout requests")

        with Cluster("Admin"):
            assign_roles = Python("Assign roles")

        with Cluster("QR"):
            qr_pay = Python("Pay coins")
            qr_get = Python("Get coins")

    with Cluster("Databases"):
        payout_database = MongoDB("Payout DB")
        coins_database = MongoDB("Coins DB")
        qrs_database = MongoDB("QRs database")

    apps >> public_gateway
    apps >> merchant_gateway
    funder_dashboard >> funder_gateway
    admin_dashboard >> admin_gateway
    public_gateway >> scan_qr
    merchant_gateway >> payment_qr
    funder_gateway >> funder_qr

    admin_gateway >> assign_roles
    scan_qr >> qr_pay
    scan_qr >> qr_get

    payment_qr - request_payout

    funder_qr - view_payment_requests

    assign_roles >> user_database
    request_payout >> payout_database
    request_payout >> coins_database
    view_payment_requests >> payout_database
    qr_get >> qrs_database
    qr_pay >> qrs_database
    payment_qr >> qrs_database
    funder_qr >> qrs_database

    qr_get >> coins_database
    qr_pay >> coins_database


if __name__ == "__main__":
    html_file = create_html_with_svg(svg_filename)
