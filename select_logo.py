import tkinter as tk
from tkinter import filedialog
import shutil
import os

def main():
    root = tk.Tk()
    root.withdraw()
    root.attributes('-topmost', True) # Bring dialog to front

    print("Opening file dialog for you to select the LOGO image...")
    
    file_path = filedialog.askopenfilename(
        title="Select Your Cafe 90's Logo Image",
        filetypes=[("Image Files", "*.jpg *.jpeg *.png *.webp")]
    )

    if file_path:
        dest_path = r"c:\mohanweb\frontend\public\logo.png"
        try:
            shutil.copy(file_path, dest_path)
            print(f"SUCCESS: Copied '{file_path}' to '{dest_path}'")
        except Exception as e:
            print(f"Error copying file: {e}")
    else:
        print("CANCELED: No file was selected.")

if __name__ == "__main__":
    main()
