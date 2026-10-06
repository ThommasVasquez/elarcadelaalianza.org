from PIL import Image
import os

os.makedirs('public/assets', exist_ok=True)

# 1. Hero illustration
# In sec_001.png, inner viewport is (60, 120, 1540, 1076)
img_1 = Image.open('/Users/thommyenergy/.gemini/antigravity-ide/brain/7c72f01c-41aa-4d5f-a375-02a2e657ba37/scratch/frames/sec_001.png')
# Save full inner hero artwork
hero_full = img_1.crop((60, 120, 1540, 1076))
hero_full.save('public/assets/hero_bg.png')

# Also crop just the illustration below the text (y: 350 to 1076 relative to inner frame)
hero_art = img_1.crop((60, 420, 1540, 1076))
hero_art.save('public/assets/hero_art.png')

# 2. Featured Work cards
# Card 1: Holiday Magic Festival (from sec_005.png)
# In sec_005.png: Holiday Magic card is on left side
img_5 = Image.open('/Users/thommyenergy/.gemini/antigravity-ide/brain/7c72f01c-41aa-4d5f-a375-02a2e657ba37/scratch/frames/sec_005.png')
# Let's crop Holiday Magic card
# Card is roughly x: 110 to 920, y: 280 to 766
holiday_card = img_5.crop((118, 280, 922, 766))
holiday_card.save('public/assets/work_holiday_magic.png')

# Card 2: TeamTrek (from sec_004.png or sec_005.png)
# In sec_004.png / sec_005.png: TeamTrek is on top right
teamtrek_card = img_5.crop((984, 98, 1482, 376))
teamtrek_card.save('public/assets/work_teamtrek.png')

# Card 3 & 4 from sec_007.png:
# Influence 360 & Innovation Summit
img_7 = Image.open('/Users/thommyenergy/.gemini/antigravity-ide/brain/7c72f01c-41aa-4d5f-a375-02a2e657ba37/scratch/frames/sec_007.png')
influence_card = img_7.crop((465, 118, 924, 464))
influence_card.save('public/assets/work_influence.png')

innovation_card = img_7.crop((984, 118, 1482, 464))
innovation_card.save('public/assets/work_innovation.png')

# 3. Services thumbnails from sec_009.png
img_9 = Image.open('/Users/thommyenergy/.gemini/antigravity-ide/brain/7c72f01c-41aa-4d5f-a375-02a2e657ba37/scratch/frames/sec_009.png')
# Cake thumbnail (01/ MANAGEMENT):
cake_thumb = img_9.crop((1073, 212, 1280, 332))
cake_thumb.save('public/assets/service_cake.png')

# Martini thumbnail (02/ CORPORATE):
martini_thumb = img_9.crop((412, 385, 620, 506))
martini_thumb.save('public/assets/service_martini.png')

# Conference thumbnail (03/ CONFERENCE):
conf_thumb = img_9.crop((1122, 558, 1329, 678))
conf_thumb.save('public/assets/service_conference.png')

# Marketing disco ball thumbnail (04/ MARKETING):
disco_thumb = img_9.crop((350, 730, 558, 850))
disco_thumb.save('public/assets/service_marketing.png')

# 4. Timeline cards from sec_026.png
img_26 = Image.open('/Users/thommyenergy/.gemini/antigravity-ide/brain/7c72f01c-41aa-4d5f-a375-02a2e657ba37/scratch/frames/sec_026.png')
timeline_gift = img_26.crop((115, 330, 427, 600))
timeline_gift.save('public/assets/timeline_gift.png')

timeline_cheers = img_26.crop((484, 334, 1070, 860))
timeline_cheers.save('public/assets/timeline_cheers.png')

# 5. People portraits from sec_034.png
img_34 = Image.open('/Users/thommyenergy/.gemini/antigravity-ide/brain/7c72f01c-41aa-4d5f-a375-02a2e657ba37/scratch/frames/sec_034.png')
portrait_1 = img_34.crop((275, 396, 482, 570))
portrait_1.save('public/assets/portrait_1.png')

portrait_2 = img_34.crop((862, 372, 1069, 580))
portrait_2.save('public/assets/portrait_2.png')

portrait_3 = img_34.crop((1174, 426, 1381, 580))
portrait_3.save('public/assets/portrait_3.png')

print("All assets successfully cropped and exported!")
