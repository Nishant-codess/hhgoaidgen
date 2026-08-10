from PIL import Image
import os
import glob

def remove_white_bg(image_path):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    # threshold for considering a color 'white-ish'
    threshold = 235
    for item in datas:
        # Check if r, g, b are all above the threshold
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(image_path, "PNG")

if __name__ == "__main__":
    decorations_dir = "/Users/nishant/Desktop/HHGOAID/public/assets/decorations"
    for file in glob.glob(os.path.join(decorations_dir, "*.png")):
        if "beach_bg" not in file: # skip the background image!
            print(f"Processing {file}...")
            remove_white_bg(file)
    print("Done removing backgrounds.")
