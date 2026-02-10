import os

def fix_roadmap_assets(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # depth 2: roadmap_assets/html/ -> need ../../ to get to root
            
            # Fix absolute paths from root
            content = content.replace('href="/index.html"', 'href="../../index.html"')
            content = content.replace('href="/pages/roadmap.html"', 'href="../../pages/roadmap.html"')
            content = content.replace('href="/pages\\roadmap.html"', 'href="../../pages/roadmap.html"')
            
            # Fix other page links if they exist with absolute paths
            content = content.replace('href="/pages/cgpa.html"', 'href="../../pages/cgpa.html"')
            content = content.replace('href="/pages/iacal.html"', 'href="../../pages/iacal.html"')
            content = content.replace('href="/pages/pomodoro.html"', 'href="../../pages/pomodoro.html"')
            content = content.replace('href="/pages/notes.html"', 'href="../../pages/notes.html"')
            
            # Fix backslashes in relative paths
            content = content.replace('href="../css\\sub-roadmap.css"', 'href="../css/sub-roadmap.css"')
            content = content.replace('src="../js\\sub-roadmap.js"', 'src="../js/sub-roadmap.js"')
            
            # Fix any other potential mixed slash issues common in this project
            content = content.replace('href="..\\css\\sub-roadmap.css"', 'href="../css/sub-roadmap.css"')
            content = content.replace('src="..\\js\\sub-roadmap.js"', 'src="../js/sub-roadmap.js"')

            if content != original_content:
                print(f"Fixing {filename}")
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

if __name__ == "__main__":
    fix_roadmap_assets(r"c:\Users\SUFAL_BASAK\College_daddy\roadmap_assets\html")
