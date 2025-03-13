#!/usr/bin/env python3
"""
Export utilities for Kubernetes Project Visualizer
Contains functions for exporting diagrams to HTML format
"""


def create_html_with_svg(svg_filename):
    """
    Creates an HTML file with the embedded SVG diagram

    Args:
        svg_filename (str): The filename (without extension) of the SVG to embed

    Returns:
        str: The path to the created HTML file
    """
    svg_path = f"{svg_filename}.svg"

    # Read the SVG file
    with open(svg_path, "r") as f:
        svg_content = f.read()

    # Create HTML content
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kubernetes Architecture Diagram</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #333;
        }}
        .diagram {{
            margin-top: 20px;
            overflow: auto;
        }}
        .diagram svg {{
            max-width: 100%;
            height: auto;
        }}
    </style>
</head>
<body>
    <div class="container">        
        <div class="diagram">
            {svg_content}
        </div>
    </div>
</body>
</html>
    """

    # Write to HTML file
    html_filename = f"{svg_filename}.html"
    with open(html_filename, "w") as f:
        f.write(html_content)

    print(f"HTML file with embedded SVG created: {html_filename}")
    return html_filename
